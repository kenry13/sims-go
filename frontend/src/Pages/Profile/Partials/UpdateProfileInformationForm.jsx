import { useState } from 'react';
import { Transition } from '@headlessui/react';

const dummyUser = { name: 'Admin', email: 'admin@example.com', email_verified_at: new Date().toISOString() };

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = dummyUser;

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setRecentlySuccessful(true);
            setTimeout(() => setRecentlySuccessful(false), 3000);
        }, 1000);
    };

    return (
        <section>
            <header style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                    Informasi Profil
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                    Perbarui informasi profil dan alamat email akun Anda.
                </p>
            </header>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Nama
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        autoComplete="name"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.name ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = errors.name ? '#fca5a5' : '#0ea5e9'}
                        onBlur={(e) => e.target.style.borderColor = errors.name ? '#fca5a5' : '#e2e8f0'}
                    />
                    {errors.name && (
                        <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px' }}>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        autoComplete="username"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.email ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = errors.email ? '#fca5a5' : '#0ea5e9'}
                        onBlur={(e) => e.target.style.borderColor = errors.email ? '#fca5a5' : '#e2e8f0'}
                    />
                    {errors.email && (
                        <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px' }}>{errors.email}</p>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '10px' }}>
                        <p style={{ fontSize: '13px', color: '#92400e', marginBottom: '8px' }}>
                            Alamat email Anda belum diverifikasi.
                        </p>
                        {status === 'verification-link-sent' && (
                            <p style={{ fontSize: '13px', color: '#059669', fontWeight: '600' }}>
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </p>
                        )}
                    </div>
                )}

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
