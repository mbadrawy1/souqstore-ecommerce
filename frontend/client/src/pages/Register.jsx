import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { t, isRTL } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error(isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'); return; }
    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);
    if (result.success) { toast.success(isRTL ? 'تم إنشاء الحساب بنجاح! 🎉' : 'Account created! 🎉'); navigate('/'); }
    else toast.error(result.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">S</div>
          <h1 className="text-3xl font-bold mb-2">{t('registerTitle')}</h1>
          <p className="text-[#9B9BB8]">{isRTL ? 'أنشئ حسابك وابدأ التسوق' : 'Create your account and start shopping'}</p>
        </div>
        <div className="card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#9B9BB8] mb-1.5">{t('name')}</label>
              <div className="relative"><User size={18} className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-[#6B6B8A]"/><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input !rounded-xl !pr-12 rtl:!pl-12 rtl:!pr-4" required/></div>
            </div>
            <div>
              <label className="block text-sm text-[#9B9BB8] mb-1.5">{t('email')}</label>
              <div className="relative"><Mail size={18} className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-[#6B6B8A]"/><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="input !rounded-xl !pr-12 rtl:!pl-12 rtl:!pr-4" required/></div>
            </div>
            <div>
              <label className="block text-sm text-[#9B9BB8] mb-1.5">{t('password')}</label>
              <div className="relative"><Lock size={18} className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-[#6B6B8A]"/><input type={showPass?'text':'password'} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="input !rounded-xl !pr-20 rtl:!pl-20 rtl:!pr-4" required minLength={6}/><button type="button" onClick={()=>setShowPass(!showPass)} className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-12 text-[#6B6B8A]">{showPass?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>
            </div>
            <div>
              <label className="block text-sm text-[#9B9BB8] mb-1.5">{isRTL?'تأكيد كلمة المرور':'Confirm Password'}</label>
              <div className="relative"><Lock size={18} className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-[#6B6B8A]"/><input type="password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} className="input !rounded-xl !pr-12 rtl:!pl-12 rtl:!pr-4" required minLength={6}/></div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !rounded-xl !py-3.5 justify-center text-lg" id="register-submit">
              {loading?<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:t('register')}
            </button>
          </form>
          <p className="mt-6 text-sm text-[#6B6B8A] text-center">{t('haveAccount')}{' '}<Link to="/login" className="text-[#8B83FF] font-semibold hover:underline">{t('login')}</Link></p>
        </div>
      </div>
    </div>
  );
}
