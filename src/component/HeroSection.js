import React, { useEffect, useState } from "react";

const jsonUrl =
  "https://raw.githubusercontent.com/P-ro-VL/TBCL-CDN/main/hero.json";

function HeroSection() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((data) => setHeroData(data))
      .catch((error) => console.error("Error fetching hero data:", error));
  }, []);

  if (!heroData) {
    return <div className="text-center py-20">Đang tải nội dung...</div>;
  }

  return (
    <section className="relative bg-yellow-50 overflow-hidden">
      <div className="absolute inset-0 md:hidden -z-10">
        <img
          src={heroData.imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
          <div className="hidden md:block relative">
            <img
              className="w-full h-auto rounded-lg shadow-md object-contain"
              src={heroData.image}
            />
          </div>

          <div className="h-full text-center flex flex-col items-center justify-center md:items-center md:justify-between space-y-5 min-h-[350px] md:min-h-0">
            <p className="text-sm md:text-xl font-semibold uppercase tracking-widertext-gray-600">
              {heroData.header}
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-4xl lg:text-5xl text-red-900">
              {heroData.title}
            </h1>

            <a
              href={heroData.buttonUrl}
              className="inline-block bg-red-800 border border-transparent rounded-md py-2 px-8 font-medium text-white hover:bg-red-700 transition duration-150 ease-in-out shadow"
            >
              {heroData.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
