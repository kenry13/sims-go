import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';

const dummyItems = [
    { id: 1, name: 'Laptop ASUS ROG', stock: 50, unit: 'pcs', min_stock: 10 },
    { id: 2, name: 'Mouse Logitech', stock: 5, unit: 'pcs', min_stock: 10 },
];

export default function Create() {
    const today = new Date().toISOString().split('T')[0];
    const [data, setData] = useState({
        item_id: '',
        quantity: 1,
        date: today,
        note: '',
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const selectedItem = dummyItems.find(i => i.id == data.item_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            window.location.href = '/stock-outs';
        }, 1000);
    };

    return (
        <AuthenticatedLayout header="Catat Barang Keluar">
            <div style={{ padding: '40px 24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '700px' }}>
                    <Link
                        to="/stock-outs"
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
                        Kembali ke Riwayat
                    </Link>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '40px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        border: '1px solid #e2e8f0',
                    }}>
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>Transaksi Barang Keluar</h2>
                            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Catat pengurangan stok barang di bawah ini.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Pilih Barang <span style={{ color: '#ef4444' }}>*</span></label>
                                <select 
                                    value={data.item_id} 
                                    onChange={e => setData(prev => ({ ...prev, item_id: e.target.value }))}
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
                                    <option value="">-- Pilih Barang --</option>
                                    {dummyItems.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name} (Stok: {item.stock} {item.unit})
                                        </option>
                                    ))}
                                </select>
                                {errors.item_id && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.item_id}</p>}
                            </div>

                            {selectedItem && (
                                <div style={{ 
                                    marginBottom: '24px', 
                                    padding: '12px 16px', 
                                    backgroundColor: selectedItem.stock <= selectedItem.min_stock ? '#fff1f2' : '#f0f9ff', 
                                    borderRadius: '10px', 
                                    border: `1px solid ${selectedItem.stock <= selectedItem.min_stock ? '#fecdd3' : '#bae6fd'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{ color: selectedItem.stock <= selectedItem.min_stock ? '#ef4444' : '#0ea5e9' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            {selectedItem.stock <= selectedItem.min_stock ? (
                                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
                                            ) : (
                                                <><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></>
                                            )}
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: '13px', color: selectedItem.stock <= selectedItem.min_stock ? '#991b1b' : '#0369a1', margin: 0 }}>
                                        Stok saat ini: <strong>{selectedItem.stock} {selectedItem.unit}</strong>
                                        {selectedItem.stock <= selectedItem.min_stock && ' (Peringatan: Stok menipis!)'}
                                    </p>
                                </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Jumlah Keluar <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input 
                                        type="number" 
                                        value={data.quantity} 
                                        onChange={e => setData(prev => ({ ...prev, quantity: e.target.value }))}
                                        min="1"
                                        max={selectedItem?.stock || 9999}
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
                                    {errors.quantity && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.quantity}</p>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Tanggal <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input 
                                        type="date" 
                                        value={data.date} 
                                        onChange={e => setData(prev => ({ ...prev, date: e.target.value }))}
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
                                    {errors.date && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.date}</p>}
                                </div>
                            </div>

                            <div style={{ marginBottom: '32px' }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Keterangan / Catatan</label>
                                <textarea 
                                    value={data.note} 
                                    onChange={e => setData(prev => ({ ...prev, note: e.target.value }))}
                                    rows="3"
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
                                {errors.note && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.note}</p>}
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
                                {processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
