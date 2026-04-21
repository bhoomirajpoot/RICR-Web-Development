import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import AdminDashboard from './pages/AdminDashboard';
import ManageQuestions from './pages/ManageQuestions';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-slate-950 font-body transition-colors duration-200">
          <Navbar />

          <Routes>
            {/* Public */}
            <Route path="/" element={<Navigate to="/quiz" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected – any authenticated user */}
            <Route path="/quiz" element={
              <ProtectedRoute><Quiz /></ProtectedRoute>
            } />
            <Route path="/result" element={
              <ProtectedRoute><Result /></ProtectedRoute>
            } />

            {/* Protected – admin only */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/admin/questions" element={
              <ProtectedRoute requireAdmin><ManageQuestions /></ProtectedRoute>
            } />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '12px',
                background: '#1e293b',
                color: '#f1f5f9',
                fontSize: '14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
