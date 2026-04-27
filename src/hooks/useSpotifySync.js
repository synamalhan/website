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

    // Poll Spotify Now Playing
    useEffect(() => {
        let isMounted = true;
        let pollInterval;

        const fetchNowPlaying = async () => {
            try {
                const isLocal = window.location.hostname === 'localhost';
                const API_BASE = isLocal ? 'http://localhost:3001' : (import.meta.env.VITE_API_URL || 'http://localhost:3001');
                
                const res = await fetch(`${API_BASE}/api/now-playing`);
                if (!res.ok) throw new Error(`API failed: ${res.status}`);
                const data = await res.json();
                
                console.log("Spotify Sync Data:", data);

                if (!isMounted) return;

                if (!data || data.isPlaying === false) {
                    isPlayingRef.current = false;
                    setPlaybackData(prev => ({ ...prev, isPlaying: false }));
                    return;
                }

                // Update sync refs
                isPlayingRef.current = data.isPlaying;
                baseProgressRef.current = data.progressMs || 0;
                syncTimeRef.current = Date.now();

                const actualUri = data.uri;
                
                setPlaybackData(prev => {
                    const uriChanged = actualUri && actualUri !== prev.currentUri;
                    
                    if (uriChanged) {
                        return {
                            isPlaying: data.isPlaying,
                            title: data.title,
                            artist: data.artist,
                            albumImageUrl: data.albumImageUrl,
                            syncedLyrics: data.syncedLyrics,
                            parsedLyrics: data.syncedLyrics ? parseLrc(data.syncedLyrics) : [],
                            currentUri: actualUri
                        };
                    }

                    return { ...prev, isPlaying: data.isPlaying };
                });
            } catch (err) {
                console.error("Spotify Now Playing Error:", err);
            }
        };

        fetchNowPlaying();
        pollInterval = setInterval(fetchNowPlaying, 5000);

        return () => {
            isMounted = false;
            clearInterval(pollInterval);
        };
    }, []);

    // Interpolate progress smoothly, but limit React state updates to ease CPU load
    useEffect(() => {
        const loop = () => {
            if (isPlayingRef.current) {
                const elapsed = Date.now() - syncTimeRef.current;
                setCurrentProgress(baseProgressRef.current + elapsed);
            } else {
                setCurrentProgress(baseProgressRef.current);
            }
        };
        
        // 100ms is perfectly fine for lyric sync without destroying mobile CPU CPU usage
        const intervalId = setInterval(loop, 100);
        return () => clearInterval(intervalId);
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
