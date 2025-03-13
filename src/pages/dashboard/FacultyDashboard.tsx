
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, BookOpen, Calendar, FileText, MessageSquare, Search, Upload, PlusCircle } from 'lucide-react';
import { CardCustom, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card-custom';
import { ButtonCustom } from '@/components/ui/button-custom';
import PageTransition from '@/components/shared/PageTransition';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  // Mock data for faculty dashboard
  const pendingMaterials = [
    {
      id: 1,
      title: 'Introduction to Data Structures',
      subject: 'Computer Science',
      uploadedDate: '2 days ago',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Statistical Methods in Research',
      subject: 'Mathematics',
      uploadedDate: '5 days ago',
      status: 'approved'
    }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'End of Semester Exam',
      date: 'May 15, 2023',
      time: '09:00 AM - 12:00 PM',
      location: 'Main Auditorium',
      attendees: 120
    },
    {
      id: 2,
      title: 'Faculty Meeting',
      date: 'May 8, 2023',
      time: '02:00 PM - 04:00 PM',
      location: 'Conference Room',
      attendees: 24
    }
  ];
  
  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-4rem)] pt-20 pb-12">
        <div className="container px-4 mx-auto">
          {/* Faculty Dashboard Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 animate-fade-in-down">
            <div>
              <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
              <p className="text-muted-foreground">Manage your teaching resources and student materials</p>
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
                    5
                  </span>
                </ButtonCustom>
              </div>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="border-b border-border mb-6 animate-fade-in">
            <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
              {['overview', 'materials', 'events', 'notices', 'forum'].map((tab) => (
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
                    { icon: <Upload className="h-6 w-6" />, label: 'Upload Materials', path: '/study-materials/upload' },
                    { icon: <PlusCircle className="h-6 w-6" />, label: 'Create Event', path: '/faculty/event-management' },
                    { icon: <MessageSquare className="h-6 w-6" />, label: 'Forum Moderation', path: '/forum/discussion' },
                    { icon: <FileText className="h-6 w-6" />, label: 'Post Notice', path: '/faculty/notice-management' },
                  ].map((action, index) => (
                    <Link 
                      key={action.label} 
                      to={action.path}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-sm transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium text-center">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </section>
              
              {/* Materials Status */}
              <section className="animate-fade-in-up animation-delay-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Materials Status</h2>
                  <Link to="/study-materials/upload" className="text-sm text-primary hover:underline">
                    Upload new
                  </Link>
                </div>
                
                <CardCustom variant="default">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recently Uploaded Materials</CardTitle>
                    <CardDescription>Status of your recently uploaded study materials</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {pendingMaterials.map((material) => (
                        <div key={material.id} className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-muted-foreground">{material.subject} • {material.uploadedDate}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            material.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border">
                    <Link to="/study-materials/browse">
                      <ButtonCustom variant="outline" fullWidth>
                        View All Materials
                      </ButtonCustom>
                    </Link>
                  </CardFooter>
                </CardCustom>
              </section>
              
              {/* Upcoming Events */}
              <section className="animate-fade-in-up animation-delay-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Events</h2>
                  <Link to="/faculty/event-management" className="text-sm text-primary hover:underline">
                    Create new
                  </Link>
                </div>
                
                <CardCustom variant="default">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Events</CardTitle>
                    <CardDescription>Events you have created or are managing</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start justify-between p-4">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex flex-col items-center justify-center text-sm">
                              <span className="font-semibold">
                                {event.date.split(',')[0].split(' ')[1]}
                              </span>
                              <span>May</span>
                            </div>
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-muted-foreground">{event.time}</p>
                              <p className="text-sm text-muted-foreground">{event.location}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                              {event.attendees} Attendees
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border">
                    <Link to="/events/list">
                      <ButtonCustom variant="outline" fullWidth>
                        View All Events
                      </ButtonCustom>
                    </Link>
                  </CardFooter>
                </CardCustom>
              </section>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Faculty Profile Card */}
              <CardCustom variant="default" className="animate-fade-in-up">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold">
                      {user?.name ? 
                        user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                        'DP'}
                    </div>
                    <div>
                      <CardTitle>{user?.name || 'Dr. Parker'}</CardTitle>
                      <CardDescription>Professor • Computer Science</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 pb-0">
                  <div className="grid grid-cols-3 gap-2 py-2">
                    <div className="text-center">
                      <div className="text-xl font-semibold">14</div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">28</div>
                      <div className="text-xs text-muted-foreground">Materials</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">8</div>
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
              
              {/* Student Engagement */}
              <CardCustom variant="default" className="animate-fade-in-up animation-delay-200">
                <CardHeader>
                  <CardTitle className="text-lg">Student Engagement</CardTitle>
                  <CardDescription>Overview of student interactions with your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Material Downloads</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Event Attendance</span>
                        <span className="text-sm text-muted-foreground">88%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Forum Participation</span>
                        <span className="text-sm text-muted-foreground">62%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CardCustom>
              
              {/* Todo List */}
              <CardCustom variant="default" className="animate-fade-in-up animation-delay-300">
                <CardHeader>
                  <CardTitle className="text-lg">Tasks</CardTitle>
                  <CardDescription>Your upcoming tasks and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 1, task: 'Review student submissions', deadline: 'Today' },
                      { id: 2, task: 'Prepare exam questions', deadline: 'Tomorrow' },
                      { id: 3, task: 'Faculty meeting notes', deadline: 'May 9' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded border border-input flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.task}</p>
                          <p className="text-xs text-muted-foreground">Due: {item.deadline}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border">
                  <ButtonCustom variant="outline" fullWidth leftIcon={<PlusCircle className="h-4 w-4" />}>
                    Add Task
                  </ButtonCustom>
                </CardFooter>
              </CardCustom>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FacultyDashboard;
