import React from 'react';
import { Row, Col, Button, InputNumber, Divider, Empty, Breadcrumb } from 'antd';
import { Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useStore';

const CartPage: React.FC = () => {
  const { cartItems, removeItem, updateQuantity, totalPrice, itemCount } = useCartStore();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-[#0A0A0A]">
        <div className="flex flex-col items-center space-y-10 text-center max-w-md">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <ShoppingBag size={120} className="relative text-gray-800" />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-display font-black text-white uppercase italic tracking-tighter">GIỎ HÀNG TRỐNG</h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest leading-loose">
                Kho vũ khí của bạn hiện đang trống. Hãy khám phá bộ sưu tập của chúng tôi để trang bị cho chiến thắng.
              </p>
            </div>
            <Link to="/products">
              <Button type="primary" size="large" className="h-14 px-12 rounded-md font-black uppercase tracking-widest text-xs">
                XEM SẢN PHẨM
              </Button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb 
          className="mb-12 custom-breadcrumb"
          items={[
            { title: <Link to="/" className="text-gray-500 hover:text-primary uppercase text-[10px] font-black tracking-widest">Trang chủ</Link> },
            { title: <span className="text-gray-300 uppercase text-[10px] font-black tracking-widest">Giỏ hàng</span> }
          ]}
        />

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-primary font-display font-bold tracking-[0.3em] uppercase text-[10px]">
              Kiểm tra vật phẩm
            </span>
            <h1 className="text-6xl md:text-8xl text-white font-display font-black uppercase italic tracking-tighter">
              GIỎ <span className="text-primary">HÀNG</span>
              <span className="text-gray-700 ml-4 font-mono not-italic text-4xl">[{itemCount()}]</span>
            </h1>
          </div>
        </div>

        <Row gutter={[48, 48]}>
          <Col xs={24} lg={16}>
             <div className="bg-dark-light rounded-3xl p-8 border border-white/5 space-y-10">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex flex-col sm:flex-row items-center sm:items-start gap-8 pb-10 border-b border-white/5 last:border-0 last:pb-0">
                    <Link to={`/products/${item.slug}`} className="w-40 h-40 rounded-2xl overflow-hidden bg-[#252525] p-4 flex-shrink-0 border border-white/5 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </Link>
                    
                    <div className="flex-grow space-y-4 text-center sm:text-left pt-2">
                      <div className="flex justify-between items-start">
                        <Link to={`/products/${item.slug}`}>
                          <h3 className="text-xl font-display font-black text-white hover:text-primary transition-colors uppercase italic tracking-tighter">{item.name}</h3>
                        </Link>
                        <button 
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-gray-600 hover:text-primary transition-all active:scale-90 p-2"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                        <span className="text-[10px] bg-white/5 text-gray-400 px-4 py-1.5 rounded-sm font-black uppercase tracking-widest border border-white/5">SIZE: {item.size}</span>
                        <span className="text-[10px] bg-white/5 text-gray-400 px-4 py-1.5 rounded-sm font-black uppercase tracking-widest border border-white/5">MÀU: {item.color}</span>
                      </div>
                      
                      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-3xl font-display font-black text-white italic">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </div>
                        <div className="flex items-center space-x-6 bg-black px-4 py-2 rounded-xl border border-white/5">
                           <InputNumber 
                             min={1} 
                             max={100} 
                             value={item.quantity} 
                             onChange={(val) => val && updateQuantity(item.productId, item.size, item.color, val)}
                             className="custom-dark-input-number h-10 w-20 flex items-center text-md font-black italic"
                           />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </Col>

          <Col xs={24} lg={8}>
            <div className="bg-black rounded-3xl p-10 border border-primary/20 sticky top-28 space-y-10 shadow-[0_0_50px_rgba(255,77,0,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
              
              <h3 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter border-b border-white/5 pb-8">TỔNG <span className="text-primary">ĐƠN HÀNG</span></h3>
              
              <div className="space-y-6">
                <div className="flex justify-between text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                  <span>Tạm tính</span>
                  <span className="text-gray-300">{totalPrice().toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                  <span>Vận chuyển</span>
                  <span className="text-green-500 italic">MIỄN PHÍ</span>
                </div>
              </div>
              
              <Divider className="border-white/5" />
              
              <div className="flex justify-between items-end">
                <span className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] mb-1">TỔNG</span>
                <span className="text-4xl font-display font-black text-primary italic underline underline-offset-12 decoration-2">{totalPrice().toLocaleString('vi-VN')}₫</span>
              </div>

              <div className="space-y-6 pt-6">
                <Button 
                  type="primary" 
                  size="large" 
                  block 
                  className="h-16 font-black uppercase text-xs tracking-widest rounded-md flex items-center justify-center space-x-3 transition-transform active:scale-95"
                  onClick={() => navigate('/checkout')}
                >
                  <span>Thanh toán ngay</span>
                  <ArrowRight size={20} />
                </Button>
                <Link to="/products" className="block text-center text-gray-600 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest">
                  Tiếp tục mua hàng
                </Link>
              </div>

              <div className="pt-10 border-t border-white/5">
                <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Truck size={24} />
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-white uppercase tracking-widest">Giao hàng miễn phí</p>
                     <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Cho mọi đơn hàng</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartPage;
