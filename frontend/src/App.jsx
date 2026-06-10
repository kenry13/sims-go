import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './Pages/Welcome';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ResetPassword from './Pages/Auth/ResetPassword';
import VerifyEmail from './Pages/Auth/VerifyEmail';
import ConfirmPassword from './Pages/Auth/ConfirmPassword';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import CategoriesIndex from './Pages/Categories/Index';
import CategoriesCreate from './Pages/Categories/Create';
import CategoriesEdit from './Pages/Categories/Edit';
import ItemsIndex from './Pages/Items/Index';
import ItemsCreate from './Pages/Items/Create';
import ItemsEdit from './Pages/Items/Edit';
import SuppliersIndex from './Pages/Suppliers/Index';
import SuppliersCreate from './Pages/Suppliers/Create';
import SuppliersEdit from './Pages/Suppliers/Edit';
import StockInsIndex from './Pages/StockIns/Index';
import StockInsCreate from './Pages/StockIns/Create';
import StockOutsIndex from './Pages/StockOuts/Index';
import StockOutsCreate from './Pages/StockOuts/Create';
import ReportsIndex from './Pages/Reports/Index';
import ProfileEdit from './Pages/Profile/Edit';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/confirm-password" element={<ConfirmPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<CategoriesIndex />} />
                <Route path="/categories/create" element={<CategoriesCreate />} />
                <Route path="/categories/:id/edit" element={<CategoriesEdit />} />
                <Route path="/items" element={<ItemsIndex />} />
                <Route path="/items/create" element={<ItemsCreate />} />
                <Route path="/items/:id/edit" element={<ItemsEdit />} />
                <Route path="/suppliers" element={<SuppliersIndex />} />
                <Route path="/suppliers/create" element={<SuppliersCreate />} />
                <Route path="/suppliers/:id/edit" element={<SuppliersEdit />} />
                <Route path="/stock-ins" element={<StockInsIndex />} />
                <Route path="/stock-ins/create" element={<StockInsCreate />} />
                <Route path="/stock-outs" element={<StockOutsIndex />} />
                <Route path="/stock-outs/create" element={<StockOutsCreate />} />
                <Route path="/reports" element={<ReportsIndex />} />
                <Route path="/profile" element={<ProfileEdit />} />
            </Routes>
        </Router>
    );
}

export default App;
