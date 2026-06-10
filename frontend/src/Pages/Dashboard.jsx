import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Dummy data
const dummyAuth = { user: { name: 'Admin', role: 'admin' } };
const dummyStats = {
    totalItems: 124,
    totalStockIn: 45,
    totalStockOut: 23,
    lowStockItems: 8
};
const dummyRecentActivity = [
    { type: 'in', item: 'Laptop ASUS ROG', quantity: 2, user: 'Admin', date: '2 jam lalu' },
    { type: 'out', item: 'Mouse Logitech', quantity: 5, user: 'User', date: '3 jam lalu' },
    { type: 'in', item: 'Keyboard Mechanical', quantity: 10, user: 'Admin', date: '5 jam lalu' },
];

export default function Dashboard() {
    return (
        <AuthenticatedLayout header="Dashboard" auth={dummyAuth}>
            <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                        Ringkasan Inventaris
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                        Selamat datang kembali, {dummyAuth.user.name}. Berikut adalah status gudang Anda saat ini.
                    </p>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '24px',
                        marginBottom: '32px',
                    }}
                >
                    <StatCard label="Total Barang" value={dummyStats.totalItems} icon={<IconBox />} color="#0ea5e9" />
                    <StatCard label="Barang Masuk" value={dummyStats.totalStockIn} icon={<IconArrowIn />} color="#10b981" />
                    <StatCard label="Barang Keluar" value={dummyStats.totalStockOut} icon={<IconArrowOut />} color="#6366f1" />
                    <StatCard label="Stok Menipis" value={dummyStats.lowStockItems} icon={<IconWarning />} color="#f59e0b" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '24px', 
                        borderRadius: '16px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Pergerakan Stok 7 Hari Terakhir</h3>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '300px', 
                            color: '#94a3b8' 
                        }}>
                            <p>Grafik akan ditampilkan ketika API terhubung</p>
                        </div>
                    </div>

                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '24px', 
                        borderRadius: '16px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Aktivitas Terbaru</h3>
                        {dummyRecentActivity && dummyRecentActivity.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {dummyRecentActivity.map((activity, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ 
                                            width: '36px', 
                                            height: '36px', 
                                            borderRadius: '8px', 
                                            backgroundColor: activity.type === 'in' ? '#d1fae5' : '#e0e7ff', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            color: activity.type === 'in' ? '#059669' : '#4f46e5'
                                        }}>
                                            {activity.type === 'in' ? <IconArrowInSmall /> : <IconArrowOutSmall />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                                                {activity.item}
                                            </p>
                                            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                                                {activity.type === 'in' ? '+' : '-'}{activity.quantity} • {activity.user}
                                            </p>
                                            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                                                {activity.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p style={{fontSize: '14px'}}>Belum ada aktivitas terbaru</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div
            style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '12px', 
                backgroundColor: `${color}15`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: color
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>{label}</p>
                <p style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', lineHeight: 1 }}>{value}</p>
            </div>
        </div>
    );
}

function IconBox() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    );
}

function IconArrowIn() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
    );
}

function IconArrowOut() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );
}

function IconWarning() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
    );
}

function IconArrowInSmall() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
    );
}

function IconArrowOutSmall() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );
}
