import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AuthenticatedLayout({ header, children }) {
    // Untuk sementara, buat dummy auth
    const auth = { user: { name: 'Admin', role: 'admin' } };
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navItems = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
            ),
        },
        {
            label: 'Barang',
            href: '/items',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l3 3" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            label: 'Kategori',
            href: '/categories',
            roles: ['admin'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            ),
        },
        {
            label: 'Suplier',
            href: '/suppliers',
            roles: ['admin'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="1" y="10" width="13" height="10" rx="1" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 13h4l3 4v3h-7V13z" />
                    <circle cx="5.5" cy="20.5" r="1.5" />
                    <circle cx="18.5" cy="20.5" r="1.5" />
                </svg>
            ),
        },
        {
            label: 'Barang Masuk',
            href: '/stock-ins',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            ),
        },
        {
            label: 'Barang Keluar',
            href: '/stock-outs',
            roles: ['admin', 'user'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            ),
        },
        {
            label: 'Laporan',
            href: '/reports',
            roles: ['admin'],
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
        },
    ];

    const userRole = auth?.user?.role ?? 'user';
    const filteredNav = navItems.filter(item => item.roles.includes(userRole));
    const currentPath = location.pathname;

    return (
        <div className="min-h-screen flex" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

            {/* Sidebar */}
            <aside
                className="flex flex-col fixed h-full z-20 transition-all duration-300"
                style={{
                    width: sidebarOpen ? '210px' : '60px',
                    backgroundColor: '#0f172a',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                {/* Logo */}
                <div
                    className="flex items-center gap-3"
                    style={{
                        padding: '16px',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    <div
                        className="flex-shrink-0 flex items-center justify-center rounded-lg"
                        style={{ width: '36px', height: '36px', backgroundColor: '#0ea5e9', boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                            <path d="M21 7l-9-4-9 4m18 0l-9 4m9-4v10l-9 4m0-10L3 7m9 4v10M3 7v10l9 4" />
                        </svg>
                    </div>
                    {sidebarOpen && (
                        <div>
                            <p style={{ fontWeight: '800', fontSize: '15px', color: '#ffffff', lineHeight: 1.2, margin: 0, letterSpacing: '0.5px' }}>SIMS</p>
                            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>Smart Inventory</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 overflow-y-auto px-2">
                    {filteredNav.map((item) => {
                        const isActive = currentPath === item.href || (item.href !== '/dashboard' && currentPath.startsWith(item.href));
                        return (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="flex items-center gap-3 rounded-lg mb-1"
                                style={{
                                    padding: '10px 12px',
                                    fontSize: '13px',
                                    color: isActive ? '#ffffff' : '#94a3b8',
                                    fontWeight: isActive ? '600' : '500',
                                    textDecoration: 'none',
                                    backgroundColor: isActive ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { 
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.color = '#ffffff';
                                    }
                                }}
                                onMouseLeave={e => { 
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#94a3b8';
                                    }
                                }}
                            >
                                <span className="flex-shrink-0" style={{ color: isActive ? '#0ea5e9' : 'inherit' }}>{item.icon}</span>
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info */}
                {auth?.user && (
                    <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                        {sidebarOpen ? (
                            <div className="flex items-center gap-3">
                                <div
                                    style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#0ea5e9',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '13px', fontWeight: '700',
                                    }}
                                >
                                    {auth.user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{auth.user.name}</p>
                                    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, textTransform: 'capitalize' }}>{auth.user.role}</p>
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#0ea5e9',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: '700', margin: '0 auto',
                                }}
                            >
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                )}
            </aside>

            {/* Main area */}
            <div
                className="flex-1 flex flex-col transition-all duration-300"
                style={{ marginLeft: sidebarOpen ? '210px' : '60px', backgroundColor: '#f8fafc' }}
            >
                {/* Topbar */}
                <header
                    className="flex items-center justify-between sticky top-0 z-10 px-6"
                    style={{ height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{header}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/profile/edit"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-600 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Profile</span>
                        </Link>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-600 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>

                    {showLogoutModal && (
                        <div style={{ 
                            position: 'fixed', 
                            inset: 0, 
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            zIndex: 1000
                        }}>
                            <div style={{ 
                                backgroundColor: 'white', 
                                padding: '28px', 
                                borderRadius: '16px', 
                                maxWidth: '400px', 
                                width: '90%'
                            }}>
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{ 
                                        width: '64px', 
                                        height: '64px', 
                                        borderRadius: '50%', 
                                        backgroundColor: '#fee2e2', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        margin: '0 auto 16px'
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                                        Konfirmasi Logout
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
                                        Apakah Anda yakin ingin keluar dari akun ini?
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => setShowLogoutModal(false)}
                                        style={{
                                            flex: 1,
                                            padding: '12px 20px',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '10px',
                                            backgroundColor: 'white',
                                            color: '#64748b',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        style={{
                                            flex: 1,
                                            padding: '12px 20px',
                                            border: 'none',
                                            borderRadius: '10px',
                                            backgroundColor: '#dc2626',
                                            color: 'white',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}