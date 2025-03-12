
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/shared/PageTransition";
import { useQuery } from '@tanstack/react-query';
import { materialsApi } from '@/services/api';
import { Search, Filter } from 'lucide-react';

const BrowseMaterials = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch categories from the API
  const { data: categoriesData, isLoading, error } = useQuery({
    queryKey: ['materialCategories'],
    queryFn: materialsApi.getCategories
  });
  
  const categories = categoriesData?.data || [];
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle browsing a category
  const handleBrowseCategory = (categoryId: number) => {
    navigate(`/study-materials/category/${categoryId}`);
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
          <p className="text-gray-600">Browse and discover study materials by category</p>
          
          {/* Search and filter bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Search by category name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>Error loading categories. Please try again later.</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No categories found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{category.count} materials available</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleBrowseCategory(category.id)}
                  >
                    Browse Materials
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

export default BrowseMaterials;
