import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api';

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const response = await api.get(`/categories/${id}`);
                const category = response.data.data;
                setData({
                    name: category.name,
                    description: category.description || '',
                });
            } catch (error) {
                console.error('Failed to load category:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        
        try {
            await api.put(`/categories/${id}`, data);
            navigate('/categories');
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors || {});
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout header="Edit Kategori">
            <div style={{ padding: '40px 24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                    {/* Back Button */}
                    <Link
                        to="/categories"
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
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '40px' }}>Memuat...</div>
                        ) : (
                            <>
                                <div style={{ marginBottom: '32px' }}>
                                    <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Edit Informasi Kategori</h2>
                                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Perbarui detail kategori di bawah ini.</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Nama Kategori */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Nama Kategori <span style={{ color: '#ef4444' }}>*</span></label>
                                        <input 
                                            type="text" 
                                            value={data.name} 
                                            onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="E.g. Elektronik" 
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

                                    {/* Deskripsi */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Deskripsi</label>
                                        <textarea 
                                            value={data.description} 
                                            onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
                                            rows="4"
                                            placeholder="Opsional..."
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
                                        {errors.description && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.description}</p>}
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
                                        {processing ? 'Menyimpan...' : 'Perbarui Kategori'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
