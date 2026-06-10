import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';

export default function Create() {
    const [data, setData] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            window.location.href = '/suppliers';
        }, 1000);
    };

    return (
        <AuthenticatedLayout header="Tambah Supplier">
            <div style={{ padding: '40px 24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                    <Link
                        to="/suppliers"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '20px',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Kembali ke Daftar
                    </Link>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '40px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        border: '1px solid #e2e8f0',
                    }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Informasi Supplier Baru</h2>
                            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Lengkapi formulir di bawah ini untuk menambahkan supplier baru.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Nama Supplier <span style={{ color: '#ef4444' }}>*</span></label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="E.g. PT Maju Jaya" 
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: '#f8fafc',
                                        fontSize: '15px',
                                        outline: 'none',
                                        transition: 'border-color 0.2s, box-shadow 0.2s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                />
                                {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.name}</p>}
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>No. Telepon</label>
                                <input 
                                    type="text" 
                                    value={data.phone} 
                                    onChange={e => setData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="E.g. 08123456789" 
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: '#f8fafc',
                                        fontSize: '15px',
                                        outline: 'none',
                                    }}
                                />
                                {errors.phone && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.phone}</p>}
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Alamat</label>
                                <textarea 
                                    value={data.address} 
                                    onChange={e => setData(prev => ({ ...prev, address: e.target.value }))}
                                    rows="3"
                                    placeholder="Alamat lengkap supplier..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: '#f8fafc',
                                        fontSize: '15px',
                                        outline: 'none',
                                        resize: 'vertical',
                                    }}
                                ></textarea>
                                {errors.address && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.address}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    backgroundColor: '#0ea5e9',
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    border: 'none',
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                    opacity: processing ? 0.7 : 1,
                                    boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.3)',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { if(!processing) e.target.style.backgroundColor = '#0284c7'; }}
                                onMouseLeave={e => { if(!processing) e.target.style.backgroundColor = '#0ea5e9'; }}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Supplier'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
