import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './Home';
import { CounsellingProcess } from './components/CounsellingProcess';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
            KCET College Predictor
          </Link>
          <nav>
            <Link to="/counselling-process" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition">
              Counselling Process
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counselling-process" element={<CounsellingProcess />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;