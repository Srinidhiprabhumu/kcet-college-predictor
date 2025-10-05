import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { List, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CollegeData } from '../types';
import ReactMarkdown from 'react-markdown';

interface DashboardProps {
  predictions: (CollegeData & { score: number })[];
  aiSuggestions: string;
  category: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export function Dashboard({ predictions, aiSuggestions, category }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const topColleges = predictions.slice(0, 10);

  const chartData = topColleges.map(college => ({
    name: college.College.split(' ').slice(0, 2).join(' '),
    'Prediction Score': college.score,
  }));

  // Calculate pagination
  const totalPages = Math.ceil(predictions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPredictions = predictions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium border-t border-b ${
            i === currentPage
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    );

    return buttons;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Prediction Score (Top 10)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} interval={0} angle={-30} textAnchor="end" />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip
                cursor={{ fill: 'rgba(136, 132, 216, 0.2)' }}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid #e0e0e0', borderRadius: '0.5rem' }}
              />
              <Bar dataKey="Prediction Score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('list')}
              className={`transition-all duration-300 ${
                activeTab === 'list'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <List size={16} className="mr-2" />
              Detailed List
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`transition-all duration-300 ${
                activeTab === 'ai'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Bot size={16} className="mr-2" />
              AI Recommendations
            </button>
          </nav>
        </div>
        <div className="p-6 relative">
          {activeTab === 'list' && (
            <div className="transition-opacity duration-500 opacity-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cutoff</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentPredictions.map((college, index) => (
                      <tr key={startIndex + index} className="hover:bg-indigo-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{startIndex + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">{college.College}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{college.Branch}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{college.Location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600 text-right">{college[category as keyof CollegeData]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">{college.score.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(endIndex, predictions.length)} of {predictions.length} results
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderPaginationButtons()}
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === 'ai' && (
            <div className="transition-opacity duration-500 opacity-100">
              <div className="prose max-w-none text-gray-700 h-96 overflow-y-auto text-left p-4">
                <ReactMarkdown>{aiSuggestions}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}