import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';

const dummySuppliers = {
    data: [
        { id: 1, name: 'Tech Supplier', phone: '08123456789', address: 'Jakarta', items_count: 45 },
        { id: 2, name: 'Office Supplier', phone: '081987654321', address: 'Bandung', items_count: 32 },
    ],
    total: 2,
    from: 1,
    last_page: 1,
    links: [
        { label: '&laquo; Previous', url: null, active: false },
        { label: '1', url: '/suppliers?page=1', active: true },
        { label: 'Next &raquo;', url: null, active: false },
    ]
};

export default function Index() {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus supplier ini?')) {
            console.log('Deleting supplier', id);
        }
    };

    return (
        <AuthenticatedLayout header="Data Supplier">
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
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Daftar Supplier</h2>
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                            Total {dummySuppliers.total} supplier terdaftar dalam sistem
                        </p>
                    </div>
                    <Link
                        to="/suppliers/create"
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
                        Tambah Supplier
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
                                {['No', 'Nama Supplier', 'No. Telepon', 'Alamat', 'Jumlah Barang', 'Aksi'].map((col) => (
                                    <th key={col} style={{
                                        padding: '16px 20px',
                                        color: '#64748b',
                                        fontWeight: '600',
                                        textAlign: col === 'Aksi' || col === 'Jumlah Barang' ? 'center' : 'left',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody style={{ color: '#1e293b' }}>
                            {dummySuppliers.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                                        Belum ada data supplier
                                    </td>
                                </tr>
                            ) : (
                                dummySuppliers.data.map((sup, i) => {
                                    return (
                                        <tr key={sup.id} style={{ borderBottom: i === dummySuppliers.data.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 20px', color: '#64748b' }}>{dummySuppliers.from + i}</td>
                                            <td style={{ padding: '16px 20px', fontWeight: '600' }}>{sup.name}</td>
                                            <td style={{ padding: '16px 20px' }}>{sup.phone || '-'}</td>
                                            <td style={{ padding: '16px 20px' }}>{sup.address || '-'}</td>
                                            <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '700' }}>{sup.items_count || 0}</td>
                                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    <Link
                                                        to={`/suppliers/${sup.id}/edit`}
                                                        style={{
                                                            padding: '6px',
                                                            borderRadius: '6px',
                                                            backgroundColor: '#f1f5f9',
                                                            color: '#64748b',
                                                            transition: 'all 0.2s',
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0ea5e9'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(sup.id)}
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
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    
                    {dummySuppliers.last_page > 1 && (
                        <div style={{
                            padding: '16px 20px',
                            borderTop: '1px solid #f1f5f9',
                            backgroundColor: '#ffffff',
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center', 
                            gap: '8px',
                        }}>
                            {dummySuppliers.links.map((link, i) => (
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
