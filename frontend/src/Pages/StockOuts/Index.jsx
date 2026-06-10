import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';

const dummyStockOuts = {
    data: [
        { id: 1, item: { name: 'Mouse Logitech' }, quantity: 3, user: { name: 'Admin' }, description: 'Pesanan customer', created_at: new Date().toISOString() },
        { id: 2, item: { name: 'Laptop ASUS ROG' }, quantity: 1, user: { name: 'Admin' }, description: '', created_at: new Date(Date.now() - 86400000).toISOString() },
    ],
    total: 2,
    from: 1,
    last_page: 1,
    links: [
        { label: '&laquo; Previous', url: null, active: false },
        { label: '1', url: '/stock-outs?page=1', active: true },
        { label: 'Next &raquo;', url: null, active: false },
    ]
};

export default function Index() {
    const handleDelete = (id) => {
        if (confirm('Hapus transaksi ini? Stok akan dikembalikan.')) {
            console.log('Deleting stock out', id);
        }
    };

    return (
        <AuthenticatedLayout header="Barang Keluar">
            <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginBottom: '24px',
                    backgroundColor: 'white',
                    padding: '20px 24px',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                    <div>
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Riwayat Barang Keluar</h2>
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                            Total {dummyStockOuts.total} transaksi keluar tercatat
                        </p>
                    </div>
                    <Link
                        to="/stock-outs/create"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            backgroundColor: '#0ea5e9',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Catat Barang Keluar
                    </Link>
                </div>

                <div style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                {['Tanggal', 'Nama Barang', 'Jumlah', 'Dicatat Oleh', 'Keterangan', 'Aksi'].map((col) => (
                                    <th key={col} style={{
                                        padding: '16px 20px',
                                        color: '#64748b',
                                        fontWeight: '600',
                                        textAlign: col === 'Aksi' || col === 'Jumlah' ? 'center' : 'left',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody style={{ color: '#1e293b' }}>
                            {dummyStockOuts.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                                        Belum ada transaksi barang keluar
                                    </td>
                                </tr>
                            ) : (
                                dummyStockOuts.data.map((s, i) => {
                                    return (
                                        <tr key={s.id} style={{ borderBottom: i === dummyStockOuts.data.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 20px', color: '#64748b' }}>
                                                {new Date(s.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontWeight: '600' }}>{s.item?.name}</td>
                                            <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '700', color: '#ef4444' }}>
                                                -{s.quantity}
                                            </td>
                                            <td style={{ padding: '16px 20px' }}>{s.user?.name}</td>
                                            <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>{s.description || '-'}</td>
                                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => handleDelete(s.id)}
                                                    style={{
                                                        padding: '6px',
                                                        borderRadius: '6px',
                                                        backgroundColor: '#fef2f2',
                                                        color: '#ef4444',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                    }}
                                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fee2e2'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    
                    {dummyStockOuts.last_page > 1 && (
                        <div style={{
                            padding: '16px 20px',
                            borderTop: '1px solid #f1f5f9',
                            backgroundColor: '#ffffff',
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center', 
                            gap: '8px',
                        }}>
                            {dummyStockOuts.links.map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.url ?? '#'}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        backgroundColor: link.active ? '#0ea5e9' : 'transparent',
                                        color: link.active ? '#ffffff' : '#64748b',
                                        border: link.active ? '1px solid #0ea5e9' : '1px solid #e2e8f0',
                                        pointerEvents: link.url ? 'auto' : 'none',
                                        opacity: link.url ? 1 : 0.5,
                                        transition: 'all 0.2s'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
