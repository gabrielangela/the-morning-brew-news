'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/news/HeroSection';
import NewsSection from '@/components/news/NewsSection';
import { useTopStories, useMostPopular } from '@/hooks/useNYTimes';
import { nytimesAPI } from '@/lib/nytimes-api';
import type { TopStoryArticle, PopularArticle } from '@/types/nytimes';

export default function Home() {
  const { data: topStories, loading: topStoriesLoading } = useTopStories('home');
  const { data: mostPopular, loading: popularLoading } = useMostPopular('emailed', 7);
  const [businessNews, setBusinessNews] = useState<TopStoryArticle[]>([]);
  const [opinionNews, setOpinionNews] = useState<TopStoryArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionNews = async () => {
      try {
        const [businessData, opinionData] = await Promise.all([
          nytimesAPI.getTopStories('business'),
          nytimesAPI.getTopStories('opinion')
        ]);
        
        setBusinessNews(businessData?.results.slice(0, 3) || []);
        setOpinionNews(opinionData?.results.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching section news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionNews();
  }, []);

  if (topStoriesLoading || popularLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F6F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading latest news...</p>
        </div>
      </div>
    );
  }

  const mainArticle = topStories?.results[0];
  const sideArticles = topStories?.results.slice(1, 3) || [];

  return (
    <div className="min-h-screen bg-[#F6F5F3]">
      <Header />
      
      <main>
        {/* Hero Section */}
        {mainArticle && (
          <HeroSection 
            mainArticle={{
              title: mainArticle.title,
              summary: mainArticle.abstract,
              imageUrl: mainArticle.multimedia?.[0]?.url || 'https://picsum.photos/800/450?random=1',
              author: mainArticle.byline.replace('By ', ''),
              timeAgo: new Date(mainArticle.published_date).toLocaleDateString(),
              href: mainArticle.url
            }}
            sideArticles={sideArticles.map(article => ({
              title: article.title,
              summary: article.abstract,
              imageUrl: article.multimedia?.[0]?.url || 'https://picsum.photos/150/150?random=2',
              author: article.byline.replace('By ', ''),
              timeAgo: new Date(article.published_date).toLocaleDateString(),
              href: article.url
            }))}
          />
        )}

        {/* Business News Section */}
        {businessNews.length > 0 && (
          <NewsSection 
            title="Business"
            articles={businessNews.map((article, index) => ({
              id: article.uri,
              title: article.title,
              summary: article.abstract,
              imageUrl: article.multimedia?.[0]?.url || `https://picsum.photos/400/250?random=${index + 10}`,
              author: article.byline.replace('By ', ''),
              timeAgo: new Date(article.published_date).toLocaleDateString(),
              href: article.url
            }))}
            layout="grid"
          />
        )}

        {/* Opinion Section */}
        {opinionNews.length > 0 && (
          <NewsSection 
            title="Opinion"
            articles={opinionNews.map((article, index) => ({
              id: article.uri,
              title: article.title,
              summary: article.abstract,
              imageUrl: article.multimedia?.[0]?.url || `https://picsum.photos/400/250?random=${index + 20}`,
              author: article.byline.replace('By ', ''),
              timeAgo: new Date(article.published_date).toLocaleDateString(),
              href: article.url
            }))}
            layout="grid"
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
