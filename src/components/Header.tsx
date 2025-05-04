import React from 'react';
import { Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-center">
        <div className="flex items-center">
          <Users size={32} className="text-white mr-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">Sorteador de Times</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;