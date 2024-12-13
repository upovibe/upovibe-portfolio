import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-6 text-gray-300 flex flex-col items-center justify-center bg-gray-950 border-t-2 border-gray-500/20">
      <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Promise Uzor Okwudiri. All rights reserved.</p>
    </footer>
  );
}

export default Footer;