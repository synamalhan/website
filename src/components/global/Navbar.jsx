import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Welcome' },
  { id: 'about', label: 'About Me' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'updates', label: 'Updates' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => setOpen(!open);
  const handleLinkClick = () => setOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gradientColors = [
    '#e0d7fa', '#cabff1', '#b3a6e8', '#9c8ede', '#8575d5', '#6a57a1',
  ];

  return (
    <>
      <nav style={styles.navbar}>
        <button onClick={toggleMenu} aria-label="Toggle Menu" style={styles.hamburger}>
          <div style={{ ...styles.bar, transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ ...styles.bar, opacity: open ? 0 : 1 }} />
          <div style={{ ...styles.bar, transform: open ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }} />
        </button>
      </nav>

      {open && (
        <div
          style={{
            ...styles.menuOverlay,
            ...(isMobile ? styles.popoverStyle : styles.sidebarStyle),
          }}
        >
          <ul
            style={{
              ...styles.menuList,
              flexDirection: isMobile ? 'column' : 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
            }}
          >
            {sections.map(({ id, label }, index) => (
              <li key={id} style={styles.menuItem}>
                <a
                  href={`#${id}`}
                  onClick={handleLinkClick}
                  style={{
                    ...styles.menuLink,
                    color: gradientColors[index] || '#b6a3ff',
                    paddingLeft: isMobile ? 0 : 24,
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 1000,
  },
  hamburger: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: 0,
    width: 30,
    height: 30,
  },
  bar: {
    width: 30,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    transition: 'all 0.3s ease',
  },
  menuOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 8, 20, 0.5)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  sidebarStyle: {
    width: '250px',
    height: '100vh',
    paddingTop: '60px',
    flexDirection: 'column',
  },
  popoverStyle: {
    width: '100vw',
    height: '100vh',
    flexDirection: 'column',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    gap: 24,
  },
  menuItem: {
    margin: 0,
  },
  menuLink: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    fontWeight: '600',
    display: 'block',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
