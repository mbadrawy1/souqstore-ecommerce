import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { demoProducts, demoCategories } from '../utils/demoData';

export default function Products() {
  const { t, lang, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    sort: searchParams.get('sort') || 'newest',
    search: searchParams.get('search') || ''
  });

  const filteredProducts = useMemo(() => {
    let result = [...demoProducts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        p.name.ar.toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q) ||
        p.description.ar.toLowerCase().includes(q) ||
        p.description.en.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter(p => p.category._id === filters.category);
    }

    if (filters.minPrice) {
      result = result.filter(p => {
        const price = p.priceAfterDiscount > 0 ? p.priceAfterDiscount : p.price;
        return price >= Number(filters.minPrice);
      });
    }

    if (filters.maxPrice) {
      result = result.filter(p => {
        const price = p.priceAfterDiscount > 0 ? p.priceAfterDiscount : p.price;
        return price <= Number(filters.maxPrice);
      });
    }

    if (filters.rating) {
      result = result.filter(p => p.ratingsAverage >= Number(filters.rating));
    }

    switch (filters.sort) {
      case 'price-asc': result.sort((a, b) => (a.priceAfterDiscount || a.price) - (b.priceAfterDiscount || b.price)); break;
      case 'price-desc': result.sort((a, b) => (b.priceAfterDiscount || b.price) - (a.priceAfterDiscount || a.price)); break;
      case 'rating': result.sort((a, b) => b.ratingsAverage - a.ratingsAverage); break;
      case 'bestselling': result.sort((a, b) => b.sold - a.sold); break;
      default: result.sort((a, b) => b._id.localeCompare(a._id));
    }

    return result;
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '', rating: '', sort: 'newest', search: '' });
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.rating || filters.search;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{filters.search ? `${isRTL ? 'نتائج البحث عن' : 'Search results for'}: "${filters.search}"` : t('products')}</h1>
          <p className="text-[#9B9BB8] mt-1">{filteredProducts.length} {isRTL ? 'منتج' : 'products'}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="input !rounded-full !py-2 !px-4 !w-auto !text-sm"
            id="sort-select"
          >
            <option value="newest">{t('newest')}</option>
            <option value="price-asc">{t('priceLowHigh')}</option>
            <option value="price-desc">{t('priceHighLow')}</option>
            <option value="rating">{t('topRated')}</option>
            <option value="bestselling">{isRTL ? 'الأكثر مبيعاً' : 'Best Selling'}</option>
          </select>
          {/* View Mode */}
          <div className="hidden sm:flex items-center gap-1 glass rounded-full p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'gradient-bg text-white' : 'text-[#6B6B8A]'}`}><Grid3X3 size={16} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'gradient-bg text-white' : 'text-[#6B6B8A]'}`}><List size={16} /></button>
          </div>
          {/* Filter Toggle (mobile) */}
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden btn-secondary !rounded-full !py-2 !px-4 !text-sm">
            <SlidersHorizontal size={16} /> {t('filterBy')}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-[#0A0A1A]/90 lg:relative lg:bg-transparent' : 'hidden'} lg:block lg:w-64 shrink-0`}>
          <div className={`${showFilters ? 'absolute top-0 right-0 rtl:right-auto rtl:left-0 w-80 h-full bg-[#12122A] p-6 overflow-y-auto' : ''} lg:relative lg:w-full lg:p-0`}>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-4 left-4 rtl:left-auto rtl:right-4 text-[#9B9BB8]"><X size={20} /></button>
            )}

            <div className="space-y-6">
              {/* Active filters badge */}
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm text-[#FF6B6B] hover:underline flex items-center gap-1">
                  <X size={14} /> {isRTL ? 'مسح الفلاتر' : 'Clear filters'}
                </button>
              )}

              {/* Search within results */}
              <div>
                <h4 className="font-semibold text-sm mb-3">{t('search')}</h4>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  placeholder={t('search')}
                  className="input !rounded-xl !py-2.5 !text-sm"
                  id="filter-search"
                />
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-sm mb-3">{t('categories')}</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => updateFilter('category', '')}
                    className={`w-full text-start py-2 px-3 rounded-xl text-sm transition-colors ${!filters.category ? 'bg-[#6C63FF]/20 text-[#8B83FF] font-semibold' : 'text-[#9B9BB8] hover:bg-[#1A1A3E]'}`}
                  >
                    {t('allCategories')}
                  </button>
                  {demoCategories.map(cat => (
                    <button
                      key={cat._id}
                      onClick={() => updateFilter('category', cat._id)}
                      className={`w-full text-start py-2 px-3 rounded-xl text-sm transition-colors flex items-center gap-2 ${filters.category === cat._id ? 'bg-[#6C63FF]/20 text-[#8B83FF] font-semibold' : 'text-[#9B9BB8] hover:bg-[#1A1A3E]'}`}
                    >
                      <span>{cat.icon}</span> {cat.name[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-sm mb-3">{t('priceRange')} ({t('sar')})</h4>
                <div className="flex gap-2">
                  <input type="number" value={filters.minPrice} onChange={(e) => updateFilter('minPrice', e.target.value)} placeholder={isRTL ? 'من' : 'Min'} className="input !rounded-xl !py-2 !text-sm" />
                  <input type="number" value={filters.maxPrice} onChange={(e) => updateFilter('maxPrice', e.target.value)} placeholder={isRTL ? 'إلى' : 'Max'} className="input !rounded-xl !py-2 !text-sm" />
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-semibold text-sm mb-3">{isRTL ? 'التقييم' : 'Rating'}</h4>
                <div className="space-y-1">
                  {[4, 3, 2, 1].map(r => (
                    <button
                      key={r}
                      onClick={() => updateFilter('rating', filters.rating === String(r) ? '' : String(r))}
                      className={`w-full text-start py-2 px-3 rounded-xl text-sm transition-colors flex items-center gap-2 ${filters.rating === String(r) ? 'bg-[#6C63FF]/20' : 'hover:bg-[#1A1A3E]'}`}
                    >
                      <div className="stars">{[1,2,3,4,5].map(s => <span key={s} className={s <= r ? 'text-[#FFD700]' : 'text-[#2A2A5A]'}>★</span>)}</div>
                      <span className="text-[#6B6B8A]">{isRTL ? 'وأعلى' : '& up'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-bold mb-2">{t('noResults')}</h3>
              <p className="text-[#6B6B8A]">{isRTL ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria'}</p>
              <button onClick={clearFilters} className="btn-primary !rounded-full mt-4">{isRTL ? 'مسح الفلاتر' : 'Clear Filters'}</button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product, i) => (
                <div key={product._id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
