import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from './keys';
import linkedinIcon from '../../assets/linkedin.webp';
import githubIcon from '../../assets/github.png';
import gmailIcon from '../../assets/gmail.png';
import { motion } from 'framer-motion';

const socialMedia = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/synamalhan',
    icon: linkedinIcon,
    color: '#00b4d8',
  },
  {
    name: 'Github',
    url: 'https://github.com/synamalhan',
    icon: githubIcon,
    color: '#023047',
  },
  {
    name: 'Email',
    url: 'mailto:synamalhan22@gmail.com',
    icon: gmailIcon,
    color: '#caf0f8',
  },
];

const blobStyle = (color) => ({
  background: color,
  borderRadius: `${Math.floor(Math.random() * 40) + 30}% ${Math.floor(Math.random() * 40) + 30}% ${
    Math.floor(Math.random() * 40) + 30
  }% ${Math.floor(Math.random() * 40) + 30}%`,
  width: '90px',
  height: '90px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  boxShadow: `0 0 20px ${color}66`,
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
});

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSending(false);
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        setSending(false);
        setError('Failed to send message. Please try again later.');
        console.error('EmailJS error:', err);
      });
  };

  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(180deg, #00141a 0%, #000a0e 100%)',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#a0d8ef',
        fontFamily: "'Montserrat', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: '3rem',
          marginBottom: '20px',
          color: '#92daf7',
          textShadow: '0 0 8px rgba(0, 150, 200, 0.4)',
        }}
      >
        Contact Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '1.1rem',
        }}
      >
        Whether you're interested in working together, have a question, or just want to say hi — drop me a message or connect through my socials!
      </motion.p>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
          maxWidth: '500px',
          marginBottom: '50px',
        }}
      >
        <motion.input {...inputProps('name', 'Your Name', formData, handleChange, sending)} />
        <motion.input {...inputProps('email', 'Your Email', formData, handleChange, sending)} type="email" />
        <motion.textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ ...inputStyle, resize: 'none' }}
          disabled={sending}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={sending}
          style={{
            backgroundColor: '#92daf7',
            color: '#00141a',
            padding: '10px 20px',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            cursor: sending ? 'not-allowed' : 'pointer',
            boxShadow: '0 0 10px rgba(146, 218, 247, 0.6)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {sending ? 'Sending...' : 'Send Message'}
        </motion.button>
        {sent && <p style={{ color: '#9ee7ff' }}>Message sent successfully! 🎉</p>}
        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
      </motion.form>

      {/* Social Media Blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {socialMedia.map((media, index) => (
          <motion.a
            key={index}
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={media.name}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            style={{ textDecoration: 'none' }}
          >
            <div style={blobStyle(media.color)}>
              <img
                src={media.icon}
                alt={media.name}
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

const inputProps = (name, placeholder, formData, handleChange, disabled) => ({
  name,
  placeholder,
  value: formData[name],
  onChange: handleChange,
  required: true,
  disabled,
  style: inputStyle,
  type: 'text',
});

const inputStyle = {
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #a0d8ef',
  backgroundColor: '#00242a',
  color: '#a0d8ef',
  fontSize: '1rem',
  fontFamily: "'Montserrat', sans-serif",
  boxShadow: 'inset 0 0 4px rgba(146, 218, 247, 0.3)',
};

export default ContactSection;
