// dd/src/pages/messages.tsx
import Layout from '@/components/Layout';

const Messages = () => {
  const messages = [
    { id: 1, text: 'Message from User 1: Hello!' },
    { id: 2, text: 'Message from User 2: How are you?' },
  ];

  return (
    <Layout>
      <div className="p-8  rounded-lg shadow-md bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Messages</h2>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="p-4  rounded bg-gray-700">
              <p className="text-gray-200">{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;