import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { t, isRTL } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) { toast.success(isRTL ? 'مرحباً بعودتك! 🎉' : 'Welcome back! 🎉'); navigate('/'); }
    else toast.error(result.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">S</div>
          <h1 className="text-3xl font-bold mb-2">{t('loginTitle')}</h1>
          <p className="text-[#9B9BB8]">{isRTL ? 'سجل دخولك للوصول لحسابك' : 'Sign in to access your account'}</p>
        </div>
        <div className="card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#9B9BB8] mb-1.5">{t('email')}</label>
              <div className="relative">
                <Mail size={18} className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-[#6B6B8A]" />
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@souqstore.com" className="input !rounded-xl !pr-12 rtl:!pl-12 rtl:!pr-4" required id="login-email"/>
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#9B9BB8] mb-1.5">{t('password')}</label>
              <div className="relative">
                <Lock size={18} className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-[#6B6B8A]" />
                <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="admin123" className="input !rounded-xl !pr-20 rtl:!pl-20 rtl:!pr-4" required id="login-password"/>
                <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-12 text-[#6B6B8A]">{showPass?<EyeOff size={18}/>:<Eye size={18}/>}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !rounded-xl !py-3.5 justify-center text-lg" id="login-submit">
              {loading?<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:t('login')}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#6B6B8A]">
              {t('noAccount')}{' '}
              <Link to="/register" className="text-[#8B83FF] font-semibold hover:underline">{t('register')}</Link>
            </p>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-[#12122A] border border-[#2A2A5A]">
            <p className="text-xs text-[#6B6B8A] text-center mb-2">{isRTL ? '🔑 حسابات تجريبية:' : '🔑 Demo accounts:'}</p>
            <p className="text-xs text-[#9B9BB8] text-center">Admin: admin@souqstore.com / admin123</p>
            <p className="text-xs text-[#9B9BB8] text-center">User: ahmed@test.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
