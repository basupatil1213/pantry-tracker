import React from 'react'

const Footer = ({ className = '' }: { className?: string }) => {
  const currentYear = new Date().getFullYear();
  const links = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className={`bg-gray-900 border-t border-gray-800 ${className}`.trim()}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 sm:mb-0">
            &copy; {currentYear} Your Company Name. All rights reserved.
          </p>
          <nav className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer