import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import CategoryItems from './pages/CategoryItems';
import ItemPage from './pages/ItemPage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:category" element={<CategoryItems />} />
      <Route path="/item/:id" element={<ItemPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
