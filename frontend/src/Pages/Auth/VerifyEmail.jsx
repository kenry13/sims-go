import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setStatus('Fitur verifikasi email belum tersedia.');
            setProcessing(false);
        }, 500);
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        navigate('/login');
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
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 800 }}>Verifikasi Email</h2>
                    <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px', lineHeight: '1.6' }}>
                        Terima kasih sudah mendaftar! Silakan verifikasi alamat email Anda dengan mengklik link yang kami kirimkan.
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                flex: 1, padding: '12px', borderRadius: '8px',
                                border: 'none', backgroundColor: '#0ea5e9', color: 'white',
                                fontSize: '14px', fontWeight: 700,
                                cursor: processing ? 'not-allowed' : 'pointer',
                                opacity: processing ? 0.7 : 1,
                                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                            }}
                        >
                            {processing ? 'Mengirim...' : 'Kirim Ulang Email'}
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            style={{
                                padding: '12px 20px', borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                backgroundColor: 'transparent', color: '#94a3b8',
                                fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => e.target.style.borderColor = '#0ea5e9'}
                            onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        >
                            Log Out
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
