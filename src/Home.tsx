import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { PredictionForm } from './components/PredictionForm';
import { Dashboard } from './components/Dashboard';
import { Chatbot } from './components/Chatbot';
import { getPredictions, getChatbotResponse } from './services/gemini';
import type { CollegeData, SeatMatrix } from './types';
import { MessageSquare } from 'lucide-react';

export function Home() {
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrix[]>([]);
  const [predictions, setPredictions] = useState<(CollegeData & { score: number })[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('GM');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    // Load college data
    fetch('/data/kcet_data.csv')
      .then(response => response.text())
      .then(csv => {
        const results = Papa.parse<CollegeData>(csv, { header: true, skipEmptyLines: true });
        const cleanedData = results.data.filter(row => row.CETCode && row.College).map(row => {
            const newRow = { ...row };
            Object.keys(newRow).forEach(key => {
                if (key !== 'College' && key !== 'Location' && key !== 'Branch' && key !== 'CETCode') {
                    const value = (newRow as any)[key];
                    if (typeof value === 'string') {
                        (newRow as any)[key] = value.replace(/[^0-9]/g, '');
                    }
                }
            });
            return newRow;
        });
        setCollegeData(cleanedData);
      });

    // Load seat matrix data
    fetch('/data/seat_matrix.csv')
      .then(response => response.text())
      .then(csv => {
        const results = Papa.parse<SeatMatrix>(csv, { header: true, skipEmptyLines: true, dynamicTyping: true });
        setSeatMatrixData(results.data);
      });
  }, []);

  const handleFormSubmit = async (data: { rank: number; locations: string[]; category: string; branches: string[] }) => {
    setCategory(data.category);
    setLoading(true);
    try {
      // Redefined prediction logic with seat matrix
      const scoredColleges = collegeData
        .map(college => {
          const cutoffValue = college[data.category as keyof CollegeData] as string;
          const cutoff = parseInt(cutoffValue, 10);

          if (isNaN(cutoff) || cutoff === 0) {
            return { ...college, score: 0 };
          }

          const rankDifference = cutoff - data.rank;

          if (rankDifference < -5000) { // User rank is much worse than cutoff
            return { ...college, score: 0 };
          }

          // 1. Closeness Score
          let closenessScore = Math.exp(-Math.abs(rankDifference) / 10000) * 100;
          if (rankDifference < 0) {
            closenessScore *= 0.5; // Penalize if rank is worse than cutoff
          }

          // 2. Preference Weighting
          const locationMatch = data.locations.some(loc => college.Location.toLowerCase().includes(loc.toLowerCase()));
          const branchMatch = data.branches.some(branch => college.Branch.toLowerCase().includes(branch.toLowerCase()));

          // 3. Seat Matrix Score
          const seatInfo = seatMatrixData.find(
            s => s.college_code === college.CETCode && s.course_code === college.Branch
          );
          const seatAvailabilityScore = seatInfo ? Math.log(seatInfo.seats + 1) * 10 : 1;

          let score = closenessScore + seatAvailabilityScore;

          // Apply preference weights
          if (data.locations.length > 0) {
            score *= locationMatch ? 5 : 0.1;
          }
          if (data.branches.length > 0) {
            score *= branchMatch ? 1.5 : 1;
          }

          return { ...college, score };
        })
        .filter(college => college.score > 0)
        .sort((a, b) => b.score - a.score);

      const topColleges = scoredColleges.slice(0, 25);

      setPredictions(topColleges);

      // Get AI suggestions
      const suggestions = await getPredictions(topColleges, {
        rank: data.rank,
        locations: data.locations,
        category: data.category,
        branches: data.branches
      });
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error getting predictions:', error);
    }
    setLoading(false);
  };

  const handleChatMessage = async (message: string) => {
    return await getChatbotResponse(message, collegeData);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <PredictionForm onSubmit={handleFormSubmit} />
          </div>
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : predictions.length > 0 ? (
            <Dashboard predictions={predictions} aiSuggestions={aiSuggestions} category={category} />
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center h-full flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-gray-900">Welcome!</h2>
              <p className="mt-2 text-gray-600">
                Enter your details to get personalized college predictions.
              </p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110"
      >
        <MessageSquare size={24} />
      </button>
      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onSendMessage={handleChatMessage}
      />
    </>
  );
}