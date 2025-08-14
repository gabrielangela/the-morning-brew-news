import Image from 'next/image';
import Link from 'next/link';

interface HeroArticle {
  title: string;
  summary: string;
  imageUrl: string;
  author: string;
  timeAgo: string;
  href?: string;
}

interface HeroSectionProps {
  mainArticle: HeroArticle;
  sideArticles: HeroArticle[];
}

export default function HeroSection({ mainArticle, sideArticles }: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Article */}
        <div className="lg:col-span-2">
          <article className="group">
            <Link href={mainArticle.href || '#'} className="block">
              <div className="mb-4 overflow-hidden">
                <Image
                  src={mainArticle.imageUrl}
                  alt={mainArticle.title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 group-hover:text-gray-700 transition-colors">
                {mainArticle.title}
              </h1>
              
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {mainArticle.summary}
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>By {mainArticle.author}</span>
                <span>•</span>
                <span>{mainArticle.timeAgo}</span>
              </div>
            </Link>
          </article>
        </div>

        {/* Side Articles */}
        <div className="space-y-6">
          {sideArticles.map((article, index) => (
            <article key={index} className="group border-b border-gray-200 pb-6 last:border-b-0">
              <Link href={article.href || '#'} className="block">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <span>{article.timeAgo}</span>
                    </div>
                  </div>
                  
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
