// dd/src/pages/explore.tsx
import Layout from '@/components/Layout';

const Explore = () => {
  const trendingPosts = [
    { id: 1, content: 'Trending Post 1: Check this out!' },
    { id: 2, content: 'Trending Post 2: Another interesting post.' },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-8  rounded-lg shadow-md bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Explore</h2>
        <div className="space-y-4">
          {trendingPosts.map((post) => (
            <div key={post.id} className="p-4  rounded bg-gray-700">
              <p className="text-gray-200">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;