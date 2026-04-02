import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Footer() {
  const { t, lang, isRTL } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success(isRTL ? 'تم الاشتراك بنجاح! 📧' : 'Subscribed successfully! 📧');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0A14] border-t border-[#2A2A5A]/50 mt-20">
      {/* Newsletter Section */}
      <div className="gradient-bg-subtle border-b border-[#2A2A5A]/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">{t('newsletter')}</h3>
              <p className="text-[#9B9BB8]">{t('newsletterText')}</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email')}
                className="input !rounded-full flex-1 md:w-72"
                required
                id="newsletter-email"
              />
              <button type="submit" className="btn-primary !rounded-full !px-6" id="newsletter-submit">
                <Send size={18} />
                <span className="hidden sm:inline">{t('subscribe')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>
              <span className="text-xl font-bold">
                <span className="gradient-text">{isRTL ? 'سوق' : 'Souq'}</span>
                <span>{isRTL ? 'ستور' : 'Store'}</span>
              </span>
            </Link>
            <p className="text-[#9B9BB8] text-sm leading-relaxed mb-4">{t('aboutText')}</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-[#1A1A3E] border border-[#2A2A5A] flex items-center justify-center text-[#9B9BB8] hover:text-[#6C63FF] hover:border-[#6C63FF] transition-all hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('quickLinks')}</h4>
            <div className="space-y-3">
              {[
                { to: '/', label: t('home') },
                { to: '/products', label: t('products') },
                { to: '/cart', label: t('cart') },
                { to: '/account', label: t('profile') },
                { to: '/account/orders', label: t('orders') }
              ].map((link, i) => (
                <Link key={i} to={link.to} className="block text-[#9B9BB8] hover:text-[#8B83FF] transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('categories')}</h4>
            <div className="space-y-3">
              {[
                { label: isRTL ? 'إلكترونيات' : 'Electronics', icon: '📱' },
                { label: isRTL ? 'أزياء رجالية' : 'Men Fashion', icon: '👔' },
                { label: isRTL ? 'أزياء نسائية' : 'Women Fashion', icon: '👗' },
                { label: isRTL ? 'المنزل والمطبخ' : 'Home & Kitchen', icon: '🏠' },
                { label: isRTL ? 'الجمال والعناية' : 'Beauty & Care', icon: '💄' }
              ].map((cat, i) => (
                <Link key={i} to={`/products?category=${cat.label}`} className="flex items-center gap-2 text-[#9B9BB8] hover:text-[#8B83FF] transition-colors text-sm">
                  <span>{cat.icon}</span> {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('contactUs')}</h4>
            <div className="space-y-4">
              <a href="mailto:info@souqstore.com" className="flex items-center gap-3 text-[#9B9BB8] hover:text-[#8B83FF] transition-colors text-sm">
                <Mail size={18} className="text-[#6C63FF] shrink-0" /> info@souqstore.com
              </a>
              <a href="tel:+966501234567" className="flex items-center gap-3 text-[#9B9BB8] hover:text-[#8B83FF] transition-colors text-sm" dir="ltr">
                <Phone size={18} className="text-[#6C63FF] shrink-0" /> +966 50 123 4567
              </a>
              <div className="flex items-start gap-3 text-[#9B9BB8] text-sm">
                <MapPin size={18} className="text-[#6C63FF] shrink-0 mt-0.5" />
                <span>{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-sm text-[#6B6B8A] mb-2">{isRTL ? 'طرق الدفع' : 'Payment Methods'}</p>
              <div className="flex gap-2">
                {['💳', '🏦', '📱', '💵'].map((icon, i) => (
                  <div key={i} className="w-12 h-8 bg-[#1A1A3E] border border-[#2A2A5A] rounded-lg flex items-center justify-center text-lg">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A2A5A]/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[#6B6B8A]">
          <p>© 2024 SouqStore. {t('allRights')}.</p>
          <p className="flex items-center gap-1">
            {isRTL ? 'صُنع بـ' : 'Made with'} <span className="text-[#FF6B6B]">❤</span> {isRTL ? 'محمد بدراوي' : 'Mohamed Badrawy'}
          </p>
        </div>
      </div>
    </footer>
  );
}
