
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Edit2, Eye } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noticesApi } from '@/services/api';
import { toast } from 'sonner';
import PageTransition from "@/components/shared/PageTransition";

const NoticeManagement = () => {
  const [activeTab, setActiveTab] = useState('my-notices');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('academics');
  const [important, setImportant] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>(null);
  
  const queryClient = useQueryClient();
  
  // Fetch notices
  const { data, isLoading } = useQuery({
    queryKey: ['notices-management'],
    queryFn: noticesApi.getNotices,
  });
  
  // Create notice mutation
  const createNoticeMutation = useMutation({
    mutationFn: noticesApi.createNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices-management'] });
      resetForm();
      toast.success('Notice published successfully!');
    },
    onError: () => {
      toast.error('Failed to publish notice. Please try again.');
    }
  });
  
  // Delete notice mutation
  const deleteNoticeMutation = useMutation({
    mutationFn: noticesApi.deleteNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices-management'] });
      toast.success('Notice deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete notice. Please try again.');
    }
  });
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      toast.error('Please fill all the required fields');
      return;
    }
    
    createNoticeMutation.mutate({
      title,
      content,
      category,
      important,
    });
  };
  
  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('academics');
    setImportant(false);
    setEditingNotice(null);
  };
  
  // Handle notice deletion
  const handleDelete = (noticeId: number) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      deleteNoticeMutation.mutate(noticeId);
    }
  };
  
  const notices = data?.data || [];
  const currentUser = JSON.parse(localStorage.getItem('campus_hub_user') || '{}');
  const myNotices = notices.filter((notice: any) => 
    notice.author === currentUser.name
  );
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notice Management</h1>
          <p className="text-gray-600">Create and manage official notices for students and faculty</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Create Notice Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{editingNotice ? 'Edit Notice' : 'Create New Notice'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Notice Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter notice title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Notice Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Enter notice content" 
                      rows={5}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academics">Academics</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                        <SelectItem value="student life">Student Life</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="important" 
                      checked={important}
                      onCheckedChange={setImportant}
                    />
                    <Label htmlFor="important">Mark as Important</Label>
                  </div>
                  
                  <div className="pt-2 flex gap-2">
                    <Button type="submit" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      {editingNotice ? 'Update Notice' : 'Publish Notice'}
                    </Button>
                    {editingNotice && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Notices List */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="my-notices">My Notices</TabsTrigger>
                <TabsTrigger value="all-notices">All Notices</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-notices">
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
                ) : myNotices.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You haven't created any notices yet.</p>
                      <Button onClick={() => document.getElementById('title')?.focus()}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Your First Notice
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {myNotices.map((notice: any) => (
                      <Card key={notice.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {notice.important && (
                                  <Badge variant="destructive">Important</Badge>
                                )}
                                <Badge variant="outline" className="capitalize">{notice.category}</Badge>
                              </div>
                              <CardTitle>{notice.title}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                Published: {notice.date}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setEditingNotice(notice);
                                  setTitle(notice.title);
                                  setContent(notice.content);
                                  setCategory(notice.category);
                                  setImportant(notice.important);
                                }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDelete(notice.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p>{notice.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0 text-sm text-muted-foreground">
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
              
              <TabsContent value="all-notices">
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
                ) : (
                  <div className="space-y-4">
                    {notices.map((notice: any) => (
                      <Card key={notice.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {notice.important && (
                                  <Badge variant="destructive">Important</Badge>
                                )}
                                <Badge variant="outline" className="capitalize">{notice.category}</Badge>
                              </div>
                              <CardTitle>{notice.title}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                By: {notice.author} • {notice.date}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p>{notice.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0 text-sm text-muted-foreground">
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
        </div>
      </div>
    </PageTransition>
  );
};

export default NoticeManagement;
