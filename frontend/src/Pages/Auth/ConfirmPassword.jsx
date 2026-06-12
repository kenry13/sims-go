import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ConfirmPassword() {
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setStatus('Fitur konfirmasi password belum tersedia.');
            setProcessing(false);
        }, 500);
    };

    return (
        <div style={{
            minHeight: '100vh', width: '100%', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} />

            <div style={{
                position: 'relative', zIndex: 3, backgroundColor: '#1e293b',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
                padding: '40px 44px', width: '100%', maxWidth: '460px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                        width: '48px', height: '48px', backgroundColor: '#0ea5e9',
                        borderRadius: '12px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 16px',
                        boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)',
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                    </div>
                    <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 800 }}>Konfirmasi Password</h2>
                    <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px', lineHeight: '1.6' }}>
                        Ini adalah area aman. Konfirmasi password Anda sebelum melanjutkan.
                    </p>
                </div>

                {status && (
                    <div style={{
                        marginBottom: '16px', fontSize: '14px', textAlign: 'center',
                        padding: '10px', borderRadius: '8px',
                        color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)',
                        border: '1px solid rgba(251, 191, 36, 0.2)',
                    }}>
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                            style={{
                                width: '100%', padding: '12px 16px', borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                                color: 'white', fontSize: '15px', outline: 'none',
                                boxSizing: 'border-box',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%', padding: '14px', borderRadius: '8px',
                            border: 'none', backgroundColor: '#0ea5e9', color: 'white',
                            fontSize: '16px', fontWeight: 700,
                            cursor: processing ? 'not-allowed' : 'pointer',
                            opacity: processing ? 0.7 : 1,
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                        }}
                        onMouseEnter={(e) => { if (!processing) e.target.style.backgroundColor = '#0284c7' }}
                        onMouseLeave={(e) => { if (!processing) e.target.style.backgroundColor = '#0ea5e9' }}
                    >
                        {processing ? 'Memproses...' : 'Konfirmasi'}
                    </button>
                </form>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Link to="/dashboard" style={{ fontSize: '14px', color: '#0ea5e9', textDecoration: 'none', fontWeight: 500 }}>
                        Kembali ke Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
