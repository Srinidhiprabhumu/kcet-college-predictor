import React, { useState } from 'react';
import { Search, MapPin, Users, PlusCircle, XCircle } from 'lucide-react';

interface PredictionFormProps {
  onSubmit: (data: { rank: number; locations: string[]; category: string; branches: string[] }) => void;
}

const categories = [
  'GM', '1G', '2AG', '2BG', '3AG', '3BG', 'SCG', 'STG'
];

const branchMap: { [key: string]: string } = {
    'Computer Science': 'CS',
    'Electronics and Communication': 'EC',
    'Mechanical': 'ME',
    'Civil': 'CE',
    'Information Science': 'IE',
    'Electrical and Electronics': 'EE',
    'Artificial Intelligence': 'AI',
    'Data Science': 'DS',
    'Robotics': 'RO',
    'Aeronautical': 'AE'
};

const branches = Object.keys(branchMap);

export function PredictionForm({ onSubmit }: PredictionFormProps) {
  const [rank, setRank] = useState('');
  const [locations, setLocations] = useState(['']);
  const [category, setCategory] = useState('GM');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);


  const handleBranchChange = (branch: string) => {
    setSelectedBranches(prev =>
      prev.includes(branch)
        ? prev.filter(b => b !== branch)
        : [...prev, branch]
    );
  };

  const handleLocationChange = (index: number, value: string) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const addLocation = () => {
    if (locations.length < 10) {
      setLocations([...locations, '']);
    }
  };

  const removeLocation = (index: number) => {
    if (locations.length > 1) {
      const newLocations = locations.filter((_, i) => i !== index);
      setLocations(newLocations);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rank: parseInt(rank),
      locations: locations.filter(l => l.trim() !== ''),
      category,
      branches: selectedBranches.map(b => branchMap[b]),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            KCET Rank
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              required
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your rank"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Locations
          </label>
          <div className="space-y-2">
            {locations.map((location, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder={`Location ${index + 1}`}
                  />
                </div>
                {locations.length > 1 && (
                  <button type="button" onClick={() => removeLocation(index)} className="text-red-500 hover:text-red-700">
                    <XCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            {locations.length < 10 && (
              <button type="button" onClick={addLocation} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                <PlusCircle className="h-5 w-5" />
                <span>Add Location</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Branches
        </label>
        <div className="grid grid-cols-2 gap-3">
          {branches.map((branch) => (
            <label key={branch} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                checked={selectedBranches.includes(branch)}
                onChange={() => handleBranchChange(branch)}
              />
              <span className="text-sm font-medium text-gray-800">{branch}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
      >
        Get Predictions
      </button>
    </form>
  );
}