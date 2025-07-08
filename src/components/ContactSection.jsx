// src/components/ContactSection.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success');
          form.current.reset();
        },
        () => {
          setStatus('error');
        }
      );
  };

  return (
    <section id="contact" className="py-20 bg-[#f7f8f9] text-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-700">Let's Connect</h2>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Contact Form */}
          <form ref={form} onSubmit={sendEmail} className="w-full md:w-2/3 space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Send Message
            </button>
            {status === 'success' && (
              <p className="text-green-600 mt-2">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 mt-2">Oops! Something went wrong.</p>
            )}
          </form>

          {/* Social Links */}
          <div className="space-y-4">
            <p className="text-lg font-medium">Reach out:</p>
            <div className="flex flex-col space-y-3 text-purple-700">
              <a
                href="mailto:synamalhan22@gmail.com"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaEnvelope /> <span>synamalhan22@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com/in/synamalhan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaLinkedin /> <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/synamalhan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaGithub /> <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
