import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from 'react-router-dom';
import api from '@/services/api';

export default function Index() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadSuppliers = async () => {
        try {
            const response = await api.get('/suppliers');
            setSuppliers(response.data.data || []);
        } catch (error) {
            console.error('Failed to load suppliers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Yakin ingin menghapus supplier ini?')) {
            try {
                await api.delete(`/suppliers/${id}`);
                setSuppliers(suppliers.filter(s => s.id !== id));
            } catch (error) {
                console.error('Failed to delete supplier:', error);
                alert(error.response?.data?.message || 'Gagal menghapus supplier');
            }
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
                            Total {suppliers.length} supplier terdaftar dalam sistem
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
                                {['No', 'Nama Supplier', 'No. Telepon', 'Alamat', 'Aksi'].map((col) => (
                                    <th key={col} style={{
                                        padding: '16px 20px',
                                        color: '#64748b',
                                        fontWeight: '600',
                                        textAlign: col === 'Aksi' ? 'center' : 'left',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody style={{ color: '#1e293b' }}>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                                        Memuat...
                                    </td>
                                </tr>
                            ) : suppliers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>
                                        Belum ada data supplier
                                    </td>
                                </tr>
                            ) : (
                                suppliers.map((sup, i) => (
                                    <tr key={sup.id} style={{ borderBottom: i === suppliers.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>{i + 1}</td>
                                        <td style={{ padding: '16px 20px', fontWeight: '600' }}>{sup.name}</td>
                                        <td style={{ padding: '16px 20px' }}>{sup.phone || '-'}</td>
                                        <td style={{ padding: '16px 20px' }}>{sup.address || '-'}</td>
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
