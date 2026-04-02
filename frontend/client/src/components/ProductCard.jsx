import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductCard({ product, onWishlistToggle }) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const name = product.name?.[lang] || product.name?.ar || '';
  const price = product.price;
  const salePrice = product.priceAfterDiscount;
  const hasDiscount = salePrice > 0 && salePrice < price;
  const discountPct = product.discountPercentage || (hasDiscount ? Math.round((1 - salePrice / price) * 100) : 0);
  const image = product.thumbnail || product.images?.[0] || '';

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWished(!isWished);
    toast.success(isWished ? (lang === 'ar' ? 'تم الإزالة من المفضلة' : 'Removed from wishlist') : (lang === 'ar' ? 'تمت الإضافة للمفضلة ❤️' : 'Added to wishlist ❤️'));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="card group block overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product._id}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-[#12122A]">
        {/* Shimmer placeholder */}
        {!imgLoaded && <div className="absolute inset-0 shimmer bg-[#1A1A3E]" />}
        
        <img
          src={image}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#0A0A1A]/80 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Badges */}
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="badge badge-sale">
              {discountPct}% {t('discount')}
            </span>
          )}
          {product.isFeatured && (
            <span className="badge badge-hot">
              🔥 {lang === 'ar' ? 'مميز' : 'Hot'}
            </span>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className={`absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 rtl:-translate-x-4'}`}>
          <button
            onClick={handleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${isWished ? 'bg-[#FF6B6B] text-white' : 'bg-black/40 text-white hover:bg-[#FF6B6B]'}`}
          >
            <Heart size={16} fill={isWished ? 'white' : 'none'} />
          </button>
          <Link
            to={`/products/${product._id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-[#6C63FF] transition-all backdrop-blur-sm"
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Add to Cart Button - Bottom */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleAddToCart}
            className="btn-primary w-full !rounded-full !py-2.5 !text-sm justify-center"
          >
            <ShoppingCart size={16} />
            {t('addToCart')}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-sm">{product.category?.icon}</span>
          <span className="text-xs text-[#6B6B8A]">
            {product.category?.name?.[lang] || ''}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-[#E8E8F0] mb-2 line-clamp-2 group-hover:text-[#8B83FF] transition-colors leading-relaxed">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="stars">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                size={14}
                fill={i <= Math.round(product.ratingsAverage || 0) ? '#FFD700' : 'none'}
                className={i <= Math.round(product.ratingsAverage || 0) ? 'star' : 'star-empty'}
                stroke={i <= Math.round(product.ratingsAverage || 0) ? '#FFD700' : '#2A2A5A'}
              />
            ))}
          </div>
          <span className="text-xs text-[#6B6B8A]">({product.ratingsQuantity || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[#6C63FF]">
            {hasDiscount ? salePrice : price} {t('sar')}
          </span>
          {hasDiscount && (
            <span className="text-sm text-[#6B6B8A] line-through">
              {price} {t('sar')}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {product.stock !== undefined && product.stock <= 10 && product.stock > 0 && (
          <p className="text-xs text-[#FFAA00] mt-2 flex items-center gap-1">
            ⚡ {lang === 'ar' ? `باقي ${product.stock} فقط!` : `Only ${product.stock} left!`}
          </p>
        )}
      </div>
    </Link>
  );
}
