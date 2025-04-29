import React, { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";

const AllPostsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [collections, setCollections] = useState([]);
  const [postsData, setPostsData] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfigAndPosts = async () => {
      try {
        // Fetch the config.json file
        const configResponse = await fetch(
          "https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/config.json"
        );
        if (!configResponse.ok) {
          throw new Error(`HTTP error! status: ${configResponse.status}`);
        }
        const configData = await configResponse.json();
        setCollections(configData.collections);

        // Extract all unique post slugs from collections
        const allPostSlugs = [
          ...new Set(
            configData.collections.flatMap((collection) => collection.posts)
          ),
        ];

        // Fetch data for each post
        const postsDataPromises = allPostSlugs.map(async (slug) => {
          const postResponse = await fetch(
            `https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/posts/${slug}.json`
          );
          if (!postResponse.ok) {
            console.error(
              `Failed to fetch post data for ${slug}: ${postResponse.status}`
            );
            return null;
          }
          const postData = await postResponse.json();
          return [slug, postData];
        });

        const fetchedPostsData = await Promise.all(postsDataPromises);
        const validPostsData = Object.fromEntries(
          fetchedPostsData.filter(Boolean)
        );
        setPostsData(validPostsData);
        setFilteredPosts(Object.values(validPostsData)); // Initially show all posts
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchConfigAndPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on the search term
    const results = Object.values(postsData).filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, postsData]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <div className="text-center py-4 flex-grow">Đang tải dữ liệu...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4 flex-grow">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header page="search" />
      <div className="container mx-auto p-4 flex-grow">
        <h2 className="text-xl font-semibold mb-4 text-[#A1252A]">
          DANH SÁCH TẤT CẢ BÀI VIẾT ({filteredPosts.length})
        </h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết theo tiêu đề"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <a
                className="bg-white rounded-md p-4 flex items-center"
                href={"/posts/" + post.id}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  {collections.find((col) => col.id === post.collection) && (
                    <p className="text-gray-500 text-sm uppercase">
                      {
                        collections.find((col) => col.id === post.collection)
                          .title
                      }
                    </p>
                  )}
                  <strong className="text-lg font-medium">{post.title}</strong>
                  <p className="text-gray-500 text-sm">
                    Ngày đăng: {post.date}
                  </p>
                </div>
              </a>
            </li>
          ))}
          {filteredPosts.length === 0 && searchTerm && (
            <p className="text-gray-600">
              Không tìm thấy bài viết nào phù hợp.
            </p>
          )}
          {Object.keys(postsData).length > 0 &&
            filteredPosts.length === 0 &&
            !searchTerm && (
              <p className="text-gray-600">Không có bài viết nào.</p>
            )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AllPostsPage;
