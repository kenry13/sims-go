import { useState, useEffect } from 'react';
// import InputError from '@/Components/InputError';
import { Link } from 'react-router-dom';

export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        return () => {
            setData(prev => ({ ...prev, password: '', password_confirmation: '' }));
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        
        try {
            // Nanti bisa dihubungkan ke API
            // await api.post('/register', data);
            console.log('Register data:', data);
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors || {});
            }
        } finally {
            setProcessing(false);
        }
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
            {/* Abstract background elements */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)', borderRadius: '50%' }} />

            {/* Card */}
            <div style={{
                position: 'relative',
                zIndex: 3,
                backgroundColor: '#1e293b',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '40px 44px',
                width: '100%',
                maxWidth: '500px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        backgroundColor: '#0ea5e9', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M21 7l-9-4-9 4m18 0l-9 4m9-4v10l-9 4m0-10L3 7m9 4v10M3 7v10l9 4" />
                        </svg>
                    </div>
                    <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 800 }}>Daftar Akun</h2>
                    <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Mulai kelola inventaris Anda hari ini</p>
                </div>

                <form onSubmit={submit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        {/* Name */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Nama Lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                                    color: 'white',
                                    fontSize: '15px',
                                    outline: 'none',
                                }}
                                required
                            />
                            {/* <InputError message={errors.name} style={{ marginTop: '4px', color: '#f87171', fontSize: '12px' }} /> */}
                        </div>

                        {/* Email */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                                    color: 'white',
                                    fontSize: '15px',
                                    outline: 'none',
                                }}
                                required
                            />
                            {/* <InputError message={errors.email} style={{ marginTop: '4px', color: '#f87171', fontSize: '12px' }} /> */}
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: 'block', color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                                    color: 'white',
                                    fontSize: '15px',
                                    outline: 'none',
                                }}
                                required
                            />
                            {/* <InputError message={errors.password} style={{ marginTop: '4px', color: '#f87171', fontSize: '12px' }} /> */}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label style={{ display: 'block', color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Konfirmasi</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                                    color: 'white',
                                    fontSize: '15px',
                                    outline: 'none',
                                }}
                                required
                            />
                            {/* <InputError message={errors.password_confirmation} style={{ marginTop: '4px', color: '#f87171', fontSize: '12px' }} /> */}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#0ea5e9',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 700,
                            cursor: processing ? 'not-allowed' : 'pointer',
                            opacity: processing ? 0.7 : 1,
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                            transition: 'transform 0.1s, background-color 0.2s',
                        }}
                    >
                        {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                    </button>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                            Sudah punya akun?{' '}
                            <Link
                                to="/login"
                                style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 600 }}
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}