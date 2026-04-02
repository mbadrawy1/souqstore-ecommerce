// Demo data for when backend is unavailable (frontend-only mode)
export const demoCategories = [
  { _id: 'cat1', name: { ar: 'إلكترونيات', en: 'Electronics' }, slug: 'electronics', icon: '📱', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { _id: 'cat2', name: { ar: 'أزياء رجالية', en: 'Men Fashion' }, slug: 'men-fashion', icon: '👔', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400' },
  { _id: 'cat3', name: { ar: 'أزياء نسائية', en: 'Women Fashion' }, slug: 'women-fashion', icon: '👗', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400' },
  { _id: 'cat4', name: { ar: 'المنزل والمطبخ', en: 'Home & Kitchen' }, slug: 'home-kitchen', icon: '🏠', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { _id: 'cat5', name: { ar: 'الجمال والعناية', en: 'Beauty & Care' }, slug: 'beauty-care', icon: '💄', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
  { _id: 'cat6', name: { ar: 'الرياضة', en: 'Sports' }, slug: 'sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400' },
  { _id: 'cat7', name: { ar: 'الكتب', en: 'Books' }, slug: 'books', icon: '📚', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
  { _id: 'cat8', name: { ar: 'الأطفال', en: 'Kids' }, slug: 'kids', icon: '🧸', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400' }
];

export const demoProducts = [
  {
    _id: 'p1',
    name: { ar: 'سماعات بلوتوث لاسلكية برو', en: 'Pro Wireless Bluetooth Headphones' },
    slug: 'pro-wireless-bluetooth-headphones',
    description: {
      ar: 'سماعات بلوتوث لاسلكية بتقنية إلغاء الضوضاء النشطة، بطارية تدوم 30 ساعة، صوت محيطي عالي الجودة. مثالية للموسيقى والمكالمات. تقنية Bluetooth 5.3 مع دعم الصوت عالي الدقة.',
      en: 'Wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, high-quality surround sound. Perfect for music and calls. Bluetooth 5.3 with Hi-Res audio support.'
    },
    price: 349, priceAfterDiscount: 249, discountPercentage: 29,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: { _id: 'cat1', name: { ar: 'إلكترونيات', en: 'Electronics' }, icon: '📱' },
    brand: { ar: 'ساوند ماكس', en: 'SoundMax' },
    stock: 150, sold: 89, ratingsAverage: 4.7, ratingsQuantity: 42,
    tags: ['headphones', 'bluetooth', 'wireless'], isFeatured: true
  },
  {
    _id: 'p2',
    name: { ar: 'ساعة ذكية فيت برو', en: 'FitPro Smart Watch' },
    slug: 'fitpro-smart-watch',
    description: {
      ar: 'ساعة ذكية بشاشة AMOLED مقاس 1.9 بوصة، مقاومة للماء IP68، متتبع لياقة بدنية متقدم مع 100+ رياضة، مراقبة نبضات القلب والأكسجين وجودة النوم. بطارية تدوم 14 يوم.',
      en: 'Smart watch with 1.9" AMOLED display, IP68 waterproof, advanced fitness tracker with 100+ sports, heart rate, SpO2 and sleep monitoring. 14-day battery life.'
    },
    price: 599, priceAfterDiscount: 449, discountPercentage: 25,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: { _id: 'cat1', name: { ar: 'إلكترونيات', en: 'Electronics' }, icon: '📱' },
    brand: { ar: 'فيت برو', en: 'FitPro' },
    stock: 200, sold: 156, ratingsAverage: 4.8, ratingsQuantity: 87,
    tags: ['smartwatch', 'fitness', 'wearable'], isFeatured: true
  },
  {
    _id: 'p3',
    name: { ar: 'كاميرا ديجيتال 4K احترافية', en: '4K Professional Digital Camera' },
    slug: '4k-professional-digital-camera',
    description: {
      ar: 'كاميرا رقمية احترافية بدقة 4K 60fps، مستشعر 48MP، عدسة قابلة للتبديل، مثبت صورة بصري 5 محاور. تصوير فيديو سينمائي بجودة استثنائية.',
      en: '4K 60fps professional digital camera with 48MP sensor, interchangeable lens, 5-axis optical image stabilizer. Cinematic video recording with exceptional quality.'
    },
    price: 2499, priceAfterDiscount: 1999, discountPercentage: 20,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    category: { _id: 'cat1', name: { ar: 'إلكترونيات', en: 'Electronics' }, icon: '📱' },
    brand: { ar: 'فوتو برو', en: 'PhotoPro' },
    stock: 45, sold: 23, ratingsAverage: 4.9, ratingsQuantity: 15,
    tags: ['camera', '4k', 'photography'], isFeatured: true
  },
  {
    _id: 'p4',
    name: { ar: 'جاكيت جلد كلاسيكي', en: 'Classic Leather Jacket' },
    slug: 'classic-leather-jacket',
    description: {
      ar: 'جاكيت جلد طبيعي فاخر بتصميم كلاسيكي أنيق مع بطانة حرارية داخلية. مناسب لجميع المناسبات مع جيوب متعددة بسحاب YKK.',
      en: 'Premium genuine leather jacket with elegant classic design and thermal inner lining. Suitable for all occasions with multiple YKK zipper pockets.'
    },
    price: 899, priceAfterDiscount: 699, discountPercentage: 22,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: { _id: 'cat2', name: { ar: 'أزياء رجالية', en: 'Men Fashion' }, icon: '👔' },
    brand: { ar: 'إيليت', en: 'Elite' },
    stock: 75, sold: 45, ratingsAverage: 4.6, ratingsQuantity: 28,
    tags: ['jacket', 'leather', 'classic'], isFeatured: true
  },
  {
    _id: 'p5',
    name: { ar: 'حذاء رياضي إير فلو', en: 'AirFlow Running Shoes' },
    slug: 'airflow-running-shoes',
    description: {
      ar: 'حذاء رياضي خفيف الوزن بتقنية النعل الهوائي المبتكرة، وسادة هوائية مزدوجة للراحة القصوى. نسيج شبكي قابل للتنفس، مثالي للجري والتمارين.',
      en: 'Lightweight running shoes with innovative air-sole technology, dual air cushion for maximum comfort. Breathable mesh fabric, perfect for running and workouts.'
    },
    price: 399, priceAfterDiscount: 299, discountPercentage: 25,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: { _id: 'cat2', name: { ar: 'أزياء رجالية', en: 'Men Fashion' }, icon: '👔' },
    brand: { ar: 'إير فلو', en: 'AirFlow' },
    stock: 300, sold: 210, ratingsAverage: 4.5, ratingsQuantity: 95,
    tags: ['shoes', 'sport', 'running'], isFeatured: true
  },
  {
    _id: 'p6',
    name: { ar: 'حقيبة يد فاخرة', en: 'Luxury Handbag' },
    slug: 'luxury-handbag',
    description: {
      ar: 'حقيبة يد نسائية فاخرة من الجلد الطبيعي الإيطالي، تصميم عصري أنيق مع حمالة كتف قابلة للتعديل ومقصورات متعددة منظمة.',
      en: 'Luxury women\'s Italian genuine leather handbag, modern elegant design with adjustable shoulder strap and multiple organized compartments.'
    },
    price: 1299, priceAfterDiscount: 999, discountPercentage: 23,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    category: { _id: 'cat3', name: { ar: 'أزياء نسائية', en: 'Women Fashion' }, icon: '👗' },
    brand: { ar: 'شيك', en: 'Chique' },
    stock: 60, sold: 38, ratingsAverage: 4.8, ratingsQuantity: 22,
    tags: ['bag', 'leather', 'luxury'], isFeatured: true
  },
  {
    _id: 'p7',
    name: { ar: 'ماكينة قهوة أوتوماتيكية', en: 'Automatic Coffee Machine' },
    slug: 'automatic-coffee-machine',
    description: {
      ar: 'ماكينة قهوة أوتوماتيكية بالكامل مع مطحنة سيراميك مدمجة، 15 بار ضغط، شاشة لمس ذكية ملونة. تحضر الإسبريسو والكابتشينو واللاتيه بضغطة واحدة.',
      en: 'Fully automatic coffee machine with built-in ceramic grinder, 15 bar pressure, color smart touch screen. Makes espresso, cappuccino, and latte with one touch.'
    },
    price: 1899, priceAfterDiscount: 1499, discountPercentage: 21,
    images: ['https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
    category: { _id: 'cat4', name: { ar: 'المنزل والمطبخ', en: 'Home & Kitchen' }, icon: '🏠' },
    brand: { ar: 'بريو', en: 'Brew' },
    stock: 80, sold: 52, ratingsAverage: 4.7, ratingsQuantity: 33,
    tags: ['coffee', 'machine', 'kitchen'], isFeatured: true
  },
  {
    _id: 'p8',
    name: { ar: 'مجموعة العناية بالبشرة', en: 'Luxury Skincare Set' },
    slug: 'luxury-skincare-set',
    description: {
      ar: 'مجموعة كاملة للعناية بالبشرة تتضمن غسول، تونر، سيروم فيتامين سي، مرطب، وكريم عين. مكونات طبيعية 100% خالية من البارابين.',
      en: 'Complete skincare set includes cleanser, toner, vitamin C serum, moisturizer, and eye cream. 100% natural paraben-free ingredients.'
    },
    price: 499, priceAfterDiscount: 379, discountPercentage: 24,
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    category: { _id: 'cat5', name: { ar: 'الجمال والعناية', en: 'Beauty & Care' }, icon: '💄' },
    brand: { ar: 'ناتشورال جلو', en: 'Natural Glow' },
    stock: 120, sold: 78, ratingsAverage: 4.6, ratingsQuantity: 45,
    tags: ['skincare', 'beauty', 'natural'], isFeatured: false
  },
  {
    _id: 'p9',
    name: { ar: 'مجموعة كتب ريادة الأعمال', en: 'Entrepreneurship Book Collection' },
    slug: 'entrepreneurship-book-collection',
    description: {
      ar: 'مجموعة من 5 كتب في ريادة الأعمال والتطوير الشخصي: فكر وازدد ثراءً، العادات الذرية، من صفر إلى واحد، ابدأ بلماذا، الأب الغني.',
      en: '5-book collection on entrepreneurship: Think and Grow Rich, Atomic Habits, Zero to One, Start With Why, Rich Dad Poor Dad.'
    },
    price: 199, priceAfterDiscount: 149, discountPercentage: 25,
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    category: { _id: 'cat7', name: { ar: 'الكتب', en: 'Books' }, icon: '📚' },
    brand: { ar: 'دار النشر', en: 'BookHouse' },
    stock: 500, sold: 320, ratingsAverage: 4.9, ratingsQuantity: 120,
    tags: ['books', 'business', 'self-help'], isFeatured: false
  },
  {
    _id: 'p10',
    name: { ar: 'شاحن لاسلكي سريع', en: 'Fast Wireless Charger' },
    slug: 'fast-wireless-charger',
    description: {
      ar: 'شاحن لاسلكي سريع 15 واط مع تقنية Qi2، متوافق مع جميع الأجهزة. تصميم أنيق بقاعدة مغناطيسية وإضاءة LED ذكية.',
      en: 'Fast 15W wireless charger with Qi2 technology, compatible with all devices. Sleek design with magnetic base and smart LED lighting.'
    },
    price: 129, priceAfterDiscount: 89, discountPercentage: 31,
    images: ['https://images.unsplash.com/photo-1586953208270-767889fa9b3f?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1586953208270-767889fa9b3f?w=400',
    category: { _id: 'cat1', name: { ar: 'إلكترونيات', en: 'Electronics' }, icon: '📱' },
    brand: { ar: 'تشارج برو', en: 'ChargePro' },
    stock: 400, sold: 280, ratingsAverage: 4.3, ratingsQuantity: 55,
    tags: ['charger', 'wireless', 'fast-charging'], isFeatured: false
  },
  {
    _id: 'p11',
    name: { ar: 'مجموعة ألعاب تعليمية', en: 'Kids Educational Toy Set' },
    slug: 'kids-educational-toy-set',
    description: {
      ar: 'مجموعة ألعاب تعليمية تفاعلية للأطفال من 3-8 سنوات. تنمي المهارات العقلية والحركية والإبداعية. آمنة 100% وخالية من المواد الضارة.',
      en: 'Interactive educational toy set for children ages 3-8. Develops mental, motor and creative skills. 100% safe and free from harmful materials.'
    },
    price: 249, priceAfterDiscount: 189, discountPercentage: 24,
    images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',
    category: { _id: 'cat8', name: { ar: 'الأطفال', en: 'Kids' }, icon: '🧸' },
    brand: { ar: 'كيدز وورلد', en: 'KidsWorld' },
    stock: 200, sold: 145, ratingsAverage: 4.7, ratingsQuantity: 68,
    tags: ['toys', 'kids', 'educational'], isFeatured: false
  },
  {
    _id: 'p12',
    name: { ar: 'سماعة أذن رياضية', en: 'Sport Earbuds Pro' },
    slug: 'sport-earbuds-pro',
    description: {
      ar: 'سماعة أذن لاسلكية رياضية مقاومة للعرق والماء IPX7، بطارية 8 ساعات + علبة شحن 32 ساعة إضافية. صوت بيور باس عميق.',
      en: 'Wireless sport earbuds IPX7 sweat & waterproof, 8-hour battery + 32-hour charging case. Deep Pure Bass sound.'
    },
    price: 199, priceAfterDiscount: 149, discountPercentage: 25,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600'],
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400',
    category: { _id: 'cat1', name: { ar: 'إلكترونيات', en: 'Electronics' }, icon: '📱' },
    brand: { ar: 'ساوند ماكس', en: 'SoundMax' },
    stock: 250, sold: 180, ratingsAverage: 4.4, ratingsQuantity: 76,
    tags: ['earbuds', 'sport', 'wireless'], isFeatured: false
  }
];

export const demoReviews = [
  { _id: 'r1', user: { name: 'أحمد محمود', avatar: '' }, rating: 5, comment: 'منتج ممتاز! أنصح به بشدة. الجودة عالية جداً والتوصيل كان سريع.', likes: ['1', '2', '3'], createdAt: '2024-01-15' },
  { _id: 'r2', user: { name: 'فاطمة خالد', avatar: '' }, rating: 4, comment: 'جودة عالية وسعر مناسب جداً. شكراً سوق ستور على الخدمة المتميزة.', likes: ['1', '2'], createdAt: '2024-01-20' },
  { _id: 'r3', user: { name: 'عمر سعيد', avatar: '' }, rating: 5, comment: 'وصل بسرعة والتغليف ممتاز، سأطلب مرة أخرى بالتأكيد. أفضل متجر!', likes: ['1'], createdAt: '2024-02-01' },
  { _id: 'r4', user: { name: 'سارة أحمد', avatar: '' }, rating: 4, comment: 'المنتج مطابق للوصف تماماً. التوصيل خلال يومين فقط. شكراً!', likes: ['1', '2', '3', '4'], createdAt: '2024-02-10' }
];

export const demoOrders = [
  {
    _id: 'o1', items: [
      { product: 'p1', name: { ar: 'سماعات بلوتوث لاسلكية برو', en: 'Pro Wireless Bluetooth Headphones' }, price: 249, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
      { product: 'p2', name: { ar: 'ساعة ذكية فيت برو', en: 'FitPro Smart Watch' }, price: 449, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }
    ],
    totalPrice: 802.70, status: 'delivered', isPaid: true, createdAt: '2024-01-15', paidAt: '2024-01-15', deliveredAt: '2024-01-18'
  },
  {
    _id: 'o2', items: [
      { product: 'p6', name: { ar: 'حقيبة يد فاخرة', en: 'Luxury Handbag' }, price: 999, quantity: 1, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' }
    ],
    totalPrice: 1148.85, status: 'shipped', isPaid: true, createdAt: '2024-02-01', paidAt: '2024-02-01'
  },
  {
    _id: 'o3', items: [
      { product: 'p7', name: { ar: 'ماكينة قهوة أوتوماتيكية', en: 'Automatic Coffee Machine' }, price: 1499, quantity: 1, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400' }
    ],
    totalPrice: 1723.85, status: 'processing', isPaid: true, createdAt: '2024-02-10', paidAt: '2024-02-10'
  }
];
