import { NYTIMES_CONFIG } from './config';
import type {
  ArchiveResponse,
  ArticleSearchResponse,
  TopStoriesResponse,
  MostPopularResponse,
  BooksResponse
} from '@/types/nytimes';

// Base API client
class NYTimesAPI {
  private apiKey: string;

  constructor() {
    this.apiKey = NYTIMES_CONFIG.API_KEY;
  }

  private async fetchAPI<T>(url: string, retries: number = 3): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (response.status === 429) {
        // Rate limit exceeded
        if (retries > 0) {
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000; // Default 2 seconds
          console.log(`Rate limited. Retrying after ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.fetchAPI<T>(url, retries - 1);
        } else {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Archive API - Get articles from a specific month/year
  async getArchive(year: number, month: number): Promise<ArchiveResponse> {
    const url = `${NYTIMES_CONFIG.BASE_URLS.ARCHIVE}/${year}/${month}.json?api-key=${this.apiKey}`;
    return this.fetchAPI<ArchiveResponse>(url);
  }

  // Article Search API - Search for articles with query
  async searchArticles(
    query: string,
    page: number = 0,
    sort: 'newest' | 'oldest' | 'relevance' = 'newest',
    beginDate?: string,
    endDate?: string
  ): Promise<ArticleSearchResponse> {
    let url = `${NYTIMES_CONFIG.BASE_URLS.ARTICLE_SEARCH}?q=${encodeURIComponent(query)}&page=${page}&sort=${sort}&api-key=${this.apiKey}`;
    
    if (beginDate) {
      url += `&begin_date=${beginDate}`;
    }
    if (endDate) {
      url += `&end_date=${endDate}`;
    }
    
    return this.fetchAPI<ArticleSearchResponse>(url);
  }

  // Top Stories API - Get top stories by section
  async getTopStories(section: string = 'home'): Promise<TopStoriesResponse> {
    const url = `${NYTIMES_CONFIG.BASE_URLS.TOP_STORIES}/${section}.json?api-key=${this.apiKey}`;
    return this.fetchAPI<TopStoriesResponse>(url);
  }

  // Most Popular API - Get most popular articles
  async getMostPopular(
    type: 'emailed' | 'shared' | 'viewed' = 'emailed',
    period: 1 | 7 | 30 = 7
  ): Promise<MostPopularResponse> {
    const url = `${NYTIMES_CONFIG.BASE_URLS.MOST_POPULAR}/${type}/${period}.json?api-key=${this.apiKey}`;
    return this.fetchAPI<MostPopularResponse>(url);
  }

  // Books API - Get bestseller lists overview
  async getBooksOverview(): Promise<BooksResponse> {
    const url = `${NYTIMES_CONFIG.BASE_URLS.BOOKS}/lists/overview.json?api-key=${this.apiKey}`;
    return this.fetchAPI<BooksResponse>(url);
  }

  // Books API - Get specific bestseller list
  async getBestsellerList(listName: string, date?: string): Promise<any> {
    let url = `${NYTIMES_CONFIG.BASE_URLS.BOOKS}/lists`;
    if (date) {
      url += `/${date}`;
    } else {
      url += '/current';
    }
    url += `/${listName}.json?api-key=${this.apiKey}`;
    
    return this.fetchAPI<any>(url);
  }

  // Get available sections for top stories
  getAvailableSections(): string[] {
    return [
      'home', 'arts', 'automobiles', 'books', 'business', 'fashion',
      'food', 'health', 'insider', 'magazine', 'movies', 'nyregion',
      'obituaries', 'opinion', 'politics', 'realestate', 'science',
      'sports', 'sundayreview', 'technology', 'theater', 'travel',
      'upshot', 'us', 'world'
    ];
  }
}

// Export singleton instance
export const nytimesAPI = new NYTimesAPI();

// Export individual functions for easier use
export const {
  getArchive,
  searchArticles,
  getTopStories,
  getMostPopular,
  getBooksOverview,
  getBestsellerList,
  getAvailableSections
} = nytimesAPI;
