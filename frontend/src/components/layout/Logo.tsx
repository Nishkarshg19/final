import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary-600 text-white">
      <BookOpen size={20} />
    </div>
  );
};

export default Logo;