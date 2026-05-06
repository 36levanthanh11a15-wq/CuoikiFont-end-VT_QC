import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Rate, InputNumber, Radio, Divider, Breadcrumb, Tabs, App, Tag } from 'antd';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data';
import { useCartStore } from '../store/useStore';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { message } = App.useApp();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Sản phẩm không tồn tại</h2>
        <Button type="primary" onClick={() => navigate('/products')}>Quay lại cửa hàng</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    message.success({
      content: `Đã thêm ${product.name} vào giỏ hàng!`,
      icon: <ShoppingCart size={18} className="text-primary mt-1 mr-2" />,
      style: { marginTop: '10vh' }
    });
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb 
          className="mb-12 custom-breadcrumb"
          items={[
            { title: <Link to="/" className="text-gray-500 hover:text-primary uppercase text-[10px] font-black tracking-widest">Trang chủ</Link> },
            { title: <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-primary uppercase text-[10px] font-black tracking-widest">{product.category}</Link> },
            { title: <span className="text-gray-300 uppercase text-[10px] font-black tracking-widest">{product.name}</span> }
          ]}
        />

        <Row gutter={[64, 48]}>
          {/* Visuals */}
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              <motion.div 
                layoutId={`img-${product.id}`}
                className="aspect-square bg-dark-light rounded-3xl overflow-hidden border border-white/5 p-8 flex items-center justify-center relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                <img src={selectedImage} alt={product.name} className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-110" />
              </motion.div>
              <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all p-2 bg-dark-light ${selectedImage === img ? 'border-primary' : 'border-white/5'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </Col>

          {/* Info */}
          <Col xs={24} lg={12} className="space-y-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Tag color="#FF4D00" className="font-black border-none px-4 py-0.5 uppercase text-[10px] tracking-widest rounded-sm">{product.brand}</Tag>
                {product.isNew && <Tag color="#1890ff" className="font-black border-none px-4 py-0.5 uppercase text-[10px] tracking-widest rounded-sm">Hàng Mới</Tag>}
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-black leading-[1.1] text-white uppercase italic tracking-tighter">{product.name}</h1>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-primary">
                  <Rate disabled defaultValue={product.rating} className="text-primary text-sm custom-dark-rate" />
                  <span className="ml-3 font-black text-gray-400 text-xs tracking-tighter">({product.numReviews} ĐÁNH GIÁ)</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-6">
                <span className="text-5xl font-display font-black text-primary italic underline underline-offset-12 decoration-4">
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-600 line-through italic font-bold">
                    {product.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>
            </div>

            <Divider className="border-white/5" />

            {/* Options */}
            <div className="space-y-8">
              {product.sizes.length > 0 && product.sizes[0] !== 'Standard' && (
                <div className="space-y-4">
                  <p className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 italic">Chọn Size</p>
                  <Radio.Group value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="custom-dark-radio-group">
                    {product.sizes.map(size => (
                      <Radio.Button key={size} value={size} className="mr-3 mb-3 rounded-md border-white/10 bg-dark-light text-gray-400 font-black h-12 px-6 flex items-center justify-center hover:!border-primary hover:!text-white transition-all">
                        {size}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>
              )}

              {product.colors.length > 0 && product.colors[0] !== 'Standard' && (
                <div className="space-y-4">
                   <p className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 italic">Chọn Màu</p>
                   <Radio.Group value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="custom-dark-radio-group">
                    {product.colors.map(color => (
                      <Radio.Button key={color} value={color} className="mr-3 mb-3 rounded-md border-white/10 bg-dark-light text-gray-400 font-black h-12 px-6 flex items-center justify-center hover:!border-primary hover:!text-white transition-all">
                        {color}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </div>
              )}

              <div className="space-y-4">
                <p className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 italic">Số lượng</p>
                <div className="flex items-center space-x-6">
                  <InputNumber 
                    min={1} 
                    max={product.stock} 
                    value={quantity} 
                    onChange={(val) => setQuantity(val || 1)}
                    className="custom-dark-input-number h-14 w-32 flex items-center text-xl font-black italic"
                  />
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{product.stock} CÒN HÀNG</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Button 
                type="primary" 
                size="large" 
                icon={<ShoppingCart size={20} className="mr-3" />}
                className="h-16 flex-grow text-sm font-black uppercase tracking-widest rounded-md"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </Button>
              <Button 
                size="large" 
                icon={<Heart size={20} />}
                className="h-16 w-16 rounded-md border-white/10 bg-dark-light text-gray-400 flex items-center justify-center hover:!border-primary hover:!text-primary transition-all"
              />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/5">
              <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                <ShieldCheck size={18} className="text-primary" />
                <span>Chính hãng 100%</span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                <Truck size={18} className="text-primary" />
                <span>Giao hàng nhanh</span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                <RefreshCw size={18} className="text-primary" />
                <span>Đổi trả dễ dàng</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Details Tabs */}
        <div className="mt-32 border-t border-white/5 pt-20">
          <Tabs
            defaultActiveKey="1"
            className="custom-dark-tabs"
            items={[
              {
                key: '1',
                label: <span className="px-6 font-black uppercase text-xs tracking-widest italic">Mô tả sản phẩm</span>,
                children: (
                  <div className="max-w-4xl py-12 space-y-8 text-gray-400 leading-relaxed text-lg">
                    <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                      {product.description}
                    </p>
                    <p>
                        Sản phẩm hiệu suất cao được thiết kế cho độ bền và sức mạnh tối thượng. 
                        Phù hợp cho môi trường tập luyện và thi đấu cường độ cao.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                       {[
                         `Công nghệ vật liệu tiên tiến từ ${product.brand}`,
                         "Thiết kế ôm sát chuyên nghiệp cho chuyển động linh hoạt",
                         "Đã được thử nghiệm bởi các vận động viên chuyên nghiệp",
                         "Gia cố cấu trúc thoáng khí tại các vùng chịu lực cao"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center space-x-3 text-sm text-gray-500">
                           <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                           <span>{item}</span>
                         </li>
                       ))}
                    </ul>
                  </div>
                ),
              },
              {
                key: '2',
                label: <span className="px-6 font-black uppercase text-xs tracking-widest italic">Thông số kỹ thuật</span>,
                children: (
                  <div className="max-w-2xl py-12">
                    <div className="grid grid-cols-1 gap-1 border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                      {[
                        { label: 'Thương hiệu', value: product.brand },
                        { label: 'Chất liệu', value: 'Polymer tổng hợp cao cấp / Lưới gia cố' },
                        { label: 'Xuất xứ', value: 'Nhà máy đạt chuẩn toàn cầu' },
                        { label: 'Mã Series', value: `CT-SPORT-0${product.id}` }
                      ].map((spec, i) => (
                        <div key={i} className="grid grid-cols-2 p-6 bg-dark-light">
                          <div className="font-black text-[10px] uppercase tracking-widest text-gray-500">{spec.label}</div>
                          <div className="text-white font-bold text-sm italic">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                key: '3',
                label: <span className="px-6 font-black uppercase text-xs tracking-widest italic">Đánh giá người dùng ({product.numReviews})</span>,
                children: (
                  <div className="py-24 text-center space-y-6 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                    <Rate disabled defaultValue={product.rating} className="text-primary text-xl custom-dark-rate" />
                    <div className="space-y-1">
                      <p className="text-white font-black uppercase tracking-widest italic">Chưa có đánh giá chi tiết</p>
                      <p className="text-gray-500 text-xs">Hãy là người đầu tiên chia sẻ trải nghiệm của bạn.</p>
                    </div>
                  </div>
                ),
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
