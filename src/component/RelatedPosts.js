import React from 'react';

const RelatedPosts = () => {
  const posts = [
    {
      id: 1,
      title: "Thành phố Hà Nội",
      image: "/temple.jpg", // Replace with actual image paths
    },
    {
      id: 2,
      title: "Thợ vẽ Hà Nội",
      image: "/old-quarter.jpg",
    },
    {
      id: 3,
      title: "Hồ Hà Nội",
      image: "/lake.jpg",
    }
  ];

  return (
    <div className="bg-green-800 text-white rounded-md p-6 mb-12">
      <h2 className="text-xl font-semibold mb-6">MỘT ĐÔI NÓI SỐNG</h2>
      <h3 className="text-2xl font-bold mb-6">THÀNH PHỐ HÀ NỘI</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post.id} className="overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col space-y-4">
        <button className="bg-white bg-opacity-10 text-white py-2 px-4 rounded-full flex items-center justify-center">
          <span className="mr-2">⟳</span> LĂNG NHÌN "TRỞ VỀ HÀ NỘI PHỐ"
        </button>
        <button className="bg-white bg-opacity-10 text-white py-2 px-4 rounded-full flex items-center justify-center">
          <span className="mr-2">⟳</span> LĂNG NHÌN "THỢ VẼ HÀ NỘI"
        </button>
      </div>
    </div>
  );
};

export default RelatedPosts;