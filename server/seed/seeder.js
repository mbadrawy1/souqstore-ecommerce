const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const Review = require('../models/Review');
const Order = require('../models/Order');

const connectDB = require('../config/db');

const categories = [
  { name: { ar: 'إلكترونيات', en: 'Electronics' }, slug: 'electronics', icon: '📱', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { name: { ar: 'أزياء رجالية', en: 'Men Fashion' }, slug: 'men-fashion', icon: '👔', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400' },
  { name: { ar: 'أزياء نسائية', en: 'Women Fashion' }, slug: 'women-fashion', icon: '👗', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400' },
  { name: { ar: 'المنزل والمطبخ', en: 'Home & Kitchen' }, slug: 'home-kitchen', icon: '🏠', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { name: { ar: 'الجمال والعناية', en: 'Beauty & Care' }, slug: 'beauty-care', icon: '💄', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
  { name: { ar: 'الرياضة', en: 'Sports' }, slug: 'sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400' },
  { name: { ar: 'الكتب', en: 'Books' }, slug: 'books', icon: '📚', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
  { name: { ar: 'الأطفال', en: 'Kids' }, slug: 'kids', icon: '🧸', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400' }
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('🗑️  Clearing database...');
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Coupon.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();

    // Create users
    console.log('👤 Creating users...');
    const admin = await User.create({
      name: 'محمد المدير',
      email: 'admin@souqstore.com',
      password: 'admin123',
      role: 'admin',
      phone: '+966501234567'
    });

    const users = await User.create([
      { name: 'أحمد محمود', email: 'ahmed@test.com', password: 'user123', phone: '+966509876543' },
      { name: 'فاطمة خالد', email: 'fatima@test.com', password: 'user123', phone: '+966507654321' },
      { name: 'عمر سعيد', email: 'omar@test.com', password: 'user123', phone: '+966503456789' },
      { name: 'سارة أحمد', email: 'sara@test.com', password: 'user123', phone: '+966508765432' }
    ]);

    // Create categories
    console.log('📂 Creating categories...');
    const cats = await Category.create(categories);

    // Create products
    console.log('📦 Creating products...');
    const products = await Product.create([
      // Electronics
      {
        name: { ar: 'سماعات بلوتوث لاسلكية برو', en: 'Pro Wireless Bluetooth Headphones' },
        slug: 'pro-wireless-bluetooth-headphones',
        description: {
          ar: 'سماعات بلوتوث لاسلكية بتقنية إلغاء الضوضاء النشطة، بطارية تدوم 30 ساعة، صوت محيطي عالي الجودة. مثالية للموسيقى والمكالمات.',
          en: 'Wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, high-quality surround sound. Perfect for music and calls.'
        },
        price: 349,
        priceAfterDiscount: 249,
        discountPercentage: 29,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        category: cats[0]._id,
        brand: { ar: 'ساوند ماكس', en: 'SoundMax' },
        stock: 150, sold: 89, ratingsAverage: 4.7, ratingsQuantity: 42,
        tags: ['headphones', 'bluetooth', 'wireless'], isFeatured: true
      },
      {
        name: { ar: 'ساعة ذكية فيت برو', en: 'FitPro Smart Watch' },
        slug: 'fitpro-smart-watch',
        description: {
          ar: 'ساعة ذكية بشاشة AMOLED، مقاومة للماء، متتبع لياقة بدنية متقدم، مراقبة نبضات القلب والأكسجين. متوافقة مع iOS و Android.',
          en: 'Smart watch with AMOLED display, waterproof, advanced fitness tracker, heart rate and oxygen monitoring. Compatible with iOS and Android.'
        },
        price: 599,
        priceAfterDiscount: 449,
        discountPercentage: 25,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        category: cats[0]._id,
        brand: { ar: 'فيت برو', en: 'FitPro' },
        stock: 200, sold: 156, ratingsAverage: 4.8, ratingsQuantity: 87,
        tags: ['smartwatch', 'fitness', 'wearable'], isFeatured: true
      },
      {
        name: { ar: 'كاميرا ديجيتال 4K احترافية', en: '4K Professional Digital Camera' },
        slug: '4k-professional-digital-camera',
        description: {
          ar: 'كاميرا رقمية احترافية بدقة 4K، عدسة قابلة للتبديل، مثبت صورة بصري، تصوير فيديو سينمائي. مثالية للمصورين المحترفين.',
          en: '4K professional digital camera with interchangeable lens, optical image stabilizer, cinematic video recording. Perfect for professional photographers.'
        },
        price: 2499,
        priceAfterDiscount: 1999,
        discountPercentage: 20,
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
        category: cats[0]._id,
        brand: { ar: 'فوتو برو', en: 'PhotoPro' },
        stock: 45, sold: 23, ratingsAverage: 4.9, ratingsQuantity: 15,
        tags: ['camera', '4k', 'photography'], isFeatured: true
      },
      // Men Fashion
      {
        name: { ar: 'جاكيت جلد كلاسيكي', en: 'Classic Leather Jacket' },
        slug: 'classic-leather-jacket',
        description: {
          ar: 'جاكيت جلد طبيعي فاخر بتصميم كلاسيكي أنيق. مناسب لجميع المناسبات، بطانة داخلية مريحة وجيوب متعددة.',
          en: 'Premium genuine leather jacket with an elegant classic design. Suitable for all occasions, comfortable inner lining with multiple pockets.'
        },
        price: 899,
        priceAfterDiscount: 699,
        discountPercentage: 22,
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
        category: cats[1]._id,
        brand: { ar: 'إيليت', en: 'Elite' },
        stock: 75, sold: 45, ratingsAverage: 4.6, ratingsQuantity: 28,
        tags: ['jacket', 'leather', 'classic'], isFeatured: true
      },
      {
        name: { ar: 'حذاء رياضي إير فلو', en: 'AirFlow Running Shoes' },
        slug: 'airflow-running-shoes',
        description: {
          ar: 'حذاء رياضي خفيف الوزن بتقنية النعل الهوائي، مثالي للجري والتمارين اليومية. نسيج شبكي للتهوية.',
          en: 'Lightweight running shoes with air-sole technology, perfect for running and daily workouts. Mesh fabric for ventilation.'
        },
        price: 399,
        priceAfterDiscount: 299,
        discountPercentage: 25,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        category: cats[1]._id,
        brand: { ar: 'إير فلو', en: 'AirFlow' },
        stock: 300, sold: 210, ratingsAverage: 4.5, ratingsQuantity: 95,
        tags: ['shoes', 'sport', 'running'], isFeatured: true
      },
      // Women Fashion
      {
        name: { ar: 'حقيبة يد فاخرة', en: 'Luxury Handbag' },
        slug: 'luxury-handbag',
        description: {
          ar: 'حقيبة يد نسائية فاخرة من الجلد الطبيعي، تصميم عصري أنيق مع حمالة كتف قابلة للتعديل. مناسبة للعمل والسهرات.',
          en: 'Luxury women\'s genuine leather handbag, modern elegant design with adjustable shoulder strap. Suitable for work and evening events.'
        },
        price: 1299,
        priceAfterDiscount: 999,
        discountPercentage: 23,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
        category: cats[2]._id,
        brand: { ar: 'شيك', en: 'Chique' },
        stock: 60, sold: 38, ratingsAverage: 4.8, ratingsQuantity: 22,
        tags: ['bag', 'leather', 'luxury'], isFeatured: true
      },
      // Home & Kitchen
      {
        name: { ar: 'ماكينة قهوة أوتوماتيكية', en: 'Automatic Coffee Machine' },
        slug: 'automatic-coffee-machine',
        description: {
          ar: 'ماكينة قهوة أوتوماتيكية بالكامل مع مطحنة مدمجة، 15 بار ضغط، شاشة لمس ذكية. تحضر الإسبريسو والكابتشينو واللاتيه.',
          en: 'Fully automatic coffee machine with built-in grinder, 15 bar pressure, smart touch screen. Makes espresso, cappuccino, and latte.'
        },
        price: 1899,
        priceAfterDiscount: 1499,
        discountPercentage: 21,
        images: ['https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
        category: cats[3]._id,
        brand: { ar: 'بريو', en: 'Brew' },
        stock: 80, sold: 52, ratingsAverage: 4.7, ratingsQuantity: 33,
        tags: ['coffee', 'machine', 'kitchen'], isFeatured: true
      },
      // Beauty
      {
        name: { ar: 'مجموعة العناية بالبشرة الفاخرة', en: 'Luxury Skincare Set' },
        slug: 'luxury-skincare-set',
        description: {
          ar: 'مجموعة كاملة للعناية بالبشرة تتضمن غسول، تونر، سيروم فيتامين سي، مرطب، وكريم عين. مكونات طبيعية 100%.',
          en: 'Complete skincare set includes cleanser, toner, vitamin C serum, moisturizer, and eye cream. 100% natural ingredients.'
        },
        price: 499,
        priceAfterDiscount: 379,
        discountPercentage: 24,
        images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
        category: cats[4]._id,
        brand: { ar: 'ناتشورال جلو', en: 'Natural Glow' },
        stock: 120, sold: 78, ratingsAverage: 4.6, ratingsQuantity: 45,
        tags: ['skincare', 'beauty', 'natural']
      },
      // Sports
      {
        name: { ar: 'دراجة تمارين منزلية متقدمة', en: 'Advanced Home Exercise Bike' },
        slug: 'advanced-home-exercise-bike',
        description: {
          ar: 'دراجة تمارين منزلية بشاشة LED، 16 مستوى مقاومة، مستشعر نبض القلب، حامل أجهزة. تصميم مريح وهادئ.',
          en: 'Home exercise bike with LED screen, 16 resistance levels, heart rate sensor, device holder. Comfortable and quiet design.'
        },
        price: 1599,
        priceAfterDiscount: 1199,
        discountPercentage: 25,
        images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
        category: cats[5]._id,
        brand: { ar: 'فيت هوم', en: 'FitHome' },
        stock: 35, sold: 18, ratingsAverage: 4.4, ratingsQuantity: 12,
        tags: ['exercise', 'bike', 'fitness']
      },
      // Books
      {
        name: { ar: 'مجموعة كتب ريادة الأعمال', en: 'Entrepreneurship Book Collection' },
        slug: 'entrepreneurship-book-collection',
        description: {
          ar: 'مجموعة من 5 كتب في ريادة الأعمال والتطوير الشخصي. تشمل: فكر وازدد ثراءً، العادات الذرية، من صفر إلى واحد، ابدأ بلماذا، الأب الغني والأب الفقير.',
          en: 'Collection of 5 books on entrepreneurship and personal development. Includes: Think and Grow Rich, Atomic Habits, Zero to One, Start With Why, Rich Dad Poor Dad.'
        },
        price: 199,
        priceAfterDiscount: 149,
        discountPercentage: 25,
        images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        category: cats[6]._id,
        brand: { ar: 'دار النشر', en: 'BookHouse' },
        stock: 500, sold: 320, ratingsAverage: 4.9, ratingsQuantity: 120,
        tags: ['books', 'business', 'self-help']
      },
      // Kids
      {
        name: { ar: 'مجموعة ألعاب تعليمية للأطفال', en: 'Kids Educational Toy Set' },
        slug: 'kids-educational-toy-set',
        description: {
          ar: 'مجموعة ألعاب تعليمية تفاعلية للأطفال من 3-8 سنوات. تنمي المهارات العقلية والحركية. آمنة وخالية من المواد الضارة.',
          en: 'Interactive educational toy set for children ages 3-8. Develops mental and motor skills. Safe and free from harmful materials.'
        },
        price: 249,
        priceAfterDiscount: 189,
        discountPercentage: 24,
        images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400',
        category: cats[7]._id,
        brand: { ar: 'كيدز وورلد', en: 'KidsWorld' },
        stock: 200, sold: 145, ratingsAverage: 4.7, ratingsQuantity: 68,
        tags: ['toys', 'kids', 'educational']
      },
      // More electronics
      {
        name: { ar: 'شاحن لاسلكي سريع', en: 'Fast Wireless Charger' },
        slug: 'fast-wireless-charger',
        description: {
          ar: 'شاحن لاسلكي سريع 15 واط، متوافق مع جميع الأجهزة الداعمة للشحن اللاسلكي. تصميم أنيق مع إضاءة LED.',
          en: 'Fast 15W wireless charger, compatible with all wireless charging devices. Sleek design with LED lighting.'
        },
        price: 129,
        priceAfterDiscount: 89,
        discountPercentage: 31,
        images: ['https://images.unsplash.com/photo-1586953208270-767889fa9b3f?w=600'],
        thumbnail: 'https://images.unsplash.com/photo-1586953208270-767889fa9b3f?w=400',
        category: cats[0]._id,
        brand: { ar: 'تشارج برو', en: 'ChargePro' },
        stock: 400, sold: 280, ratingsAverage: 4.3, ratingsQuantity: 55,
        tags: ['charger', 'wireless', 'fast-charging']
      }
    ]);

    // Create coupons
    console.log('🎟️  Creating coupons...');
    await Coupon.create([
      { code: 'WELCOME20', type: 'percent', discount: 20, minOrder: 100, maxUses: 1000, expiresAt: new Date('2027-12-31') },
      { code: 'SAVE50', type: 'fixed', discount: 50, minOrder: 200, maxUses: 500, expiresAt: new Date('2027-06-30') },
      { code: 'VIP30', type: 'percent', discount: 30, minOrder: 300, maxUses: 100, expiresAt: new Date('2027-03-31') }
    ]);

    // Create reviews
    console.log('⭐ Creating reviews...');
    const reviewData = [];
    for (let i = 0; i < products.length; i++) {
      const reviewUsers = users.slice(0, Math.min(3, users.length));
      const comments_ar = [
        'منتج ممتاز! أنصح به بشدة',
        'جودة عالية وسعر مناسب، شكراً سوق ستور',
        'وصل بسرعة والتغليف ممتاز، سأطلب مرة أخرى'
      ];
      for (let j = 0; j < reviewUsers.length; j++) {
        reviewData.push({
          user: reviewUsers[j]._id,
          product: products[i]._id,
          rating: 4 + Math.floor(Math.random() * 2),
          comment: comments_ar[j]
        });
      }
    }
    await Review.create(reviewData);

    // Create sample orders
    console.log('🛒 Creating orders...');
    await Order.create([
      {
        user: users[0]._id,
        items: [
          { product: products[0]._id, name: products[0].name, price: 249, quantity: 1, image: products[0].thumbnail },
          { product: products[1]._id, name: products[1].name, price: 449, quantity: 1, image: products[1].thumbnail }
        ],
        shippingAddress: { details: 'شارع الملك فهد', city: 'الرياض', postalCode: '11564', phone: '+966509876543' },
        paymentMethod: 'card', itemsPrice: 698, shippingPrice: 0, taxPrice: 104.7,
        totalPrice: 802.7, status: 'delivered', isPaid: true, paidAt: new Date(), isDelivered: true, deliveredAt: new Date()
      },
      {
        user: users[1]._id,
        items: [
          { product: products[5]._id, name: products[5].name, price: 999, quantity: 1, image: products[5].thumbnail }
        ],
        shippingAddress: { details: 'حي العزيزية', city: 'جدة', postalCode: '21452', phone: '+966507654321' },
        paymentMethod: 'cash', itemsPrice: 999, shippingPrice: 0, taxPrice: 149.85,
        totalPrice: 1148.85, status: 'shipped', isPaid: true, paidAt: new Date()
      },
      {
        user: users[2]._id,
        items: [
          { product: products[6]._id, name: products[6].name, price: 1499, quantity: 1, image: products[6].thumbnail },
          { product: products[9]._id, name: products[9].name, price: 149, quantity: 2, image: products[9].thumbnail }
        ],
        shippingAddress: { details: 'شارع الشيخ زايد', city: 'دبي', postalCode: '00000', phone: '+971501234567' },
        paymentMethod: 'card', itemsPrice: 1797, shippingPrice: 0, taxPrice: 269.55,
        totalPrice: 2066.55, status: 'processing', isPaid: true, paidAt: new Date()
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin: admin@souqstore.com / admin123');
    console.log('📧 User:  ahmed@test.com / user123');
    process.exit();
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
