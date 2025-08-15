import { useState, useEffect, useCallback } from 'react';
import { nytimesAPI } from '@/lib/nytimes-api';
import type {
  ArchiveResponse,
  ArticleSearchResponse,
  TopStoriesResponse,
  MostPopularResponse,
  BooksResponse
} from '@/types/nytimes';

// Custom hook for NYTimes API data fetching
export function useNYTimes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = useCallback(async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('NYTimes API Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getArchive = useCallback(async (year: number, month: number): Promise<ArchiveResponse | null> => {
    return handleApiCall(() => nytimesAPI.getArchive(year, month));
  }, [handleApiCall]);

  const searchArticles = useCallback(async (
    query: string,
    page: number = 0,
    sort: 'newest' | 'oldest' | 'relevance' = 'newest',
    beginDate?: string,
    endDate?: string
  ): Promise<ArticleSearchResponse | null> => {
    return handleApiCall(() => nytimesAPI.searchArticles(query, page, sort, beginDate, endDate));
  }, [handleApiCall]);

  const getTopStories = useCallback(async (section: string = 'home'): Promise<TopStoriesResponse | null> => {
    return handleApiCall(() => nytimesAPI.getTopStories(section));
  }, [handleApiCall]);

  const getMostPopular = useCallback(async (
    type: 'emailed' | 'shared' | 'viewed' = 'emailed',
    period: 1 | 7 | 30 = 7
  ): Promise<MostPopularResponse | null> => {
    return handleApiCall(() => nytimesAPI.getMostPopular(type, period));
  }, [handleApiCall]);

  const getBooksOverview = useCallback(async (): Promise<BooksResponse | null> => {
    return handleApiCall(() => nytimesAPI.getBooksOverview());
  }, [handleApiCall]);

  const getBestsellerList = useCallback(async (listName: string, date?: string): Promise<any> => {
    return handleApiCall(() => nytimesAPI.getBestsellerList(listName, date));
  }, [handleApiCall]);

  return {
    loading,
    error,
    getArchive,
    searchArticles,
    getTopStories,
    getMostPopular,
    getBooksOverview,
    getBestsellerList,
    availableSections: nytimesAPI.getAvailableSections()
  };
}

// Hook for specific data types with caching
export function useTopStories(section: string = 'home') {
  const [data, setData] = useState<TopStoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopStories = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await nytimesAPI.getTopStories(section);
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch top stories';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, [section]);

  return { data, loading, error };
}

export function useMostPopular(type: 'emailed' | 'shared' | 'viewed' = 'emailed', period: 1 | 7 | 30 = 7) {
  const [data, setData] = useState<MostPopularResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostPopular = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await nytimesAPI.getMostPopular(type, period);
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch popular articles';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMostPopular();
  }, [type, period]);

  return { data, loading, error };
}

export function useBestsellers() {
  const [data, setData] = useState<BooksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await nytimesAPI.getBooksOverview();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bestsellers';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  return { data, loading, error };
}
