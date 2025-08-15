import type { NYTimesArticle, TopStoryArticle, PopularArticle } from '@/types/nytimes';

// Utility functions for processing NYTimes data

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return formatDate(dateString);
}

export function extractImageUrl(article: NYTimesArticle | TopStoryArticle, format: string = 'superJumbo'): string | null {
  if ('multimedia' in article && article.multimedia && article.multimedia.length > 0) {
    // For TopStoryArticle
    if ('title' in article) {
      const topStoryArticle = article as TopStoryArticle;
      const image = topStoryArticle.multimedia.find(img => img.format === format) || topStoryArticle.multimedia[0];
      return image.url;
    }
    // For NYTimesArticle
    else {
      const nyTimesArticle = article as NYTimesArticle;
      const image = nyTimesArticle.multimedia.find(img => img.subtype === format) || nyTimesArticle.multimedia[0];
      return image.url ? `https://static01.nyt.com/${image.url}` : null;
    }
  }
  return null;
}

export function extractImageUrlFromPopular(article: PopularArticle, format: string = 'mediumThreeByTwo440'): string | null {
  if (article.media && article.media.length > 0) {
    const mediaItem = article.media[0];
    if (mediaItem['media-metadata']) {
      const image = mediaItem['media-metadata'].find(img => img.format === format) || mediaItem['media-metadata'][0];
      return image.url;
    }
  }
  return null;
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function getAuthorName(byline: string): string {
  // Remove "By " prefix if present
  return byline.replace(/^By\s+/i, '');
}

export function categorizeBySection(articles: (NYTimesArticle | TopStoryArticle)[]): Record<string, (NYTimesArticle | TopStoryArticle)[]> {
  return articles.reduce((acc, article) => {
    let section: string;
    if ('section' in article) {
      // TopStoryArticle has section property
      section = article.section || 'General';
    } else {
      // NYTimesArticle has section_name property
      section = (article as NYTimesArticle).section_name || 'General';
    }
    
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(article);
    return acc;
  }, {} as Record<string, (NYTimesArticle | TopStoryArticle)[]>);
}

export function filterByDateRange(articles: NYTimesArticle[], startDate: Date, endDate: Date): NYTimesArticle[] {
  return articles.filter(article => {
    const pubDate = new Date(article.pub_date);
    return pubDate >= startDate && pubDate <= endDate;
  });
}

export function sortByDate(articles: (NYTimesArticle | TopStoryArticle)[], order: 'asc' | 'desc' = 'desc'): (NYTimesArticle | TopStoryArticle)[] {
  return [...articles].sort((a, b) => {
    const dateA = new Date('pub_date' in a ? a.pub_date : a.published_date);
    const dateB = new Date('pub_date' in b ? b.pub_date : b.published_date);
    
    return order === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
}

export function searchInArticles(articles: (NYTimesArticle | TopStoryArticle)[], query: string): (NYTimesArticle | TopStoryArticle)[] {
  const searchTerm = query.toLowerCase();
  
  return articles.filter(article => {
    const title = ('headline' in article ? article.headline.main : article.title).toLowerCase();
    const abstract = article.abstract.toLowerCase();
    const snippet = 'snippet' in article ? article.snippet.toLowerCase() : '';
    
    return title.includes(searchTerm) || abstract.includes(searchTerm) || snippet.includes(searchTerm);
  });
}

export function getUniqueKeywords(articles: NYTimesArticle[]): string[] {
  const keywords = new Set<string>();
  
  articles.forEach(article => {
    if (article.keywords) {
      article.keywords.forEach(keyword => {
        keywords.add(keyword.value);
      });
    }
  });
  
  return Array.from(keywords);
}

export function groupByMonth(articles: NYTimesArticle[]): Record<string, NYTimesArticle[]> {
  return articles.reduce((acc, article) => {
    const date = new Date(article.pub_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(article);
    return acc;
  }, {} as Record<string, NYTimesArticle[]>);
}
