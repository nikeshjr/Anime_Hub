// 
import React, { useState } from 'react';

const StarRating = ({ initialRating, onRate }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(initialRating || 0);

    const handleRating = (value) => {
        setRating(value);
        if (onRate) onRate(value);
    };

    return (
        <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hover || rating) >= star;

                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.6rem',
                            padding: 0,
                            color: isActive ? '#facc15' : '#334155', // ⭐ YELLOW
                            transition: 'color 0.2s ease, transform 0.15s ease',
                            transform: hover === star ? 'scale(1.2)' : 'scale(1)',
                        }}
                    >
                        {isActive ? '★' : '☆'}
                    </button>
                );
            })}

            {rating > 0 && (
                <span
                    style={{
                        marginLeft: '10px',
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                    }}
                >
                    ({rating}.0)
                </span>
            )}
        </div>
    );
};

export default StarRating;
