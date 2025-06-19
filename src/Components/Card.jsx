import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ title, icon, style, onClick }) => {
    return (
        <div
            className="card shadow text-center h-150 border-0 rounded-4 p-4 d-flex justify-content-center"
            style={{
                backgroundColor: '#f9f9f9',
                height: '200px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                ...style,
            }}
            onClick={onClick}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <FontAwesomeIcon icon={icon} size="2x" className="mb-3 text-primary" />
            <h6 className="fw-semibold">{title}</h6>
        </div>
    );
};

export default Card;
