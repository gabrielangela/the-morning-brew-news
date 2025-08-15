'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    try {
      // Navigate to search results page with query parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } catch (error) {
      console.error('Search navigation error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-2xl mx-auto px-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, or authors..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isSearching}
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
          </div>
          
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {/* Search suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Popular searches:</span>
          {['Politics', 'Technology', 'Business', 'Health', 'Climate'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
