'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsSection from '@/components/news/NewsSection';
import { nytimesAPI } from '@/lib/nytimes-api';
import type { TopStoryArticle } from '@/types/nytimes';

// Map URL slugs to API section names
const sectionMap: Record<string, string> = {
  'us': 'us',
  'world': 'world',
  'business': 'business',
  'technology': 'technology',
  'science': 'science',
  'health': 'health',
  'sports': 'sports',
  'arts': 'arts',
  'opinion': 'opinion'
};

// Display names for sections
const sectionNames: Record<string, string> = {
  'us': 'U.S. News',
  'world': 'World News',
  'business': 'Business',
  'technology': 'Technology',
  'science': 'Science',
  'health': 'Health',
  'sports': 'Sports',
  'arts': 'Arts',
  'opinion': 'Opinion'
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [articles, setArticles] = useState<TopStoryArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sectionKey = sectionMap[slug];
  const sectionName = sectionNames[slug] || 'News';

  useEffect(() => {
    if (!sectionKey) {
      setError('Section not found');
      setLoading(false);
      return;
    }

    const fetchCategoryNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await nytimesAPI.getTopStories(sectionKey);
        setArticles(data?.results || []);
      } catch (err) {
        console.error('Error fetching category news:', err);
        setError('Failed to load articles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [sectionKey]);

  if (!sectionKey) {
    return (
      <div className="min-h-screen bg-[#F6F5F3]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-black mb-4">Section Not Found</h1>
            <p className="text-gray-600">The requested section does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F3]">
      <Header />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-black mb-8 border-b border-gray-200 pb-4">
            {sectionName}
          </h1>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading {sectionName.toLowerCase()} articles...</p>
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

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles found in this section.</p>
            </div>
          )}

          {!loading && articles.length > 0 && (
            <NewsSection 
              title=""
              articles={articles.map((article, index) => ({
                id: article.uri,
                title: article.title,
                summary: article.abstract,
                imageUrl: article.multimedia?.[0]?.url || `https://picsum.photos/400/250?random=${index + 100}`,
                author: article.byline.replace('By ', ''),
                timeAgo: new Date(article.published_date).toLocaleDateString(),
                href: article.url
              }))}
              layout="grid"
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
