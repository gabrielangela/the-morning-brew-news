import NewsCard from './NewsCard';

interface Article {
  id: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  author?: string;
  timeAgo?: string;
  href?: string;
}

interface NewsSectionProps {
  title: string;
  articles: Article[];
  layout?: 'grid' | 'list';
}

export default function NewsSection({ title, articles, layout = 'grid' }: NewsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="border-t border-gray-300 pt-6">
        <h2 className="text-2xl font-bold text-black mb-6 border-b border-gray-200 pb-2">
          {title}
        </h2>
        
        <div className={
          layout === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }>
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              title={article.title}
              summary={article.summary}
              imageUrl={article.imageUrl}
              author={article.author}
              timeAgo={article.timeAgo}
              href={article.href}
              size={layout === 'list' ? 'medium' : 'small'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
