import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    return (
        <AuthenticatedLayout header="Data Kategori">
            <div style={{ padding: '24px' }}>
                <h1>Categories Page</h1>
            </div>
        </AuthenticatedLayout>
    );
}
