import React, { useMemo } from 'react';
import { useSpotifySync } from '../hooks/useSpotifySync';
import { useTheme } from '../theme/ThemeContext';
import { FONTS } from './styles';

export default function LiveLyrics() {
    const { isPlaying, title, artist, albumImageUrl, parsedLyrics, currentProgress } = useSpotifySync();
    const { theme: t } = useTheme();

    const activeIndex = useMemo(() => {
        if (!parsedLyrics || parsedLyrics.length === 0) return -1;
        let idx = -1;
        for (let i = 0; i < parsedLyrics.length; i++) {
            if (currentProgress >= parsedLyrics[i].time) {
                idx = i;
            } else {
                break;
            }
        }
        return idx;
    }, [parsedLyrics, currentProgress]);

    if (!isPlaying) {
        return null;
    }

    if (parsedLyrics.length === 0) {
        return (
            <div style={{ padding: '100px 40px', textAlign: 'center', background: t.cardBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
                <p style={{ ...FONTS.mono, color: t.accent, letterSpacing: 2 }}>{title} // {artist}</p>
                <p style={{ ...FONTS.mono, opacity: 0.5, fontSize: '0.8rem', marginTop: 10, color: t.textMute }}>[ Instrumental or No Lyrics Found ]</p>
            </div>
        );
    }

    const LINE_HEIGHT = 80;
    const translateYOffset = activeIndex >= 0 ? -(activeIndex * LINE_HEIGHT) : 0;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            minHeight: 600,
            background: t.name === 'dark' ? '#111' : '#f4f4f4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderTop: `2px solid ${t.borderHi}`,
            borderBottom: `2px solid ${t.borderHi}`,
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)'
        }}>
            {/* Background Blur derived from Album Cover if available */}
            {albumImageUrl && (
                <div style={{
                    position: 'absolute',
                    inset: -50,
                    backgroundImage: `url(${albumImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(80px) saturate(2)',
                    opacity: 0.15,
                    zIndex: 0
                }} />
            )}

            <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                transform: `translateY(${translateYOffset}px)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                zIndex: 1
            }}>
                {parsedLyrics.map((line, i) => {
                    const isActive = i === activeIndex;
                    const isUpcoming = i > activeIndex;
                    const distance = Math.abs(i - activeIndex);

                    let opacity = 0;
                    if (isActive) opacity = 1;
                    else if (distance === 1) opacity = 0.5;
                    else if (distance === 2) opacity = 0.2;
                    else if (distance === 3) opacity = 0.05;

                    return (
                        <div 
                            key={i} 
                            style={{
                                height: 60,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                padding: '0 40px',
                                ...FONTS.orb, // using the sketch aesthetic bold font
                                fontSize: isActive ? 'clamp(2rem, 5vw, 4rem)' : 'clamp(1.5rem, 4vw, 3rem)',
                                fontWeight: isActive ? 900 : 400,
                                color: isActive ? t.textHi : t.textMute,
                                textShadow: isActive ? `0 0 20px ${t.accent}88` : 'none',
                                opacity,
                                transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                                filter: isUpcoming ? 'blur(2px)' : (isActive ? 'none' : 'blur(4px)'),
                                willChange: 'transform, opacity, filter'
                            }}
                        >
                            {line.text === '' ? '♪' : line.text}
                        </div>
                    );
                })}
            </div>
            
            {/* Header info */}
            <div style={{
                position: 'absolute',
                top: 40,
                left: 40,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 16
            }}>
                {albumImageUrl && (
                    <img src={albumImageUrl} alt="Album Art" style={{ width: 48, height: 48, borderRadius: 8, boxShadow: `0 4px 12px rgba(0,0,0,0.3)` }} />
                )}
                <div>
                    <div style={{ ...FONTS.mono, fontSize: '0.65rem', color: t.accent, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 4 }}>
                        LIVE // SPOTIFY
                    </div>
                    <div style={{ ...FONTS.orb, fontWeight: 700, fontSize: '1.1rem', color: t.textHi }}>
                        {title}
                    </div>
                    <div style={{ ...FONTS.mono, fontSize: '0.75rem', color: t.textMute }}>
                        {artist}
                    </div>
                </div>
            </div>
        </div>
    );
}
