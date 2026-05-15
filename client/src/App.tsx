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
          {/* Aurora background — fixed behind all pages */}
          <div className="fixed inset-0 bg-[#05050f] -z-10" />
          <div className="fixed inset-0 overflow-hidden -z-10">
            <div className="aurora-orb aurora-orb-1" />
            <div className="aurora-orb aurora-orb-2" />
            <div className="aurora-orb aurora-orb-3" />
            <div className="aurora-orb aurora-orb-4" />
          </div>

          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
          </Routes>
        </FilterProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}
