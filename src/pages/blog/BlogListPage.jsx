import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { postService } from "../../services/postService";

export const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await postService.getPosts();
        setPosts(response);
      } catch (err) {
        setError("Unable to retrieve articles");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-neutral-100 pb-6 mb-12 text-center sm:text-left">
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
      ) : posts.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-12">
          <BookOpen className="text-neutral-300 w-12 h-12 mb-4 mx-auto stroke-1" />
          <h3 className="text-sm font-bold uppercase text-neutral-800">No entries recorded</h3>
          <p className="text-xs text-neutral-400 mt-1">Please audit later while we draft content journals.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col bg-white overflow-hidden border border-neutral-100 hover:shadow-md transition-all duration-300">
              <Link to={`/blog/${post.id}`} className="block aspect-3/2 bg-neutral-50 overflow-hidden relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </Link>

              <div className="p-6 flex flex-col gap-3 flex-grow">
                <div className="flex gap-2 items-center flex-wrap text-[10px] font-mono text-neutral-400">
                  <Clock size={11} />
                  <time>
                    {new Date(post.createdDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </time>
                  <span>•</span>
                  <span className="uppercase text-neutral-600 font-bold tracking-wider">{post.categoryName}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors line-clamp-1">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3 mb-2">
                  {post.content}
                </p>

                <Link
                  to={`/blog/${post.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline"
                >
                  Read Journal <ArrowRight size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};

export default BlogListPage;
