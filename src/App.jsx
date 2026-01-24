import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import MenuPage from "./pages/Menu.jsx";
import Reservations from "./pages/Reservations.jsx";
import ConfirmedBooking from "./pages/ConfirmedBooking.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/confirmation" element={<ConfirmedBooking />} />
      {/* Placeholder routes */}
      <Route path="/order" element={<Index />} />
      <Route path="/login" element={<Index />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
