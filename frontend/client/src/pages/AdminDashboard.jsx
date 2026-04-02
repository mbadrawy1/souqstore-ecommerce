import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, BarChart3, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { demoProducts, demoOrders, demoCategories } from '../utils/demoData';

function AdminSidebar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const links = [
    { to: '/admin', icon: LayoutDashboard, label: t('dashboard'), exact: true },
    { to: '/admin/products', icon: Package, label: t('manageProducts') },
    { to: '/admin/orders', icon: ShoppingCart, label: t('manageOrders') },
    { to: '/admin/users', icon: Users, label: t('manageUsers') },
    { to: '/admin/coupons', icon: Tag, label: t('manageCoupons') },
  ];
  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="card p-2 space-y-1">
        <div className="px-4 py-3 mb-2"><p className="gradient-text font-bold text-lg">{t('admin')}</p></div>
        {links.map(l => {
          const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
          return (<Link key={l.to} to={l.to} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${active ? 'gradient-bg text-white font-semibold' : 'text-[#9B9BB8] hover:bg-[#1A1A3E]'}`}><l.icon size={18}/>{l.label}</Link>);
        })}
      </div>
    </aside>
  );
}

function Overview() {
  const { t, lang, isRTL } = useLanguage();
  const stats = [
    { icon: DollarSign, label: t('totalSales'), value: '45,230 SAR', change: '+12%', color: '#6C63FF' },
    { icon: ShoppingCart, label: t('totalOrders'), value: '356', change: '+8%', color: '#FF6B6B' },
    { icon: Users, label: t('totalUsers'), value: '1,248', change: '+15%', color: '#00D68F' },
    { icon: Package, label: t('totalProducts'), value: '89', change: '+3%', color: '#FFAA00' },
  ];
  const months = isRTL ? ['يناير','فبراير','مارس','أبريل','مايو','يونيو'] : ['Jan','Feb','Mar','Apr','May','Jun'];
  const chartData = [4200, 5800, 4900, 7200, 6500, 8100];
  const maxVal = Math.max(...chartData);
  const statusColors = { delivered: 'text-[#00D68F] bg-[#00D68F]/10', shipped: 'text-[#0095FF] bg-[#0095FF]/10', processing: 'text-[#FFAA00] bg-[#FFAA00]/10' };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s,i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background:`${s.color}15`}}><s.icon size={22} style={{color:s.color}}/></div>
              <span className="text-xs font-semibold text-[#00D68F] bg-[#00D68F]/10 px-2 py-1 rounded-full">{s.change}</span>
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-[#6B6B8A] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card p-6">
        <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-[#6C63FF]"/>{t('salesChart')}</h3>
        <div className="flex items-end gap-3 h-48">
          {chartData.map((val,i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-[#6B6B8A]">{(val/1000).toFixed(1)}K</span>
              <div className="w-full rounded-t-lg gradient-bg transition-all hover:opacity-80" style={{height:`${(val/maxVal)*100}%`}}/>
              <span className="text-xs text-[#6B6B8A]">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <h3 className="font-bold mb-4">{t('recentOrders')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-[#6B6B8A] border-b border-[#2A2A5A]">
              <th className="py-3 text-start">#</th><th className="py-3 text-start">{isRTL?'المنتجات':'Products'}</th>
              <th className="py-3 text-start">{t('total')}</th><th className="py-3 text-start">{t('status')}</th>
            </tr></thead>
            <tbody>
              {demoOrders.map(o => (
                <tr key={o._id} className="border-b border-[#2A2A5A]/50 hover:bg-[#1A1A3E]/50">
                  <td className="py-3 font-semibold">{o._id}</td>
                  <td className="py-3"><div className="flex -space-x-2 rtl:space-x-reverse">{o.items.slice(0,3).map((item,i) => <img key={i} src={item.image} className="w-8 h-8 rounded-full border-2 border-[#1A1A3E] object-cover"/>)}</div></td>
                  <td className="py-3 font-bold text-[#6C63FF]">{o.totalPrice.toFixed(0)} {t('sar')}</td>
                  <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[o.status]||''}`}>{t(o.status)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminProducts() {
  const { t, lang } = useLanguage();
  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{t('manageProducts')}</h2><button className="btn-primary !rounded-xl !py-2 !text-sm">+ {lang==='ar'?'إضافة منتج':'Add Product'}</button></div>
      <div className="card overflow-hidden"><table className="w-full text-sm">
        <thead><tr className="bg-[#12122A] text-[#6B6B8A]"><th className="py-3 px-4 text-start">{lang==='ar'?'المنتج':'Product'}</th><th className="py-3 px-4 text-start">{lang==='ar'?'السعر':'Price'}</th><th className="py-3 px-4 text-start">{lang==='ar'?'المخزون':'Stock'}</th><th className="py-3 px-4 text-start">{lang==='ar'?'إجراءات':'Actions'}</th></tr></thead>
        <tbody>{demoProducts.map(p=>(
          <tr key={p._id} className="border-b border-[#2A2A5A]/50 hover:bg-[#1A1A3E]/30">
            <td className="py-3 px-4"><div className="flex items-center gap-3"><img src={p.thumbnail} className="w-10 h-10 rounded-lg object-cover"/><span className="font-semibold">{p.name[lang]}</span></div></td>
            <td className="py-3 px-4 text-[#6C63FF] font-bold">{p.priceAfterDiscount||p.price} {t('sar')}</td>
            <td className="py-3 px-4"><span className={`${p.stock>20?'text-[#00D68F]':'text-[#FFAA00]'}`}>{p.stock}</span></td>
            <td className="py-3 px-4"><button className="text-[#8B83FF] hover:underline text-xs">{t('edit')}</button> <button className="text-[#FF6B6B] hover:underline text-xs mr-2 rtl:ml-2 rtl:mr-0">{t('delete')}</button></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

function AdminOrders() {
  const { t, lang, isRTL } = useLanguage();
  const statusColors = { delivered: 'text-[#00D68F] bg-[#00D68F]/10', shipped: 'text-[#0095FF] bg-[#0095FF]/10', processing: 'text-[#FFAA00] bg-[#FFAA00]/10' };
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">{t('manageOrders')}</h2>
      <div className="space-y-3">{demoOrders.map(o=>(
        <div key={o._id} className="card p-4 flex items-center justify-between">
          <div><p className="font-semibold">#{o._id}</p><p className="text-xs text-[#6B6B8A]">{o.createdAt}</p></div>
          <div className="flex items-center gap-3"><span className="font-bold text-[#6C63FF]">{o.totalPrice.toFixed(0)} {t('sar')}</span>
          <select defaultValue={o.status} className="input !rounded-lg !py-1.5 !px-3 !w-auto !text-xs">
            <option value="pending">{t('pending')}</option><option value="processing">{t('processing')}</option>
            <option value="shipped">{t('shipped')}</option><option value="delivered">{t('delivered')}</option>
          </select></div>
        </div>
      ))}</div>
    </div>
  );
}

function AdminUsers() {
  const { t, isRTL } = useLanguage();
  const users = [{name:'محمد المدير',email:'admin@souqstore.com',role:'admin'},{name:'أحمد محمود',email:'ahmed@test.com',role:'user'},{name:'فاطمة خالد',email:'fatima@test.com',role:'user'},{name:'عمر سعيد',email:'omar@test.com',role:'user'}];
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">{t('manageUsers')}</h2>
      <div className="card overflow-hidden"><table className="w-full text-sm">
        <thead><tr className="bg-[#12122A] text-[#6B6B8A]"><th className="py-3 px-4 text-start">{t('name')}</th><th className="py-3 px-4 text-start">{t('email')}</th><th className="py-3 px-4 text-start">Role</th></tr></thead>
        <tbody>{users.map((u,i)=>(
          <tr key={i} className="border-b border-[#2A2A5A]/50"><td className="py-3 px-4 font-semibold">{u.name}</td><td className="py-3 px-4 text-[#6B6B8A]">{u.email}</td><td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${u.role==='admin'?'bg-[#6C63FF]/20 text-[#8B83FF]':'bg-[#2A2A5A] text-[#9B9BB8]'}`}>{u.role}</span></td></tr>
        ))}</tbody>
      </table></div>
    </div>
  );
}

function AdminCoupons() {
  const { t, isRTL } = useLanguage();
  const coupons = [{code:'WELCOME20',type:'percent',discount:20,expires:'2027-12-31',uses:45},{code:'SAVE50',type:'fixed',discount:50,expires:'2027-06-30',uses:12},{code:'VIP30',type:'percent',discount:30,expires:'2027-03-31',uses:5}];
  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">{t('manageCoupons')}</h2><button className="btn-primary !rounded-xl !py-2 !text-sm">+ {isRTL?'كوبون جديد':'New Coupon'}</button></div>
      <div className="grid gap-4">{coupons.map(c=>(
        <div key={c.code} className="card p-5 flex items-center justify-between">
          <div><p className="font-bold text-lg gradient-text">{c.code}</p><p className="text-xs text-[#6B6B8A]">{isRTL?'ينتهي':'Expires'}: {c.expires}</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-[#6C63FF]">{c.discount}{c.type==='percent'?'%':' SAR'}</p><p className="text-xs text-[#6B6B8A]">{c.uses} {isRTL?'استخدام':'uses'}</p></div>
        </div>
      ))}</div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar/>
        <div className="flex-1">
          <Routes>
            <Route index element={<Overview/>}/>
            <Route path="products" element={<AdminProducts/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
            <Route path="users" element={<AdminUsers/>}/>
            <Route path="coupons" element={<AdminCoupons/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
