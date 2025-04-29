import React, { useState } from "react";
import { formatLunarDate } from "../util/DateUtil";
import { Headphones } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function PostContent({ collection, postDetail, postContent }) {
  const [openVideoUrl, setOpenVideoUrl] = useState(null);
  return (
    <article className="prose lg:prose-xl max-w-none mb-12">
      <img
        className="h-48 md:h-64 w-full object-cover"
        src={postDetail.image}
      />

      <div className="uppercase font-bold mt-6 text-white bg-green-800 border-green-900 border-2 inline-block px-3 py-1 rounded-full mb-4">
        {collection.title}
      </div>

      <h1 className="uppercase text-3xl font-bold mb-4">{postDetail.title}</h1>

      <div className="text-sm text-gray-500 mb-8 italic">
        {formatLunarDate(postDetail.date)}
      </div>

      <div className="font-sfpro text-md md:text-xl">
        <MarkdownPreview
          source={postContent}
          wrapperElement={{
            "data-color-mode": "light",
          }}
        />
      </div>

      <div className="bg-green-800 text-white p-6 mb-12 mt-12">
        <h2 className="text-lg font-normal uppercase">{collection.title}</h2>
        <h3 className="text-2xl font-bold mb-6 uppercase">
          {postDetail.metadata.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src={postDetail.metadata.images[0]} className="object-cover" />
          <img src={postDetail.metadata.images[1]} className="object-cover" />
          <img src={postDetail.metadata.images[2]} className="object-cover" />
        </div>

        <div
          className="mt-6 text-justify font-sfpro"
          style={{ "white-space": "pre-line" }}
        >
          {postDetail.metadata.content}
        </div>

        <div className="mt-8 flex flex-col space-y-4">
          {postDetail.metadata.action.map((e, index) => (
            <button
              key={index}
              onClick={() => setOpenVideoUrl(e.url)}
              className="hover:bg-white hover:text-green-800 font-medium border-2 border-white w-fit bg-white bg-opacity-10 text-white py-2 px-4 rounded-full flex items-center justify-center"
            >
              <Headphones className="mr-3" />
              <span className="mr-2 uppercase">{e.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openVideoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full relative">
            <button
              onClick={() => setOpenVideoUrl(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-96 rounded-md"
                src={openVideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
