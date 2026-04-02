import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { demoProducts, demoOrders } from '../utils/demoData';
import ProductCard from '../components/ProductCard';

function Sidebar() {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const links = [
    { to: '/account', icon: User, label: t('profile'), exact: true },
    { to: '/account/orders', icon: ShoppingBag, label: t('orders') },
    { to: '/account/wishlist', icon: Heart, label: t('wishlist') },
  ];
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="card p-6 mb-4 text-center">
        <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold mb-3">{user?.name?.charAt(0)||'U'}</div>
        <h3 className="font-bold">{user?.name||'User'}</h3>
        <p className="text-xs text-[#6B6B8A]">{user?.email}</p>
      </div>
      <nav className="card p-2 space-y-1">
        {links.map(l => {
          const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
          return (<Link key={l.to} to={l.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${active ? 'gradient-bg-subtle text-[#8B83FF] font-semibold' : 'text-[#9B9BB8] hover:bg-[#1A1A3E]'}`}><l.icon size={18}/>{l.label}</Link>);
        })}
      </nav>
    </aside>
  );
}

function Profile() {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-6">{t('profile')}</h2>
      <div className="space-y-4">
        <div><label className="text-sm text-[#6B6B8A]">{t('name')}</label><input defaultValue={user?.name} className="input !rounded-xl mt-1"/></div>
        <div><label className="text-sm text-[#6B6B8A]">{t('email')}</label><input defaultValue={user?.email} className="input !rounded-xl mt-1"/></div>
        <div><label className="text-sm text-[#6B6B8A]">{t('phone')}</label><input defaultValue="+966501234567" className="input !rounded-xl mt-1" dir="ltr"/></div>
        <button className="btn-primary !rounded-xl">{t('save')}</button>
      </div>
    </div>
  );
}

function Orders() {
  const { t, lang, isRTL } = useLanguage();
  const statusColors = { delivered: 'text-[#00D68F] bg-[#00D68F]/10', shipped: 'text-[#0095FF] bg-[#0095FF]/10', processing: 'text-[#FFAA00] bg-[#FFAA00]/10', pending: 'text-[#9B9BB8] bg-[#9B9BB8]/10', cancelled: 'text-[#FF3D71] bg-[#FF3D71]/10' };
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">{t('orders')}</h2>
      <div className="space-y-4">
        {demoOrders.map(order => (
          <div key={order._id} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div><p className="font-semibold text-sm">#{order._id}</p><p className="text-xs text-[#6B6B8A]">{order.createdAt}</p></div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>{t(order.status)}</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              {order.items.map((item,i) => (<img key={i} src={item.image} className="w-12 h-12 rounded-lg object-cover border border-[#2A2A5A]"/>))}
              <span className="text-sm text-[#9B9BB8]">{order.items.length} {isRTL?'منتج':'items'}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#2A2A5A]">
              <span className="text-sm text-[#6B6B8A]">{t('total')}</span>
              <span className="font-bold text-[#6C63FF]">{order.totalPrice.toFixed(2)} {t('sar')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Wishlist() {
  const { t, lang } = useLanguage();
  const wishlistProducts = demoProducts.slice(0, 4);
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">{t('wishlist')} ({wishlistProducts.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {wishlistProducts.map(p => <ProductCard key={p._id} product={p}/>)}
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar/>
        <div className="flex-1">
          <Routes>
            <Route index element={<Profile/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="wishlist" element={<Wishlist/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
