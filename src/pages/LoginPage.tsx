import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Form, App, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, UserPlus, Facebook, Chrome } from 'lucide-react';
import { useAuthStore } from '../store/useStore';

const loginSchema = z.object({
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  password: z.string().min(2, 'Mật khẩu phải có ít nhất 2 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    // Demo Mode: Accept any valid format input
    console.log('Demo Login:', data);
    
    const demoUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.email.split('@')[0].toUpperCase(),
      email: data.email,
      role: 'user' as const
    };

    message.success('Đăng nhập thành công!');
    setUser(demoUser);
    navigate('/');
  };

  const handleDemoLogin = () => {
    setUser({
      id: 'demo-admin',
      name: 'QUẢN TRỊ VIÊN',
      email: 'admin@ctsport.com',
      role: 'user'
    });
    message.success('Đăng nhập với quyền Admin thành công!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-md w-full bg-dark-light rounded-3xl border border-white/5 overflow-hidden relative z-10">
        <div className="bg-black p-12 text-center space-y-4 border-b border-white/5">
           <Link to="/" className="inline-block">
             <span className="text-3xl text-white font-display font-black uppercase tracking-tighter italic">
              <span className="text-primary italic">C&T</span>
              <span className="text-white ml-2">SPORT</span>
             </span>
           </Link>
           <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.3em] italic">TRUY CẬP HỆ THỐNG TRANG BỊ</p>
        </div>
        
        <div className="p-12 space-y-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2 italic">Email đăng ký</label>
              <Input 
                size="large" 
                prefix={<Mail size={16} className="text-gray-600 mr-2" />} 
                placeholder="example@ctsport.com"
                className="custom-dark-input h-14 rounded-md font-bold"
                {...register('email')}
                status={errors.email ? 'error' : ''}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-widest">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Mật khẩu bảo mật</label>
                <Link to="/forgot-password" size="small" className="text-primary text-[10px] font-black uppercase hover:underline">Quên mật khẩu?</Link>
              </div>
              <Input.Password 
                size="large" 
                prefix={<Lock size={16} className="text-gray-600 mr-2" />} 
                placeholder="••••••••"
                className="custom-dark-input h-14 rounded-md font-bold"
                {...register('password')}
                status={errors.password ? 'error' : ''}
              />
              {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-widest">{errors.password.message}</p>}
            </div>

            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              block 
              className="h-14 rounded-md font-black uppercase tracking-[0.2em] text-xs mt-6 transition-transform active:scale-95"
              icon={<LogIn size={18} className="mr-3" />}
            >
              ĐĂNG NHẬP
            </Button>

            <Button 
              ghost
              size="large" 
              block 
              onClick={handleDemoLogin}
              className="h-14 rounded-md font-black uppercase tracking-[0.2em] text-xs mt-2 border-white/10 text-gray-400 hover:!border-primary hover:!text-primary"
            >
              TRẢI NGHIỆM NHANH (DEMO)
            </Button>
          </form>

          <div className="space-y-8">
            <div className="relative">
              <Divider className="text-gray-600 text-[9px] uppercase font-black tracking-widest custom-dark-divider border-white/5">TRUY CẬP NHANH</Divider>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button className="h-12 rounded-md bg-white/5 border-white/5 text-gray-400 font-black uppercase text-[10px] tracking-widest flex items-center justify-center space-x-3 hover:!bg-white/10 hover:!text-white transition-all">
                <Chrome size={16} />
                <span>Google</span>
              </Button>
              <Button className="h-12 rounded-md bg-white/5 border-white/5 text-gray-400 font-black uppercase text-[10px] tracking-widest flex items-center justify-center space-x-3 hover:!bg-white/10 hover:!text-white transition-all">
                <Facebook size={16} />
                <span>Facebook</span>
              </Button>
            </div>

            <p className="text-center text-gray-500 text-[10px] font-black uppercase tracking-widest">
              Bạn mới gia nhập?{' '}
              <Link to="/register" className="text-primary hover:underline ml-1">
                ĐĂNG KÝ NGAY
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
