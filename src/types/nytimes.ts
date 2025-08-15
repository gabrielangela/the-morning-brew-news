// NYTimes API Response Types

export interface NYTimesArticle {
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  abstract: string;
  print_page?: string;
  blog?: any[];
  source: string;
  multimedia: MultimediaItem[];
  headline: {
    main: string;
    kicker?: string;
    content_kicker?: string;
    print_headline?: string;
    name?: string;
    seo?: string;
    sub?: string;
  };
  keywords: Keyword[];
  pub_date: string;
  document_type: string;
  news_desk?: string;
  section_name?: string;
  subsection_name?: string;
  byline: {
    original?: string;
    person?: Person[];
    organization?: string;
  };
  type_of_material?: string;
  _id: string;
  word_count?: number;
  uri: string;
}

export interface MultimediaItem {
  rank: number;
  subtype: string;
  caption: string;
  credit: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy?: {
    xlarge?: string;
    xlargewidth?: number;
    xlargeheight?: number;
  };
  subType: string;
  crop_name: string;
}

export interface Keyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface Person {
  firstname: string;
  middlename?: string;
  lastname: string;
  qualifier?: string;
  title?: string;
  role: string;
  organization: string;
  rank: number;
}

// Archive API Response
export interface ArchiveResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTimesArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

// Article Search API Response
export interface ArticleSearchResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTimesArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

// Top Stories API Response
export interface TopStoriesResponse {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: TopStoryArticle[];
}

export interface TopStoryArticle {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: TopStoryMultimedia[];
  short_url: string;
}

export interface TopStoryMultimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

// Most Popular API Response
export interface MostPopularResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: PopularArticle[];
}

export interface PopularArticle {
  uri: string;
  url: string;
  id: number;
  asset_id: number;
  source: string;
  published_date: string;
  updated: string;
  section: string;
  subsection: string;
  nytdsection: string;
  adx_keywords: string;
  column?: string;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  media: PopularArticleMedia[];
  eta_id: number;
}

export interface PopularArticleMedia {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: number;
  'media-metadata': MediaMetadata[];
}

export interface MediaMetadata {
  url: string;
  format: string;
  height: number;
  width: number;
}

// Books API Response
export interface BooksResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: {
    bestsellers_date: string;
    published_date: string;
    published_date_description: string;
    previous_published_date: string;
    next_published_date: string;
    lists: BookList[];
  };
}

export interface BookList {
  list_id: number;
  list_name: string;
  list_name_encoded: string;
  display_name: string;
  updated: string;
  list_image?: string;
  list_image_width?: number;
  list_image_height?: number;
  books: Book[];
}

export interface Book {
  age_group: string;
  amazon_product_url: string;
  article_chapter_link: string;
  author: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  book_review_link: string;
  contributor: string;
  contributor_note: string;
  created_date: string;
  description: string;
  first_chapter_link: string;
  price: string;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  sunday_review_link: string;
  title: string;
  updated_date: string;
  weeks_on_list: number;
  buy_links: BuyLink[];
}

export interface BuyLink {
  name: string;
  url: string;
}
