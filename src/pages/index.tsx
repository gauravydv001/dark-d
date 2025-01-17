// dd/src/pages/index.tsx
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchAllPosts } from '@/utils/posts';
import type { Post } from '@/types/Post';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentFilter, setContentFilter] = useState<'forYou' | 'following'>('forYou');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        const userPosts = await fetchAllPosts(session?.user?.id);
        setPosts(userPosts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (contentFilter === 'following') {
      return post.authorId === session?.user?.id;
    }
    return true;
  });

  return (
    <Layout>
      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content (Centered between Sidebars) */}
        <div className="flex-grow mx-4 xl:mx-96 max-w-2xl">
          {/* Content Filter (For You, Following) */}
          <div className="mb-4 px-20 lg:px-48 py-6 mr-2 mx-auto flex space-x-4 border-b border-gray-600">
            <button
              onClick={() => setContentFilter('forYou')}
              className={`pb-2 text-lg md:text-3xl font-semibold ${
                contentFilter === 'forYou'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              For you
            </button>
            <button
              onClick={() => setContentFilter('following')}
              className={`pb-2 text-lg md:text-3xl font-semibold ${
                contentFilter === 'following'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Following
            </button>
          </div>

          {/* Posts */}
          {loading ? (
            <p className="text-center text-gray-200">Loading posts...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="p-4 bg-gray-700 rounded">
                  <p className="text-gray-200">{post.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-200">No posts found.</p>
          )}
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}