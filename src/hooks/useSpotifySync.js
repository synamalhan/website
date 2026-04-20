import { useState, useEffect, useRef } from 'react';

export function useSpotifySync() {
    const [playbackData, setPlaybackData] = useState({
        isPlaying: false,
        title: null,
        artist: null,
        albumImageUrl: null,
        syncedLyrics: null,
        parsedLyrics: [],
        currentUri: null
    });
    const [currentProgress, setCurrentProgress] = useState(0);

    const syncTimeRef = useRef(Date.now());
    const baseProgressRef = useRef(0);
    const isPlayingRef = useRef(false);
    const reqFrameRef = useRef(null);

    // Listen to IFrame Controller Events
    useEffect(() => {
        let isMounted = true;

        const handlePlaybackUpdate = async (e) => {
            if (!isMounted) return;
            const data = e.detail;

            // data contains: position, duration, isPaused, isBuffering 
            // In some versions it contains a playingURI. However if it's a playlist we want track URI
            // wait, if Spotify isn't returning data.position we have to be careful
            if (!data || data.position === undefined) return;

            isPlayingRef.current = !data.isPaused;
            baseProgressRef.current = data.position || 0;
            syncTimeRef.current = Date.now();

            // If URI changed, we need new lyrics
            // Sometimes it's e.data.track.uri, sometimes e.data.uri depending on the Embed theme
            const actualUri = data?.track?.uri || data?.item?.uri || data?.uri || null;
            
            // If we STILL don't have a URI, just update the position! But if we have one and it changed, fetch!
            setPlaybackData(prev => {
                if (actualUri && actualUri !== prev.currentUri && actualUri.includes("track")) {
                    // Start fetching new song
                    fetchTrackData(actualUri);
                    return { ...prev, isPlaying: !data.isPaused, currentUri: actualUri };
                }
                return { ...prev, isPlaying: !data.isPaused };
            });
        };

        const fetchTrackData = async (uri) => {
            try {
                const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await fetch(`${API_BASE}/api/track?uri=${encodeURIComponent(uri)}`);
                if (!res.ok) throw new Error('API failed');
                const trackData = await res.json();
                
                if (isMounted) {
                    let parsed = [];
                    if (trackData.syncedLyrics) {
                        parsed = parseLrc(trackData.syncedLyrics);
                    }
                    setPlaybackData(prev => ({
                        ...prev,
                        title: trackData.title,
                        artist: trackData.artist,
                        albumImageUrl: trackData.albumImageUrl,
                        syncedLyrics: trackData.syncedLyrics,
                        parsedLyrics: parsed
                    }));
                }
            } catch (err) {
                console.error("Spotify IFrame Fetch Error:", err);
            }
        };

        window.addEventListener('spotifyPlaybackUpdate', handlePlaybackUpdate);
        return () => {
            isMounted = false;
            window.removeEventListener('spotifyPlaybackUpdate', handlePlaybackUpdate);
        };
    }, []);

    // Interpolate progress smoothly at 60fps
    useEffect(() => {
        const loop = () => {
            if (isPlayingRef.current) {
                const elapsed = Date.now() - syncTimeRef.current;
                setCurrentProgress(baseProgressRef.current + elapsed);
            } else {
                setCurrentProgress(baseProgressRef.current);
            }
            reqFrameRef.current = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(reqFrameRef.current);
    }, []);

    return { ...playbackData, currentProgress };
}

// Utility to parse raw LRC strings [mm:ss.xx] text
function parseLrc(lrcString) {
    if (!lrcString) return [];
    const lines = lrcString.split('\n');
    const parsed = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

    for (let line of lines) {
        const match = timeRegex.exec(line);
        if (match) {
            const min = parseInt(match[1], 10);
            const sec = parseInt(match[2], 10);
            const ms = parseInt(match[3], 10) * (match[3].length === 2 ? 10 : 1);
            const timeInMs = (min * 60 * 1000) + (sec * 1000) + ms;
            const text = line.replace(timeRegex, '').trim();
            if (text || parsed.length > 0) {
                 parsed.push({ time: timeInMs, text });
            }
        }
    }
    return parsed.sort((a,b) => a.time - b.time);
}
