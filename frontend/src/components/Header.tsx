import { Button } from '@/components/ui/button';
import { Sparkles, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasReport?: boolean;
  hasVastu?: boolean;
}

export default function Header({ activeTab, onTabChange, hasReport, hasVastu }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home', show: true },
    { id: 'numerology', label: 'Numerology', show: true },
    { id: 'report', label: 'Report', show: hasReport },
    { id: 'vastu', label: 'Vastu', show: hasVastu },
    { id: 'consultation', label: 'Book Consultation', show: true },
  ];

  const visibleItems = navItems.filter(item => item.show);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Ankit's Numerology
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-1">
            {visibleItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                onClick={() => onTabChange(item.id)}
                className="text-base"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {visibleItems.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={activeTab === item.id ? 'bg-accent' : ''}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
