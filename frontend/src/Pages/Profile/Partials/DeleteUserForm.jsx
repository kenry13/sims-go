import { useRef, useState } from 'react';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const [data, setData] = useState({ password: '' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setConfirmingUserDeletion(false);
            setData({ password: '' });
            console.log('User deleted');
        }, 1000);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setData({ password: '' });
    };

    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#dc2626', marginBottom: '6px' }}>
                    Hapus Akun
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Sebelum menghapus akun Anda, harap unduh semua data atau informasi yang ingin Anda simpan.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: 'fit-content'
                }}
            >
                Hapus Akun
            </button>

            {confirmingUserDeletion && (
                <div style={{ 
                    position: 'fixed', 
                    inset: 0, 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '28px', 
                        borderRadius: '16px', 
                        maxWidth: '450px', 
                        width: '90%'
                    }}>
                        <form onSubmit={deleteUser}>
                            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                                Apakah Anda yakin ingin menghapus akun Anda?
                            </h2>
                            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', lineHeight: '1.5' }}>
                                Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. Harap masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.
                            </p>

                            <div style={{ marginBottom: '24px' }}>
                                <label htmlFor="password" style={{ display: 'none' }}>Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                                    placeholder="Kata Sandi"
                                    autoFocus
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: errors.password ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        outline: 'none'
                                    }}
                                />
                                {errors.password && (
                                    <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '8px' }}>{errors.password}</p>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    style={{
                                        padding: '10px 20px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '10px',
                                        backgroundColor: 'white',
                                        color: '#64748b',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: processing ? '#fca5a5' : '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: processing ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Hapus Akun
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
