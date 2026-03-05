import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useTheme } from "../theme/ThemeContext";
import { FONTS, btnBase } from "../components/styles";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";

const Contact = () => {
    const { theme: t } = useTheme();
    const form = useRef();
    const [status, setStatus] = useState(null);

    const sendEmail = (e) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setStatus("success");
                    form.current.reset();
                },
                () => {
                    setStatus("error");
                }
            );
    };

    return (
        <section
            id="contact"
            style={{
                padding: "80px 24px 120px",
                position: "relative",
                zIndex: 1,
                maxWidth: 1200,
                margin: "0 auto",
                color: t.text,
                transition: "all 0.4s"
            }}
        >
            <div style={{ textAlign: "center", marginBottom: 52 }}>
                <Label center>// Contact</Label>
                <H2 style={{ textAlign: "center" }}>LET'S CONNECT</H2>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "60px",
                alignItems: "start"
            }}>
                {/* Contact Form */}
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        background: t.surface + "33",
                        padding: "32px",
                        borderRadius: "16px",
                        border: `1px solid ${t.border}`,
                        backdropFilter: "blur(10px)"
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ ...FONTS.mono, fontSize: "0.6rem", color: t.textMute, textTransform: "uppercase", letterSpacing: 1 }}>Name</span>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Your Name"
                            required
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                border: `1px solid ${t.border}`,
                                borderRadius: 8,
                                background: t.bg,
                                color: t.textHi,
                                outline: "none",
                                ...FONTS.inter,
                                transition: "border-color 0.2s"
                            }}
                            onFocus={e => e.target.style.borderColor = t.accent}
                            onBlur={e => e.target.style.borderColor = t.border}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ ...FONTS.mono, fontSize: "0.6rem", color: t.textMute, textTransform: "uppercase", letterSpacing: 1 }}>Email</span>
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Your Email"
                            required
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                border: `1px solid ${t.border}`,
                                borderRadius: 8,
                                background: t.bg,
                                color: t.textHi,
                                outline: "none",
                                ...FONTS.inter,
                                transition: "border-color 0.2s"
                            }}
                            onFocus={e => e.target.style.borderColor = t.accent}
                            onBlur={e => e.target.style.borderColor = t.border}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ ...FONTS.mono, fontSize: "0.6rem", color: t.textMute, textTransform: "uppercase", letterSpacing: 1 }}>Message</span>
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Your Message"
                            required
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                border: `1px solid ${t.border}`,
                                borderRadius: 8,
                                background: t.bg,
                                color: t.textHi,
                                outline: "none",
                                resize: "none",
                                ...FONTS.inter,
                                transition: "border-color 0.2s"
                            }}
                            onFocus={e => e.target.style.borderColor = t.accent}
                            onBlur={e => e.target.style.borderColor = t.border}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            ...btnBase,
                            background: `linear-gradient(135deg, ${t.accent}, ${t.magenta})`,
                            color: "#fff",
                            marginTop: 8,
                            cursor: "pointer",
                            border: "none",
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        TRANSMIT MESSAGE
                    </button>

                    {status === "success" && (
                        <p style={{ color: "#22c55e", ...FONTS.mono, fontSize: "0.7rem", marginTop: 8, textAlign: "center" }}>
                            MESSAGE SENT SUCCESSFULLY!
                        </p>
                    )}
                    {status === "error" && (
                        <p style={{ color: "#ef4444", ...FONTS.mono, fontSize: "0.7rem", marginTop: 8, textAlign: "center" }}>
                            OOPS! SOMETHING WENT WRONG.
                        </p>
                    )}
                </form>

                {/* Social Links & Info */}
                <div style={{ padding: "16px" }}>
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ ...FONTS.mono, fontSize: "0.6rem", color: t.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>REACH OUT</div>
                        <p style={{ ...FONTS.inter, fontSize: "0.95rem", color: t.textMute, lineHeight: 1.6 }}>
                            Whether it's for a collaboration, a question, or just to say hi, my inbox is always open.
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <a
                            href="mailto:synamalhan22@gmail.com"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                color: t.textHi,
                                textDecoration: "none",
                                ...FONTS.mono,
                                fontSize: "0.75rem",
                                letterSpacing: 1,
                                transition: "color 0.2s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = t.cyan}
                            onMouseLeave={e => e.currentTarget.style.color = t.textHi}
                        >
                            <FaEnvelope style={{ fontSize: "1.1rem" }} /> synamalhan22@gmail.com
                        </a>
                        <a
                            href="https://linkedin.com/in/synamalhan"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                color: t.textHi,
                                textDecoration: "none",
                                ...FONTS.mono,
                                fontSize: "0.75rem",
                                letterSpacing: 1,
                                transition: "color 0.2s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = t.cyan}
                            onMouseLeave={e => e.currentTarget.style.color = t.textHi}
                        >
                            <FaLinkedin style={{ fontSize: "1.1rem" }} /> linkedin.com/in/synamalhan
                        </a>
                        <a
                            href="https://github.com/synamalhan"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                color: t.textHi,
                                textDecoration: "none",
                                ...FONTS.mono,
                                fontSize: "0.75rem",
                                letterSpacing: 1,
                                transition: "color 0.2s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = t.cyan}
                            onMouseLeave={e => e.currentTarget.style.color = t.textHi}
                        >
                            <FaGithub style={{ fontSize: "1.1rem" }} /> github.com/synamalhan
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;