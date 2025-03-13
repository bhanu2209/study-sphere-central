
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, Book, Calendar, FileText, Menu, MessageSquare, User, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const navLinks = [
    { label: 'Study Materials', path: '/study-materials/browse', icon: <Book className="h-4 w-4 mr-2" /> },
    { label: 'Events', path: '/events/list', icon: <Calendar className="h-4 w-4 mr-2" /> },
    { label: 'Forum', path: '/forum/discussion', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { label: 'Notice Board', path: '/notice-board/notices', icon: <FileText className="h-4 w-4 mr-2" /> },
  ];

  const authLinksDesktop = isAuthenticated ? (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
          3
        </span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar || undefined} alt={user?.name || 'User'} />
              <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={user?.role === 'student' ? '/dashboard/student' : '/dashboard/faculty'}>
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button variant="outline" asChild>
        <Link to="/auth/student-login">Student Login</Link>
      </Button>
      <Button asChild>
        <Link to="/auth/faculty-login">Faculty Login</Link>
      </Button>
    </div>
  );

  const authLinksMobile = isAuthenticated ? (
    <>
      <SheetHeader className="text-left pb-4 border-b">
        <SheetTitle>Account</SheetTitle>
        <SheetDescription>
          <div className="flex items-center gap-3 mt-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || undefined} alt={user?.name || 'User'} />
              <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-2 pt-4">
        <Button variant="outline" className="justify-start" asChild>
          <Link to={user?.role === 'student' ? '/dashboard/student' : '/dashboard/faculty'}>
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </Button>
        <Button variant="outline" className="justify-start">
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
          <Badge variant="outline" className="ml-auto">3</Badge>
        </Button>
        <Button variant="outline" className="justify-start text-red-500" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
      </div>
    </>
  ) : (
    <>
      <SheetHeader className="text-left pb-4 border-b">
        <SheetTitle>Account</SheetTitle>
        <SheetDescription>
          Sign in to access your account and more features
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-2 pt-4">
        <Button className="w-full" asChild>
          <Link to="/auth/student-login">Student Login</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/faculty-login">Faculty Login</Link>
        </Button>
      </div>
    </>
  );

  // Desktop Navigation
  const desktopNav = (
    <nav className="container mx-auto px-4 flex justify-between items-center h-16">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold mr-10">
          CampusHub
        </Link>
        <div className="flex space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      {authLinksDesktop}
    </nav>
  );

  // Mobile Navigation with Sidebar
  const mobileNav = (
    <nav className="container mx-auto px-4 flex justify-between items-center h-16">
      <Link to="/" className="text-xl font-bold">
        CampusHub
      </Link>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col h-full">
          <div className="flex-1 overflow-auto py-4">
            <div className="space-y-4 mb-6">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={link.path}>
                    {link.icon}
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
            {authLinksMobile}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      {isMobile ? mobileNav : desktopNav}
    </header>
  );
};

export default Navbar;
