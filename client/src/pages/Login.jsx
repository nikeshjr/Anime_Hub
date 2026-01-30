
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ identity: '', password: '' });
    const [toast, setToast] = useState({ show: false, message: "" });
    
    
    const [isBtnHovered, setIsBtnHovered] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/user/login', formData);
            showToast("Welcome back! 👋");
            login(data.user, data.token);
            setTimeout(() => {
                navigate('/');
            }, 1200); 
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Invalid Credentials";
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
                position: 'relative'
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
            
            {toast.show && (
                <div className="toast-container">
                    {toast.message}
                </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                <h1 style={{ color: '#38bdf8', fontSize: '1.8rem', margin: '0', fontWeight: '900', textShadow: '0 0 10px rgba(56, 189, 248, 0.5)' }}>
                    WELCOME BACK
                </h1>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input 
                    className="blue-glow-hover"
                    type="text" 
                    placeholder="Username or Email"
                    style={inputStyle}
                    value={formData.identity}
                    onChange={(e) => setFormData({...formData, identity: e.target.value})}
                    required
                />
                <input 
                    className="blue-glow-hover"
                    type="password" 
                    placeholder="Password"
                    style={inputStyle}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                />
                
                <button 
                    type="submit" 
                    onMouseEnter={() => setIsBtnHovered(true)}
                    onMouseLeave={() => setIsBtnHovered(false)}
                    style={{ 
                        width: '100%', 
                        marginTop: '15px', 
                        padding: '14px', 
                        borderRadius: '30px', 
                        fontWeight: 'bold', 
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        outline: 'none',
                        background: isBtnHovered ? '#38bdf8' : 'transparent', 
                        color: isBtnHovered ? '#000000' : '#38bdf8',
                        border: '1px solid #38bdf8',
                        boxShadow: isBtnHovered ? '0 0 20px #38bdf8' : 'none',
                        transform: isBtnHovered ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                >
                    LOGIN TO HUB
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.85rem', color: '#64748b' }}>
                New to the Elite? <span onClick={() => navigate('/register')} style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Join here</span>
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

export default Login;