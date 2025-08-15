import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  summary?: string;
  imageUrl?: string;
  author?: string;
  timeAgo?: string;
  category?: string;
  size?: 'small' | 'medium' | 'large';
  href?: string;
}

export default function NewsCard({
  title,
  summary,
  imageUrl,
  author,
  timeAgo,
  category,
  size = 'medium',
  href = '#'
}: NewsCardProps) {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl font-bold'
  };

  return (
    <article className="group">
      <Link href={href} className="block">
        {imageUrl && (
          <div className="mb-3 overflow-hidden rounded-lg">
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          {category && (
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {category}
            </span>
          )}
          
          <h3 className={`${sizeClasses[size]} font-bold text-black group-hover:text-gray-700 transition-colors line-clamp-3`}>
            {title}
          </h3>
          
          {summary && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {summary}
            </p>
          )}
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            {author && <span>By {author}</span>}
            {timeAgo && <span>{timeAgo}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
