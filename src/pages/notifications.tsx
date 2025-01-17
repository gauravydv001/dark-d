// dd/src/pages/notifications.tsx
import Layout from '@/components/Layout';

const Notifications = () => {
  const notifications = [
    { id: 1, text: 'New follower: User 1' },
    { id: 2, text: 'Your post was liked by User 2' },
  ];

  return (
    <Layout>
      <div className="p-8  rounded-lg shadow-md bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4  rounded bg-gray-700">
              <p className="text-gray-200">{notification.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;