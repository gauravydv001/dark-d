// dd/src/pages/create-post.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { GetServerSidePropsContext } from 'next'; // Import GetServerSidePropsContext

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const session = await getSession();
    if (!session) {
      alert('You must be logged in to create a post.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        userId: session.user.id,
        author: session.user.name,
        content,
        createdAt: new Date(),
      });

      alert('Post created successfully!');
      router.push('/profile');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-gray-200">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white  rounded  bg-blue-500 hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};