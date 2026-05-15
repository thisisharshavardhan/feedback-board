import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import { BoardPage } from './pages/BoardPage';
import { FeedbackDetailPage } from './pages/FeedbackDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  );
}
