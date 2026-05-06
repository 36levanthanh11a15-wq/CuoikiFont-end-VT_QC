import React, { useState, useMemo, useEffect } from 'react';
import { Row, Col, Select, Slider, Checkbox, Button, Breadcrumb, Empty } from 'antd';
import { LayoutGrid, List as ListIcon, Filter, Search } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data';
import { Product, Category } from '../types';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 12;

const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-dark-light rounded-2xl p-5 border border-white/5 flex flex-col group transition-all duration-500 hover:border-primary/30 relative overflow-hidden h-full">
    <Link to={`/products/${product.slug}`} className="relative block h-64 bg-[#252525] rounded-xl mb-6 overflow-hidden flex items-center justify-center">
      <img 
        src={product.images[0]} 
        alt={product.name} 
        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100" 
      />
      {product.isNew && (
        <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest z-10">
          New
        </span>
      )}
    </Link>
    <div className="space-y-3 z-10 flex flex-col flex-grow">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
        <span className="text-[10px] font-bold text-gray-400">{product.brand}</span>
      </div>
      <Link to={`/products/${product.slug}`} className="block flex-grow">
        <h3 className="text-md font-bold text-white truncate group-hover:text-primary transition-colors uppercase italic">{product.name}</h3>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-display font-black text-primary italic underline underline-offset-8">
          {product.price.toLocaleString('vi-VN')}₫
        </span>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all active:scale-90">
           <Search size={18} />
        </button>
      </div>
    </div>
  </div>
);

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filters from URL
  const categoryFilter = searchParams.get('category');
  const searchFilter = searchParams.get('search');
  const sortFilter = searchParams.get('sort') || 'newest';
  const pageFilter = parseInt(searchParams.get('page') || '1', 10);

  const categories: Category[] = [
    'Bóng đá', 'Gym', 'Chạy bộ', 'Bơi lội', 'Tennis', 'Bóng rổ', 
    'Yoga', 'Cầu lông', 'Golf', 'Võ thuật', 'Đạp xe', 
    'Pickleball', 'Skateboard', 'Thời trang', 'Phụ kiện'
  ];
  const brands = ['Nike', 'Adidas', 'Puma', 'Lululemon', 'Wilson', 'Yonex', 'TaylorMade', 'Salomon'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (searchFilter) {
      const query = searchFilter.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortFilter === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortFilter === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortFilter === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryFilter, searchFilter, sortFilter]);

  // Paginated data
  const paginatedProducts = useMemo(() => {
    const startIndex = (pageFilter - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProducts, pageFilter]);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateURLParam = (key: string, value: string | null) => {
    if (value) searchParams.set(key, value);
    else searchParams.delete(key);
    // Reset page to 1 when filters change
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-16 space-y-4">
          <Breadcrumb 
            className="mb-4 custom-breadcrumb"
            items={[
              { title: <Link to="/" className="text-gray-500 hover:text-primary uppercase text-[10px] font-black tracking-widest">Trang chủ</Link> },
              { title: <span className="text-gray-300 uppercase text-[10px] font-black tracking-widest">Cửa hàng</span> }
            ]}
          />
          <h1 className="text-6xl md:text-8xl text-white font-display font-black uppercase italic tracking-tighter">
            SẢN PHẨM <span className="text-primary">SPORT</span>
          </h1>
        </div>

        <Row gutter={[48, 48]}>
          {/* Sidebar Filters */}
          <Col xs={24} lg={6}>
            <div className="bg-dark-light rounded-3xl p-8 border border-white/5 sticky top-28 space-y-10">
              <div>
                <h4 className="text-xs font-black uppercase underline underline-offset-8 decoration-primary decoration-2 tracking-[0.2em] mb-8 text-white flex items-center">
                   <Filter size={16} className="mr-3" /> BỘ LỌC
                </h4>
                <div className="space-y-6">
                  <h5 className="font-black text-[10px] text-gray-500 uppercase tracking-widest mb-4">Theo danh mục</h5>
                  <div className="flex flex-col space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    <button 
                      onClick={() => updateURLParam('category', null)}
                      className={`text-left text-xs uppercase tracking-widest hover:text-primary transition-colors ${!categoryFilter ? 'text-primary font-black' : 'text-gray-400 font-bold'}`}
                    >
                      Tất cả danh mục
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => updateURLParam('category', cat)}
                        className={`text-left text-xs uppercase tracking-widest hover:text-primary transition-colors ${categoryFilter === cat ? 'text-primary font-black' : 'text-gray-400 font-bold'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-black text-[10px] text-gray-500 uppercase tracking-widest mb-4">Theo thương hiệu</h5>
                <Checkbox.Group className="flex flex-col space-y-3 custom-dark-checkbox">
                  {brands.map(brand => (
                    <Checkbox key={brand} value={brand} className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">{brand}</Checkbox>
                  ))}
                </Checkbox.Group>
              </div>

              <div className="space-y-4">
                <h5 className="font-black text-[10px] text-gray-500 uppercase tracking-widest mb-4">Khoảng giá</h5>
                <Slider 
                  range 
                  defaultValue={[0, 25000000]} 
                  max={25000000} 
                  step={500000} 
                  tooltip={{ open: false }}
                  className="custom-dark-slider"
                />
                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>0₫</span>
                  <span className="text-primary">25.000.000₫+</span>
                </div>
              </div>

              <Button type="primary" block size="large" className="h-14 font-black uppercase text-xs tracking-widest rounded-md mt-6">
                Áp dụng bộ lọc
              </Button>
            </div>
          </Col>

          {/* Product Grid */}
          <Col xs={24} lg={18}>
            {/* Toolbar */}
            <div className="bg-dark-light rounded-2xl p-6 border border-white/5 mb-10 flex flex-wrap justify-between items-center gap-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Hiển thị <span className="text-white">{filteredProducts.length}</span> kết quả</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex bg-white/5 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:text-white'}`}
                  >
                    <ListIcon size={16} />
                  </button>
                </div>

                <Select 
                  value={sortFilter}
                  style={{ width: 180 }}
                  onChange={(val) => updateURLParam('sort', val)}
                  variant="borderless"
                  className="custom-dark-select font-black uppercase text-[10px] tracking-widest"
                  options={[
                    { value: 'newest', label: 'MỚI NHẤT' },
                    { value: 'price-asc', label: 'GIÁ: THẤP ĐẾN CAO' },
                    { value: 'price-desc', label: 'GIÁ: CAO XUỐNG THẤP' },
                    { value: 'rating', label: 'ĐÁNH GIÁ CAO' },
                  ]}
                />
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                <Row gutter={[24, 24]}>
                  {paginatedProducts.map(product => (
                    <Col key={product.id} xs={24} sm={12} xl={8}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
                
                <Pagination 
                  currentPage={pageFilter}
                  totalProducts={filteredProducts.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="bg-dark-light rounded-3xl p-24 border border-white/5 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-700">
                   <Search size={40} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter">KHÔNG TÌM THẤY SẢN PHẨM</h3>
                   <p className="text-gray-500 max-w-xs text-sm">Chúng tôi không tìm thấy sản phẩm nào khớp với bộ lọc của bạn.</p>
                </div>
                <Button type="primary" size="large" className="px-10 rounded-md font-black uppercase text-xs tracking-widest" onClick={() => setSearchParams({})}>
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductListPage;
