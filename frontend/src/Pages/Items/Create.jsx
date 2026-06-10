import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';

// Dummy data
const dummyCategories = [
    { id: 1, name: 'Elektronik' },
    { id: 2, name: 'Peralatan Kantor' },
    { id: 3, name: 'Peralatan Rumah' },
];
const dummySuppliers = [
    { id: 1, name: 'Tech Supplier' },
    { id: 2, name: 'Office Supplier' },
];

export default function Create() {
    const [data, setData] = useState({
        code: '',
        name: '',
        category_id: '',
        supplier_id: '',
        stock: 0,
        min_stock: 5,
        unit: '',
        description: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            window.location.href = '/items';
        }, 1000);
    };

    return (
        <AuthenticatedLayout header="Tambah Barang">
            <div style={{ padding: '40px 24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '800px' }}>
                    <Link
                        to="/items"
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
                            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Informasi Barang Baru</h2>
                            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Lengkapi formulir di bawah ini untuk menambahkan barang ke inventaris.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Kode Barang <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input 
                                        type="text" 
                                        value={data.code} 
                                        onChange={e => setData(prev => ({ ...prev, code: e.target.value }))}
                                        placeholder="E.g. ELK-001" 
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
                                    {errors.code && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.code}</p>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Nama Barang <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="E.g. Laptop Lenovo" 
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
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Kategori <span style={{ color: '#ef4444' }}>*</span></label>
                                    <select 
                                        value={data.category_id} 
                                        onChange={e => setData(prev => ({ ...prev, category_id: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: '#f8fafc',
                                            fontSize: '15px',
                                            outline: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {dummyCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    {errors.category_id && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.category_id}</p>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Supplier <span style={{ color: '#ef4444' }}>*</span></label>
                                    <select 
                                        value={data.supplier_id} 
                                        onChange={e => setData(prev => ({ ...prev, supplier_id: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: '#f8fafc',
                                            fontSize: '15px',
                                            outline: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <option value="">Pilih Supplier</option>
                                        {dummySuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                    {errors.supplier_id && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.supplier_id}</p>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Stok Awal</label>
                                    <input 
                                        type="number" 
                                        value={data.stock} 
                                        onChange={e => setData(prev => ({ ...prev, stock: e.target.value }))}
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
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Stok Minimum</label>
                                    <input 
                                        type="number" 
                                        value={data.min_stock} 
                                        onChange={e => setData(prev => ({ ...prev, min_stock: e.target.value }))}
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
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Satuan</label>
                                    <input 
                                        type="text" 
                                        value={data.unit} 
                                        onChange={e => setData(prev => ({ ...prev, unit: e.target.value }))}
                                        placeholder="E.g. Pcs, Box"
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
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Deskripsi</label>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData(prev => ({ ...prev, description: e.target.value }))}
                                    rows="3"
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
                                {processing ? 'Menyimpan...' : 'Simpan Barang'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
