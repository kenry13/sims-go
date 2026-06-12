import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api';

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
};

const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' };

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        code: '',
        name: '',
        category_id: '',
        supplier_id: '',
        stock: 0,
        min_stock: 0,
        unit: '',
        description: '',
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const [itemRes, catRes, supRes] = await Promise.all([
                    api.get(`/items/${id}`),
                    api.get('/categories'),
                    api.get('/suppliers'),
                ]);

                const item = itemRes.data.data;
                setData({
                    code: item.code,
                    name: item.name,
                    category_id: item.category_id,
                    supplier_id: item.supplier_id,
                    stock: item.stock,
                    min_stock: item.min_stock,
                    unit: item.unit,
                    description: item.description || '',
                });

                setCategories(catRes.data.data || []);
                setSuppliers(supRes.data.data || []);
            } catch (error) {
                console.error('Failed to load item:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            await api.put(`/items/${id}`, {
                ...data,
                category_id: Number(data.category_id),
                supplier_id: Number(data.supplier_id),
                stock: Number(data.stock),
                min_stock: Number(data.min_stock),
            });
            navigate('/items');
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert(error.response?.data?.message || 'Gagal memperbarui barang');
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AuthenticatedLayout header="Edit Barang">
            <div style={{ padding: '40px 24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                    <Link
                        to="/items"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            color: '#64748b', textDecoration: 'none', fontSize: '14px',
                            fontWeight: '600', marginBottom: '20px', transition: 'color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#0ea5e9'}
                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Kembali ke Daftar
                    </Link>

                    <div style={{
                        backgroundColor: 'white', borderRadius: '20px', padding: '40px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        border: '1px solid #e2e8f0',
                    }}>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '40px' }}>Memuat...</div>
                        ) : (
                            <>
                                <div style={{ marginBottom: '32px' }}>
                                    <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Edit Informasi Barang</h2>
                                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Perbarui detail barang di bawah ini.</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Kode & Nama */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '24px' }}>
                                        <div>
                                            <label style={labelStyle}>Kode <span style={{ color: '#ef4444' }}>*</span></label>
                                            <input
                                                type="text"
                                                value={data.code}
                                                onChange={e => setData(prev => ({ ...prev, code: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
                                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                                required
                                            />
                                            {errors.code && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.code}</p>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Nama Barang <span style={{ color: '#ef4444' }}>*</span></label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
                                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                                required
                                            />
                                            {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.name}</p>}
                                        </div>
                                    </div>

                                    {/* Category & Supplier */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                        <div>
                                            <label style={labelStyle}>Kategori <span style={{ color: '#ef4444' }}>*</span></label>
                                            <select
                                                value={data.category_id}
                                                onChange={e => setData(prev => ({ ...prev, category_id: e.target.value }))}
                                                style={{ ...inputStyle, cursor: 'pointer' }}
                                                required
                                            >
                                                <option value="">-- Pilih Kategori --</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            {errors.category_id && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.category_id}</p>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Supplier <span style={{ color: '#ef4444' }}>*</span></label>
                                            <select
                                                value={data.supplier_id}
                                                onChange={e => setData(prev => ({ ...prev, supplier_id: e.target.value }))}
                                                style={{ ...inputStyle, cursor: 'pointer' }}
                                                required
                                            >
                                                <option value="">-- Pilih Supplier --</option>
                                                {suppliers.map(sup => (
                                                    <option key={sup.id} value={sup.id}>{sup.name}</option>
                                                ))}
                                            </select>
                                            {errors.supplier_id && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.supplier_id}</p>}
                                        </div>
                                    </div>

                                    {/* Stock, Min Stock, Unit */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                        <div>
                                            <label style={labelStyle}>Stok</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.stock}
                                                onChange={e => setData(prev => ({ ...prev, stock: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
                                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                            />
                                            {errors.stock && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.stock}</p>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Stok Minimum</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.min_stock}
                                                onChange={e => setData(prev => ({ ...prev, min_stock: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
                                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                            />
                                            {errors.min_stock && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.min_stock}</p>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Satuan <span style={{ color: '#ef4444' }}>*</span></label>
                                            <input
                                                type="text"
                                                value={data.unit}
                                                onChange={e => setData(prev => ({ ...prev, unit: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'; }}
                                                onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                                required
                                            />
                                            {errors.unit && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.unit}</p>}
                                        </div>
                                    </div>

                                    {/* Deskripsi */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <label style={labelStyle}>Deskripsi</label>
                                        <textarea
                                            value={data.description}
                                            onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
                                            rows="3"
                                            placeholder="Opsional..."
                                            style={{ ...inputStyle, resize: 'vertical' }}
                                        ></textarea>
                                        {errors.description && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.description}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        style={{
                                            width: '100%', padding: '14px', borderRadius: '12px',
                                            backgroundColor: '#0ea5e9', color: 'white', fontSize: '16px',
                                            fontWeight: '700', border: 'none',
                                            cursor: processing ? 'not-allowed' : 'pointer',
                                            opacity: processing ? 0.7 : 1,
                                            boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.3)',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => { if (!processing) e.target.style.backgroundColor = '#0284c7'; }}
                                        onMouseLeave={e => { if (!processing) e.target.style.backgroundColor = '#0ea5e9'; }}
                                    >
                                        {processing ? 'Menyimpan...' : 'Perbarui Barang'}
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
