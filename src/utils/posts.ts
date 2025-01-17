// src/utils/posts.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import type { Post } from '@/types/Post';

const postsCollection = collection(db, 'posts');

export const fetchAllPosts = async (authorId?: string): Promise<Post[]> => {
  let postsQuery = query(collection(db, 'posts'));
  if (authorId) {
    postsQuery = query(collection(db, 'posts'), where('authorId', '==', authorId));
  }

  const querySnapshot = await getDocs(postsQuery);
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data() as Post;
    post.id = doc.id;
    posts.push(post);
  });

  return posts;
};

export const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  const userPostsQuery = query(postsCollection, where('authorId', '==', userId));
  const querySnapshot = await getDocs(userPostsQuery);
  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data() as Post;
    post.id = doc.id;
    posts.push(post);
  });
  return posts;
};

export const createPost = async (post: NewPost): Promise<Post> => {
  const newPost: Omit<Post, 'id' | 'createdAt'> = {
    content: post.content,
    authorId: post.authorId,
    likes: post.likes || 0,
    replies: post.replies || 0,
  };
  const docRef = await addDoc(postsCollection, newPost);
  return { ...newPost, id: docRef.id, createdAt: new Date() };
};

export const updatePost = async (postId: string, updates: Partial<Post>): Promise<void> => {
  const postDoc = doc(postsCollection, postId);
  await updateDoc(postDoc, updates);
};

export const deletePost = async (postId: string): Promise<void> => {
  const postDoc = doc(postsCollection, postId);
  await deleteDoc(postDoc);
};

export interface NewPost {
  content: string;
  authorId: string;
  likes?: number;
  replies?: number;
}