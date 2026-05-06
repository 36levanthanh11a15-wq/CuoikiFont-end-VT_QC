import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Row, Col, Input, Button, Radio, Divider, App, Breadcrumb, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, User, CheckCircle2, QrCode, Building, Info } from 'lucide-react';
import { useCartStore, useAuthStore } from '../store/useStore';

// 1. Schema Validation (Simplified & Robust for Demo)
const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Vui lòng nhập họ và tên'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ giao hàng'),
  city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  paymentMethod: z.enum(['COD', 'Banking', 'QR']),
  // Demo banking info (only required if paymentMethod is Banking)
  bankAccountName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankName: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage: React.FC = () => {
  const { message, modal } = App.useApp();
  const { cartItems, totalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Setup Form with Controller configuration
  const { control, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || '',
      phone: '',
      address: '',
      city: '',
      paymentMethod: 'COD',
      bankAccountName: '',
      bankAccountNumber: '',
      bankName: 'MB BANK'
    }
  });

  const paymentMethodSelected = watch('paymentMethod');

  useEffect(() => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để tiến hành thanh toán!');
      navigate('/login?redirect=checkout');
    }
  }, [user, navigate]);

  // 3. Xử lý đặt hàng
  const finalizeOrder = (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Giả lập loading để demo chuyên nghiệp
    setTimeout(() => {
      console.log('Order Submitted:', { data, items: cartItems });
      
      message.success({
        content: 'Đặt hàng thành công! Đội ngũ C&T SPORT sẽ liên hệ bạn sớm nhất.',
        icon: <CheckCircle2 size={18} className="text-primary mt-1 mr-2" />,
      });
      
      clearCart();
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
  };

  const onSubmit = (data: CheckoutFormValues) => {
    finalizeOrder(data);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-[#0A0A0A]">
        <div className="flex flex-col items-center space-y-8 text-center max-w-md">
            <CreditCard size={100} className="text-gray-800" />
            <h2 className="text-white font-display font-black text-4xl italic uppercase">GIỎ HÀNG TRỐNG</h2>
            <Link to="/products">
              <Button type="primary" size="large" className="h-14 px-12 font-black uppercase text-xs">TIẾP TỤC MUA SẮM</Button>
            </Link>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb 
          className="mb-12 custom-breadcrumb"
          items={[
            { title: <Link to="/" className="text-gray-500 uppercase text-[10px] font-black tracking-widest italic">Trang chủ</Link> },
            { title: <Link to="/cart" className="text-gray-500 uppercase text-[10px] font-black tracking-widest italic">Giỏ hàng</Link> },
            { title: <span className="text-gray-300 uppercase text-[10px] font-black tracking-widest italic">Thanh toán</span> }
          ]}
        />

        <div className="mb-16">
            <h1 className="text-6xl md:text-8xl text-white font-display font-black uppercase italic tracking-tighter">
              THANH <span className="text-primary">TOÁN</span>
            </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[48, 48]}>
            {/* Shipping Info Column */}
            <Col xs={24} lg={15}>
              <div className="bg-dark-light rounded-3xl p-10 border border-white/5 space-y-12">
                <div className="space-y-8">
                  <h2 className="text-2xl font-display font-black uppercase text-white italic tracking-tighter flex items-center">
                    <User size={24} className="mr-4 text-primary" /> THÔNG TIN NHẬN HÀNG
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Họ tên */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Họ và tên</label>
                       <Controller
                         name="fullName"
                         control={control}
                         render={({ field }) => (
                           <Input 
                             {...field}
                             size="large" 
                             placeholder="VD: Nguyễn Văn A" 
                             className="custom-dark-input h-14 rounded-md font-bold"
                             status={errors.fullName ? 'error' : ''}
                           />
                         )}
                       />
                       {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Số điện thoại */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Số điện thoại</label>
                       <Controller
                         name="phone"
                         control={control}
                         render={({ field }) => (
                           <Input 
                             {...field}
                             size="large" 
                             placeholder="VD: 0912345678" 
                             className="custom-dark-input h-14 rounded-md font-bold"
                             status={errors.phone ? 'error' : ''}
                           />
                         )}
                       />
                       {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Tỉnh thành */}
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Tỉnh / Thành phố</label>
                       <Controller
                         name="city"
                         control={control}
                         render={({ field }) => (
                           <Select 
                             {...field}
                             size="large"
                             placeholder="Chọn tỉnh/thành phố"
                             className="custom-dark-select w-full h-14 font-bold"
                             status={errors.city ? 'error' : ''}
                             options={[
                               { value: 'Hà Nội', label: 'Hà Nội' },
                               { value: 'Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
                               { value: 'Đà Nẵng', label: 'Đà Nẵng' },
                               { value: 'Bình Dương', label: 'Bình Dương' },
                               { value: 'Khác', label: 'Tỉnh/Thành khác...' },
                             ]}
                           />
                         )}
                       />
                       {errors.city && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.city.message}</p>}
                    </div>

                    {/* Địa chỉ */}
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Địa chỉ giao hàng</label>
                       <Controller
                         name="address"
                         control={control}
                         render={({ field }) => (
                           <Input.TextArea 
                             {...field}
                             rows={3}
                             placeholder="Số nhà, tên đường, phường/xã..." 
                             className="custom-dark-input rounded-md font-bold pt-4"
                             status={errors.address ? 'error' : ''}
                           />
                         )}
                       />
                       {errors.address && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.address.message}</p>}
                    </div>
                  </div>
                </div>

                <Divider className="border-white/5" />

                <div className="space-y-8">
                  <h2 className="text-2xl font-display font-black uppercase text-white italic tracking-tighter flex items-center">
                    <CreditCard size={24} className="mr-4 text-primary" /> PHƯƠNG THỨC THANH TOÁN
                  </h2>
                  
                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <Radio.Group 
                        {...field}
                        className="w-full flex flex-col space-y-4"
                      >
                        <div className={`border rounded-2xl p-6 cursor-pointer transition-all flex items-center justify-between ${field.value === 'COD' ? 'border-primary bg-primary/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                           <Radio value="COD" className="custom-dark-radio">
                              <span className="ml-2 font-black text-xs uppercase text-white italic tracking-widest">Thanh toán khi nhận hàng (COD)</span>
                           </Radio>
                           <Truck size={24} className={field.value === 'COD' ? 'text-primary' : 'text-gray-700'} />
                        </div>
                        
                        <div className={`border rounded-2xl p-6 cursor-pointer transition-all flex items-center justify-between ${field.value === 'QR' ? 'border-primary bg-primary/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                           <Radio value="QR" className="custom-dark-radio">
                              <span className="ml-2 font-black text-xs uppercase text-white italic tracking-widest">Chuyển khoản VietQR (Nhanh)</span>
                           </Radio>
                           <QrCode size={24} className={field.value === 'QR' ? 'text-primary' : 'text-gray-700'} />
                        </div>

                        {field.value === 'QR' && (
                          <div className="bg-white/5 rounded-2xl p-8 border border-primary/20 flex flex-col md:flex-row items-center gap-8 mt-2 animate-in fade-in slide-in-from-top-4 duration-500">
                             <div className="bg-white p-2 rounded-xl border border-gray-200">
                                <img 
                                  src="https://i.ibb.co/CpSc7cnY/nh-chuy-n-kho-n-V-n-Thanh.png" 
                                  alt="QR Thanh toán" 
                                  className="w-[180px] h-auto"
                                />
                             </div>
                             <div className="space-y-4 text-center md:text-left">
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Chủ tài khoản</p>
                                 <p className="font-display font-black text-white text-xl uppercase italic">LE VAN THANH</p>
                               </div>
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Số tài khoản</p>
                                 <p className="font-mono text-primary font-black text-2xl">291926868</p>
                               </div>
                               <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                 <Info size={12} className="mr-2 text-primary" /> Quét mã để thanh toán ngay
                               </div>
                             </div>
                          </div>
                        )}

                        <div className={`border rounded-2xl p-6 cursor-pointer transition-all flex items-center justify-between ${field.value === 'Banking' ? 'border-primary bg-primary/5' : 'border-white/5 bg-black/40 hover:border-white/10'}`}>
                           <Radio value="Banking" className="custom-dark-radio">
                              <span className="ml-2 font-black text-xs uppercase text-white italic tracking-widest">Chuyển khoản Ngân hàng</span>
                           </Radio>
                           <Building size={24} className={field.value === 'Banking' ? 'text-primary' : 'text-gray-700'} />
                        </div>

                        {field.value === 'Banking' && (
                          <div className="bg-white/5 rounded-2xl p-10 border border-primary/20 space-y-8 mt-2 animate-in fade-in slide-in-from-top-4 duration-500">
                             <h4 className="text-white font-black uppercase text-xs italic tracking-widest border-b border-white/5 pb-4">Thông tin chuyển khoản (Demo)</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block italic">Tên chủ tài khoản</label>
                                   <Controller
                                     name="bankAccountName"
                                     control={control}
                                     render={({ field }) => (
                                       <Input {...field} placeholder="NGUYEN VAN A" className="custom-dark-input h-12 uppercase font-bold" />
                                     )}
                                   />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block italic">Số tài khoản</label>
                                   <Controller
                                     name="bankAccountNumber"
                                     control={control}
                                     render={({ field }) => (
                                       <Input {...field} placeholder="0123 456 789" className="custom-dark-input h-12 font-bold" />
                                     )}
                                   />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 block italic">Ngân hàng</label>
                                   <Controller
                                     name="bankName"
                                     control={control}
                                     render={({ field }) => (
                                       <Select 
                                         {...field}
                                         className="custom-dark-select w-full h-12 font-bold"
                                         options={[
                                           { value: 'MB BANK', label: 'MB BANK (Ngân hàng Quân Đội)' },
                                           { value: 'VCB', label: 'Vietcombank' },
                                           { value: 'TCB', label: 'Techcombank' },
                                         ]}
                                       />
                                     )}
                                   />
                                </div>
                             </div>
                          </div>
                        )}
                      </Radio.Group>
                    )}
                  />
                </div>
              </div>
            </Col>

            {/* Order Sidebar Column */}
            <Col xs={24} lg={9}>
              <div className="bg-black rounded-3xl p-10 border border-primary/20 sticky top-28 space-y-10">
                 <h3 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter border-b border-white/5 pb-8">GIỎ <span className="text-primary">HÀNG</span></h3>
                 
                 <div className="max-h-80 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                    {cartItems.map((item) => (
                      <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg bg-white/5 p-2 flex-shrink-0 border border-white/5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-grow min-w-0">
                           <p className="font-black text-[10px] text-white uppercase italic truncate tracking-tight">{item.name}</p>
                           <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">SIZE: {item.size} | SL: {item.quantity}</p>
                        </div>
                        <div className="text-xs font-display font-black text-white italic">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                    ))}
                 </div>

                 <Divider className="border-white/5" />

                 <div className="space-y-4">
                    <div className="flex justify-between text-gray-500 font-black uppercase text-[9px] tracking-widest">
                      <span>Tạm tính</span>
                      <span className="text-gray-300">{(totalPrice()).toLocaleString('vi-VN')}₫</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-black uppercase text-[9px] tracking-widest">
                      <span>Vận chuyển</span>
                      <span className="text-green-500">MIỄN PHÍ</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                      <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">TỔNG CỘNG</span>
                      <span className="text-4xl font-display font-black text-primary italic underline decoration-primary/30 decoration-2 underline-offset-8">{(totalPrice()).toLocaleString('vi-VN')}₫</span>
                    </div>
                 </div>

                 <Button 
                    type="primary" 
                    size="large" 
                    block 
                    htmlType="submit"
                    loading={isSubmitting}
                    className="h-16 font-black uppercase text-xs tracking-[0.2em] rounded-md shadow-xl transition-all hover:scale-[1.02]"
                 >
                    XÁC NHẬN ĐẶT HÀNG
                 </Button>
                 
                 <p className="text-center text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                    Đảm bảo thông tin chính xác để nhận hàng nhanh nhất.
                 </p>
              </div>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
