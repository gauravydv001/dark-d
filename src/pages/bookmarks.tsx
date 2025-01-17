// dd/src/pages/bookmarks.tsx
import Layout from '@/components/Layout';

const Bookmarks = () => {
  const bookmarks = [
    { id: 1, text: 'Bookmarked Post 1: This is a great post!' },
    { id: 2, text: 'Bookmarked Post 2: Another awesome post.' },
  ];

  return (
    <Layout>
      <div className="p-8  rounded-lg shadow-md bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Bookmarks</h2>
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="p-4  rounded bg-gray-700">
              <p className="text-gray-200">{bookmark.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Bookmarks;