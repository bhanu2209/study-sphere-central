
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, BookOpen, Calendar, Clock, FileText, MessageSquare, Search, Star, Trash } from 'lucide-react';
import { CardCustom, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card-custom';
import { ButtonCustom } from '@/components/ui/button-custom';
import PageTransition from '@/components/shared/PageTransition';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for student dashboard
  const recentMaterials = [
    {
      id: 1,
      title: 'Advanced Calculus Formulas',
      subject: 'Mathematics',
      uploadedBy: 'Prof. Johnson',
      date: '2 days ago',
      type: 'PDF',
    },
    {
      id: 2,
      title: 'Introduction to Quantum Physics',
      subject: 'Physics',
      uploadedBy: 'Dr. Smith',
      date: '3 days ago',
      type: 'PPTX',
    },
    {
      id: 3,
      title: 'Database Systems Cheat Sheet',
      subject: 'Computer Science',
      uploadedBy: 'Prof. Williams',
      date: '5 days ago',
      type: 'PDF',
    },
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'End of Semester Exam',
      date: 'May 15, 2023',
      time: '09:00 AM - 12:00 PM',
      location: 'Main Auditorium',
    },
    {
      id: 2,
      title: 'Tech Talk: AI in Education',
      date: 'May 10, 2023',
      time: '02:00 PM - 04:00 PM',
      location: 'Engineering Block, Room 302',
    },
    {
      id: 3,
      title: 'Project Submission Deadline',
      date: 'May 12, 2023',
      time: '11:59 PM',
      location: 'Online Portal',
    },
  ];
  
  const recentDiscussions = [
    {
      id: 1,
      title: 'Help with Algorithm Assignment',
      author: 'Jane Smith',
      replies: 5,
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      title: 'Looking for study group for Calculus',
      author: 'Mike Johnson',
      replies: 3,
      lastActive: '5 hours ago',
    },
    {
      id: 3,
      title: 'Question about Machine Learning project',
      author: 'Sarah Williams',
      replies: 7,
      lastActive: '1 day ago',
    },
  ];
  
  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] pt-20 pb-12">
        <div className="container px-4 mx-auto">
          {/* Student Dashboard Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 animate-fade-in-down">
            <div>
              <h1 className="text-3xl font-bold">Welcome, Student</h1>
              <p className="text-muted-foreground">Access all your academic resources in one place</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10 w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="relative">
                <ButtonCustom
                  variant="outline"
                  size="icon"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    3
                  </span>
                </ButtonCustom>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="border-b border-border mb-6 animate-fade-in">
            <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
              {['overview', 'materials', 'events', 'forum', 'notices'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  } transition-colors whitespace-nowrap`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Quick Actions */}
              <section className="animate-fade-in-up animation-delay-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: <BookOpen className="h-6 w-6" />, label: 'Study Materials', path: '/study-materials/browse' },
                    { icon: <Calendar className="h-6 w-6" />, label: 'Upcoming Events', path: '/events/list' },
                    { icon: <MessageSquare className="h-6 w-6" />, label: 'Discussion Forum', path: '/forum/discussion' },
                    { icon: <FileText className="h-6 w-6" />, label: 'Notice Board', path: '/notice-board/notices' },
                  ].map((action, index) => (
                    <Link 
                      key={action.label} 
                      to={action.path}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-sm transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
              
              {/* Recent Study Materials */}
              <section className="animate-fade-in-up animation-delay-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Study Materials</h2>
                  <Link to="/study-materials/browse" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {recentMaterials.map((material) => (
                    <CardCustom key={material.id} variant="default" className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                              material.type === 'PDF' ? 'bg-red-500' : 
                              material.type === 'PPTX' ? 'bg-orange-500' : 'bg-blue-500'
                            }`}>
                              {material.type}
                            </div>
                            <div>
                              <h3 className="font-medium">{material.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{material.subject}</span>
                                <span>•</span>
                                <span>{material.uploadedBy}</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{material.date}</span>
                        </div>
                      </CardContent>
                    </CardCustom>
                  ))}
                </div>
              </section>
              
              {/* Recent Discussions */}
              <section className="animate-fade-in-up animation-delay-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Discussions</h2>
                  <Link to="/forum/discussion" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {recentDiscussions.map((discussion) => (
                    <CardCustom key={discussion.id} variant="default" className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{discussion.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>by {discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.replies} replies</span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{discussion.lastActive}</span>
                        </div>
                      </CardContent>
                    </CardCustom>
                  ))}
                </div>
              </section>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <CardCustom variant="default" className="animate-fade-in-up">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold">
                      JS
                    </div>
                    <div>
                      <CardTitle>John Smith</CardTitle>
                      <CardDescription>Computer Science • Year 3</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 pb-0">
                  <div className="grid grid-cols-3 gap-2 py-2">
                    <div className="text-center">
                      <div className="text-xl font-semibold">12</div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">85</div>
                      <div className="text-xs text-muted-foreground">Materials</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">24</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between py-4">
                  <ButtonCustom variant="outline" size="sm">
                    View Profile
                  </ButtonCustom>
                  <ButtonCustom size="sm">
                    Edit Profile
                  </ButtonCustom>
                </CardFooter>
              </CardCustom>
              
              {/* Upcoming Events */}
              <section className="animate-fade-in-up animation-delay-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Events</h2>
                  <Link to="/events/list" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <CardCustom key={event.id} variant="default" className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex flex-col items-center justify-center text-sm">
                            <span className="font-semibold">
                              {event.date.split(',')[0].split(' ')[1]}
                            </span>
                            <span>May</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CardCustom>
                  ))}
                </div>
              </section>
              
              {/* Saved Items */}
              <section className="animate-fade-in-up animation-delay-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Saved Items</h2>
                  <button className="text-sm text-primary hover:underline">
                    View all
                  </button>
                </div>
                
                <CardCustom variant="default">
                  <CardContent className="p-4 space-y-3">
                    {[
                      { id: 1, title: 'Final Exam Study Guide', type: 'Material' },
                      { id: 2, title: 'Career Fair Event', type: 'Event' },
                      { id: 3, title: 'Research Methods Discussion', type: 'Forum' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                            {item.type}
                          </span>
                          <button className="text-muted-foreground hover:text-destructive">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </CardCustom>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StudentDashboard;
