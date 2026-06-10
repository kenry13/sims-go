import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from 'react-router-dom';

export default function Guest({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
            style={{ backgroundColor: '#f0f4f7' }}
        >
            <div>
                <Link to="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div
                className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white overflow-hidden sm:rounded-lg"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
                {children}
            </div>
        </div>
    );
}