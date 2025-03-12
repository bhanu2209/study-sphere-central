
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ChevronLeft, Search } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/shared/PageTransition';

// Mock function to get materials by category ID (replace with actual API call)
const getMaterialsByCategory = async (categoryId: string) => {
  // Simulate API call
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
};

const CategoryMaterials = () => {
  const { categoryId = '1' } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, isLoading } = useQuery({
    queryKey: ['materials', categoryId],
    queryFn: () => getMaterialsByCategory(categoryId),
  });
  
  const category = data?.data.category;
  const allMaterials = data?.data.materials || [];
  
  // Filter materials based on search term
  const materials = allMaterials.filter(material => 
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleDownload = (materialId: string, title: string) => {
    // Implement actual download functionality here
    toast.success(`Started downloading: ${title}`);
    console.log(`Downloading material with ID: ${materialId}`);
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link 
            to="/study-materials/browse" 
            className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Categories
          </Link>
          
          {isLoading ? (
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <h1 className="text-3xl font-bold">{category?.title} Materials</h1>
          )}
          
          <p className="text-gray-600 mt-2">
            {isLoading ? (
              <div className="h-4 w-full max-w-md bg-gray-200 animate-pulse rounded"></div>
            ) : (
              category?.description
            )}
          </p>
        </div>
        
        {/* Search bar */}
        <div className="mb-8 relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No materials found matching your search criteria.</p>
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
          <div className="grid grid-cols-1 gap-6">
            {materials.map((material) => (
              <Card key={material.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        {material.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-2">{material.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {material.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Author</p>
                      <p className="font-medium">{material.author}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Uploaded</p>
                      <p className="font-medium">{material.uploadDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Size</p>
                      <p className="font-medium">{material.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Downloads</p>
                      <p className="font-medium">{material.downloadCount}</p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2">
                  <Button 
                    onClick={() => handleDownload(material.id, material.title)}
                    className="w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CategoryMaterials;
