import Link from 'next/link';
import SearchBar from '@/components/ui/SearchBar';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Navigation items based on available NYTimes API sections
  const navigationItems = [
    { label: 'Home', path: 'home' },
    { label: 'U.S.', path: 'us' },
    { label: 'World', path: 'world' },
    { label: 'Business', path: 'business' },
    { label: 'Technology', path: 'technology' },
    { label: 'Science', path: 'science' },
    { label: 'Health', path: 'health' },
    { label: 'Sports', path: 'sports' },
    { label: 'Arts', path: 'arts' },
    { label: 'Opinion', path: 'opinion' }
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top bar with date and subscription */}
      <div className="border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{currentDate}</span>
            <span className="text-gray-600">Today&apos;s Paper</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600">U.S.</a>
            <a href="#" className="text-gray-600">INTERNATIONAL</a>
            <a href="#" className="text-gray-600">CANADA</a>
            <a href="https://www.nytimes.com/es/" className="text-gray-600">ESPAÑOL</a>
            <a href="https://cn.nytimes.com/" className="text-gray-600">中文</a>
            <a href="https://www.nytimes.com/subscription?campaignId=9YU8R&source=bar1&redirect_uri=https%3A%2F%2Fwww.nytimes.com%2F"
            className="bg-blue-600 text-white px-4 py-1 text-xs font-medium rounded">
              SUBSCRIBE FOR $0.25/WEEK
            </a>
            <button className="text-blue-600 text-xs font-medium">
              LOG IN
            </button>
          </div>
        </div>
      </div>

      {/* Main header with logo */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-black" style={{ fontFamily: 'Old English Text MT, serif' }}>
              The Morning Brew
            </h1>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Navigation */}
      <nav className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-3">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.path === 'home' ? '/' : `/category/${item.path}`}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
