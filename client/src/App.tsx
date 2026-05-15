import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import { AdminProvider } from './context/AdminContext';
import { BoardPage } from './pages/BoardPage';
import { FeedbackDetailPage } from './pages/FeedbackDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <FilterProvider>
          <div
            className="fixed inset-0 pointer-events-none -z-10"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 65%)' }}
          />
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
          </Routes>
        </FilterProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}
