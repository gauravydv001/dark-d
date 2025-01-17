// dd/src/pages/api/posts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import type { Post } from '@/types/Post';

const postsCollection = collection(db, 'posts');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const authorId = req.query.authorId as string;

    let postsQuery = query(postsCollection);
    if (authorId) {
      postsQuery = query(postsCollection, where('authorId', '==', authorId));
    }

    const querySnapshot = await getDocs(postsQuery);
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      const post = doc.data() as Post;
      post.id = doc.id;
      posts.push(post);
    });

    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const newPost: Omit<Post, 'id'> = {
      content,
      authorId: session.user.id, // Ensure `id` is available
      createdAt: new Date(),
      likes: 0,
      replies: 0,
    };

    const docRef = await addDoc(postsCollection, newPost);
    const postWithId: Post = { ...newPost, id: docRef.id };

    return res.status(201).json(postWithId);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}