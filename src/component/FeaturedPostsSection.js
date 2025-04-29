import React from "react";
import PostItem from "./PostItem";
import TrongDong from "../assets/TrongDong.png"; // adjust path if needed

function FeaturedPostsSection({
  title,
  description,
  posts = [],
  rewards = "#",
  backgroundColor = "#134e4a",
}) {
  const sectionStyle = {
    backgroundColor,
    backgroundImage: `url(${TrongDong})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    "--primary-color": backgroundColor, // still keep your primary color
  };

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 text-white"
      style={sectionStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block bg-teal-700 rounded-full px-4 py-1 text-xs font-semibold tracking-wider uppercase mb-3 text-teal-100">
            BỘ SƯU TẬP
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl mb-3">
            {title || "Featured Posts"}
          </h2>
          <p className="text-lg text-teal-100 max-w-3xl mx-auto">
            {description || "Check out our latest collection."}
          </p>
        </div>

        {/* Horizontally Scrollable Posts */}
        <div className="flex space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scrollbar-hide">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostItem
                key={post.id || index}
                imageUrl={post.imageUrl}
                title={post.title}
                uploadDate={post.uploadDate}
                href={post.href}
              />
            ))
          ) : (
            <p className="text-center w-full text-teal-200">
              No posts available.
            </p>
          )}
          {posts.length > 0 && <div className="flex-shrink-0 w-1"></div>}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 md:mt-14 text-center flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* <a
            href={rewards}
            className="inline-block border-2 border-white rounded-full px-8 py-2.5 text-sm font-medium text-white hover:text-[var(--primary-color)] hover:bg-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--primary-color)]"
          >
            PHẦN THƯỞNG
          </a> */}
          <a
            href="/search"
            className="inline-block border-2 border-white rounded-full px-8 py-2.5 text-sm font-medium text-white hover:text-[var(--primary-color)] hover:bg-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--primary-color)]"
          >
            XEM TẤT CẢ
          </a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPostsSection;
