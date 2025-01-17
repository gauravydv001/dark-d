/// dd/src/components/PostCard.tsx
import React from 'react';

const PostCard: React.FC<{ author: string; content: string }> = ({ author, content }) => {
  return (
    <div className="p-4  rounded-lg shadow-md bg-gray-800 mb-4">
      <p className="font-bold text-gray-200">{author}</p>
      <p className="text-gray-400">{content}</p>
      <div className="flex items-center mt-2">
        <button className="text-blue-400 mr-2">Like</button>
        <button className="text-blue-400">Reply</button>
      </div>
    </div>
  );
};

export default PostCard;