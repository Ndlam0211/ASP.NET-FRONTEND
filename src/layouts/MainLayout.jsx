import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowUp,
  LogOut
} from "lucide-react";
import { getCategoriesThunk } from "../store/slices/categorySlice";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Load Categories on mount
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  // Keep track of scroll for floating active header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    toast.info("Logged out successfully.");
    navigate("/");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailInput = e.target.elements.newsEmail?.value;
    if (emailInput) {
      toast.success("Thank you for subscribing to ATELIER journals!");
      e.target.reset();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-neutral-900 antialiased">
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-neutral-950 text-white text-[11px] font-medium py-2.5 px-4 text-center tracking-widest uppercase border-b border-neutral-900">
        Free International Shipping on Orders Over $150 • Limited Edition Collection Out Now
      </div>

      {/* 2 & 3. MAIN HEADER & DIRECTORY */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
            : "bg-white border-b border-neutral-150 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-neutral-100 text-neutral-900 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Premium Minimal Brand Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl sm:text-2xl font-black font-display tracking-tighter text-neutral-950 select-none uppercase">
                ATELIER <span className="font-light text-neutral-400">STUDIO</span>
              </Link>
            </div>

            {/* Desktop Directory links (Zara / Aura style) */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/shop" 
                className={`text-[13px] font-bold font-display uppercase tracking-tight transition-colors hover:text-neutral-500 ${
                  location.pathname === "/shop" ? "text-neutral-950 underline underline-offset-4" : "text-neutral-500"
                }`}
              >
                Shop
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?categoryProductId=${cat.id}`}
                  className="text-[13px] font-bold font-display uppercase tracking-tight text-neutral-400 hover:text-neutral-950 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <Link 
                to="/blog" 
                className={`text-[13px] font-bold font-display uppercase tracking-tight transition-colors hover:text-neutral-500 ${
                  location.pathname === "/blog" ? "text-neutral-950 underline underline-offset-4" : "text-neutral-500"
                }`}
              >
                Stories
              </Link>
            </nav>

            {/* Right Header: Search, Account & Cart */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-grow lg:flex-grow-0 justify-end">
              {/* Search form bar desktop-centered */}
              <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-40 lg:w-48">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs border-b border-transparent focus:border-black outline-none pb-1 transition-all placeholder:text-neutral-400 font-sans"
                />
                <Search size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400" />
              </form>

              {/* Account Profile Access */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link 
                    to="/account/orders" 
                    className="p-1.5 hover:bg-neutral-50 text-neutral-800 hover:text-neutral-950 transition-all flex items-center gap-1 text-xs font-bold"
                  >
                    <User size={16} />
                    <span className="hidden md:inline font-mono uppercase text-[11px] tracking-wider text-neutral-500">
                      Hi, {user.fullName?.split(" ")[0] || "User"}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogoutClick}
                    className="p-1.5 hover:bg-neutral-50 text-neutral-400 hover:text-red-600 transition-all"
                    title="Log Out"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="p-1.5 hover:bg-neutral-50 text-neutral-800 hover:text-neutral-950 transition-all flex items-center gap-1"
                  title="Sign In / Register"
                >
                  <User size={16} />
                </Link>
              )}

              {/* Shopping Cart Indicator */}
              <Link 
                to="/cart" 
                className="p-2.5 bg-neutral-950 text-white hover:bg-neutral-800 transition-colors relative flex items-center justify-center rounded-none"
              >
                <ShoppingBag size={15} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-neutral-950 border border-neutral-800 text-white text-[9px] font-bold font-mono h-4 w-4 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu collapsible */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-200 py-4 px-6 shadow-md transition-all">
            <form onSubmit={handleSearchSubmit} className="relative mb-4 sm:hidden">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 text-xs border border-neutral-200 pl-8 pr-3 py-2 focus:outline-none"
              />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            </form>
            <div className="flex flex-col space-y-3.5">
              <Link 
                to="/shop" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold tracking-wider uppercase text-neutral-800 hover:text-neutral-950"
              >
                View Catalog
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?categoryProductId=${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider text-neutral-500 hover:text-neutral-900 pl-2 border-l border-neutral-100"
                >
                  {cat.name}
                </Link>
              ))}
              <hr className="border-neutral-100 my-1" />
              <Link 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold tracking-wider uppercase text-neutral-800"
              >
                Journals
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account/orders" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-neutral-600"
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogoutClick();
                    }}
                    className="text-sm font-semibold text-red-500 text-left"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold tracking-wider uppercase text-neutral-900"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 4. MAIN WORKSPACE CONTENT WITH SIDE RAIL PATTERN */}
      <div className="flex-grow grid grid-cols-12 gap-0 w-full">
        {/* Left Side Rail Text for architectural styling */}
        <aside className="hidden md:flex md:col-span-1 border-r border-neutral-100 items-center justify-center py-24 min-h-[50vh]">
          <span className="-rotate-90 whitespace-nowrap text-[10px] tracking-[0.35em] uppercase text-neutral-400 font-bold font-mono">
            Atelier Curated Edition • SS26
          </span>
        </aside>

        {/* Real Content Screen */}
        <main className="col-span-12 md:col-span-11 min-h-[60vh]">
          {children}
        </main>
      </div>

      {/* 5. BRAND TEASER NEWSLETTER & FOOTER */}
      <footer className="mt-auto border-t border-neutral-150 bg-white grid grid-cols-1 lg:grid-cols-4 font-sans text-xs">
        {/* Newsletter joint section */}
        <div className="lg:col-span-2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-neutral-150 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 pr-0 md:pr-8">
            <h4 className="text-sm font-bold font-display uppercase tracking-widest mb-2 text-neutral-950">Join the Circle</h4>
            <p className="text-neutral-500 leading-relaxed text-xs">Exclusive previews, seasonal updates, and capsular log archives.</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="relative flex-1 w-full">
            <input 
              type="email" 
              name="newsEmail"
              required
              placeholder="Your email" 
              className="w-full border-b border-neutral-300 pb-2 text-xs focus:border-black outline-none bg-transparent"
            />
            <button type="submit" className="absolute right-0 bottom-2 text-[10px] font-bold uppercase tracking-wider text-neutral-950 hover:text-neutral-500 font-display">
              Submit
            </button>
          </form>
        </div>

        {/* Directory links column */}
        <div className="col-span-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-neutral-150">
          <h4 className="text-[11px] font-bold font-display uppercase tracking-widest mb-4 text-neutral-400">Discover</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/shop" className="text-neutral-800 hover:text-neutral-500 transition-colors">Catalog / Archives</Link>
            <Link to="/blog" className="text-neutral-800 hover:text-neutral-500 transition-colors">Stories & Notes</Link>
            <a href="#" className="text-neutral-800 hover:text-neutral-500 transition-colors">Our Ethos</a>
          </div>
        </div>

        {/* Follow / Policies column */}
        <div className="col-span-1 p-8 lg:p-12">
          <h4 className="text-[11px] font-bold font-display uppercase tracking-widest mb-4 text-neutral-400">Policy</h4>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-neutral-800 hover:text-neutral-500 transition-colors">Free Shipping & Returns</a>
            <span className="text-neutral-400 mt-1 font-mono">support@atelier.com</span>
            <p className="text-[10px] text-neutral-405 italic pt-2 border-t border-neutral-100">© {new Date().getFullYear()} ATELIER STUDIO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
