import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { postService } from "../../services/postService";
import { PostCard } from "../../components/blog/PostCard";

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
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  );
};

export default BlogListPage;
