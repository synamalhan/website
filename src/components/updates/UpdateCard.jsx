import React from 'react';

const UpdateCard = ({ title, date, content }) => {
  return (
    <div
      style={{
        background: 'rgba(0, 26, 31, 0.85)',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        padding: '24px',
        margin: '16px 0',
        color: '#a0d8ef',
        maxWidth: '500px',
        width: '100%',
        transition: 'transform 0.2s',
        border: '1px solid #001a1f',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#92daf7' }}>{title}</h3>
        <span style={{ fontSize: '0.95rem', color: '#6ec6e6', fontWeight: 500 }}>{date}</span>
      </div>
      <p style={{ marginTop: '12px', fontSize: '1.08rem', lineHeight: 1.6 }}>{content}</p>
    </div>
  );
};

export default UpdateCard; 