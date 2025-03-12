
import { toast } from 'sonner';

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
    
    // For faculty, validate email contains .com
    if (role === 'faculty' && !email.includes('.com')) {
      return {
        data: null,
        error: 'You are not a faculty member. Faculty emails must contain .com',
        success: false
      };
    }
    
    // Mock successful login
    return {
      data: {
        id: '1',
        name: role === 'faculty' ? 'Dr. Parker' : 'John Smith',
        email,
        role
      },
      error: null,
      success: true
    };
  },
  
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: null, error: null, success: true };
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
  
  uploadMaterial: async (data: FormData) => {
    // Simulate network delay and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful upload
    return {
      data: {
        id: Date.now().toString(),
        title: data.get('title') as string,
        subject: data.get('subject') as string,
        uploadDate: new Date().toISOString(),
        status: 'pending'
      },
      error: null,
      success: true
    };
  }
};

// Events-related API calls
export const eventsApi = {
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
  }
};

// Create a mock authentication context to simulate backend authentication
export const simulateAuth = () => {
  // Check if user data exists in localStorage
  const storedUser = localStorage.getItem('campus_hub_user');
  
  // Parse user data if it exists
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  // Return auth methods
  return {
    user,
    isAuthenticated: !!user,
    
    login: async (email: string, password: string, role: 'student' | 'faculty') => {
      const result = await userApi.login(email, password, role);
      
      if (result.success && result.data) {
        // Store user data in localStorage
        localStorage.setItem('campus_hub_user', JSON.stringify(result.data));
        toast.success(`Welcome back, ${result.data.name}!`);
        return true;
      } else {
        toast.error(result.error || 'Login failed');
        return false;
      }
    },
    
    logout: async () => {
      await userApi.logout();
      localStorage.removeItem('campus_hub_user');
      toast.success('You have been logged out');
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
