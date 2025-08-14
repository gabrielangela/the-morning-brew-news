import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/news/HeroSection';
import NewsSection from '@/components/news/NewsSection';
import { sampleMainArticle, sampleSideArticles, sampleBusinessNews, sampleOpinionNews } from '@/data/sampleNews';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F5F3]">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection 
          mainArticle={sampleMainArticle}
          sideArticles={sampleSideArticles}
        />

        {/* Business News Section */}
        <NewsSection 
          title="Business"
          articles={sampleBusinessNews}
          layout="grid"
        />

        {/* Opinion Section */}
        <NewsSection 
          title="Opinion"
          articles={sampleOpinionNews}
          layout="grid"
        />
      </main>

      <Footer />
    </div>
  );
}
