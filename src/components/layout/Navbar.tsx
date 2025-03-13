
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, LogOut, User } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Materials', path: '/study-materials/browse' },
    { name: 'Events', path: '/events/list' },
    { name: 'Forum', path: '/forum/discussion' },
    { name: 'Notices', path: '/notice-board/notices' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch(user.role) {
      case 'student':
        return '/dashboard/student';
      case 'faculty':
        return '/dashboard/faculty';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <BookOpen className="h-6 w-6" />
          <span className="hidden sm:inline-block">Campus Resource Hub</span>
          <span className="sm:hidden">CRH</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ButtonCustom variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </ButtonCustom>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth/student-login">
                <ButtonCustom variant="outline" size="sm">
                  Student Login
                </ButtonCustom>
              </Link>
              <Link to="/auth/faculty-login">
                <ButtonCustom size="sm">
                  Faculty Portal
                </ButtonCustom>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-foreground hover:bg-secondary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container px-4 mx-auto py-4 flex flex-col gap-3">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'px-4 py-3 rounded-md font-medium transition-colors',
                location.pathname === link.path
                  ? 'bg-secondary text-primary'
                  : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50',
                `animate-fade-in animation-delay-${index * 100}`
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex flex-col gap-2 mt-4 animate-fade-in animation-delay-500">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()}>
                  <ButtonCustom variant="outline" fullWidth className="justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </ButtonCustom>
                </Link>
                <ButtonCustom 
                  variant="destructive" 
                  fullWidth 
                  className="justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </ButtonCustom>
              </>
            ) : (
              <>
                <Link to="/auth/student-login">
                  <ButtonCustom variant="outline" fullWidth>
                    Student Login
                  </ButtonCustom>
                </Link>
                <Link to="/auth/faculty-login">
                  <ButtonCustom fullWidth>
                    Faculty Portal
                  </ButtonCustom>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
