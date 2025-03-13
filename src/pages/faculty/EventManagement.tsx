
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Edit2, Users, Calendar, MapPin, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '@/services/api';
import { toast } from 'sonner';
import PageTransition from "@/components/shared/PageTransition";

const EventManagement = () => {
  const [activeTab, setActiveTab] = useState('my-events');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingEvent, setEditingEvent] = useState<any>(null);
  
  const queryClient = useQueryClient();
  
  // Fetch events
  const { data, isLoading } = useQuery({
    queryKey: ['events-management'],
    queryFn: eventsApi.getEvents,
  });
  
  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: eventsApi.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-management'] });
      resetForm();
      toast.success('Event created successfully!');
    },
    onError: () => {
      toast.error('Failed to create event. Please try again.');
    }
  });
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !date || !time || !location) {
      toast.error('Please fill all the required fields');
      return;
    }
    
    createEventMutation.mutate({
      title,
      description,
      date,
      time,
      location,
      department,
      maxAttendees: parseInt(maxAttendees) || 100,
      tags: tags.split(',').map(tag => tag.trim()),
      image: imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      organizer: JSON.parse(localStorage.getItem('campus_hub_user') || '{}').name || 'Anonymous',
    });
  };
  
  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setDepartment('');
    setMaxAttendees('');
    setTags('');
    setImageUrl('');
    setEditingEvent(null);
  };
  
  const events = data?.data || [];
  const currentUser = JSON.parse(localStorage.getItem('campus_hub_user') || '{}');
  const myEvents = events.filter((event: any) => 
    event.organizer === currentUser.name
  );
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Event Management</h1>
          <p className="text-gray-600">Create and manage events for students and faculty</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Create Event Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter event title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Event Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter event description" 
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        placeholder="e.g. 10:00 AM - 12:00 PM" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="Enter event location" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department" 
                        placeholder="Enter department" 
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxAttendees">Max Attendees</Label>
                      <Input 
                        id="maxAttendees" 
                        type="number" 
                        placeholder="e.g. 100" 
                        value={maxAttendees}
                        onChange={(e) => setMaxAttendees(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags" 
                      placeholder="e.g. workshop, academic, career" 
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL (optional)</Label>
                    <Input 
                      id="imageUrl" 
                      placeholder="Enter image URL" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                  
                  <div className="pt-2 flex gap-2">
                    <Button type="submit" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </Button>
                    {editingEvent && (
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
          
          {/* Right Column - Events List */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="my-events">My Events</TabsTrigger>
                <TabsTrigger value="all-events">All Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-events">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
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
                ) : myEvents.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You haven't created any events yet.</p>
                      <Button onClick={() => document.getElementById('title')?.focus()}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Your First Event
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {myEvents.map((event: any) => (
                      <Card key={event.id}>
                        <div className="flex flex-col md:flex-row">
                          <div 
                            className="w-full md:w-1/4 h-48 md:h-auto bg-cover bg-center rounded-t-lg md:rounded-l-lg md:rounded-t-none" 
                            style={{ backgroundImage: `url(${event.image})` }}
                          ></div>
                          <div className="flex-1">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle>{event.title}</CardTitle>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {event.tags && event.tags.map((tag: string, index: number) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setEditingEvent(event);
                                      setTitle(event.title);
                                      setDescription(event.description || '');
                                      setDate(event.date);
                                      setTime(event.time);
                                      setLocation(event.location);
                                      setDepartment(event.department || '');
                                      setMaxAttendees(event.maxAttendees?.toString() || '');
                                      setTags(event.tags?.join(', ') || '');
                                      setImageUrl(event.image || '');
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-sm line-clamp-2">{event.description}</p>
                              <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {event.date}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {event.time}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {event.location}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="h-4 w-4 mr-2" />
                                  {event.attendees || 0} / {event.maxAttendees || 100}
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="all-events">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
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
                    {events.map((event: any) => (
                      <Card key={event.id}>
                        <div className="flex flex-col md:flex-row">
                          <div 
                            className="w-full md:w-1/4 h-48 md:h-auto bg-cover bg-center rounded-t-lg md:rounded-l-lg md:rounded-t-none" 
                            style={{ backgroundImage: `url(${event.image})` }}
                          ></div>
                          <div className="flex-1">
                            <CardHeader className="pb-2">
                              <CardTitle>{event.title}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                Organized by: {event.organizer} • {event.department}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {event.tags && event.tags.map((tag: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-sm line-clamp-2">{event.description}</p>
                              <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {event.date}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {event.time}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {event.location}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="h-4 w-4 mr-2" />
                                  {event.attendees || 0} / {event.maxAttendees || 100}
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </div>
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

export default EventManagement;
