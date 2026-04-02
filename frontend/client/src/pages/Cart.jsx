import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Cart() {
  const { t, lang, isRTL } = useLanguage();
  const { items, removeFromCart, updateQuantity, subtotal, shippingCost, tax, discount, total, itemCount, coupon, setCoupon, getPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const Arrow = isRTL ? ArrowRight : ArrowLeft;

  const handleCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'WELCOME20') {
      setCoupon({ code: 'WELCOME20', type: 'percent', discount: 20 });
      toast.success(isRTL ? 'تم تطبيق الكوبون! 🎉' : 'Coupon applied! 🎉');
    } else if (couponCode.toUpperCase() === 'SAVE50') {
      setCoupon({ code: 'SAVE50', type: 'fixed', discount: 50 });
      toast.success(isRTL ? 'تم تطبيق الكوبون! 🎉' : 'Coupon applied! 🎉');
    } else {
      toast.error(isRTL ? 'كود خاطئ' : 'Invalid code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <p className="text-8xl mb-6">🛒</p>
          <h2 className="text-2xl font-bold mb-3">{t('cartEmpty')}</h2>
          <p className="text-[#6B6B8A] mb-8">{isRTL ? 'لم تضف أي منتجات للسلة بعد' : "You haven't added any products yet"}</p>
          <Link to="/products" className="btn-primary !rounded-full inline-flex">
            <ShoppingBag size={20} />
            {t('shopNow')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('cart')} ({itemCount})</h1>
        <Link to="/products" className="btn-secondary !rounded-full !py-2 !px-4 !text-sm">
          <Arrow size={16} /> {t('continueShopping')}
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item._id} className="card p-4 flex gap-4 items-start" id={`cart-item-${item._id}`}>
              <Link to={`/products/${item._id}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#12122A] shrink-0">
                <img src={item.thumbnail || item.images?.[0]} alt={item.name[lang]} className="w-full h-full object-cover hover:scale-110 transition-transform" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item._id}`} className="font-semibold hover:text-[#8B83FF] transition-colors line-clamp-2">{item.name[lang]}</Link>
                <p className="text-sm text-[#6B6B8A] mt-1">{item.brand?.[lang] || ''}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center glass rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-[#1A1A3E] transition-colors"><Minus size={14} /></button>
                    <span className="px-4 py-1.5 font-semibold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-[#1A1A3E] transition-colors"><Plus size={14} /></button>
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="font-bold text-[#6C63FF]">{(getPrice(item) * item.quantity).toFixed(2)} {t('sar')}</p>
                    {item.priceAfterDiscount > 0 && item.priceAfterDiscount < item.price && (
                      <p className="text-xs text-[#6B6B8A] line-through">{(item.price * item.quantity).toFixed(2)} {t('sar')}</p>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="p-2 text-[#6B6B8A] hover:text-[#FF6B6B] transition-colors shrink-0">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-6">{t('orderSummary')}</h3>

            {/* Coupon */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Tag size={16} className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 text-[#6B6B8A]" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={t('couponPlaceholder')}
                  className="input !rounded-xl !py-2.5 !text-sm !pl-10 rtl:!pr-10 rtl:!pl-4"
                  id="coupon-input"
                />
              </div>
              <button onClick={handleCoupon} className="btn-secondary !rounded-xl !py-2 !px-4 !text-sm shrink-0" id="apply-coupon-btn">
                {t('applyCoupon')}
              </button>
            </div>

            {coupon && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#00D68F]/10 text-[#00D68F] text-sm mb-4">
                <span>🎉 {coupon.code}</span>
                <button onClick={() => setCoupon(null)} className="text-xs hover:underline">{isRTL ? 'إزالة' : 'Remove'}</button>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-[#9B9BB8]">{t('subtotal')}</span><span>{subtotal.toFixed(2)} {t('sar')}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#9B9BB8]">{t('shipping')}</span><span className={shippingCost === 0 ? 'text-[#00D68F]' : ''}>{shippingCost === 0 ? t('freeShipping') : `${shippingCost} ${t('sar')}`}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#9B9BB8]">{t('tax')}</span><span>{tax.toFixed(2)} {t('sar')}</span></div>
              {discount > 0 && <div className="flex justify-between text-sm text-[#00D68F]"><span>{t('discount')}</span><span>-{discount.toFixed(2)} {t('sar')}</span></div>}
              <div className="border-t border-[#2A2A5A] pt-3 flex justify-between font-bold text-lg">
                <span>{t('total')}</span>
                <span className="gradient-text">{total.toFixed(2)} {t('sar')}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full !rounded-xl !py-3.5 justify-center text-lg" id="checkout-btn">
              {t('checkout')}
            </Link>

            <p className="text-center text-xs text-[#6B6B8A] mt-3 flex items-center justify-center gap-1">
              🔒 {isRTL ? 'دفع آمن ومشفر' : 'Secure & encrypted payment'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
