
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/shared/PageTransition";

const materialCategories = [
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
];

const BrowseMaterials = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
          <p className="text-gray-600">Browse and discover study materials by category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialCategories.map((category) => (
            <Card key={category.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{category.count} materials available</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Browse Materials</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default BrowseMaterials;
