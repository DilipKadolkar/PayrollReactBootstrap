// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Card = ({ title, icon, style, onClick }) => {
//     return (
//         <div
//             className="card shadow text-center h-150 border-0 rounded-4 p-4 d-flex justify-content-center"
//             style={{
//                 backgroundColor: '#f9f9f9',
//                 height: '200px',
//                 cursor: 'pointer',
//                 transition: 'transform 0.2s ease-in-out',
//                 ...style,
//             }}
//             onClick={onClick}
//             onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
//             onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//         >
//             <FontAwesomeIcon icon={icon} size="2x" className="mb-3 text-primary" />
//             <h6 className="fw-semibold">{title}</h6>
//         </div>
//     );
// };

// export default Card;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({ title, icon, style, onClick }) => {
    return (
        <div
            className="card shadow-sm text-center border-0 rounded-lg p-4 d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundColor: '#ffffff', // A clean white background
                height: '200px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                ...style,
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'; // Subtle shadow on hover
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)'; // Reset shadow (Bootstrap's default shadow-sm)
            }}
        >
            <FontAwesomeIcon icon={icon} size="2x" className="mb-3 text-primary" />
            <h6 className="fw-semibold mb-0">{title}</h6>
        </div>
    );
};

export default Card;