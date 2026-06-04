import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { 
  X, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ChevronRight, 
  ChevronLeft,
  CircleAlert
} from "lucide-react";
import { getProductsThunk } from "../../store/slices/productSlice";
import { getCategoriesThunk } from "../../store/slices/categorySlice";
import ProductGrid from "../../components/product/ProductGrid";

export const ShopPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Redux States
  const { products, currentPage, totalPages, totalItems, loading, error } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

  // Parse filters from URL Search Parameters
  const activeCategory = searchParams.get("categoryProductId") || "";
  const activeSearch = searchParams.get("search") || "";
  const activeSort = searchParams.get("sortPrice") || "";
  const activePage = parseInt(searchParams.get("page") || "1");

  const [localSearch, setLocalSearch] = useState(activeSearch);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if URL search string changes directly
  useEffect(() => {
    setLocalSearch(activeSearch);
  }, [activeSearch]);

  // Load Categories & Products on filters change
  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getProductsThunk({
      categoryProductId: activeCategory,
      search: activeSearch,
      sortPrice: activeSort,
      page: activePage,
      pageSize: 8
    }));
  }, [dispatch, activeCategory, activeSearch, activeSort, activePage]);

  // Handle updates to query params helper
  const updateQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value === "" || value === undefined || value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    // Always reset to page 1 on filter changes
    if (key !== "page") {
      newParams.set("page", "1");
    }

    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQueryParam("search", localSearch.trim());
  };

  const handleClearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setLocalSearch("");
  };

  const handleCategorySelect = (id) => {
    const currentActive = activeCategory === String(id);
    updateQueryParam("categoryProductId", currentActive ? "" : String(id));
  };

  const activeCategoryName = categories.find((c) => String(c.id) === activeCategory)?.name || "All Collections";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-neutral-100 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-neutral-400 font-mono block mb-1">
            Browse Atelier
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-widest">
            {activeCategoryName}
          </h1>
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          Showing <span className="font-bold text-neutral-900">{products.length}</span> of <span className="font-bold text-neutral-900">{totalItems}</span> pieces
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* FILTERS PANEL: DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="flex flex-col gap-6 sticky top-28">
            
            {/* Search filter panel */}
            <div className="border-b border-neutral-100 pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Search Catalog
              </h3>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Type keyword..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-neutral-50 text-xs border border-neutral-200 pl-3 pr-8 py-2 focus:outline-none focus:border-neutral-800 transition-all placeholder:text-neutral-400"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-900 transition-colors">
                  <Search size={14} />
                </button>
              </form>
            </div>

            {/* Category filter panel */}
            <div className="border-b border-neutral-100 pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Collections
              </h3>
              <div className="flex flex-col space-y-1.5">
                <button
                  onClick={() => updateQueryParam("categoryProductId", "")}
                  className={`text-left text-xs py-1 transition-all flex items-center justify-between ${
                    activeCategory === "" 
                      ? "font-bold text-neutral-950 pl-1 border-l-2 border-neutral-900" 
                      : "text-neutral-500 hover:text-neutral-900 hover:pl-1"
                  }`}
                >
                  <span>All Clothing</span>
                  <span className="text-[10px] font-mono text-neutral-400">/ All</span>
                </button>
                {categories.map((cat) => {
                  const isActive = activeCategory === String(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`text-left text-xs py-1 transition-all flex items-center justify-between ${
                        isActive 
                          ? "font-bold text-neutral-950 pl-1 border-l-2 border-neutral-900" 
                          : "text-neutral-500 hover:text-neutral-900 hover:pl-1"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight size={10} className="opacity-40" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing Sorter panel */}
            <div className="border-b border-neutral-100 pb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Sort Pricing
              </h3>
              <select
                value={activeSort}
                onChange={(e) => updateQueryParam("sortPrice", e.target.value)}
                className="w-full bg-neutral-50 text-xs border border-neutral-200 px-3 py-2 focus:outline-none focus:border-neutral-800"
              >
                <option value="">Default Catalog order</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>

            {/* Clear All button */}
            {(activeCategory || activeSearch || activeSort) && (
              <button
                onClick={handleClearAllFilters}
                className="w-full text-center border border-dashed border-red-200 text-red-600 hover:bg-red-50 py-2 text-xs font-semibold tracking-wide transition-colors"
              >
                Clear Active Filters
              </button>
            )}

          </div>
        </aside>

        {/* MOBILE FILTERS BAR */}
        <div className="lg:hidden flex gap-2 items-center w-full mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex-grow flex items-center justify-center gap-1.5 border border-neutral-200 py-2.5 text-xs font-semibold tracking-wide uppercase hover:bg-neutral-50 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters / Collections
          </button>
          
          <select
            value={activeSort}
            onChange={(e) => updateQueryParam("sortPrice", e.target.value)}
            className="flex-shrink-0 bg-neutral-50 border border-neutral-200 text-xs font-semibold uppercase px-4 py-2.5"
          >
            <option value="">Sort: Default</option>
            <option value="asc">Price: Low-High</option>
            <option value="desc">Price: High-Low</option>
          </select>
        </div>

        {/* MOBILE CONTROLS POPUP DRAWER */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs z-50 flex justify-end lg:hidden">
            <div className="w-80 bg-white h-full p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                  <span className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Customize Filters
                  </span>
                  <button onClick={() => setShowMobileFilters(false)} className="p-1.5 hover:bg-neutral-100 text-neutral-500">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Search */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                      Search Word
                    </h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(e); setShowMobileFilters(false); }} className="relative">
                      <input
                        type="text"
                        placeholder="Type keyword..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="w-full bg-neutral-50 text-xs border border-neutral-200 pl-3 pr-8 py-2 focus:outline-none"
                      />
                      <Search size={14} className="absolute right-3 top-1/2 -to-1/2 -translate-y-1/2 text-neutral-400" />
                    </form>
                  </div>

                  {/* Collections list */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                      Filter Collections
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => { updateQueryParam("categoryProductId", ""); setShowMobileFilters(false); }}
                        className={`text-xs px-3 py-1.5 border transition-all ${
                          activeCategory === ""
                            ? "bg-neutral-900 text-white border-neutral-900"
                            : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        All Clothing
                      </button>
                      {categories.map((cat) => {
                        const isActive = activeCategory === String(cat.id);
                        return (
                          <button
                            key={cat.id}
                            onClick={() => { handleCategorySelect(cat.id); setShowMobileFilters(false); }}
                            className={`text-xs px-3 py-1.5 border transition-all ${
                              isActive
                                ? "bg-neutral-900 text-white border-neutral-900"
                                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                            }`}
                          >
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <button
                  onClick={() => { handleClearAllFilters(); setShowMobileFilters(false); }}
                  className="w-full text-center bg-red-50 text-red-600 hover:bg-red-100 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE MAIN CATALOG COLUMN */}
        <div className="flex-grow flex flex-col gap-10">
          
          {/* Active Tags indicators row */}
          {(activeSearch || activeCategory || activeSort) && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-neutral-50 border border-neutral-100">
              <span className="text-[10px] font-bold font-mono uppercase text-neutral-400">
                Active tags:
              </span>
              {activeCategory && (
                <span className="inline-flex items-center gap-1 bg-white border border-neutral-200 px-2 py-0.5 text-xs text-neutral-700">
                  Collection: {activeCategoryName}
                  <button onClick={() => updateQueryParam("categoryProductId", "")} className="p-0.5 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900">
                    <X size={10} />
                  </button>
                </span>
              )}
              {activeSearch && (
                <span className="inline-flex items-center gap-1 bg-white border border-neutral-200 px-2 py-0.5 text-xs text-neutral-700">
                  Query: "{activeSearch}"
                  <button onClick={() => updateQueryParam("search", "")} className="p-0.5 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900">
                    <X size={10} />
                  </button>
                </span>
              )}
              {activeSort && (
                <span className="inline-flex items-center gap-1 bg-white border border-neutral-200 px-2 py-0.5 text-xs text-neutral-700">
                  Sort: {activeSort === "asc" ? "Price Low-High" : "Price High-Low"}
                  <button onClick={() => updateQueryParam("sortPrice", "")} className="p-0.5 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900">
                    <X size={10} />
                  </button>
                </span>
              )}
              <button 
                onClick={handleClearAllFilters}
                className="text-[10px] font-bold uppercase text-neutral-400 hover:text-neutral-900 ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Catalog grid */}
          {error ? (
            <div className="bg-red-50 border border-dashed border-red-200 p-6 flex items-center gap-3 text-red-700 rounded-none">
              <CircleAlert className="h-6 w-6 stroke-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">E-commerce API Error</h4>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          ) : (
            <ProductGrid products={products} loading={loading} categories={categories} />
          )}

          {/* 5. SHOP CATALOG PAGINATION */}
          {totalPages > 1 && !loading && (
            <div className="flex items-center justify-center gap-2 border-t border-neutral-100 pt-8 mt-4">
              <button
                onClick={() => updateQueryParam("page", String(activePage - 1))}
                disabled={activePage <= 1}
                className="h-10 w-10 border border-neutral-200 hover:border-neutral-900 flex items-center justify-center text-neutral-600 disabled:opacity-45 disabled:pointer-events-none transition-colors"
                title="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = activePage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => updateQueryParam("page", String(pageNum))}
                    className={`h-10 w-10 text-xs font-bold transition-colors ${
                      isCurrent
                        ? "bg-neutral-900 text-white border border-neutral-900"
                        : "border border-neutral-200 text-neutral-600 hover:border-neutral-900"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => updateQueryParam("page", String(activePage + 1))}
                disabled={activePage >= totalPages}
                className="h-10 w-10 border border-neutral-200 hover:border-neutral-900 flex items-center justify-center text-neutral-600 disabled:opacity-45 disabled:pointer-events-none transition-colors"
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ShopPage;
