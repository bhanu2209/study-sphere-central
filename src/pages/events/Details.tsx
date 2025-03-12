
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Users, ArrowLeft, Share2, Bookmark, CalendarPlus } from 'lucide-react';
import { CardCustom, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card-custom';
import { ButtonCustom } from '@/components/ui/button-custom';
import PageTransition from '@/components/shared/PageTransition';
import { toast } from 'sonner';

const EventDetails = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Mock event data - in a real app, this would come from an API call using the event ID from URL params
  const event = {
    id: 1,
    title: 'End of Semester Exam Preparation Workshop',
    date: 'May 15, 2023',
    time: '09:00 AM - 12:00 PM',
    location: 'Main Auditorium, Building B',
    organizer: 'Prof. Johnson',
    department: 'Computer Science',
    description: 'Join this comprehensive workshop designed to help students prepare for their upcoming end of semester exams. The session will cover key topics, exam strategies, and include a Q&A segment with experienced faculty members. Materials will be provided to all attendees.',
    attendees: 120,
    maxAttendees: 200,
    tags: ['exam prep', 'workshop', 'academic'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  };
  
  const handleRegister = async () => {
    setIsRegistering(true);
    
    // Simulate API call to register
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Successfully registered for the event');
    } catch (error) {
      toast.error('Failed to register for the event');
      console.error('Registration error:', error);
    } finally {
      setIsRegistering(false);
    }
  };
  
  const handleAddToCalendar = () => {
    toast.success('Event added to your calendar');
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Events</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-full h-60 md:h-80 rounded-lg overflow-hidden mb-6">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Event Details */}
            <CardCustom>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Organizer</p>
                      <p className="font-medium">{event.organizer}</p>
                      <p className="text-sm text-muted-foreground">{event.department}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </CardContent>
            </CardCustom>
            
            {/* Related Events */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Related Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    id: 2, 
                    title: 'Advanced Algorithms Workshop', 
                    date: 'May 20, 2023',
                    time: '02:00 PM - 04:00 PM',
                    organizer: 'Dr. Smith'
                  },
                  { 
                    id: 3, 
                    title: 'Tech Career Fair', 
                    date: 'May 25, 2023',
                    time: '10:00 AM - 03:00 PM',
                    organizer: 'CS Department'
                  }
                ].map((relatedEvent) => (
                  <CardCustom key={relatedEvent.id} hoverable className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{relatedEvent.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{relatedEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{relatedEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{relatedEvent.organizer}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <ButtonCustom
                        variant="outline"
                        size="sm"
                        fullWidth
                        onClick={() => navigate(`/events/details/${relatedEvent.id}`)}
                      >
                        View Details
                      </ButtonCustom>
                    </CardFooter>
                  </CardCustom>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <CardCustom>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
                <CardDescription>Sign up to attend this event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Attendees</span>
                  </div>
                  <span className="font-medium">{event.attendees} / {event.maxAttendees}</span>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {event.maxAttendees - event.attendees} spots left
                </p>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <ButtonCustom
                  fullWidth
                  isLoading={isRegistering}
                  onClick={handleRegister}
                >
                  {isRegistering ? 'Registering...' : 'Register Now'}
                </ButtonCustom>
                
                <ButtonCustom
                  variant="outline"
                  fullWidth
                  leftIcon={<CalendarPlus className="h-4 w-4" />}
                  onClick={handleAddToCalendar}
                >
                  Add to Calendar
                </ButtonCustom>
              </CardFooter>
            </CardCustom>
            
            {/* Actions Card */}
            <CardCustom>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full flex items-center justify-start gap-2 p-2 rounded-md hover:bg-accent transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share Event</span>
                </button>
                
                <button className="w-full flex items-center justify-start gap-2 p-2 rounded-md hover:bg-accent transition-colors">
                  <Bookmark className="h-5 w-5" />
                  <span>Save Event</span>
                </button>
              </CardContent>
            </CardCustom>
            
            {/* Organizer Info */}
            <CardCustom>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                    {event.organizer.split(' ')[1]?.[0] || event.organizer[0]}
                  </div>
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-sm text-muted-foreground">{event.department}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Contact the organizer for any questions related to this event.
                </p>
              </CardContent>
              <CardFooter>
                <ButtonCustom
                  variant="outline"
                  fullWidth
                  onClick={() => toast.success('Email sent to your inbox with contact details')}
                >
                  Contact Organizer
                </ButtonCustom>
              </CardFooter>
            </CardCustom>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EventDetails;
