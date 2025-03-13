
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Filter, Search, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from "@/components/shared/PageTransition";
import { toast } from 'sonner';
import { forumApi } from '@/services/api';

type Discussion = {
  id: number;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar: string | null;
  };
  date: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: number;
  category: string;
};

const ForumDiscussion = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['forum-discussions'],
    queryFn: forumApi.getDiscussions,
  });
  
  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: ({ discussionId, isUpvote }: { discussionId: number, isUpvote: boolean }) => 
      forumApi.voteDiscussion(discussionId, isUpvote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-discussions'] });
    }
  });
  
  const discussions: Discussion[] = data?.data || [];
  
  // Get all unique categories from discussions
  const categories = Array.from(new Set(discussions.map(discussion => discussion.category)));
  
  // Get all unique tags from discussions
  const allTags = Array.from(new Set(discussions.flatMap(discussion => discussion.tags)));
  
  // Filter discussions based on search term, active tab, and selected tags
  let filteredDiscussions = discussions.filter(discussion => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' || 
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category tab
    const matchesCategory = 
      activeTab === 'all' || 
      discussion.category === activeTab;
    
    // Filter by selected tags
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => discussion.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
  
  // Sort discussions
  filteredDiscussions = filteredDiscussions.sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    } else {
      // Simple sort by id for "recent" (higher id = more recent)
      return b.id - a.id;
    }
  });
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  const handleVote = (discussionId: number, isUpvote: boolean) => {
    if (!isAuthenticated) {
      toast.error('Please login to vote on discussions');
      return;
    }
    
    voteMutation.mutate({ discussionId, isUpvote });
    toast.success(`You ${isUpvote ? 'upvoted' : 'downvoted'} the discussion`);
  };
  
  const handleNewDiscussion = () => {
    if (!isAuthenticated) {
      toast.error('Please login to create a new discussion');
      return;
    }
    
    navigate('/forum/create');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Forum Discussions</h1>
            <p className="text-gray-600">Connect with other students and faculty</p>
          </div>
          <Button 
            onClick={handleNewDiscussion}
            className="mt-4 sm:mt-0"
          >
            <Plus className="h-4 w-4 mr-2" /> New Discussion
          </Button>
        </div>
        
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('popular')}
              >
                <ThumbsUp className="h-4 w-4 mr-2" /> Popular
              </Button>
              <Button
                variant={sortBy === 'recent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('recent')}
              >
                Recent
              </Button>
            </div>
          </div>
          
          {/* Tags filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="flex items-center text-sm text-muted-foreground">
              <Filter className="h-4 w-4 mr-1" /> Filter by tags:
            </span>
            {allTags.slice(0, 10).map((tag, idx) => (
              <Badge
                key={idx}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
                className="text-xs"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Topics</TabsTrigger>
            {categories.map((category, idx) => (
              <TabsTrigger key={idx} value={category} className="capitalize">
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
            ) : filteredDiscussions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No discussions found matching your criteria.</p>
                {(searchTerm || selectedTags.length > 0) && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTags([]);
                    }}
                    className="mt-4"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <div className="flex">
                      {/* Voting column */}
                      <div className="p-4 flex flex-col items-center justify-start border-r">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleVote(discussion.id, true)}
                        >
                          <ArrowUp className="h-5 w-5" />
                        </Button>
                        <span className="font-bold text-sm py-1">
                          {discussion.upvotes - discussion.downvotes}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleVote(discussion.id, false)}
                        >
                          <ArrowDown className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      {/* Content column */}
                      <div className="flex-1">
                        <CardHeader className="pb-2">
                          <CardTitle>
                            <Link 
                              to={`/forum/discussion/${discussion.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {discussion.title}
                            </Link>
                          </CardTitle>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {discussion.tags.map((tag, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">
                            {discussion.content}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={discussion.author.avatar || undefined} />
                              <AvatarFallback className="text-xs">
                                {getInitials(discussion.author.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="font-medium">{discussion.author.name}</span>
                              <span className="text-muted-foreground"> · {discussion.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.comments} comments</span>
                          </div>
                        </CardFooter>
                      </div>
                    </div>
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

export default ForumDiscussion;
