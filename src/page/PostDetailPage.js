import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import ScrollProgress from "../component/ScrollProgress";
import Footer from "../component/Footer";
import PostContent from "../component/PostContent";
import { useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function PostDetailPage() {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [postContent, setPostContent] = useState();
  const [postDetail, setPostDetail] = useState();
  const [collection, setCollection] = useState();
  const [loading, setLoading] = useState(true); // <-- add loading state

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    async function fetchData() {
      try {
        const [detailRes, contentRes, collectionRes] = await Promise.all([
          fetch(
            `https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/posts/${slug}.json`
          ),
          fetch(
            `https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/posts/${slug}.md`
          ),
          fetch(
            `https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/config.json`
          ),
        ]);

        const detailData = await detailRes.json();
        const contentData = await contentRes.text();
        const collectionData = await collectionRes.json();

        setPostDetail(detailData);
        setPostContent(contentData);
        setCollection(
          collectionData.collections.filter((e) => {
            return e.id == detailData.collection;
          })[0]
        );
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false); // <-- loading done after both fetches
      }
    }

    fetchData();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={Logo} className="w-28 h-28" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollProgress progress={scrollProgress} />

      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        <PostContent
          collection={collection}
          postDetail={postDetail}
          postContent={postContent}
        />
      </main>

      <Footer />
    </div>
  );
}
