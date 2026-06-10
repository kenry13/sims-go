import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';

// Dummy data
const dummyAuth = { user: { name: 'Admin', role: 'admin' } };
const dummyItems = {
    data: [
        { id: 1, code: 'BRG001', name: 'Laptop ASUS ROG', category: { name: 'Elektronik' }, supplier: { name: 'Tech Supplier' }, stock: 50, unit: 'pcs', min_stock: 10 },
        { id: 2, code: 'BRG002', name: 'Mouse Logitech G502', category: { name: 'Elektronik' }, supplier: { name: 'Tech Supplier' }, stock: 5, unit: 'pcs', min_stock: 10 },
    ],
    total: 2,
    from: 1,
    last_page: 1,
    links: [
        { label: '&laquo; Previous', url: null, active: false },
        { label: '1', url: '/items?page=1', active: true },
        { label: 'Next &raquo;', url: null, active: false },
    ]
};

export default function Index() {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus barang ini?')) {
            // TODO: Connect to API later
            console.log('Deleting item', id);
        }
    };

    return (
        <AuthenticatedLayout header="Data Barang">
            <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
                {/* Header Action Section */}
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
                        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Daftar Barang</h2>
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                            Total {dummyItems.total} barang terdaftar dalam sistem
                        </p>
                    </div>
                    <Link
                        to="/items/create"
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
                        Tambah Barang
                    </Link>
                </div>

                {/* Table Section */}
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
                                {['Kode', 'Nama Barang', 'Kategori', 'Supplier', 'Stok', 'Satuan', 'Status', 'Aksi'].map((col) => (
                                    <th key={col} style={{
                                        padding: '16px 20px',
                                        color: '#64748b',
                                        fontWeight: '600',
                                        textAlign: col === 'Aksi' || col === 'Status' ? 'center' : 'left',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody style={{ color: '#1e293b' }}>
                            {dummyItems.data.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                                        Belum ada data barang
                                    </td>
                                </tr>
                            ) : (
                                dummyItems.data.map((item, i) => {
                                    const isLow = item.stock <= item.min_stock;
                                    return (
                                        <tr key={item.id} style={{ borderBottom: i === dummyItems.data.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 20px', fontWeight: '600', color: '#0ea5e9' }}>{item.code}</td>
                                            <td style={{ padding: '16px 20px', fontWeight: '500' }}>{item.name}</td>
                                            <td style={{ padding: '16px 20px' }}>{item.category?.name}</td>
                                            <td style={{ padding: '16px 20px' }}>{item.supplier?.name}</td>
                                            <td style={{ padding: '16px 20px', fontWeight: '700' }}>{item.stock}</td>
                                            <td style={{ padding: '16px 20px' }}>{item.unit}</td>
                                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '999px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    backgroundColor: isLow ? '#fef2f2' : '#f0fdf4',
                                                    color: isLow ? '#ef4444' : '#22c55e',
                                                    border: `1px solid ${isLow ? '#fee2e2' : '#dcfce7'}`,
                                                }}>
                                                    {isLow ? 'Stok Rendah' : 'Tersedia'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    <Link
                                                        to={`/items/${item.id}/edit`}
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
                                                        onClick={() => handleDelete(item.id)}
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
