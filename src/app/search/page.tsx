'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { nytimesAPI } from '@/lib/nytimes-api';
import type { NYTimesArticle, ArticleSearchResponse } from '@/types/nytimes';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<NYTimesArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) return;

    const performSearch = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const results = await nytimesAPI.searchArticles(query, 0, 'relevance');
        
        setSearchResults(results?.response?.docs || []);
      } catch (err) {
        console.error('Search error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to search articles. Please try again.';
        
        if (errorMessage.includes('Rate limit exceeded')) {
          setError('Too many requests. Please wait a moment before searching again.');
        } else if (errorMessage.includes('429')) {
          setError('API rate limit reached. Please try again in a few minutes.');
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#F6F5F3]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Showing results for: <span className="font-semibold">{query}</span>
            </p>
          )}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching articles...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && searchResults.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No articles found for {query}</p>
            <p className="text-sm text-gray-500">Try different keywords or check your spelling</p>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((article, index) => (
              <NewsCard
                key={article._id}
                title={article.headline.main}
                summary={article.abstract || article.lead_paragraph}
                imageUrl={
                  article.multimedia?.[0] 
                    ? `https://www.nytimes.com/${article.multimedia[0].url}`
                    : `https://picsum.photos/400/250?random=${index}`
                }
                author={article.byline?.original?.replace('By ', '') || 'NYTimes'}
                timeAgo={new Date(article.pub_date).toLocaleDateString()}
                href={article.web_url}
                size="small"
              />
            ))}
          </div>
        )}

        {!loading && searchResults.length > 10 && (
          <div className="text-center mt-12">
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Load More Results
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
