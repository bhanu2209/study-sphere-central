
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, User, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import PageTransition from "@/components/shared/PageTransition";

// Mock function to get notices
const getNotices = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return {
    data: [
      {
        id: 1,
        title: 'Final Examination Schedule Released',
        content: 'The schedule for the final examinations has been released. Please check your student portal for your personalized schedule.',
        date: 'April 15, 2023',
        author: 'Office of Academic Affairs',
        category: 'academics',
        important: true,
        views: 530
      },
      {
        id: 2,
        title: 'Campus Closure: May 25-27',
        content: 'The campus will be closed for maintenance from May 25 to May 27. All scheduled classes during this period will be conducted online.',
        date: 'April 10, 2023',
        author: 'Campus Administration',
        category: 'administrative',
        important: true,
        views: 427
      },
      {
        id: 3,
        title: 'Summer Internship Opportunities',
        content: 'Several new summer internship opportunities have been posted on the career portal. Students interested should apply before April 30.',
        date: 'April 8, 2023',
        author: 'Career Development Center',
        category: 'careers',
        important: false,
        views: 389
      },
      {
        id: 4,
        title: 'Library Extended Hours',
        content: 'The university library will extend its hours from 8 AM to midnight starting April 20 until the end of the semester to support exam preparation.',
        date: 'April 5, 2023',
        author: 'University Library',
        category: 'facilities',
        important: false,
        views: 256
      },
      {
        id: 5,
        title: 'Student Council Elections',
        content: 'Nominations for the Student Council elections are now open. Students interested in running should submit their applications by April 25.',
        date: 'April 3, 2023',
        author: 'Student Affairs',
        category: 'student life',
        important: false,
        views: 312
      }
    ],
    success: true,
    error: null
  };
};

const Notices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { data, isLoading } = useQuery({
    queryKey: ['notices'],
    queryFn: getNotices,
  });
  
  const notices = data?.data || [];
  
  // Get all unique categories from notices
  const categories = Array.from(new Set(notices.map(notice => notice.category)));
  
  // Filter notices based on search term and active tab
  const filteredNotices = notices.filter(notice => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category tab
    const matchesCategory = 
      activeTab === 'all' || 
      (activeTab === 'important' && notice.important) ||
      notice.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notice Board</h1>
          <p className="text-gray-600">Stay updated with the latest announcements and information</p>
          
          {/* Search bar */}
          <div className="mt-6 relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="all">All Notices</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredNotices.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No notices found matching your criteria.</p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotices.map((notice) => (
                  <Card key={notice.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {notice.important && (
                              <Badge variant="destructive">Important</Badge>
                            )}
                            <Badge variant="outline" className="capitalize">{notice.category}</Badge>
                          </div>
                          <CardTitle>{notice.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {notice.date}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p>{notice.content}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{notice.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{notice.views} views</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Notices;
