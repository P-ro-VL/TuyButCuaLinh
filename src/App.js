import PostDetail from "./page/PostDetailPage";
import HomePage from "./page/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllPostsPage from "./page/AllPostsPage";
import CollectionPage from "./page/CollectionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="search" element={<AllPostsPage />} />
          <Route path="collections" element={<CollectionPage />} />
          <Route path="posts/:slug" element={<PostDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
