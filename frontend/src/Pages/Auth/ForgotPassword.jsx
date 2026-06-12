import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [data, setData] = useState({ email: '' });
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setStatus('Fitur reset password belum tersedia.');
            setProcessing(false);
        }, 500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} />

            <div style={{
                position: 'relative',
                zIndex: 3,
                backgroundColor: '#1e293b',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '40px 44px',
                width: '100%',
                maxWidth: '460px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                        width: '48px', height: '48px', backgroundColor: '#0ea5e9',
                        borderRadius: '12px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 16px',
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M21 7l-9-4-9 4m18 0l-9 4m9-4v10l-9 4m0-10L3 7m9 4v10M3 7v10l9 4" />
                        </svg>
                    </div>
                    <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800' }}>Lupa Password?</h2>
                </div>

                <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6', textAlign: 'center' }}>
                    Masukkan alamat email Anda dan kami akan mengirimkan link reset password.
                </p>

                {status && (
                    <div style={{
                        marginBottom: '16px', fontSize: '14px', textAlign: 'center',
                        padding: '10px', borderRadius: '8px',
                        color: '#fbbf24',
                        background: 'rgba(251, 191, 36, 0.1)',
                        border: '1px solid rgba(251, 191, 36, 0.2)',
                    }}>
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
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
                            fontSize: '16px', fontWeight: '700',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            opacity: processing ? 0.7 : 1,
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                        }}
                    >
                        {processing ? 'Mengirim...' : 'Kirim Link Reset Password'}
                    </button>
                </form>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Link to="/login" style={{ fontSize: '14px', color: '#0ea5e9', textDecoration: 'none', fontWeight: 500 }}>
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
