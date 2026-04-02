import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { t, lang, isRTL } = useLanguage();
  const { items, subtotal, shippingCost, tax, discount, total, clearCart, getPrice } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ details: '', city: '', postalCode: '', phone: '' });
  const [payment, setPayment] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);

  if (items.length === 0 && !orderComplete) { navigate('/cart'); return null; }

  if (orderComplete) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"><Check size={40} className="text-white" /></div>
        <h2 className="text-3xl font-bold mb-3">{t('orderSuccess')}</h2>
        <p className="text-[#9B9BB8] mb-8">{isRTL ? 'شكراً لاختيارك سوق ستور!' : 'Thank you for choosing SouqStore!'}</p>
        <Link to="/products" className="btn-primary !rounded-full justify-center">{t('continueShopping')}</Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => { clearCart(); setOrderComplete(true); setLoading(false); toast.success(t('orderSuccess')); }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">{t('checkout')}</h1>
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {[t('shippingAddress'), t('paymentMethod'), isRTL?'التأكيد':'Confirm'].map((label,i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${i<=step?'gradient-bg text-white':'bg-[#1A1A3E] text-[#6B6B8A]'}`}>{i<step?<Check size={16}/>:i+1}</div>
            <span className={`text-sm hidden sm:inline ${i<=step?'text-[#8B83FF]':'text-[#6B6B8A]'}`}>{label}</span>
            {i<2&&<div className={`w-12 h-0.5 ${i<step?'gradient-bg':'bg-[#2A2A5A]'}`}/>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          {step===0&&(
            <div className="card p-6 animate-slide-up">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><MapPin size={20} className="text-[#6C63FF]"/>{t('shippingAddress')}</h3>
              <div className="space-y-4">
                <input value={address.details} onChange={e=>setAddress({...address,details:e.target.value})} placeholder={isRTL?'العنوان بالتفصيل':'Address Details'} className="input !rounded-xl"/>
                <div className="grid grid-cols-2 gap-4">
                  <input value={address.city} onChange={e=>setAddress({...address,city:e.target.value})} placeholder={isRTL?'المدينة':'City'} className="input !rounded-xl"/>
                  <input value={address.postalCode} onChange={e=>setAddress({...address,postalCode:e.target.value})} placeholder={isRTL?'الرمز البريدي':'Postal Code'} className="input !rounded-xl"/>
                </div>
                <input value={address.phone} onChange={e=>setAddress({...address,phone:e.target.value})} placeholder={t('phone')} className="input !rounded-xl" dir="ltr"/>
              </div>
              <button onClick={()=>{if(address.details&&address.city)setStep(1);else toast.error(isRTL?'أكمل العنوان':'Complete address');}} className="btn-primary w-full !rounded-xl !py-3.5 mt-6 justify-center">{isRTL?'التالي':'Next'}</button>
            </div>
          )}
          {step===1&&(
            <div className="card p-6 animate-slide-up">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><CreditCard size={20} className="text-[#6C63FF]"/>{t('paymentMethod')}</h3>
              {[{id:'card',icon:'💳',label:t('card')},{id:'cash',icon:'💵',label:t('cash')},{id:'wallet',icon:'📱',label:t('wallet')}].map(m=>(
                <label key={m.id} className={`card !p-4 flex items-center gap-4 cursor-pointer mb-3 ${payment===m.id?'!border-[#6C63FF] gradient-bg-subtle':''}`}>
                  <input type="radio" name="pay" checked={payment===m.id} onChange={()=>setPayment(m.id)} className="hidden"/>
                  <span className="text-2xl">{m.icon}</span><span className="font-semibold flex-1">{m.label}</span>
                  <div className={`w-5 h-5 rounded-full border-2 ${payment===m.id?'border-[#6C63FF] bg-[#6C63FF]':'border-[#2A2A5A]'} flex items-center justify-center`}>{payment===m.id&&<Check size={12} className="text-white"/>}</div>
                </label>
              ))}
              {payment==='card'&&<div className="p-4 rounded-xl bg-[#12122A] border border-[#2A2A5A] mt-4 space-y-3"><input placeholder="4242 4242 4242 4242" className="input !rounded-xl" readOnly/><div className="grid grid-cols-2 gap-3"><input placeholder="12/28" className="input !rounded-xl" readOnly/><input placeholder="123" className="input !rounded-xl" readOnly/></div><p className="text-xs text-center text-[#6B6B8A]">🔒 Demo mode</p></div>}
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setStep(0)} className="btn-secondary !rounded-xl !py-3 flex-1 justify-center">{isRTL?'السابق':'Back'}</button>
                <button onClick={()=>setStep(2)} className="btn-primary !rounded-xl !py-3 flex-1 justify-center">{isRTL?'التالي':'Next'}</button>
              </div>
            </div>
          )}
          {step===2&&(
            <div className="card p-6 animate-slide-up">
              <h3 className="text-lg font-bold mb-6">{isRTL?'مراجعة الطلب':'Review Order'}</h3>
              <div className="space-y-3 mb-6">
                {items.map(item=>(<div key={item._id} className="flex items-center gap-3 py-2 border-b border-[#2A2A5A]"><img src={item.thumbnail||item.images?.[0]} className="w-12 h-12 rounded-lg object-cover"/><div className="flex-1"><p className="text-sm font-semibold line-clamp-1">{item.name[lang]}</p><p className="text-xs text-[#6B6B8A]">×{item.quantity}</p></div><p className="font-semibold text-sm">{(getPrice(item)*item.quantity).toFixed(2)} {t('sar')}</p></div>))}
              </div>
              <div className="flex gap-3">
                <button onClick={()=>setStep(1)} className="btn-secondary !rounded-xl !py-3.5 flex-1 justify-center">{isRTL?'السابق':'Back'}</button>
                <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary !rounded-xl !py-3.5 flex-1 justify-center" id="place-order-btn">
                  {loading?<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<>{t('placeOrder')} 🎉</>}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <div className="card p-6 sticky top-24">
            <h3 className="font-bold mb-4">{t('orderSummary')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#9B9BB8]">{t('subtotal')}</span><span>{subtotal.toFixed(2)} {t('sar')}</span></div>
              <div className="flex justify-between"><span className="text-[#9B9BB8]">{t('shipping')}</span><span className={shippingCost===0?'text-[#00D68F]':''}>{shippingCost===0?t('freeShipping'):`${shippingCost} ${t('sar')}`}</span></div>
              <div className="flex justify-between"><span className="text-[#9B9BB8]">{t('tax')}</span><span>{tax.toFixed(2)} {t('sar')}</span></div>
              {discount>0&&<div className="flex justify-between text-[#00D68F]"><span>{t('discount')}</span><span>-{discount.toFixed(2)}</span></div>}
              <div className="border-t border-[#2A2A5A] pt-3 flex justify-between font-bold text-lg"><span>{t('total')}</span><span className="gradient-text">{total.toFixed(2)} {t('sar')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
