import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingBag, Truck, Shield, Headphones, Star, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { demoProducts, demoCategories } from '../utils/demoData';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t, lang, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProducts = demoProducts.filter(p => p.isFeatured);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const heroSlides = [
    {
      title: { ar: 'تسوّق بذكاء، عِش بأناقة', en: 'Shop Smart, Live in Style' },
      subtitle: { ar: 'اكتشف آلاف المنتجات المميزة بأفضل الأسعار مع شحن سريع وضمان الجودة', en: 'Discover thousands of premium products at the best prices with fast shipping and quality guarantee' },
      bg: 'from-[#6C63FF]/20 via-[#0A0A1A] to-[#FF6B6B]/10',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
    },
    {
      title: { ar: 'عروض حصرية تصل حتى 50%', en: 'Exclusive Offers Up to 50% OFF' },
      subtitle: { ar: 'لا تفوت أقوى العروض على الإلكترونيات والأزياء والمزيد', en: "Don't miss the best deals on electronics, fashion and more" },
      bg: 'from-[#FF6B6B]/20 via-[#0A0A1A] to-[#6C63FF]/10',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: Truck, title: { ar: 'شحن مجاني', en: 'Free Shipping' }, desc: { ar: 'للطلبات فوق 200 ر.س', en: 'On orders over 200 SAR' } },
    { icon: Shield, title: { ar: 'ضمان الجودة', en: 'Quality Guarantee' }, desc: { ar: 'ضمان 100% على المنتجات', en: '100% product guarantee' } },
    { icon: Headphones, title: { ar: 'دعم 24/7', en: '24/7 Support' }, desc: { ar: 'فريق دعم متواجد دائمآ', en: 'Support team always available' } },
    { icon: ShoppingBag, title: { ar: 'دفع آمن', en: 'Secure Payment' }, desc: { ar: 'تشفير SSL كامل', en: 'Full SSL encryption' } }
  ];

  return (
    <div className="animate-fade-in">
      {/* =================== HERO SECTION =================== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" id="hero-section">
        {/* Background Effects */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bg} transition-all duration-1000`} />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#6C63FF]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #6C63FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-start animate-slide-up">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <Zap size={16} className="text-[#FFD700]" />
                <span className="text-sm text-[#FFD700] font-semibold">
                  {isRTL ? '🔥 عروض جديدة كل أسبوع' : '🔥 New deals every week'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                {heroSlides[currentSlide].title[lang].split(' ').map((word, i) => (
                  <span key={i}>
                    {i === 0 || i === 2 ? <span className="gradient-text">{word}</span> : word}
                    {' '}
                  </span>
                ))}
              </h1>

              <p className="text-lg text-[#9B9BB8] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {heroSlides[currentSlide].subtitle[lang]}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products" className="btn-primary !py-4 !px-8 !text-lg !rounded-full" id="hero-shop-btn">
                  <ShoppingBag size={22} />
                  {t('shopNow')}
                </Link>
                <Link to="/products?sort=bestselling" className="btn-secondary !py-4 !px-8 !text-lg !rounded-full" id="hero-explore-btn">
                  {t('exploreMore')}
                  <Arrow size={20} />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-10">
                {[
                  { num: '10K+', label: isRTL ? 'منتج' : 'Products' },
                  { num: '50K+', label: isRTL ? 'عميل سعيد' : 'Happy Customers' },
                  { num: '4.9', label: isRTL ? 'تقييم ⭐' : 'Rating ⭐' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-black gradient-text">{stat.num}</p>
                    <p className="text-xs text-[#6B6B8A] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block relative" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#6C63FF]/20 to-[#FF6B6B]/20 rounded-3xl blur-xl" />
                <img
                  src={heroSlides[currentSlide].image}
                  alt="Shopping"
                  className="relative w-full h-[500px] object-cover rounded-3xl border border-[#2A2A5A] shadow-2xl transition-all duration-1000"
                />
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-float shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center">
                      <TrendingUp size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{isRTL ? 'مبيعات اليوم' : "Today's Sales"}</p>
                      <p className="text-[#00D68F] font-bold">+127 {isRTL ? 'طلب' : 'Orders'}</p>
                    </div>
                  </div>
                </div>
                {/* Floating Rating Card */}
                <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 animate-float shadow-xl" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="stars">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FFD700" className="text-[#FFD700]" />)}
                    </div>
                    <span className="text-sm font-bold">4.9</span>
                  </div>
                  <p className="text-xs text-[#9B9BB8] mt-1">{isRTL ? '50,000+ تقييم' : '50,000+ Reviews'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-8 gradient-bg' : 'w-2 bg-[#2A2A5A]'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =================== FEATURES BAR =================== */}
      <section className="border-y border-[#2A2A5A]/50 bg-[#12122A]/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center group-hover:bg-[#6C63FF]/20 transition-colors shrink-0">
                  <f.icon size={22} className="text-[#6C63FF]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{f.title[lang]}</p>
                  <p className="text-xs text-[#6B6B8A]">{f.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== CATEGORIES =================== */}
      <section className="max-w-7xl mx-auto px-4 py-16" id="categories-section">
        <div className="text-center mb-10">
          <h2 className="section-title">{t('categories')}</h2>
          <p className="section-subtitle">{t('categoriesSubtitle')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {demoCategories.map((cat, i) => (
            <Link
              key={cat._id}
              to={`/products?category=${cat._id}`}
              className="card group overflow-hidden relative h-44"
              style={{ animationDelay: `${i * 0.1}s` }}
              id={`category-${cat.slug}`}
            >
              <img src={cat.image} alt={cat.name[lang]} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1A] via-[#0A0A1A]/50 to-transparent" />
              <div className="relative h-full flex flex-col items-center justify-center gap-2 p-4">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                <h3 className="font-bold text-center">{cat.name[lang]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =================== FEATURED PRODUCTS =================== */}
      <section className="max-w-7xl mx-auto px-4 py-16" id="featured-section">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">{t('featuredProducts')}</h2>
            <p className="section-subtitle">{t('featuredSubtitle')}</p>
          </div>
          <Link to="/products?featured=true" className="btn-secondary !rounded-full !py-2 !px-5 !text-sm hidden sm:flex">
            {t('viewAll')} <Arrow size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <div key={product._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link to="/products" className="btn-secondary !rounded-full">{t('viewAll')} <Arrow size={16} /></Link>
        </div>
      </section>

      {/* =================== PROMOTION BANNER =================== */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {isRTL ? '🎁 عرض محدود' : '🎁 Limited Offer'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {isRTL ? 'خصم 30% على جميع الإلكترونيات!' : '30% OFF All Electronics!'}
            </h2>
            <p className="text-white/80 mb-6">
              {isRTL ? 'العرض ينتهي خلال 48 ساعة — لا تفوت الفرصة!' : 'Offer ends in 48 hours — Don\'t miss out!'}
            </p>
            <Link to="/products?category=cat1" className="inline-flex items-center gap-2 bg-white text-[#6C63FF] px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors">
              {t('shopNow')} <Arrow size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================== ALL PRODUCTS PREVIEW =================== */}
      <section className="max-w-7xl mx-auto px-4 py-16" id="all-products-section">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">{t('newArrivals')}</h2>
            <p className="section-subtitle">{isRTL ? 'أحدث المنتجات في متجرنا' : 'Latest products in our store'}</p>
          </div>
          <Link to="/products?sort=newest" className="btn-secondary !rounded-full !py-2 !px-5 !text-sm hidden sm:flex">
            {t('viewAll')} <Arrow size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demoProducts.slice(0, 4).map((product, i) => (
            <div key={product._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* =================== TESTIMONIALS =================== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">{isRTL ? 'ماذا يقول عملاؤنا' : 'What Our Customers Say'}</h2>
          <p className="section-subtitle">{isRTL ? 'آراء حقيقية من عملائنا الأعزاء' : 'Real reviews from our valued customers'}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: { ar: 'أحمد محمود', en: 'Ahmed Mahmoud' }, text: { ar: 'أفضل تجربة تسوق أونلاين! المنتجات بجودة عالية والتوصيل سريع جداً. أنصح الجميع بالتسوق من سوق ستور.', en: 'Best online shopping experience! High quality products and super fast delivery. I recommend SouqStore to everyone.' }, rating: 5 },
            { name: { ar: 'فاطمة خالد', en: 'Fatima Khalid' }, text: { ar: 'خدمة عملاء ممتازة وأسعار تنافسية. طلبت حقيبة يد ووصلت في يومين فقط بتغليف فاخر.', en: 'Excellent customer service and competitive prices. Ordered a handbag and it arrived in just 2 days with luxury packaging.' }, rating: 5 },
            { name: { ar: 'عمر سعيد', en: 'Omar Saeed' }, text: { ar: 'المتجر يقدم عروض رائعة ومنتجات أصلية. كود الخصم WELCOME20 وفر لي 20% على أول طلب!', en: 'The store offers great deals and genuine products. The WELCOME20 discount code saved me 20% on my first order!' }, rating: 4 }
          ].map((review, i) => (
            <div key={i} className="card p-6 hover:border-[#6C63FF]/30">
              <div className="stars mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} fill={s <= review.rating ? '#FFD700' : 'none'} className={s <= review.rating ? 'text-[#FFD700]' : 'text-[#2A2A5A]'} stroke={s <= review.rating ? '#FFD700' : '#2A2A5A'} />
                ))}
              </div>
              <p className="text-[#9B9BB8] text-sm leading-relaxed mb-4">"{review.text[lang]}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#2A2A5A]">
                <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {review.name[lang].charAt(0)}
                </div>
                <p className="font-semibold text-sm">{review.name[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export { Home };
