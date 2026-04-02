import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Search, Globe, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { t, lang, toggleLang, isRTL } = useLanguage();
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="glass-strong sticky top-0 z-50 border-b border-[#2A2A5A]/50">
        {/* Top Bar - Promo */}
        <div className="gradient-bg text-center py-1.5 text-sm font-semibold text-white">
          {isRTL ? '🎉 خصم 20% على أول طلب — استخدم كود WELCOME20' : '🎉 20% OFF your first order — Use code WELCOME20'}
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0" id="nav-logo">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>
              <span className="text-xl font-bold">
                <span className="gradient-text">{isRTL ? 'سوق' : 'Souq'}</span>
                <span className="text-[#E8E8F0]">{isRTL ? 'ستور' : 'Store'}</span>
              </span>
            </Link>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search')}
                  className="input !rounded-full !py-2.5 !px-5 !pr-12 w-full"
                  id="nav-search-input"
                />
                <button type="submit" className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 text-[#6B6B8A] hover:text-[#6C63FF] transition-colors" id="nav-search-btn">
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-1">
              {/* Language Toggle */}
              <button onClick={toggleLang} className="p-2.5 rounded-xl hover:bg-[#1A1A3E] transition-colors text-[#9B9BB8] hover:text-[#6C63FF]" title={lang === 'ar' ? 'English' : 'العربية'} id="lang-toggle">
                <Globe size={20} />
              </button>

              {/* Wishlist */}
              <Link to="/account/wishlist" className="p-2.5 rounded-xl hover:bg-[#1A1A3E] transition-colors text-[#9B9BB8] hover:text-[#FF6B6B]" id="nav-wishlist">
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-[#1A1A3E] transition-colors text-[#9B9BB8] hover:text-[#6C63FF]" id="nav-cart">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 gradient-bg rounded-full text-[11px] font-bold text-white flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#1A1A3E] transition-colors" id="user-menu-btn">
                    <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name?.charAt(0)}
                    </div>
                    <ChevronDown size={14} className={`text-[#9B9BB8] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute top-full mt-2 left-0 rtl:left-auto rtl:right-0 w-52 glass-strong rounded-xl border border-[#2A2A5A] py-2 shadow-2xl animate-fade-in z-50" id="user-dropdown">
                      <div className="px-4 py-2 border-b border-[#2A2A5A]">
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-[#6B6B8A]">{user.email}</p>
                      </div>
                      <Link to="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1A1A3E] transition-colors text-sm">
                        <User size={16} /> {t('profile')}
                      </Link>
                      <Link to="/account/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1A1A3E] transition-colors text-sm">
                        <ShoppingCart size={16} /> {t('orders')}
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1A1A3E] transition-colors text-sm text-[#6C63FF]">
                          <LayoutDashboard size={16} /> {t('admin')}
                        </Link>
                      )}
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1A1A3E] transition-colors text-sm text-[#FF6B6B] w-full" id="logout-btn">
                        <LogOut size={16} /> {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn-primary !py-2 !px-5 !text-sm !rounded-full" id="nav-login-btn">
                  {t('login')}
                </Link>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-1">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-[#9B9BB8]">
                <Search size={20} />
              </button>
              <Link to="/cart" className="relative p-2 text-[#9B9BB8]">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 gradient-bg rounded-full text-[10px] font-bold text-white flex items-center justify-center">{itemCount}</span>
                )}
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-[#9B9BB8]" id="mobile-menu-btn">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="md:hidden pb-3 animate-slide-up">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('search')} className="input !rounded-full !py-2.5" autoFocus />
            </form>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass-strong border-t border-[#2A2A5A] animate-slide-up" id="mobile-menu">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-[#1A1A3E] transition-colors">{t('home')}</Link>
              <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-[#1A1A3E] transition-colors">{t('products')}</Link>
              <Link to="/account/wishlist" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-[#1A1A3E] transition-colors">{t('wishlist')}</Link>
              <button onClick={() => { toggleLang(); setMobileOpen(false); }} className="w-full text-start py-3 px-4 rounded-xl hover:bg-[#1A1A3E] transition-colors flex items-center gap-2">
                <Globe size={18} /> {lang === 'ar' ? 'English' : 'العربية'}
              </button>
              <div className="border-t border-[#2A2A5A] pt-2 mt-2">
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-[#1A1A3E]">{t('profile')}</Link>
                    {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-[#1A1A3E] text-[#6C63FF]">{t('admin')}</Link>}
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-start py-3 px-4 rounded-xl hover:bg-[#1A1A3E] text-[#FF6B6B]">{t('logout')}</button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center btn-primary !rounded-full">{t('login')}</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close user menu */}
      {userMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />}
    </>
  );
}
