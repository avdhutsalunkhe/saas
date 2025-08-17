import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import GenerateImage from './pages/GenerateImage';
import RemoveObject from './pages/RemoveObject';
import RemoveBackground from './pages/RemoveBackground'; // ✅ import this
import Reviewresume from './pages/Reviewresume';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import Community from './pages/Community';
import { useAuth } from '@clerk/clerk-react';

const App = () => { 
  const { getToken } = useAuth();
  useEffect(() => {
    // The following line logs the authentication token to the console for debugging purposes.
    // It helps developers verify that the token is being retrieved correctly.
    getToken().then((token) => console.log(token));
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* All AI tools under /ai */}
      <Route path="/ai" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/ai/generate-image" element={<GenerateImage />} />
        <Route path="/ai/remove-object" element={<RemoveObject />} />
        <Route path="/ai/remove-background" element={<RemoveBackground />} /> {/* ✅ NEW */}
        <Route path="/ai/review-resume" element={<Reviewresume />} />
        <Route path="/ai/write-article" element={<WriteArticle />} />
        <Route path="/ai/blog-titles" element={<BlogTitles />} />
        <Route path="/ai/community" element={<Community />} />
      </Route>
    </Routes>
  );
};

export default App;
