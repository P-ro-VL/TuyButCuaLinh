import Header from "../component/Header";
import HeroSection from "../component/HeroSection";
import FeaturedPostsSection from "../component/FeaturedPostsSection";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import slugify from "slugify";

export default function HomePage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        // Step 1: Fetch config.json
        const configRes = await fetch(
          "https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/config.json"
        );
        const configData = await configRes.json();

        // Step 2: For each post slug in each collection, fetch its corresponding post JSON
        const collectionsWithPosts = await Promise.all(
          configData.collections.map(async (collection) => {
            const posts = await Promise.all(
              collection.posts.map(async (slug) => {
                const postRes = await fetch(
                  `https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/posts/${slug}.json`
                );
                const postData = await postRes.json();
                return {
                  ...postData,
                  imageUrl: postData.image || "/default-image.jpg",
                  uploadDate: postData.date,
                  slug: slugify(postData.title, { lower: true, strict: true }),
                };
              })
            );

            return {
              ...collection,
              posts,
            };
          })
        );

        setCollections(collectionsWithPosts);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      {collections.map((col) => (
        <FeaturedPostsSection
          key={col.id}
          title={col.title}
          description={col.description}
          posts={col.posts.map((post) => ({
            ...post,
            href: `/posts/${post.slug}`,
          }))}
        />
      ))}
      <Footer />
    </div>
  );
}
