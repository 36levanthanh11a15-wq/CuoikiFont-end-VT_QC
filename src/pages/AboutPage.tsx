import React from 'react';
import { Row, Col, Card, Avatar, Divider, Button } from 'antd';
import { Trophy, Users, ShieldCheck, Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] bg-dark flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/10 to-dark" />
        </div>
        <div className="relative z-10 max-w-4xl px-4 space-y-6">
           <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest"
           >
             Câu Chuyện Về Chúng Tôi
           </motion.h2>
           <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl text-white font-display font-bold uppercase leading-tight"
           >
             Nơi Đam Mê Trở Thành <br /> <span className="text-primary">Sức Mạnh</span>
           </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4">
        <Row gutter={[64, 64]} align="middle">
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              <h3 className="text-4xl font-display font-bold uppercase text-white">C&T SPORT - GEAR UP, PLAY HARD</h3>
              <p className="text-gray-400 text-lg leading-relaxed italic border-l-4 border-primary pl-6">
                Được thành lập vào năm 2026 bởi <span className="text-white font-bold underline decoration-primary/50">Lê Văn Thanh</span> và <span className="text-white font-bold underline decoration-primary/50">Đoàn Quốc Cường</span> - hai sinh viên Trường Đại học Lạc Hồng.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                C&T Sport không chỉ là một cửa hàng bán phụ kiện thể thao, mà còn là dự án đam mê mà chúng tôi tạo ra nhằm mang đến những sản phẩm thể thao chất lượng nhất cho cộng đồng yêu thể thao. Trang web này là dự án báo cáo / đồ án được hai chúng tôi thực hiện với tất cả tâm huyết.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Chúng tôi tin rằng, để đạt được kết quả cao nhất, mỗi vận động viên đều cần sự hỗ trợ từ những trang thiết bị tốt nhất. Đó là lý do C&T Sport cam kết mang đến những sản phẩm chính hãng, chất lượng cao với giá cả hợp lý.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <p className="text-5xl font-display font-black text-primary italic">5000+</p>
                  <p className="text-gray-500 font-black uppercase text-[10px] tracking-[0.2em]">Khách hàng tin dùng</p>
                </div>
                <div>
                  <p className="text-5xl font-display font-black text-primary italic">20+</p>
                  <p className="text-gray-500 font-black uppercase text-[10px] tracking-[0.2em]">Thương hiệu đối tác</p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="https://i.ibb.co/Zzz1Nb5b/nh.png" 
                className="relative rounded-3xl shadow-2xl transition-all duration-700"
              />
            </div>
          </Col>
        </Row>
      </section>

      {/* Values */}
      <section className="bg-white/5 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16 space-y-2">
              <h2 className="text-4xl font-display font-black uppercase italic text-white">Giá trị <span className="text-primary">cốt lõi</span></h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-dark-light p-10 rounded-3xl space-y-4 border border-white/5 group hover:border-primary transition-all duration-500">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto group-hover:bg-primary group-hover:text-black transition-all">
                    <ShieldCheck size={36} />
                 </div>
                 <h4 className="text-xl font-black uppercase italic text-white">Chất lượng tuyệt đối</h4>
                 <p className="text-gray-500">Mọi sản phẩm tại C&T Sport đều phải trải qua quy trình kiểm tra nghiêm ngặt về độ bền và công năng.</p>
              </div>
              <div className="bg-dark-light p-10 rounded-3xl space-y-4 border border-white/5 group hover:border-primary transition-all duration-500">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto group-hover:bg-primary group-hover:text-black transition-all">
                    <Trophy size={36} />
                 </div>
                 <h4 className="text-xl font-black uppercase italic text-white">Thấu hiểu khách hàng</h4>
                 <p className="text-gray-500">Từ người bắt đầu đến vận động viên chuyên nghiệp, chúng tôi luôn có lời khuyên và trang bị phù hợp nhất.</p>
              </div>
              <div className="bg-dark-light p-10 rounded-3xl space-y-4 border border-white/5 group hover:border-primary transition-all duration-500">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto group-hover:bg-primary group-hover:text-black transition-all">
                    <Users size={36} />
                 </div>
                 <h4 className="text-xl font-black uppercase italic text-white">Cùng nhau phát triển</h4>
                 <p className="text-gray-500">Chúng tôi đồng hành cùng sự nghiệp thể thao của bạn qua từng bước chạy, từng trận đấu.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 text-center pb-24">
         <h2 className="text-4xl font-display font-black uppercase italic mb-20 text-white">Đội ngũ <span className="text-primary">sáng lập</span></h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ y: -10 }}
              className="space-y-6 group"
            >
               <div className="relative inline-block">
                 <div className="absolute -inset-2 bg-primary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                 <Avatar 
                   size={240} 
                   src="https://img.magnific.com/vector-cao-cap/hinh-minh-hoa-avatar-nam-tuoi-cuoi_1308-173735.jpg" 
                   className="relative border-4 border-white/10 group-hover:border-primary transition-colors duration-500 grayscale group-hover:grayscale-0 shadow-2xl" 
                 />
                 <div className="absolute bottom-4 right-4 bg-primary text-black font-black text-[10px] px-3 py-1 rounded-full uppercase italic">Founder</div>
               </div>
               <div className="space-y-2">
                 <h4 className="text-2xl font-black uppercase italic text-white">Lê Văn Thanh</h4>
                 <p className="text-primary font-black uppercase text-[10px] tracking-widest">Sinh viên Đại học Lạc Hồng</p>
                 <p className="text-gray-500 px-6 italic text-sm">"Thể thao không chỉ là rèn luyện sức khỏe, nó là lối sống và bản lĩnh thép."</p>
               </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="space-y-6 group"
            >
               <div className="relative inline-block">
                 <div className="absolute -inset-2 bg-primary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                 <Avatar 
                   size={240} 
                   src="https://img.magnific.com/vector-cao-cap/chan-dung-hoac-dau-cau-be_684058-2443.jpg" 
                   className="relative border-4 border-white/10 group-hover:border-primary transition-colors duration-500 grayscale group-hover:grayscale-0 shadow-2xl" 
                 />
                 <div className="absolute bottom-4 right-4 bg-primary text-black font-black text-[10px] px-3 py-1 rounded-full uppercase italic">Founder</div>
               </div>
               <div className="space-y-2">
                 <h4 className="text-2xl font-black uppercase italic text-white">Đoàn Quốc Cường</h4>
                 <p className="text-primary font-black uppercase text-[10px] tracking-widest">Sinh viên Đại học Lạc Hồng</p>
                 <p className="text-gray-500 px-6 italic text-sm">"Chúng tôi mang công nghệ thể thao hàng đầu đến gần hơn với người Việt."</p>
               </div>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;
