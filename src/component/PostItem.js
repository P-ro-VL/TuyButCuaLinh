import React from "react";

function PostItem({ imageUrl, title, uploadDate, href }) {
  return (
    <article className="group flex-shrink-0 w-64 sm:w-72 rounded-lg overflow-hidden shadow-lg bg-yellow-50 transform transition-transform duration-300 hover:scale-105">
      {/* Image Area */}
      <div className="h-40 bg-blue-900 flex items-center justify-center text-gray-400 relative overflow-hidden transition-all duration-300 ease-in-out">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || "Post image"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-sm">Image Placeholder</span>
        )}
      </div>

      {/* Text Content Area */}
      <div className="p-4 bg-yellow-50 transition-all duration-300 ease-in-out h-32 flex flex-col justify-between">
        <h3 className="uppercase font-semibold text-sm text-gray-900 mb-1 leading-snug line-clamp-2 group-hover:line-clamp-none">
          {title || "Untitled Post"}
        </h3>
        <p className="text-xs text-gray-600">{uploadDate ?? "No date"}</p>
      </div>

      {/* Link to post */}
      <a href={href} className="absolute inset-0 w-full h-full"></a>
    </article>
  );
}

export default PostItem;
