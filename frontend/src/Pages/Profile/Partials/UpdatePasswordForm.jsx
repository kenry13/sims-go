import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [data, setData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const updatePassword = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setRecentlySuccessful(true);
            setTimeout(() => setRecentlySuccessful(false), 3000);
            setData({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
        }, 1000);
    };

    return (
        <section>
            <header style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                    Perbarui Kata Sandi
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Kata Sandi Saat Ini
                    </label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData(prev => ({ ...prev, current_password: e.target.value }))}
                        type="password"
                        autoComplete="current-password"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.current_password ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = errors.current_password ? '#fca5a5' : '#0ea5e9'}
                        onBlur={(e) => e.target.style.borderColor = errors.current_password ? '#fca5a5' : '#e2e8f0'}
                    />
                    {errors.current_password && (
                        <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px' }}>{errors.current_password}</p>
                    )}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Kata Sandi Baru
                    </label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                        type="password"
                        autoComplete="new-password"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.password ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = errors.password ? '#fca5a5' : '#0ea5e9'}
                        onBlur={(e) => e.target.style.borderColor = errors.password ? '#fca5a5' : '#e2e8f0'}
                    />
                    {errors.password && (
                        <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px' }}>{errors.password}</p>
                    )}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Konfirmasi Kata Sandi
                    </label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                        type="password"
                        autoComplete="new-password"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.password_confirmation ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = errors.password_confirmation ? '#fca5a5' : '#0ea5e9'}
                        onBlur={(e) => e.target.style.borderColor = errors.password_confirmation ? '#fca5a5' : '#e2e8f0'}
                    />
                    {errors.password_confirmation && (
                        <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px' }}>{errors.password_confirmation}</p>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: processing ? '#93c5fd' : '#0ea5e9',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: processing ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Simpan
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p style={{ fontSize: '13px', color: '#059669', fontWeight: '600' }}>
                            Tersimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
