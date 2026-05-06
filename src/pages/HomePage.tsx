import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Trophy, Zap, ShieldCheck, Truck } from 'lucide-react';
import { Button, Row, Col, Card, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { products } from '../data';
import { Product } from '../types';

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] bg-[#0A0A0A] flex items-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-600/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <Row align="middle" gutter={[32, 64]}>
          <Col xs={24} lg={12} className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-display font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
                 BỘ SƯU TẬP XUÂN 2026
              </span>
              <h1 className="text-6xl md:text-8xl text-white font-display font-black leading-[0.9] uppercase italic tracking-tighter mb-8">
                TRANG BỊ<br />
                <span className="text-primary">CHINH PHỤC</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-md mt-6 leading-relaxed">
                Nâng tầm đam mê thể thao với trang thiết bị chuyên nghiệp. Được tuyển chọn bởi Văn Thanh & Quốc Cường.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/products">
                <Button type="primary" size="large" className="h-14 px-10 text-sm font-black uppercase tracking-widest rounded-md">
                  MUA NGAY
                </Button>
              </Link>
              <Link to="/products">
                <Button ghost size="large" className="h-14 px-10 text-sm font-black uppercase tracking-widest border-white/20 text-white hover:!border-primary hover:!text-primary rounded-md">
                  HÀNG MỚI VỀ
                </Button>
              </Link>
            </motion.div>
          </Col>
          
          <Col xs={0} lg={12} className="relative">
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20"
             >
                <div className="relative group">
                   <div className="absolute inset-0 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all rounded-full" />
                   <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
                    alt="Sports Gear" 
                    className="relative z-10 rounded-3xl shadow-2xl skew-y-3 group-hover:skew-y-0 transition-transform duration-700 w-full"
                  />
                </div>
                
                {/* Stats Badge */}
                <div className="absolute -bottom-10 -left-10 bg-dark-light p-6 rounded-2xl border border-white/10 shadow-2xl z-20 hidden xl:block">
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Trophy size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Performance</p>
                        <p className="text-xl font-display font-black text-white italic">PRO GRADE</p>
                      </div>
                   </div>
                </div>
             </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex flex-col space-y-4 p-8 bg-dark-light border border-white/5 rounded-2xl group hover:border-primary/50 transition-all duration-500">
    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
      <Icon size={24} />
    </div>
    <div className="space-y-1">
      <h4 className="text-sm font-black uppercase tracking-widest text-white">{title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);

const CategoryCard = ({ name, image, count }: { name: string, image: string, count: number }) => (
  <Link to={`/products?category=${name}`} className="group relative overflow-hidden rounded-3xl block h-80 border border-white/5 transition-all hover:border-primary/50">
    <img 
      src={image} 
      alt={name} 
      className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
      <div className="flex items-center space-x-3 mb-2">
         <span className="w-8 h-1 bg-primary rounded-full group-hover:w-16 transition-all duration-500" />
         <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{count} ITEMS</p>
      </div>
      <h3 className="text-3xl text-white font-display font-black uppercase italic group-hover:text-primary transition-colors tracking-tighter">{name}</h3>
    </div>
  </Link>
);

const ProductItem = ({ product }: { product: Product }) => (
  <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/5 flex flex-col group transition-all duration-500 hover:border-primary/30 relative overflow-hidden">
    {/* Decorative light effect */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
    
    <Link to={`/products/${product.slug}`} className="relative block h-64 bg-[#252525] rounded-xl mb-6 overflow-hidden flex items-center justify-center">
      <img 
        alt={product.name} 
        src={product.images[0]} 
        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
      />
      {product.isNew && (
        <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest z-10">
          New
        </span>
      )}
    </Link>

    <div className="flex-grow space-y-3 z-10">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
        <span className="text-[10px] font-bold text-gray-400">{product.brand}</span>
      </div>
      <Link to={`/products/${product.slug}`}>
        <h4 className="text-md font-bold text-white truncate group-hover:text-primary transition-colors">{product.name}</h4>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-display font-black text-primary italic underline underline-offset-8">
          {product.price.toLocaleString('vi-VN')}₫
        </span>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all active:scale-90">
           <Zap size={18} fill="currentColor" />
        </button>
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0A0A0A]">
      <HeroSection />

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-primary font-display font-bold tracking-[0.3em] uppercase text-[10px]">
              KHÁM PHÁ DANH MỤC
            </span>
            <h2 className="text-5xl md:text-6xl text-white font-display font-black uppercase italic tracking-tighter">
              MUA THEO <span className="text-primary">PHÂN LOẠI</span>
            </h2>
          </div>
          <Link to="/products" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors border-b border-gray-800 pb-2">
            Xem tất cả danh mục
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Bóng đá", image: "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/06/hinh-nen-bong-da-thumb.jpg", count: 124 },
            { name: "Gym", image: "https://smilemedia.vn/wp-content/uploads/2023/07/cach-tao-dang-chup-anh-gym-nam-7.jpg", count: 89 },
            { name: "Chạy bộ", image: "https://png.pngtree.com/thumb_back/fh260/background/20240912/pngtree-man-running-towards-sunset-on-track-fitness-motivation-stock-photo-image_16166641.jpg", count: 56 }
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <CategoryCard {...cat} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={Zap} 
              title="GIAO HÀNG SIÊU TỐC" 
              desc="Vận chuyển nhanh chóng trong 24h đối với khu vực nội thành."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="CHẤT LƯỢNG ELITE" 
              desc="Trang bị chuyên nghiệp được kiểm duyệt khắt khe từ nhà sản xuất."
            />
            <FeatureCard 
              icon={Trophy} 
              title="CHUYÊN GIA THỂ THAO" 
              desc="Được tin dùng bởi các vận động viên chuyên nghiệp hàng đầu."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-primary font-display font-bold tracking-[0.3em] uppercase text-[10px]">
              HÀNG MỚI VỀ
            </span>
            <h2 className="text-5xl md:text-6xl text-white font-display font-black uppercase italic tracking-tighter">
              TRANG BỊ <span className="text-primary">NỔI BẬT</span>
            </h2>
          </div>
          <Link to="/products" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors border-b border-gray-800 pb-2">
            Xem tất cả sản phẩm
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductItem product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Logos Placeholder */}
      <section className="max-w-7xl mx-auto px-4 text-center">
         <p className="text-gray-400 font-bold uppercase tracking-[0.3em] mb-12">Đối tác thương hiệu</p>
         <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-3xl font-display font-bold italic">NIKE</span>
            <span className="text-3xl font-display font-bold italic">ADIDAS</span>
            <span className="text-3xl font-display font-bold italic">PUMA</span>
            <span className="text-3xl font-display font-bold italic">UNDER ARMOUR</span>
            <span className="text-3xl font-display font-bold italic">ASICS</span>
         </div>
      </section>
    </div>
  );
};

export default HomePage;
