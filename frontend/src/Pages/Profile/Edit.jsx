import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const dummyAuth = { user: { name: 'Admin', role: 'admin' } };

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout header="Profile" auth={dummyAuth}>
            <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                        Pengaturan Profil
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                        Kelola informasi profil dan keamanan akun Anda.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '24px', 
                        borderRadius: '16px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '24px', 
                        borderRadius: '16px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <UpdatePasswordForm />
                    </div>

                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '24px', 
                        borderRadius: '16px', 
                        border: '1px solid #fee2e2',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
