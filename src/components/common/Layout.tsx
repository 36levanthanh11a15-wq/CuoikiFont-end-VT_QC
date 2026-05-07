import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, User, Menu, X, Search, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { Badge, Input, Drawer, Button } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../../store/useStore';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Sản phẩm', path: '/products' },
    { title: 'Giới thiệu', path: '/about' },
    { title: 'Liên hệ', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-black tracking-tighter">
              <span className="text-primary italic">C&T</span>
              <span className="text-white ml-1">SPORT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-widest font-bold transition-all hover:text-primary ${
                  location.pathname === link.path ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-400'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-white/10 text-gray-300 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
            <Link to="/cart">
              <Badge count={itemCount()} offset={[1, 1]} color="#FF4D00" size="small">
                <div className="p-2 hover:bg-white/10 text-gray-300 rounded-full transition-colors">
                  <ShoppingCart size={20} />
                </div>
              </Badge>
            </Link>
            {user ? (
              <Link to="/account" className="hidden sm:flex items-center space-x-2 p-1 pl-1 pr-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center font-bold text-xs">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-white mb-0.5">{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button type="primary" size="small" className="h-10 px-6 rounded-md uppercase text-xs font-bold tracking-widest">Đăng nhập</Button>
              </Link>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 hover:bg-white/10 text-white rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b px-4 py-8 shadow-xl overflow-hidden"
          >
            <div className="max-w-3xl mx-auto flex items-center bg-gray-50 rounded-xl px-4 py-2">
              <Search className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="w-full bg-transparent border-none focus:outline-none py-2"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/products?search=${e.currentTarget.value}`);
                    setIsSearchOpen(false);
                  }
                }}
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-dark">
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <Drawer
        placement="right"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
        closeIcon={<X size={24} />}
        size="default"
        styles={{ header: { border: 'none' } }}
      >
        <div className="flex flex-col space-y-6 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-display font-medium border-b pb-4"
            >
              {link.title}
            </Link>
          ))}
          {!user && (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button type="primary" block size="large">Đăng nhập</Button>
            </Link>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-display font-black tracking-tighter">
                <span className="text-primary italic">C&T</span>
                <span className="text-white ml-1">SPORT</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-widest font-medium">
              Nâng tầm đam mê thể thao với trang bị chuyên nghiệp.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/lzthanh.311/" className="p-2 bg-white/5 hover:bg-primary transition-all rounded-lg">
                <Facebook size={18} className="text-gray-400 hover:text-white" />
              </a>
              <a href="https://www.instagram.com/haht_nv31" className="p-2 bg-white/5 hover:bg-primary transition-all rounded-lg">
                <Instagram size={18} className="text-gray-400 hover:text-white" />
              </a>
              <a href="https://x.com/?lang=vi" className="p-2 bg-white/5 hover:bg-primary transition-all rounded-lg">
                <Twitter size={18} className="text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Khám phá</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/products?category=Bóng đá" className="hover:text-primary">Bóng đá chuyên nghiệp</Link></li>
              <li><Link to="/products?category=Gym" className="hover:text-primary">Trang phục Gym/Yoga</Link></li>
              <li><Link to="/products?category=Chạy bộ" className="hover:text-primary">Chạy bộ & Marathon</Link></li>
              <li><Link to="/products?category=Phụ kiện" className="hover:text-primary">Phụ kiện công nghệ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Hỗ trợ</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/contact" className="hover:text-primary">Liên hệ ngay</Link></li>
              <li><a href="#" className="hover:text-primary">Chính sách vận chuyển</a></li>
              <li><a href="#" className="hover:text-primary">Đổi trả & Hoàn tiền</a></li>
              <li><a href="#" className="hover:text-primary">Hướng dẫn chọn size</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Liên hệ trực tiếp</h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span>+84 987 654 321</span>
              </div>
              <p>Hệ thống cửa hàng trên toàn quốc của Văn Thanh & Quốc Cường luôn sẵn sàng phục vụ.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 C&T Sport. Được phát triển bởi Văn Thanh & Quốc Cường.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white">Bảo mật thông tin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
