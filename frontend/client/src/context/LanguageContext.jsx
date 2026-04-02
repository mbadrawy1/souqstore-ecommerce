import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    cart: 'السلة',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    profile: 'حسابي',
    wishlist: 'المفضلة',
    orders: 'طلباتي',
    admin: 'لوحة التحكم',
    search: 'ابحث عن منتجات...',
    
    // Hero
    heroTitle: 'تسوّق بذكاء، عِش بأناقة',
    heroSubtitle: 'اكتشف آلاف المنتجات المميزة بأفضل الأسعار مع شحن سريع وضمان الجودة',
    shopNow: 'تسوق الآن',
    exploreMore: 'اكتشف المزيد',
    
    // Sections
    featuredProducts: 'منتجات مميزة',
    featuredSubtitle: 'اخترنا لك أفضل المنتجات بعناية',
    categories: 'تسوق حسب الفئة',
    categoriesSubtitle: 'تصفح مجموعتنا المتنوعة',
    newArrivals: 'وصل حديثاً',
    bestSellers: 'الأكثر مبيعاً',
    specialOffers: 'عروض خاصة',
    
    // Product
    addToCart: 'أضف للسلة',
    buyNow: 'اشتري الآن',
    inStock: 'متوفر',
    outOfStock: 'نفذ من المخزون',
    reviews: 'تقييمات',
    description: 'الوصف',
    relatedProducts: 'منتجات مشابهة',
    addReview: 'أضف تقييمك',
    sar: 'ر.س',
    discount: 'خصم',
    
    // Cart
    cartEmpty: 'السلة فارغة',
    cartTotal: 'المجموع',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    tax: 'الضريبة (15%)',
    total: 'الإجمالي',
    freeShipping: 'شحن مجاني',
    checkout: 'إتمام الطلب',
    continueShopping: 'مواصلة التسوق',
    couponPlaceholder: 'كود الخصم',
    applyCoupon: 'تطبيق',
    
    // Checkout
    shippingAddress: 'عنوان الشحن',
    paymentMethod: 'طريقة الدفع',
    orderSummary: 'ملخص الطلب',
    placeOrder: 'تأكيد الطلب',
    cash: 'الدفع عند الاستلام',
    card: 'بطاقة ائتمان',
    wallet: 'محفظة إلكترونية',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    loginTitle: 'مرحبًا بعودتك',
    registerTitle: 'إنشاء حساب جديد',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    
    // Footer
    aboutUs: 'من نحن',
    aboutText: 'سوق ستور - متجرك الإلكتروني الأول في المنطقة العربية. نوفر لك أفضل المنتجات بأسعار تنافسية مع خدمة عملاء متميزة.',
    quickLinks: 'روابط سريعة',
    contactUs: 'تواصل معنا',
    newsletter: 'النشرة البريدية',
    newsletterText: 'اشترك للحصول على أحدث العروض والخصومات',
    subscribe: 'اشترك',
    allRights: 'جميع الحقوق محفوظة',
    
    // Admin  
    dashboard: 'لوحة التحكم',
    totalSales: 'إجمالي المبيعات',
    totalOrders: 'إجمالي الطلبات',
    totalUsers: 'المستخدمين',
    totalProducts: 'المنتجات',
    recentOrders: 'أحدث الطلبات',
    salesChart: 'الإيرادات الشهرية',
    manageProducts: 'إدارة المنتجات',
    manageOrders: 'إدارة الطلبات',
    manageUsers: 'إدارة المستخدمين',
    manageCoupons: 'إدارة الكوبونات',
    manageCategories: 'إدارة الفئات',

    // Filters
    filterBy: 'فلترة حسب',
    sortBy: 'ترتيب حسب',
    priceRange: 'نطاق السعر',
    allCategories: 'جميع الفئات',
    newest: 'الأحدث',
    priceLowHigh: 'السعر: الأقل للأعلى',
    priceHighLow: 'السعر: الأعلى للأقل',
    topRated: 'الأعلى تقييماً',
    
    // Misc
    viewAll: 'عرض الكل',
    loading: 'جاري التحميل...',
    noResults: 'لا توجد نتائج',
    orderSuccess: 'تم الطلب بنجاح! 🎉',
    quantity: 'الكمية',
    remove: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    status: 'الحالة',
    pending: 'قيد الانتظار',
    processing: 'جاري المعالجة',
    shipped: 'تم الشحن',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
  },
  en: {
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'My Account',
    wishlist: 'Wishlist',
    orders: 'My Orders',
    admin: 'Dashboard',
    search: 'Search products...',
    heroTitle: 'Shop Smart, Live in Style',
    heroSubtitle: 'Discover thousands of premium products at the best prices with fast shipping and quality guarantee',
    shopNow: 'Shop Now',
    exploreMore: 'Explore More',
    featuredProducts: 'Featured Products',
    featuredSubtitle: 'Hand-picked best products for you',
    categories: 'Shop by Category',
    categoriesSubtitle: 'Browse our diverse collection',
    newArrivals: 'New Arrivals',
    bestSellers: 'Best Sellers',
    specialOffers: 'Special Offers',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    reviews: 'Reviews',
    description: 'Description',
    relatedProducts: 'Related Products',
    addReview: 'Add Review',
    sar: 'SAR',
    discount: 'OFF',
    cartEmpty: 'Your cart is empty',
    cartTotal: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax (15%)',
    total: 'Total',
    freeShipping: 'Free Shipping',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    couponPlaceholder: 'Coupon code',
    applyCoupon: 'Apply',
    shippingAddress: 'Shipping Address',
    paymentMethod: 'Payment Method',
    orderSummary: 'Order Summary',
    placeOrder: 'Place Order',
    cash: 'Cash on Delivery',
    card: 'Credit Card',
    wallet: 'E-Wallet',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    phone: 'Phone Number',
    loginTitle: 'Welcome Back',
    registerTitle: 'Create New Account',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    aboutUs: 'About Us',
    aboutText: 'SouqStore - Your #1 online store in the Arab region. We provide the best products at competitive prices with outstanding customer service.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    newsletter: 'Newsletter',
    newsletterText: 'Subscribe for latest offers and discounts',
    subscribe: 'Subscribe',
    allRights: 'All Rights Reserved',
    dashboard: 'Dashboard',
    totalSales: 'Total Sales',
    totalOrders: 'Total Orders',
    totalUsers: 'Users',
    totalProducts: 'Products',
    recentOrders: 'Recent Orders',
    salesChart: 'Monthly Revenue',
    manageProducts: 'Manage Products',
    manageOrders: 'Manage Orders',
    manageUsers: 'Manage Users',
    manageCoupons: 'Manage Coupons',
    manageCategories: 'Manage Categories',
    filterBy: 'Filter By',
    sortBy: 'Sort By',
    priceRange: 'Price Range',
    allCategories: 'All Categories',
    newest: 'Newest',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    topRated: 'Top Rated',
    viewAll: 'View All',
    loading: 'Loading...',
    noResults: 'No results found',
    orderSuccess: 'Order placed successfully! 🎉',
    quantity: 'Quantity',
    remove: 'Remove',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    status: 'Status',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ar');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
    }
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || key;
  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
