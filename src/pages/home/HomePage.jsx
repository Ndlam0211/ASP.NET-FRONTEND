import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Truck } from "lucide-react";
import { getProductsThunk } from "../../store/slices/productSlice";
import { postService } from "../../services/postService";
import ProductGrid from "../../components/product/ProductGrid";
import { PostCard } from "../../components/blog/PostCard";

export const HomePage = () => {
  const dispatch = useDispatch();

  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [latestPosts, setLatestPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const latestProducts = products.slice(0, 4);
  const featuredProducts = products.length > 4 ? products.slice(4, 8) : products;

  // Load Latest and Featured products (limit to 8) and Latest articles
  useEffect(() => {
    dispatch(getProductsThunk({ page: 1, pageSize: 8 }));

    const fetchLatestPosts = async () => {
      setPostsLoading(true);
      try {
        const posts = await postService.getPosts();
        // Take latest 3 posts
        setLatestPosts(posts.slice(0, 3));
      } catch (err) {
        console.error("Failed to load posts in home:", err);
      } finally {
        setPostsLoading(false);
      }
    };
    fetchLatestPosts();
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* 1. HERO COVER BANNER */}
      <section className="relative bg-neutral-950 text-white min-h-[60vh] sm:min-h-[75vh] flex items-center overflow-hidden">
        {/* Modern high contrast background overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?max&w=1600"
            alt="Atelier Banner"
            className="w-full h-full object-cover grayscale contrast-125"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-neutral-950/60 z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
          <div className="max-w-3xl flex flex-col gap-6">
            <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest mb-2">
              <Sparkles size={11} className="text-neutral-300" />
              Seasonal Essentials
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-[0.85] text-white uppercase">
              MINIMALISM<br/>DEFINED
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-400 max-w-md my-2 leading-relaxed">
              Drafted with architectural precision, crafted from long-staple organic materials. Refined seasonal elements built to resist trend cycles.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-white text-neutral-950 font-bold text-xs tracking-widest uppercase hover:bg-neutral-100 transition-colors"
              >
                Explore Collection
              </Link>
              <Link
                to="/blog"
                className="px-8 py-3.5 border border-white text-white font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-neutral-950 transition-colors"
              >
                Read Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC BENTO CATEGORY TILE LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center sm:text-left mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-wider">
              Curated Departments
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">Shop by tailored collections</p>
          </div>
          <Link to="/shop" className="text-xs font-bold tracking-wider text-neutral-900 uppercase hover:underline inline-flex items-center gap-1.5">
            View All Catalog <ArrowRight size={13} />
          </Link>
        </div>

        {/* Categories Bento (using 3 hardcoded grids matching premium layouts) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/shop?categoryProductId=1"
            className="group relative h-72 md:h-96 overflow-hidden bg-neutral-100 flex items-end p-6 border border-neutral-100 select-none"
          >
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"
              alt="Premium T-Shirts"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent z-10" />
            <div className="relative z-20 text-white flex flex-col gap-1">
              <span className="text-[10px] font-bold font-mono tracking-widest text-neutral-300 uppercase">Premium Combed Cottons</span>
              <h3 className="text-lg font-black uppercase tracking-wider">T-Shirts Collection</h3>
            </div>
          </Link>

          <Link 
            to="/shop?categoryProductId=2"
            className="group relative h-72 md:h-96 overflow-hidden bg-neutral-100 flex items-end p-6 border border-neutral-100 select-none"
          >
            <img
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"
              alt="Premium Shirts"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent z-10" />
            <div className="relative z-20 text-white flex flex-col gap-1">
              <span className="text-[10px] font-bold font-mono tracking-widest text-neutral-300 uppercase">Oxford Twill & Linen</span>
              <h3 className="text-lg font-black uppercase tracking-wider">Shirts & Blouses</h3>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-4">
            <Link 
              to="/shop?categoryProductId=3"
              className="group relative h-44 md:h-[11.5rem] overflow-hidden bg-neutral-100 flex items-end p-6 border border-neutral-100 select-none"
            >
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
                alt="Hoodies"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent z-10" />
              <div className="relative z-20 text-white flex flex-col gap-1">
                <span className="text-[10px] font-bold font-mono tracking-widest text-neutral-300 uppercase">Heavyweight Fleece</span>
                <h3 className="text-base font-black uppercase tracking-wider">Cozy Hoodies</h3>
              </div>
            </Link>

            <Link 
              to="/shop?categoryProductId=7"
              className="group relative h-44 md:h-[11.5rem] overflow-hidden bg-neutral-100 flex items-end p-6 border border-neutral-100 select-none"
            >
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=600"
                alt="Accessories"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent z-10" />
              <div className="relative z-20 text-white flex flex-col gap-1">
                <span className="text-[10px] font-bold font-mono tracking-widest text-neutral-300 uppercase">Caps, Bags & Wallets</span>
                <h3 className="text-base font-black uppercase tracking-wider">Accessories Pack</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. LATEST ARRIVALS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-100 pt-16">
        <div className="text-center sm:text-left mb-8">
          <span className="text-[10px] font-bold font-mono tracking-widest text-neutral-400 uppercase">
            New Releases
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-wider mt-1">
            New Releases
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            The newest curated editions fresh from our design studio.
          </p>
        </div>
        
        <ProductGrid products={latestProducts} loading={productsLoading} categories={categories} />
      </section>

      {/* 3.1. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-100 pt-16">
        <div className="text-center sm:text-left mb-8">
          <span className="text-[10px] font-bold font-mono tracking-widest text-neutral-400 uppercase">
            Selected Staples
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-wider mt-1">
            Featured Staples
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Premium products engineered for the capsule wardrobe.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} loading={productsLoading} categories={categories} />
      </section>

      {/* VALUE SIGNALS GRID Section */}
      <section className="bg-neutral-50/50 border-t border-b border-neutral-100 py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4 text-center md:text-left">
            <Truck className="w-8 h-8 text-neutral-800 mx-auto md:mx-0 stroke-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Enjoy free trackable door-to-door delivery on all orders over $150. Packaged beautifully in eco-recycled boxes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 text-center md:text-left">
            <ShieldCheck className="w-8 h-8 text-neutral-800 mx-auto md:mx-0 stroke-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
                Guaranteed Materials
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                100% long-staple organic Egyptian cotton, raw selvedge denim, and certified sustainable wool with clean-dye processing.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 text-center md:text-left">
            <TrendingUp className="w-8 h-8 text-neutral-800 mx-auto md:mx-0 stroke-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
                No-Hassle Exchanges
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Changed your mind? Return or exchange unworn pieces within 30 days. We provide prepaid shipment labels instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LATEST FASHION ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center sm:text-left mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-wider">
            The ATELIER Journal
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Weekly chronicles of styling philosophy, textile science, and architecture.
          </p>
        </div>

        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="animate-pulse flex flex-col gap-3">
                <div className="aspect-video bg-neutral-200" />
                <div className="h-4 bg-neutral-200 rounded-sm w-1/4" />
                <div className="h-6 bg-neutral-200 rounded-sm w-3/4" />
                <div className="h-10 bg-neutral-200 rounded-sm w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
