import React from 'react';
import { Row, Col, Input, Button, Divider, App } from 'antd';
import { Mail, Phone, MapPin, Send, MessageSquare, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

const ContactPage: React.FC = () => {
  const { message } = App.useApp();
  
  const onFinish = (e: React.FormEvent) => {
    e.preventDefault();
    message.success('Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất!');
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24 px-4 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-4"
        >
          <span className="text-primary font-display font-bold tracking-[0.4em] uppercase text-xs">
            Kết nối với chúng tôi
          </span>
          <h1 className="text-6xl md:text-8xl text-white font-display font-black uppercase italic tracking-tighter">
            LIÊN <span className="text-primary">HỆ</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest max-w-xl mx-auto leading-relaxed">
            Mọi thắc mắc về sản phẩm, dịch vụ hoặc hỗ trợ kỹ thuật, vui lòng gửi tin nhắn hoặc gọi điện trực tiếp cho đội ngũ của chúng tôi.
          </p>
        </motion.div>

        <Row gutter={[48, 48]}>
          {/* Info Side */}
          <Col xs={24} lg={10}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-dark-light text-white rounded-3xl p-12 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
                
                <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter mb-12 relative z-10">
                  THÔNG TIN <span className="text-primary">LIÊN LẠC</span>
                </h3>
                
                <div className="space-y-10 relative z-10">
                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1 italic">Hotline dịch vụ</p>
                      <p className="text-xl font-display font-black italic">+84 987 654 321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1 italic">Email hỗ trợ</p>
                      <p className="text-xl font-display font-black italic uppercase">contact@ctsport.vn</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1 italic">Địa chỉ chính</p>
                      <p className="text-lg font-bold text-gray-300">123 Đường Sport, Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                </div>

                <Divider className="border-white/5 my-12" />
                
                <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Theo dõi chúng tôi</p>
                  <div className="flex items-center space-x-4">
                    {[
                      { icon: <Facebook size={20} />, link: '#' },
                      { icon: <Instagram size={20} />, link: '#' },
                      { icon: <Twitter size={20} />, link: '#' }
                    ].map((social, idx) => (
                      <a 
                        key={idx}
                        href={social.link}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-primary p-12 rounded-3xl flex items-center space-x-6 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 blur-2xl rounded-full translate-x-1/4 translate-y-1/4" />
                <div className="flex -space-x-4">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="w-14 h-14 rounded-full border-4 border-primary bg-black/20 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                     </div>
                   ))}
                   <div className="w-14 h-14 rounded-full border-4 border-primary bg-black flex items-center justify-center text-[10px] font-black text-white">
                      +10K
                   </div>
                </div>
                <div>
                  <p className="text-white font-display font-black uppercase italic tracking-tight leading-none text-xl">Hài lòng</p>
                  <p className="text-black/60 text-[10px] font-black uppercase tracking-widest">Từ cộng đồng thể thao</p>
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Form Side */}
          <Col xs={24} lg={14}>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-light rounded-3xl p-12 border border-white/5 shadow-2xl relative"
            >
               <div className="flex items-center space-x-4 mb-12">
                  <div className="w-12 h-1 bg-primary rounded-full" />
                  <h3 className="text-3xl font-display font-black uppercase italic text-white tracking-tighter">
                    GỬI <span className="text-primary">TIN NHẮN</span>
                  </h3>
               </div>
               
               <form className="space-y-8" onSubmit={onFinish}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Họ và tên</label>
                      <Input 
                        size="large" 
                        placeholder="Nguyễn Văn A" 
                        className="custom-dark-input h-14 rounded-md font-bold" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Email nhận phản hồi</label>
                      <Input 
                        size="large" 
                        placeholder="demo@ctsport.vn" 
                        type="email" 
                        className="custom-dark-input h-14 rounded-md font-bold" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Chủ đề cần tư vấn</label>
                    <Input 
                      size="large" 
                      placeholder="Tôi muốn hỏi về sản phẩm mới..." 
                      className="custom-dark-input h-14 rounded-md font-bold" 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Nội dung chi tiết</label>
                    <Input.TextArea 
                      rows={6} 
                      placeholder="Chia sẻ yêu cầu của bạn tại đây để chúng tôi hỗ trợ tốt nhất..." 
                      className="custom-dark-input rounded-md font-bold p-6 pt-4" 
                      required 
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="primary" 
                      size="large" 
                      block
                      className="h-20 rounded-md font-black uppercase text-sm tracking-[0.3em] shadow-xl hover:scale-[1.01] transition-all"
                      icon={<Send size={20} className="mr-3" />}
                      htmlType="submit"
                    >
                      GỬI TIN NHẮN NGAY
                    </Button>
                    <p className="text-center text-[9px] text-gray-600 font-extrabold uppercase tracking-[0.2em] mt-6">
                      Cam kết bảo mật thông tin và phản hồi trong 24 giờ.
                    </p>
                  </div>
               </form>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactPage;
