import { Link } from 'react-router-dom';

export default function Welcome() {
    // Untuk sementara, anggap tidak ada user yang login
    const auth = { user: null };
    
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>

            {/* ── HEADER ─────────────────────────────────────────────── */}
            <header
                style={{
                    background: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 32px',
                    height: '64px',
                    position: 'relative',
                    zIndex: 10,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: '#0ea5e9',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)',
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M21 7l-9-4-9 4m18 0l-9 4m9-4v10l-9 4m0-10L3 7m9 4v10M3 7v10l9 4" />
                        </svg>
                    </div>
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '18px', letterSpacing: '1px' }}>SIMS</span>
                </div>

                {/* Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {auth.user ? (
                        <Link
                            to="/dashboard"
                            style={{ color: 'white', fontSize: '14px', fontWeight: 500, textDecoration: 'none', padding: '8px 20px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)' }}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                style={{ color: 'white', fontSize: '14px', fontWeight: 500, textDecoration: 'none', padding: '8px 16px' }}
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                style={{
                                    color: 'white',
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                    padding: '8px 24px',
                                    background: '#0ea5e9',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                                }}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            {/* ── HERO ───────────────────────────────────────────────── */}
            <section
                style={{
                    flex: 1,
                    position: 'relative',
                    minHeight: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                }}
            >
                {/* Abstract background elements */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
                
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', padding: '0 24px' }}>
                    <h1 style={{ color: 'white', fontSize: '56px', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
                        Kelola Inventaris <span style={{ color: '#0ea5e9' }}>Lebih Cerdas</span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                        Sistem Manajemen Inventaris yang modern, efisien, dan mudah digunakan untuk mengoptimalkan operasional bisnis Anda.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link
                            to="/register"
                            style={{
                                background: '#0ea5e9',
                                color: 'white',
                                padding: '14px 32px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '16px',
                                textDecoration: 'none',
                                boxShadow: '0 10px 25px rgba(14, 165, 233, 0.4)',
                            }}
                        >
                            Mulai Sekarang
                        </Link>
                        <a
                            href="#features"
                            style={{
                                border: '1.5px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                padding: '14px 32px',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '16px',
                                textDecoration: 'none',
                            }}
                        >
                            Pelajari Lebih Lanjut
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FOOTER TOP ─────────────────────────────────────────── */}
            <footer style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px 48px' }}>

                    {/* Logo row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px' }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#0ea5e9',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M21 7l-9-4-9 4m18 0l-9 4m9-4v10l-9 4m0-10L3 7m9 4v10M3 7v10l9 4" />
                            </svg>
                        </div>
                        <div style={{ color: 'white', fontSize: '24px', fontWeight: 800 }}>
                            SIMS
                        </div>
                    </div>

                    {/* 4-column grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '32px' }}>

                        {/* About Us */}
                        <div>
                            <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>About Us</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.75, marginBottom: '22px', marginTop: 0 }}>
                                A Smart Inventory Management System is a digital system that helps businesses manage and monitor inventory automatically and in real time. This system reduces manual record-keeping by leveraging modern technology.
                            </p>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                                    </svg>
                                </a>
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'flex' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>Company</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['About Us', 'Service', 'Community', 'Testimonial'].map((item) => (
                                    <li key={item}>
                                        <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>Support</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Help Center', 'Tweet @ Us', 'Contact', 'Feedback'].map((item) => (
                                    <li key={item}>
                                        <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '14px', marginTop: 0 }}>Contact</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.82 19.79 19.79 0 01.5 2.18 2 2 0 012.47 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                                    </svg>
                                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>(021) 5088-9100</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>simsbusiness@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── FOOTER BOTTOM ─────────────────────────────────────── */}
                <div style={{ background: '#0f1f2a', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <div
                        style={{
                            maxWidth: '1100px',
                            margin: '0 auto',
                            padding: '16px 32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                            © Copyright by SIMS Company
                        </span>
                        <div style={{ display: 'flex', gap: '28px' }}>
                            {['Privacy Policy', 'Terms Of Use', 'Legal', 'Site Map'].map((item) => (
                                <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', textDecoration: 'none' }}>
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}