import { useState, useEffect, useRef } from 'react';

export function useSpotifySync() {
    const [playbackData, setPlaybackData] = useState({
        isPlaying: false,
        title: null,
        artist: null,
        albumImageUrl: null,
        syncedLyrics: null,
        parsedLyrics: []
    });
    const [currentProgress, setCurrentProgress] = useState(0);

    const syncTimeRef = useRef(Date.now());
    const baseProgressRef = useRef(0);
    const isPlayingRef = useRef(false);
    const reqFrameRef = useRef(null);

    // Poll the backend every 4 seconds
    useEffect(() => {
        let isMounted = true;
        const fetchSpotify = async () => {
            try {
                // Uses environment variable for production, falls back to localhost for dev
                const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await fetch(`${API_BASE}/api/now-playing`);
                if (!res.ok) throw new Error('API failed');
                const data = await res.json();
                
                if (isMounted) {
                    isPlayingRef.current = data.isPlaying;
                    baseProgressRef.current = data.progress_ms || 0;
                    syncTimeRef.current = Date.now();
                    
                    let parsed = [];
                    if (data.syncedLyrics) {
                        parsed = parseLrc(data.syncedLyrics);
                    }

                    setPlaybackData({
                        isPlaying: data.isPlaying,
                        title: data.title,
                        artist: data.artist,
                        albumImageUrl: data.albumImageUrl,
                        syncedLyrics: data.syncedLyrics,
                        parsedLyrics: parsed
                    });
                }
            } catch (err) {
                // Silently fail if spotify backend is offline
            }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 4000);
        return () => {
            isMounted = false;
            clearInterval(interval);
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
