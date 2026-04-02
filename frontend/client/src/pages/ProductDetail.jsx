import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { demoProducts, demoReviews } from '../utils/demoData';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang, isRTL } = useLanguage();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWished, setIsWished] = useState(false);

  const product = demoProducts.find(p => p._id === id);
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <p className="text-6xl mb-4">😢</p>
          <h2 className="text-2xl font-bold mb-2">{isRTL ? 'المنتج غير موجود' : 'Product not found'}</h2>
          <Link to="/products" className="btn-primary mt-4 inline-flex">{t('products')}</Link>
        </div>
      </div>
    );
  }

  const name = product.name[lang];
  const desc = product.description[lang];
  const price = product.price;
  const salePrice = product.priceAfterDiscount;
  const hasDiscount = salePrice > 0 && salePrice < price;
  const images = product.images || [product.thumbnail];
  const relatedProducts = demoProducts.filter(p => p.category._id === product.category._id && p._id !== product._id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#6B6B8A] mb-6">
        <Link to="/" className="hover:text-[#8B83FF] transition-colors">{t('home')}</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#8B83FF] transition-colors">{t('products')}</Link>
        <span>/</span>
        <span className="text-[#E8E8F0]">{name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="relative group overflow-hidden rounded-2xl bg-[#12122A] border border-[#2A2A5A] mb-4">
            <img src={images[selectedImage]} alt={name} className="w-full aspect-square object-cover" />
            {hasDiscount && (
              <span className="absolute top-4 right-4 rtl:right-auto rtl:left-4 badge badge-sale text-base px-4 py-1.5">
                {product.discountPercentage}% {t('discount')}
              </span>
            )}
            {images.length > 1 && (
              <>
                <button onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-[#6C63FF]">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-[#6C63FF]">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImage ? 'border-[#6C63FF]' : 'border-[#2A2A5A] opacity-50 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">{product.category?.icon}</span>
            <span className="text-sm text-[#6B6B8A]">{product.category?.name?.[lang]}</span>
            <span className="text-sm text-[#6B6B8A]">|</span>
            <span className="text-sm text-[#6B6B8A]">{product.brand?.[lang]}</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-relaxed">{name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="stars">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={18} fill={i <= Math.round(product.ratingsAverage) ? '#FFD700' : 'none'} className={i <= Math.round(product.ratingsAverage) ? 'text-[#FFD700]' : 'text-[#2A2A5A]'} stroke={i <= Math.round(product.ratingsAverage) ? '#FFD700' : '#2A2A5A'} />
              ))}
            </div>
            <span className="font-bold text-[#FFD700]">{product.ratingsAverage}</span>
            <span className="text-[#6B6B8A] text-sm">({product.ratingsQuantity} {t('reviews')})</span>
            <span className="text-[#6B6B8A]">|</span>
            <span className="text-[#00D68F] text-sm font-semibold">{product.sold} {isRTL ? 'مبيع' : 'sold'}</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-4 mb-6 pb-6 border-b border-[#2A2A5A]">
            <span className="text-4xl font-black text-[#6C63FF]">{hasDiscount ? salePrice : price} <span className="text-lg">{t('sar')}</span></span>
            {hasDiscount && (
              <>
                <span className="text-xl text-[#6B6B8A] line-through">{price} {t('sar')}</span>
                <span className="badge badge-sale">{isRTL ? 'وفر' : 'Save'} {price - salePrice} {t('sar')}</span>
              </>
            )}
          </div>

          {/* Quantity + Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center glass rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-[#1A1A3E] transition-colors" id="qty-minus"><Minus size={18} /></button>
              <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-[#1A1A3E] transition-colors" id="qty-plus"><Plus size={18} /></button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary flex-1 !rounded-xl !py-3.5 justify-center" id="add-to-cart-btn">
              <ShoppingCart size={20} /> {t('addToCart')}
            </button>
            <button onClick={() => { setIsWished(!isWished); toast.success(isWished ? (isRTL ? 'تم الإزالة' : 'Removed') : '❤️'); }} className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 ${isWished ? 'border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]' : 'border-[#2A2A5A] text-[#6B6B8A] hover:border-[#FF6B6B] hover:text-[#FF6B6B]'}`} id="wishlist-btn">
              <Heart size={22} fill={isWished ? '#FF6B6B' : 'none'} />
            </button>
          </div>

          <button onClick={handleBuyNow} className="w-full btn-secondary !rounded-xl !py-3.5 justify-center text-lg mb-6" id="buy-now-btn">
            ⚡ {t('buyNow')}
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: Truck, text: isRTL ? 'شحن سريع' : 'Fast Shipping' },
              { icon: Shield, text: isRTL ? 'ضمان الجودة' : 'Quality Guarantee' },
              { icon: RotateCcw, text: isRTL ? 'إرجاع مجاني' : 'Free Returns' }
            ].map((f, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-[#12122A] border border-[#2A2A5A]">
                <f.icon size={20} className="text-[#6C63FF] mx-auto mb-1" />
                <p className="text-[10px] sm:text-xs text-[#9B9BB8]">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Stock */}
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${product.stock > 10 ? 'bg-[#00D68F]/10 text-[#00D68F]' : 'bg-[#FFAA00]/10 text-[#FFAA00]'}`}>
            <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-[#00D68F]' : 'bg-[#FFAA00]'}`}></span>
            <span className="text-sm font-semibold">
              {product.stock > 10 ? t('inStock') : `⚡ ${isRTL ? `باقي ${product.stock} فقط!` : `Only ${product.stock} left!`}`}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: Description + Reviews */}
      <div className="mt-16">
        <div className="flex border-b border-[#2A2A5A] gap-1 mb-8">
          {['description', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-semibold text-sm transition-colors relative ${activeTab === tab ? 'text-[#6C63FF]' : 'text-[#6B6B8A] hover:text-[#E8E8F0]'}`}>
              {tab === 'description' ? t('description') : `${t('reviews')} (${demoReviews.length})`}
              {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 gradient-bg rounded-full" />}
            </button>
          ))}
        </div>

        {activeTab === 'description' ? (
          <div className="prose prose-invert max-w-none">
            <p className="text-[#9B9BB8] leading-relaxed text-lg">{desc}</p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {[
                { label: isRTL ? 'العلامة التجارية' : 'Brand', value: product.brand?.[lang] },
                { label: isRTL ? 'الفئة' : 'Category', value: product.category?.name?.[lang] },
                { label: isRTL ? 'المخزون' : 'Stock', value: product.stock },
                { label: isRTL ? 'الكمية المباعة' : 'Sold', value: product.sold }
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-3 px-4 rounded-xl bg-[#12122A] border border-[#2A2A5A]">
                  <span className="text-[#6B6B8A]">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {demoReviews.map(review => (
              <div key={review._id} className="card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {review.user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-sm">{review.user.name}</span>
                      <span className="text-xs text-[#6B6B8A]">{review.createdAt}</span>
                    </div>
                    <div className="stars mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= review.rating ? '#FFD700' : 'none'} className={s <= review.rating ? 'text-[#FFD700]' : 'text-[#2A2A5A]'} stroke={s <= review.rating ? '#FFD700' : '#2A2A5A'} />)}
                    </div>
                    <p className="text-[#9B9BB8] text-sm leading-relaxed">{review.comment}</p>
                    <button className="mt-2 text-xs text-[#6B6B8A] hover:text-[#6C63FF] transition-colors flex items-center gap-1">
                      👍 {isRTL ? 'مفيد' : 'Helpful'} ({review.likes.length})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title mb-8">{t('relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
