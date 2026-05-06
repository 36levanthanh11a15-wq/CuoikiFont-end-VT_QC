import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input, Form, App, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/useStore';

// 1. Schema validation tối giản cho Demo
const registerSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập họ tên'),
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  password: z.string().min(2, 'Mật khẩu tối thiểu 2 ký tự'),
  confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  
  // 2. Cấp cấu hình Form
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  // 3. Xử lý Đăng ký (Demo: Tự động đăng nhập và về Trang chủ)
  const onSubmit = (data: RegisterFormValues) => {
    console.log('Register Submitted:', data);
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      role: 'user' as const
    };

    // Lưu vào Zustand/LocalStorage
    setUser(newUser);
    
    message.success('Đăng ký thành công! Hệ thống đã tự động đăng nhập.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Hiệu ứng nền */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-md w-full bg-dark-light rounded-3xl border border-white/5 overflow-hidden relative z-10 shadow-2xl">
        <div className="bg-primary p-12 text-center">
           <h1 className="text-4xl text-white font-display font-black uppercase tracking-tighter italic leading-none">
             TẠO <br /> <span className="text-black">TÀI KHOẢN</span>
           </h1>
           <p className="text-white/80 text-[10px] mt-4 uppercase font-black tracking-[0.3em]">Cập nhật trang thiết bị đỉnh cao</p>
        </div>
        
        <div className="p-12 space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Họ và tên */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Họ và tên</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field}
                    size="large" 
                    prefix={<UserIcon size={16} className="text-gray-600 mr-2" />} 
                    placeholder="Nguyễn Văn A"
                    className="custom-dark-input h-14 rounded-md font-bold"
                    status={errors.name ? 'error' : ''}
                  />
                )}
              />
              {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Địa chỉ Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field}
                    size="large" 
                    prefix={<Mail size={16} className="text-gray-600 mr-2" />} 
                    placeholder="demo@ctsport.com"
                    className="custom-dark-input h-14 rounded-md font-bold"
                    status={errors.email ? 'error' : ''}
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.email.message}</p>}
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Mật khẩu (≥2 ký tự)</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password 
                    {...field}
                    size="large" 
                    prefix={<Lock size={16} className="text-gray-600 mr-2" />} 
                    placeholder="••••"
                    className="custom-dark-input h-14 rounded-md font-bold"
                    status={errors.password ? 'error' : ''}
                  />
                )}
              />
              {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.password.message}</p>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block italic">Xác nhận mật khẩu</label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password 
                    {...field}
                    size="large" 
                    prefix={<Lock size={16} className="text-gray-600 mr-2" />} 
                    placeholder="••••"
                    className="custom-dark-input h-14 rounded-md font-bold"
                    status={errors.confirmPassword ? 'error' : ''}
                  />
                )}
              />
              {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              block 
              className="h-16 rounded-md font-black uppercase tracking-[0.2em] text-xs mt-4"
              icon={<UserPlus size={18} className="mr-2" />}
            >
              ĐĂNG KÝ VÀ TRẢI NGHIỆM
            </Button>
          </form>

          <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary hover:underline ml-1">
              ĐĂNG NHẬP NGAY
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

