import React from 'react';
import { useSpotifySync } from '../hooks/useSpotifySync';
import { useTheme } from '../theme/ThemeContext';
import { FONTS } from './styles';

export default function LiveLyrics() {
    const { isPlaying, title, artist, albumImageUrl, parsedLyrics } = useSpotifySync();
    const { theme: t } = useTheme();

    if (!isPlaying) {
        return null;
    }

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
            borderRadius: '15px 8px 20px 12px',
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
                        LYRICS // LIVE
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
            <div className="custom-scrollbar" style={{
                position: 'relative',
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: t.name === 'dark' ? '#11111199' : '#f8f8f899',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {/* Background Blur derived from Album Cover */}
                {albumImageUrl && (
                    <div style={{
                        position: 'absolute',
                        inset: -20,
                        backgroundImage: `url(${albumImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(30px) opacity(0.15)',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }} />
                )}

                <style>
                    {`
                        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { 
                            background: ${t.borderHi}; 
                            border-radius: 10px;
                        }
                    `}
                </style>

                {parsedLyrics.length === 0 ? (
                    <div style={{ 
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        textAlign: 'center', ...FONTS.mono, fontSize: '0.75rem', color: t.textMute, zIndex: 1 
                    }}>
                        [ Instrumental / Lyrics N/A ]
                    </div>
                ) : (
                    parsedLyrics.map((line, i) => (
                        <div 
                            key={i} 
                            style={{
                                zIndex: 1,
                                ...FONTS.orb,
                                fontSize: '1rem',
                                color: t.text,
                                lineHeight: '1.4',
                                opacity: 0.9,
                                textAlign: 'center'
                            }}
                        >
                            {line.text === '' ? '♪' : line.text}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
