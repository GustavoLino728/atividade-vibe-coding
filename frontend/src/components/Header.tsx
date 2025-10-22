import React from 'react';
import { UtensilsCrossed, Menu, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menu Hamburger */}
          <button className="p-2 rounded-md hover:bg-primary-dark transition-colors">
            <Menu size={24} className="text-secondary" />
          </button>

          {/* Logo/Título */}
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={28} className="text-secondary" />
            <h1 className="text-2xl font-bold text-secondary">OpenRecipes</h1>
          </div>

          {/* User Icon */}
          <button className="p-2 rounded-md hover:bg-primary-dark transition-colors">
            <User size={24} className="text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;