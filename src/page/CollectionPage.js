import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function CollectionPage() {
  const [collections, setCollections] = useState([]);
  const [postsData, setPostsData] = useState({});

  useEffect(() => {
    async function fetchCollections() {
      try {
        const configRes = await fetch(
          "https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/config.json"
        );
        const config = await configRes.json();
        setCollections(config.collections);

        // Fetch all post JSONs
        const allPosts = {};
        for (const collection of config.collections) {
          for (const slug of collection.posts) {
            const postRes = await fetch(
              `https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/posts/${slug}.json`
            );
            const postData = await postRes.json();
            allPosts[slug] = postData;
          }
        }
        setPostsData(allPosts);
      } catch (error) {
        console.error("Error fetching collection or posts:", error);
      }
    }

    fetchCollections();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header page="collections" />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#A1252A]">Bộ sưu tập</h1>
        <Accordion
          type="multiple"
          collapsible
          className="w-full"
          value={collections.map((c) => c.id)}
        >
          {collections.map((collection) => {
            console.log(collection.color);
            return (
              <AccordionItem
                className={`w-full bg-[#${collection.color}]`}
                key={collection.id}
                value={collection.id}
              >
                <AccordionTrigger className="w-full">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col items-start justify-start">
                      <p
                        className={`text-xl font-semibold m-0 p-0 text-[#${collection.color}]`}
                      >
                        {collection.title}
                      </p>
                      <p
                        className={`mb-4 m-0 p-0 text-start text-[#${collection.color}]`}
                      >
                        {collection.description}
                      </p>
                    </div>
                    <ChevronDown />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {collection.posts.map((slug) => {
                      const post = postsData[slug];
                      if (!post) return null;
                      return (
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
                              {collections.find(
                                (col) => col.id === post.collection
                              ) && (
                                <p className="text-gray-500 text-sm uppercase">
                                  {
                                    collections.find(
                                      (col) => col.id === post.collection
                                    ).title
                                  }
                                </p>
                              )}
                              <strong className="text-lg font-medium">
                                {post.title}
                              </strong>
                              <p className="text-gray-500 text-sm">
                                Ngày đăng: {post.date}
                              </p>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
