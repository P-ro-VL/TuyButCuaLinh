import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#7B2D28] text-white py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-xl md:text-2xl font-semibold mb-4">
          COPYRIGHT BY PHẠM VĂN LINH @ {currentYear}
        </p>
        <p className="text-base md:text-lg italic">
          Lưu ý: Một số hình ảnh được sử dụng ở website này là do AI tạo ra (ChatGPT).
          <br />
          Các bài viết phản ánh cách tiếp cận và góc nhìn cá nhân của tác giả.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
