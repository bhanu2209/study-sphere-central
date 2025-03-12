
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, FileText, MessageSquare } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { CardCustom, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card-custom';
import PageTransition from '@/components/shared/PageTransition';

const Index = () => {
  // Refs for sections to observe
  const sections = useRef<(HTMLElement | null)[]>([]);

  // Handle scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Get all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Study Materials',
      description: 'Access a comprehensive repository of lecture notes, presentations, past papers, and textbooks.',
      link: '/study-materials/browse'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Event Management',
      description: 'Stay updated with campus events, workshops, seminars, and register with a single click.',
      link: '/events/list'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Discussion Forum',
      description: 'Engage in academic discussions, ask questions, and collaborate with peers and faculty.',
      link: '/forum/discussion'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Notice Board',
      description: 'Never miss important announcements, deadlines, and updates from administration.',
      link: '/notice-board/notices'
    }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white"
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(56,189,248,0.1),transparent)]"
          aria-hidden="true"
        />
        
        <div className="container px-4 mx-auto py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div 
                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-campus-100 text-campus-800"
                data-animate
              >
                <span className="flex h-2 w-2 rounded-full bg-campus-500 mr-2"></span>
                Centralized Campus Resources
              </div>
              
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
                data-animate
              >
                Your Academic Journey,{' '}
                <span className="text-primary">Simplified</span>
              </h1>
              
              <p 
                className="text-lg text-muted-foreground max-w-xl"
                data-animate
              >
                A centralized platform connecting students, faculty, and administrators. Access study materials, events, discussions, and notices—all in one place.
              </p>
              
              <div 
                className="flex flex-wrap gap-4 pt-2"
                data-animate
              >
                <Link to="/auth/student-login">
                  <ButtonCustom size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Get Started
                  </ButtonCustom>
                </Link>
                <Link to="/study-materials/browse">
                  <ButtonCustom variant="outline" size="lg">
                    Browse Resources
                  </ButtonCustom>
                </Link>
              </div>
              
              <div 
                className="pt-4 flex items-center gap-4 text-sm text-muted-foreground"
                data-animate
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full ring-2 ring-background"
                      style={{
                        backgroundColor: `hsl(${210 + i * 30}, 100%, ${50 + i * 5}%)`,
                      }}
                    />
                  ))}
                </div>
                <span>Trusted by 10,000+ students and faculty</span>
              </div>
            </div>
            
            <div 
              className="relative rounded-xl overflow-hidden shadow-xl"
              data-animate
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-campus-500 to-campus-700 p-1">
                <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Students collaborating in a modern campus environment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute top-4 -left-4 glass rounded-lg p-4 shadow-lg max-w-[220px] animate-fade-in-down">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium">Latest Resources</span>
                </div>
                <p className="text-xs">Advanced Mathematics notes uploaded by Prof. Johnson</p>
              </div>
              
              <div className="absolute bottom-4 -right-4 glass rounded-lg p-4 shadow-lg max-w-[220px] animate-fade-in-up">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium">Upcoming Event</span>
                </div>
                <p className="text-xs">Tech Talk: AI in Education at 5PM, Auditorium B</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={el => sections.current[0] = el}
        className="py-16 md:py-24"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16" data-animate>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-muted-foreground">
              Streamlined access to all campus resources designed to enhance your academic experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <CardCustom 
                key={feature.title}
                hoverable 
                variant="glass"
                className="border border-border" 
                data-animate
              >
                <CardHeader>
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={feature.link} className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </CardCustom>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={el => sections.current[1] = el}
        className="py-16 md:py-24 bg-secondary"
      >
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6" data-animate>
              <h2 className="text-3xl md:text-4xl font-bold">
                Trusted by Students and Faculty Across Campus
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform is designed to foster academic success through seamless resource sharing, collaboration, and communication.
              </p>
              <Link to="/auth/student-login">
                <ButtonCustom>
                  Join the Community
                </ButtonCustom>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '10,000+', label: 'Active Students' },
                { number: '500+', label: 'Faculty Members' },
                { number: '25,000+', label: 'Documents Shared' },
                { number: '1,200+', label: 'Events Organized' }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="bg-white p-6 rounded-lg shadow-sm" 
                  data-animate
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={el => sections.current[2] = el}
        className="py-16 md:py-24"
      >
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <CardCustom variant="default" className="border-0 bg-gradient-to-r from-campus-50 to-blue-50 overflow-hidden">
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4" data-animate>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Ready to Enhance Your Academic Experience?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Join thousands of students and faculty already using Campus Resource Hub to streamline their academic journey.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link to="/auth/student-login">
                        <ButtonCustom size="lg">
                          Student Access
                        </ButtonCustom>
                      </Link>
                      <Link to="/auth/faculty-login">
                        <ButtonCustom variant="outline" size="lg">
                          Faculty Portal
                        </ButtonCustom>
                      </Link>
                    </div>
                  </div>
                  
                  <div 
                    className="flex-shrink-0 w-full max-w-[300px] aspect-square rounded-full bg-gradient-to-tr from-campus-500 to-campus-300 p-1"
                    data-animate
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80" 
                        alt="Students collaborating"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Abstract shapes */}
              <div 
                className="absolute top-0 left-0 right-0 bottom-0 opacity-30 overflow-hidden"
                aria-hidden="true"
              >
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-campus-200" />
                <div className="absolute top-1/4 -right-24 w-64 h-64 rounded-full bg-campus-300" />
                <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-campus-100" />
              </div>
            </CardCustom>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
