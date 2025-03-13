
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forumApi } from '@/services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import PageTransition from "@/components/shared/PageTransition";
import { useAuth } from '@/contexts/AuthContext';

const CreateDiscussion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('academics');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Create discussion mutation
  const createDiscussionMutation = useMutation({
    mutationFn: forumApi.createDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-discussions'] });
      toast.success('Discussion created successfully!');
      navigate('/forum/discussion');
    },
    onError: () => {
      toast.error('Failed to create discussion. Please try again.');
    }
  });
  
  // Add tag to the list
  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };
  
  // Remove tag from the list
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to create a discussion');
      return;
    }
    
    if (!title || !content || !category) {
      toast.error('Please fill all the required fields');
      return;
    }
    
    createDiscussionMutation.mutate({
      title,
      content,
      category,
      tags: tags.length > 0 ? tags : [category],
    });
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Discussion</h1>
            <p className="text-gray-600">Share your thoughts, questions, or ideas with the community</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Discussion Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter a descriptive title for your discussion" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Provide details about your discussion topic" 
                    rows={8}
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
                      <SelectItem value="study groups">Study Groups</SelectItem>
                      <SelectItem value="campus issues">Campus Issues</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="careers">Careers</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="tags" 
                      placeholder="Add tags to help categorize your discussion" 
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((t, index) => (
                        <div 
                          key={index} 
                          className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center"
                        >
                          {t}
                          <button 
                            type="button"
                            className="ml-1 text-primary/70 hover:text-primary"
                            onClick={() => removeTag(t)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => navigate('/forum/discussion')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Discussion
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default CreateDiscussion;
