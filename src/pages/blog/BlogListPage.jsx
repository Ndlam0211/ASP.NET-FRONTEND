import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { postService } from "../../services/postService";
import { PostCard } from "../../components/blog/PostCard";

export const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          postService.getPosts(),
          postService.getBlogCategories()
        ]);
        setPosts(postsRes);
        setCategories(categoriesRes);
      } catch (err) {
        setError("Unable to retrieve articles or categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.categoryName === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-neutral-100 pb-6 mb-8 text-center sm:text-left">
        <span className="text-xs font-bold text-neutral-400 font-mono block mb-1">
          Editorial Curation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-widest">
          The ATELIER Journal
        </h1>
        <p className="text-xs text-neutral-500 mt-1 max-w-xl leading-relaxed">
          Weekly thoughts on textile engineering, minimal coordinates, capsular wardrobe physics, and slow craft structures.
        </p>
      </div>

      {/* Category Navigation Filter */}
      {!error && !loading && (
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
              selectedCategory === "All"
                ? "bg-neutral-900 border-neutral-900 text-white"
                : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
            }`}
          >
            All Entries ({posts.length})
          </button>
          
          {categories.map((category) => {
            const count = posts.filter(p => p.categoryName === category.name).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === category.name
                    ? "bg-neutral-900 border-neutral-900 text-white"
                    : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
                }`}
              >
                {category.name} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Active Category Meta Description */}
      {selectedCategory !== "All" && (
        <div className="p-4 bg-neutral-50 border border-neutral-150 mb-8 max-w-2xl">
          <p className="text-xs text-neutral-500 font-mono">
            Currently displaying articles under <strong className="text-neutral-800">{selectedCategory}</strong>:{" "}
            {categories.find((c) => c.name === selectedCategory)?.description || "Curated journals focusing on quality craftsmanship."}
          </p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex flex-col gap-3">
              <div className="aspect-3/2 bg-neutral-200" />
              <div className="h-4 bg-neutral-200 rounded-sm w-1/4" />
              <div className="h-6 bg-neutral-200 rounded-sm w-3/4" />
              <div className="h-10 bg-neutral-200 rounded-sm w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto text-center py-10">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-12">
          <BookOpen className="text-neutral-300 w-12 h-12 mb-4 mx-auto stroke-1" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
            Không có dữ liệu để hiển thị
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Hiện không có bài viết nào phù hợp với danh mục này. Vui lòng quay lại sau.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  );
};

export default BlogListPage;
