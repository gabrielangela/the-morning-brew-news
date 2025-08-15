// Test file for NYTimes API integration
import { nytimesAPI } from './nytimes-api';

export async function testAllAPIs() {
  console.log('🧪 Testing NYTimes API Integration...\n');

  try {
    // Test Archive API
    console.log('📚 Testing Archive API (January 2024)...');
    const archiveData = await nytimesAPI.getArchive(2024, 1);
    console.log(`✅ Archive API: Found ${archiveData.response.docs.length} articles`);
    console.log(`   Sample headline: ${archiveData.response.docs[0]?.headline.main || 'N/A'}\n`);

    // Test Article Search API
    console.log('🔍 Testing Article Search API (query: "election")...');
    const searchData = await nytimesAPI.searchArticles('election');
    console.log(`✅ Search API: Found ${searchData.response.docs.length} articles`);
    console.log(`   Sample headline: ${searchData.response.docs[0]?.headline.main || 'N/A'}\n`);

    // Test Books API
    console.log('📖 Testing Books API (bestsellers overview)...');
    const booksData = await nytimesAPI.getBooksOverview();
    console.log(`✅ Books API: Found ${booksData.results.lists.length} bestseller lists`);
    console.log(`   Sample list: ${booksData.results.lists[0]?.display_name || 'N/A'}\n`);

    // Test Most Popular API
    console.log('🔥 Testing Most Popular API (most emailed, 7 days)...');
    const popularData = await nytimesAPI.getMostPopular('emailed', 7);
    console.log(`✅ Most Popular API: Found ${popularData.results.length} articles`);
    console.log(`   Sample title: ${popularData.results[0]?.title || 'N/A'}\n`);

    // Test Top Stories API
    console.log('📰 Testing Top Stories API (home section)...');
    const topStoriesData = await nytimesAPI.getTopStories('home');
    console.log(`✅ Top Stories API: Found ${topStoriesData.results.length} stories`);
    console.log(`   Sample title: ${topStoriesData.results[0]?.title || 'N/A'}\n`);

    console.log('🎉 All API tests completed successfully!');
    
    return {
      archive: archiveData,
      search: searchData,
      books: booksData,
      popular: popularData,
      topStories: topStoriesData
    };

  } catch (error) {
    console.error('❌ API Test Error:', error);
    throw error;
  }
}

// Individual test functions
export async function testArchiveAPI() {
  return await nytimesAPI.getArchive(2024, 1);
}

export async function testSearchAPI() {
  return await nytimesAPI.searchArticles('election');
}

export async function testBooksAPI() {
  return await nytimesAPI.getBooksOverview();
}

export async function testMostPopularAPI() {
  return await nytimesAPI.getMostPopular('emailed', 7);
}

export async function testTopStoriesAPI() {
  return await nytimesAPI.getTopStories('home');
}
