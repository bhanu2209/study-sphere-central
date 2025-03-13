
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Settings, 
  User as UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <nav className="bg-background border-b fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BookOpen className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">Campus Hub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/study-materials/browse" className={`nav-link ${isActive('/study-materials') ? 'text-primary' : ''}`}>
              Study Materials
            </Link>
            <Link to="/events/list" className={`nav-link ${isActive('/events') ? 'text-primary' : ''}`}>
              Events
            </Link>
            <Link to="/forum/discussion" className={`nav-link ${isActive('/forum') ? 'text-primary' : ''}`}>
              Forum
            </Link>
            <Link to="/notice-board/notices" className={`nav-link ${isActive('/notice-board') ? 'text-primary' : ''}`}>
              Notice Board
            </Link>
          </div>
          
          {/* User Menu / Login Button */}
          <div className="flex items-center">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={user.role === 'student' ? '/dashboard/student' : '/dashboard/faculty'} className="cursor-pointer">
                      <UserIcon className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-4">
                    Login <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/auth/student-login" className="cursor-pointer">Student Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth/faculty-login" className="cursor-pointer">Faculty Login</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <Button variant="ghost" size="sm" onClick={toggleMenu}>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/study-materials/browse" 
                className={`block px-2 py-1 rounded-md ${isActive('/study-materials') ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Study Materials
              </Link>
              <Link 
                to="/events/list" 
                className={`block px-2 py-1 rounded-md ${isActive('/events') ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/forum/discussion" 
                className={`block px-2 py-1 rounded-md ${isActive('/forum') ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Forum
              </Link>
              <Link 
                to="/notice-board/notices" 
                className={`block px-2 py-1 rounded-md ${isActive('/notice-board') ? 'bg-primary/10 text-primary' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Notice Board
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
