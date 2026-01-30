import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack = true }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-200">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="flex-1">{title}</h1>
    </header>
  );
}
