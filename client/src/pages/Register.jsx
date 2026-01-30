
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        emailid: '',
        password: ''
    });
    
    // --- TOAST LOGIC ---
    const [toast, setToast] = useState({ show: false, message: "" });
    const navigate = useNavigate();

    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/user/register', formData);
            
            // Triggering the success toast
            showToast("Registration Successful! 🎉");
            
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Registration failed";
            showToast(errorMsg);
        }
    };

    return (
        <div 
            className="comment-box" 
            style={{ 
                maxWidth: '400px', 
                margin: '150px auto', 
                padding: '40px 30px', 
                background: '#0f172a', 
                borderRadius: '20px', 
                border: '1px solid #334155',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#38bdf8';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.3)';
                e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* --- UPDATED: TOAST USING YOUR CSS CLASS FOR BOTTOM-RIGHT POSITIONING --- */}
            {toast.show && (
                <div className="toast-container">
                    {toast.message}
                </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                <h1 style={{ 
                    color: '#38bdf8', 
                    fontSize: '1.8rem', 
                    margin: '0', 
                    fontWeight: '900', 
                    textShadow: '0 0 10px rgba(56, 189, 248, 0.5)' 
                }}>
                    WELCOME TO ANIME_HUB
                </h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '8px' }}>
                    Your journey to the elite begins now.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input 
                    className="blue-glow-hover"
                    type="text" 
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    style={inputStyle}
                    required
                />
                <input 
                    className="blue-glow-hover"
                    type="email" 
                    placeholder="Email Address"
                    value={formData.emailid}
                    onChange={(e) => setFormData({...formData, emailid: e.target.value})}
                    style={inputStyle}
                    required
                />
                <input 
                    className="blue-glow-hover"
                    type="password" 
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    style={inputStyle}
                    required
                />
                
                <button 
                    type="submit" 
                    style={{ 
                        width: '100%', 
                        marginTop: '15px', 
                        padding: '14px', 
                        background: 'transparent', 
                        border: '1px solid #38bdf8', 
                        color: '#38bdf8', 
                        borderRadius: '30px', 
                        fontWeight: 'bold', 
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem',
                        letterSpacing: '1px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#38bdf8';
                        e.currentTarget.style.color = '#0f172a';
                        e.currentTarget.style.boxShadow = '0 0 20px #38bdf8';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#38bdf8';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    JOIN THE ELITE
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.85rem', color: '#64748b' }}>
                Already a member? <span onClick={() => navigate('/login')} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Login here</span>
            </p>
        </div>
    );
};

const inputStyle = { 
    display: 'block', 
    width: '100%', 
    marginBottom: '20px', 
    padding: '12px 15px', 
    background: '#1e293b', 
    border: '1px solid #334155', 
    color: '#fff', 
    borderRadius: '10px',
    outline: 'none',
    textAlign: 'center', 
    transition: 'all 0.3s ease',
    fontSize: '0.95rem'
};

export default Register;