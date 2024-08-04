import React from 'react'

const Footer = ({className} : {className : string}) => {
  return (
    <footer className={"bg-gray-100 py-6 "+className}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; 2024 Your Company Name. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact Us</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer