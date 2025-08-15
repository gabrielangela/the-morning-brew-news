import Link from 'next/link';

export default function Footer() {
  const footerSections = [
    {
      title: 'NEWS',
      links: ['Home Page', 'World', 'U.S.', 'Politics', 'Business', 'Tech', 'Science']
    },
    {
      title: 'OPINION',
      links: ['Today\'s Opinion', 'Columnists', 'Editorials', 'Op-Ed Contributors', 'Letters']
    },
    {
      title: 'ARTS',
      links: ['Today\'s Arts', 'Art & Design', 'Books', 'Movies', 'Music', 'Television']
    },
    {
      title: 'LIVING',
      links: ['Automobiles', 'Games', 'Education', 'Food', 'Health', 'Style', 'Travel']
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: 'Old English Text MT, serif' }}>
              The Morning Brew
            </h2>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-gray-900 mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link 
                      href="#" 
                      className="text-xs text-gray-600 hover:text-black transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-xs text-gray-600">
              <Link href="#" className="hover:text-black">© 2025 The Morning Brew</Link>
              <Link href="#" className="hover:text-black">Contact Us</Link>
              <Link href="#" className="hover:text-black">Work with Us</Link>
              <Link href="#" className="hover:text-black">Advertise</Link>
              <Link href="#" className="hover:text-black">Privacy Policy</Link>
              <Link href="#" className="hover:text-black">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
