import { toast } from 'sonner';
import { User } from '../contexts/AuthContext';

// Define base types for our API
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Base URL for API calls - in a real app, this would be an environment variable
const API_BASE_URL = '/api';

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text();
      return {
        data: null,
        error: errorText || `Error: ${response.status} ${response.statusText}`,
        success: false
      };
    }
    
    // Parse JSON response
    const data = await response.json();
    return {
      data,
      error: null,
      success: true
    };
  } catch (error) {
    // Handle parsing errors or other exceptions
    console.error('API response error:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      success: false
    };
  }
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options,
    };
    
    // Add body for non-GET requests if data is provided
    if (method !== 'GET' && data) {
      fetchOptions.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, fetchOptions);
    return handleResponse<T>(response);
  } catch (error) {
    console.error('API request error:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to connect to the server',
      success: false
    };
  }
};

// For now, this is a mock implementation that simulates backend calls
// In a real application, this would make actual HTTP requests to your backend

// User-related API calls
export const userApi = {
  login: async (email: string, password: string, role: 'student' | 'faculty') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic validation 
    if (!email || !password) {
      return {
        data: null,
        error: 'Email and password are required',
        success: false
      };
    }
    
    // For faculty, validate email contains .com
    if (role === 'faculty' && !email.includes('.com')) {
      return {
        data: null,
        error: 'You are not a faculty member. Faculty emails must contain .com',
        success: false
      };
    }
    
    // Mock successful login
    const user: User = {
      id: '1',
      name: role === 'faculty' ? 'Dr. Parker' : 'John Smith',
      email,
      role,
      avatar: null
    };
    
    return {
      data: user,
      error: null,
      success: true
    };
  },
  
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: null, error: null, success: true };
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    // In a real app, this would make a request to verify the session
    // Here we just check localStorage
    const storedUser = localStorage.getItem('campus_hub_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return { data: user, error: null, success: true };
      } catch (error) {
        return { 
          data: null, 
          error: 'Failed to parse user data', 
          success: false 
        };
      }
    }
    return { data: null, error: 'User not authenticated', success: false };
  }
};

// Materials-related API calls
export const materialsApi = {
  getCategories: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return {
      data: [
        { 
          id: 1, 
          title: 'Computer Science', 
          description: 'Programming, algorithms, data structures, and more',
          count: 42
        },
        { 
          id: 2, 
          title: 'Engineering', 
          description: 'Civil, mechanical, electrical engineering resources',
          count: 37
        },
        { 
          id: 3, 
          title: 'Mathematics', 
          description: 'Calculus, algebra, statistics, and more',
          count: 28
        },
        { 
          id: 4, 
          title: 'Physics', 
          description: 'Classical mechanics, quantum physics, relativity',
          count: 23
        },
        { 
          id: 5, 
          title: 'Chemistry', 
          description: 'Organic, inorganic, and physical chemistry',
          count: 19
        },
        { 
          id: 6, 
          title: 'Biology', 
          description: 'Molecular biology, genetics, ecology',
          count: 31
        },
      ],
      error: null,
      success: true
    };
  },
  
  getMaterialsByCategory: async (categoryId: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      data: {
        category: {
          id: parseInt(categoryId),
          title: categoryId === '1' ? 'Computer Science' : 
                 categoryId === '2' ? 'Engineering' : 
                 categoryId === '3' ? 'Mathematics' : 
                 categoryId === '4' ? 'Physics' : 
                 categoryId === '5' ? 'Chemistry' : 'Biology',
          description: 'Browse all materials related to this subject',
        },
        materials: [
          {
            id: '1',
            title: 'Introduction to Algorithms',
            description: 'Comprehensive guide to basic algorithms and data structures',
            fileType: 'pdf',
            author: 'Dr. Smith',
            uploadDate: '2023-03-15',
            downloadCount: 142,
            size: '3.2 MB',
            tags: ['algorithms', 'data structures', 'beginner']
          },
          {
            id: '2',
            title: 'Advanced Data Structures',
            description: 'Deep dive into complex data structures with examples',
            fileType: 'pdf',
            author: 'Prof. Johnson',
            uploadDate: '2023-02-10',
            downloadCount: 98,
            size: '4.7 MB',
            tags: ['data structures', 'advanced', 'algorithms']
          },
          {
            id: '3',
            title: 'Programming Fundamentals',
            description: 'Basic concepts of programming with practical examples',
            fileType: 'pdf',
            author: 'Sarah Wilson',
            uploadDate: '2023-01-25',
            downloadCount: 215,
            size: '2.8 MB',
            tags: ['programming', 'beginner', 'fundamentals']
          },
          {
            id: '4',
            title: 'Object-Oriented Design Patterns',
            description: 'Common design patterns in object-oriented programming',
            fileType: 'pdf',
            author: 'Dr. Anderson',
            uploadDate: '2023-04-05',
            downloadCount: 76,
            size: '5.1 MB',
            tags: ['OOP', 'design patterns', 'advanced']
          },
        ]
      },
      success: true,
      error: null
    };
  },
  
  uploadMaterial: async (data: FormData) => {
    // Simulate network delay and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, this would send data to the server
    // Here we just simulate a successful upload
    const title = data.get('title') as string;
    const description = data.get('description') as string;
    const category = data.get('category') as string;
    const file = data.get('file') as File;
    
    // Store material in localStorage for persistence
    const materials = JSON.parse(localStorage.getItem('campus_hub_materials') || '[]');
    const newMaterial = {
      id: Date.now().toString(),
      title,
      description,
      category,
      fileName: file?.name || 'unknown.pdf',
      fileType: 'pdf',
      uploadDate: new Date().toISOString(),
      author: localStorage.getItem('campus_hub_user') ? JSON.parse(localStorage.getItem('campus_hub_user') || '{}').name : 'Unknown',
      size: file?.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB',
      downloadCount: 0,
      status: 'pending'
    };
    
    materials.push(newMaterial);
    localStorage.setItem('campus_hub_materials', JSON.stringify(materials));
    
    return {
      data: newMaterial,
      error: null,
      success: true
    };
  },
  
  downloadMaterial: async (materialId: string, title: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would generate a download link
    // Here we just return a success message
    return {
      data: {
        downloadUrl: `#download-link-${materialId}`,
        fileName: `${title.replace(/\s+/g, '_').toLowerCase()}.pdf`
      },
      error: null,
      success: true
    };
  }
};

// Events-related API calls
export const eventsApi = {
  getEvents: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      data: [
        {
          id: 1,
          title: 'End of Semester Exam Preparation Workshop',
          date: 'May 15, 2023',
          time: '09:00 AM - 12:00 PM',
          location: 'Main Auditorium, Building B',
          organizer: 'Prof. Johnson',
          department: 'Computer Science',
          attendees: 120,
          maxAttendees: 200,
          tags: ['exam prep', 'workshop', 'academic'],
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        },
        {
          id: 2,
          title: 'Annual Tech Symposium',
          date: 'June 5, 2023',
          time: '10:00 AM - 05:00 PM',
          location: 'University Convention Center',
          organizer: 'Dr. Williams',
          department: 'Technology Research',
          attendees: 250,
          maxAttendees: 300,
          tags: ['tech', 'symposium', 'research'],
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        },
        {
          id: 3,
          title: 'Career Fair - Engineering & Technology',
          date: 'June 20, 2023',
          time: '11:00 AM - 04:00 PM',
          location: 'Campus Plaza',
          organizer: 'Career Development Center',
          department: 'Student Affairs',
          attendees: 180,
          maxAttendees: 500,
          tags: ['career', 'jobs', 'networking'],
          image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9',
        },
        {
          id: 4,
          title: 'Artificial Intelligence Research Showcase',
          date: 'July 10, 2023',
          time: '02:00 PM - 06:00 PM',
          location: 'Research Wing, Building A',
          organizer: 'AI Research Group',
          department: 'Computer Science',
          attendees: 80,
          maxAttendees: 150,
          tags: ['AI', 'research', 'technology'],
          image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a',
        },
      ],
      success: true,
      error: null
    };
  },
  
  getEvent: async (id: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data for a specific event
    return {
      data: {
        id: Number(id),
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
      },
      error: null,
      success: true
    };
  },
  
  registerForEvent: async (eventId: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful registration
    return {
      data: {
        eventId,
        registrationId: Date.now().toString(),
        registrationDate: new Date().toISOString()
      },
      error: null,
      success: true
    };
  },
  
  createEvent: async (eventData: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store event in localStorage for persistence
    const events = JSON.parse(localStorage.getItem('campus_hub_events') || '[]');
    const newEvent = {
      id: Date.now(),
      ...eventData,
      attendees: 0,
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    localStorage.setItem('campus_hub_events', JSON.stringify(events));
    
    return {
      data: newEvent,
      error: null,
      success: true
    };
  }
};

// Notices-related API calls
export const noticesApi = {
  getNotices: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get notices from localStorage
    const notices = JSON.parse(localStorage.getItem('campus_hub_notices') || '[]');
    
    return {
      data: notices.length > 0 ? notices : [
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
        // ... more sample notices
      ],
      success: true,
      error: null
    };
  },
  
  createNotice: async (noticeData: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Store notice in localStorage
    const notices = JSON.parse(localStorage.getItem('campus_hub_notices') || '[]');
    const user = JSON.parse(localStorage.getItem('campus_hub_user') || '{}');
    
    const newNotice = {
      id: Date.now(),
      ...noticeData,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      author: user.name || 'Anonymous',
      views: 0
    };
    
    notices.push(newNotice);
    localStorage.setItem('campus_hub_notices', JSON.stringify(notices));
    
    return {
      data: newNotice,
      error: null,
      success: true
    };
  },
  
  deleteNotice: async (noticeId: number) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Remove notice from localStorage
    const notices = JSON.parse(localStorage.getItem('campus_hub_notices') || '[]');
    const updatedNotices = notices.filter((notice: any) => notice.id !== noticeId);
    localStorage.setItem('campus_hub_notices', JSON.stringify(updatedNotices));
    
    return {
      data: { id: noticeId },
      error: null,
      success: true
    };
  }
};

// Forum-related API calls
export const forumApi = {
  getDiscussions: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get discussions from localStorage
    const discussions = JSON.parse(localStorage.getItem('campus_hub_discussions') || '[]');
    
    return {
      data: discussions.length > 0 ? discussions : [
        {
          id: 1,
          title: 'Tips for preparing for the Data Structures final exam?',
          content: 'I\'m struggling with some of the advanced topics. Any tips or resources that helped you prepare?',
          author: {
            id: 'user1',
            name: 'Alex Johnson',
            role: 'student',
            avatar: null
          },
          date: '2 days ago',
          tags: ['academics', 'computer science', 'exams'],
          upvotes: 24,
          downvotes: 2,
          comments: 8,
          category: 'academics'
        },
        // ... more sample discussions
      ],
      success: true,
      error: null
    };
  },
  
  createDiscussion: async (discussionData: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Store discussion in localStorage
    const discussions = JSON.parse(localStorage.getItem('campus_hub_discussions') || '[]');
    const user = JSON.parse(localStorage.getItem('campus_hub_user') || '{}');
    
    const newDiscussion = {
      id: Date.now(),
      ...discussionData,
      author: {
        id: user.id || 'anonymous',
        name: user.name || 'Anonymous',
        role: user.role || 'student',
        avatar: null
      },
      date: '0 days ago',
      upvotes: 0,
      downvotes: 0,
      comments: 0
    };
    
    discussions.push(newDiscussion);
    localStorage.setItem('campus_hub_discussions', JSON.stringify(discussions));
    
    return {
      data: newDiscussion,
      error: null,
      success: true
    };
  },
  
  voteDiscussion: async (discussionId: number, isUpvote: boolean) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update vote in localStorage
    const discussions = JSON.parse(localStorage.getItem('campus_hub_discussions') || '[]');
    const updatedDiscussions = discussions.map((discussion: any) => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          upvotes: isUpvote ? discussion.upvotes + 1 : discussion.upvotes,
          downvotes: !isUpvote ? discussion.downvotes + 1 : discussion.downvotes
        };
      }
      return discussion;
    });
    
    localStorage.setItem('campus_hub_discussions', JSON.stringify(updatedDiscussions));
    
    return {
      data: { id: discussionId, isUpvote },
      error: null,
      success: true
    };
  }
};

// Create a mock authentication context to simulate backend authentication
export const simulateAuth = () => {
  // Return auth methods
  return {
    user: null,
    isAuthenticated: false,
    
    login: async (email: string, password: string, role: 'student' | 'faculty') => {
      const result = await userApi.login(email, password, role);
      
      if (result.success && result.data) {
        // Store user data in localStorage
        localStorage.setItem('campus_hub_user', JSON.stringify(result.data));
        return true;
      } else {
        toast.error(result.error || 'Login failed');
        return false;
      }
    },
    
    logout: async () => {
      await userApi.logout();
      localStorage.removeItem('campus_hub_user');
    }
  };
};

export default {
  get: <T>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, 'GET', undefined, options),
    
  post: <T>(endpoint: string, data: any, options?: RequestInit) => 
    apiRequest<T>(endpoint, 'POST', data, options),
    
  put: <T>(endpoint: string, data: any, options?: RequestInit) => 
    apiRequest<T>(endpoint, 'PUT', data, options),
    
  delete: <T>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, 'DELETE', undefined, options),
};
