import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from './LanguageContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i._id === product._id);
      if (existing) {
        return prev.map(i =>
          i._id === product._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success('تمت الإضافة للسلة ✓');
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(i => i._id !== id));
    toast.success('تم الحذف من السلة');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i._id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const getPrice = (item) => {
    return item.priceAfterDiscount > 0 ? item.priceAfterDiscount : item.price;
  };

  const subtotal = items.reduce((sum, item) => sum + getPrice(item) * item.quantity, 0);
  const shippingCost = subtotal > 200 ? 0 : 25;
  const tax = Number((subtotal * 0.15).toFixed(2));
  const discount = coupon ? (coupon.type === 'percent' ? (subtotal * coupon.discount / 100) : coupon.discount) : 0;
  const total = Number((subtotal + shippingCost + tax - discount).toFixed(2));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      subtotal, shippingCost, tax, discount, total, itemCount,
      coupon, setCoupon, getPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
