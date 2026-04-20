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

    const LINE_HEIGHT = 45;
    const translateYOffset = activeIndex >= 0 ? -(activeIndex * LINE_HEIGHT) : 0;

    return (
        <div style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            width: 320,
            height: 480,
            zIndex: 9999,
            background: t.cardBg,
            border: `2px solid ${t.borderHi}`,
            borderRadius: '15px 8px 20px 12px', // Sketchy messy box
            boxShadow: `10px 10px 0 ${t.bg}, 12px 12px 0 ${t.borderHi}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
            {/* Header info */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '20px',
                background: t.bg,
                borderBottom: `2px dashed ${t.borderHi}`,
                borderRadius: '15px 8px 0 0'
            }}>
                {albumImageUrl && (
                    <img 
                        src={albumImageUrl} 
                        alt="Album Art" 
                        style={{ 
                            width: 44, 
                            height: 44, 
                            borderRadius: '30% 70% 60% 40% / 40% 50% 60% 50%', 
                            border: `1px solid ${t.border}`
                        }} 
                    />
                )}
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ ...FONTS.mono, fontSize: '0.55rem', color: t.accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 2 }}>
                        LISTENING // LIVE
                    </div>
                    <div style={{ ...FONTS.orb, fontWeight: 700, fontSize: '0.9rem', color: t.textHi, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {title}
                    </div>
                    <div style={{ ...FONTS.mono, fontSize: '0.65rem', color: t.textMute, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {artist}
                    </div>
                </div>
            </div>

            {/* Lyrics Area */}
            <div style={{
                position: 'relative',
                flex: 1,
                overflow: 'hidden',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 25%, black 75%, transparent 95%)',
                maskImage: 'linear-gradient(to bottom, transparent 5%, black 25%, black 75%, transparent 95%)',
                background: t.name === 'dark' ? '#11111199' : '#f8f8f899',
            }}>
                {/* Background Blur derived from Album Cover */}
                {albumImageUrl && (
                    <div style={{
                        position: 'absolute',
                        inset: -20,
                        backgroundImage: `url(${albumImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(30px) opacity(0.2)',
                        zIndex: 0
                    }} />
                )}

                {parsedLyrics.length === 0 ? (
                    <div style={{ 
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        textAlign: 'center', padding: 20, ...FONTS.mono, fontSize: '0.75rem', color: t.textMute, zIndex: 1 
                    }}>
                        [ Instrumental / Synced Lyrics N/A ]
                    </div>
                ) : (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        transform: `translateY(${translateYOffset}px)`,
                        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        zIndex: 1
                    }}>
                        {parsedLyrics.map((line, i) => {
                            const isActive = i === activeIndex;
                            const isUpcoming = i > activeIndex;
                            const distance = Math.abs(i - activeIndex);

                            let opacity = 0;
                            if (isActive) opacity = 1;
                            else if (distance === 1) opacity = 0.6;
                            else if (distance === 2) opacity = 0.3;
                            else if (distance === 3) opacity = 0.1;

                            return (
                                <div 
                                    key={i} 
                                    style={{
                                        height: LINE_HEIGHT - 12, // actual height space + gap
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        padding: '0 20px',
                                        ...FONTS.orb,
                                        fontSize: isActive ? '1.25rem' : '1.05rem',
                                        fontWeight: isActive ? 800 : 400,
                                        color: isActive ? t.textHi : t.textMute,
                                        opacity,
                                        transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                                        transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                                        filter: isUpcoming ? 'blur(1px)' : (isActive ? 'none' : 'blur(2px)'),
                                        willChange: 'transform, opacity'
                                    }}
                                >
                                    {line.text === '' ? '♪' : line.text}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
