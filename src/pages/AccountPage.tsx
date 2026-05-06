import React from 'react';
import { Row, Col, Card, Button, Table, Tag, Avatar, Space, Tabs, Empty } from 'antd';
import { User, Package, Heart, LogOut, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useStore';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="font-bold text-primary italic">#CT-{text}</span>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => <span className="text-gray-400 text-xs font-bold uppercase">{date}</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => <span className="font-bold text-white uppercase italic">{total.toLocaleString('vi-VN')}₫</span>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        let color = status === 'Hoàn thành' ? '#52c41a' : '#1890ff';
        if (status === 'Đã hủy') color = '#ff4d4f';
        return <Tag color={color} className="rounded-sm font-black px-3 py-0.5 border-none uppercase text-[9px] tracking-widest">{status}</Tag>;
      },
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Button type="text" className="text-gray-500 hover:text-primary p-0 h-auto">
           <ChevronRight size={18} />
        </Button>
      ),
    },
  ];

  const orderData = [
    { key: '1', id: '12345', date: '2026-05-01', total: 3200000, status: 'Hoàn thành' },
    { key: '2', id: '12350', date: '2026-05-04', total: 850000, status: 'Đang xử lý' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row gutter={[48, 48]}>
          <Col xs={24} lg={8}>
            <div className="bg-dark-light rounded-3xl p-8 border border-white/5 space-y-10">
              <div className="flex flex-col items-center text-center space-y-6">
                <Avatar size={120} className="bg-primary/10 text-primary border-none flex items-center justify-center">
                  <User size={60} />
                </Avatar>
                <div className="space-y-2">
                   <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">{user.name}</h2>
                   <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{user.email}</p>
                </div>
                <Tag color="#FF4D00" className="font-black border-none px-6 rounded-sm py-1 uppercase text-[10px] tracking-[0.2em]">Tier Pro</Tag>
              </div>

              <nav className="flex flex-col space-y-3">
                <Button block type="text" className="text-left h-14 px-6 flex items-center justify-between font-black uppercase text-xs tracking-widest text-primary bg-primary/10 rounded-xl">
                   <span className="flex items-center"><Package size={20} className="mr-4" /> Đơn hàng của tôi</span>
                   <ChevronRight size={18} />
                </Button>
                <Button block type="text" className="text-left h-14 px-6 flex items-center justify-between font-black uppercase text-xs tracking-widest text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                   <span className="flex items-center"><Heart size={20} className="mr-4" /> Danh sách yêu thích</span>
                   <ChevronRight size={18} />
                </Button>
                <Button block type="text" className="text-left h-14 px-6 flex items-center justify-between font-black uppercase text-xs tracking-widest text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                   <span className="flex items-center"><MapPin size={20} className="mr-4" /> Địa chỉ nhận hàng</span>
                   <ChevronRight size={18} />
                </Button>
                <Button 
                  block 
                  type="text" 
                  danger 
                  onClick={handleLogout}
                  className="text-left h-14 px-6 flex items-center font-black uppercase text-xs tracking-widest mt-6 hover:bg-primary hover:!text-white rounded-xl transition-all"
                >
                  <LogOut size={20} className="mr-4" /> Đăng xuất
                </Button>
              </nav>
            </div>
          </Col>

          <Col xs={24} lg={16}>
             <div className="bg-dark-light rounded-3xl p-10 border border-white/5 min-h-[600px] flex flex-col">
                <div className="flex items-center justify-between mb-12">
                   <h2 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">LỊCH SỬ <span className="text-primary">MUA HÀNG</span></h2>
                   <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Tổng cộng: {orderData.length}
                   </div>
                </div>
                
                <div className="flex-grow overflow-x-auto">
                  <Table 
                    columns={columns} 
                    dataSource={orderData} 
                    pagination={false}
                    className="custom-dark-table"
                  />
                  
                  {orderData.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-700">
                           <ShoppingBag size={48} />
                        </div>
                        <div className="text-center space-y-2">
                           <p className="text-white font-black uppercase tracking-widest text-sm">CHƯA CÓ ĐƠN HÀNG</p>
                           <p className="text-gray-500 text-xs">Hãy bắt đầu hành trình chinh phục với trang bị elite ngay hôm nay.</p>
                        </div>
                        <Link to="/products">
                           <Button type="primary" size="large" className="h-12 px-10 rounded-md font-black uppercase text-xs tracking-widest">MUA SẮM NGAY</Button>
                        </Link>
                    </div>
                  )}
                </div>
             </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AccountPage;
