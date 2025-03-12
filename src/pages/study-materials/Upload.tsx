
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp, File, X, Upload, Check } from 'lucide-react';
import { CardCustom, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card-custom';
import { ButtonCustom } from '@/components/ui/button-custom';
import PageTransition from '@/components/shared/PageTransition';
import { toast } from 'sonner';

const MaterialUpload = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [materialData, setMaterialData] = useState({
    title: '',
    subject: '',
    category: '',
    description: '',
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMaterialData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    if (!materialData.title || !materialData.subject || !materialData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 300);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadProgress(100);
      toast.success('Material uploaded successfully');
      
      // Wait a bit to show 100% completion before navigating
      setTimeout(() => {
        setIsUploading(false);
        navigate('/dashboard/faculty');
      }, 500);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload material');
      setIsUploading(false);
    } finally {
      clearInterval(interval);
    }
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Study Material</h1>
          <p className="text-gray-600">Share educational resources with your students</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CardCustom>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Material Details</CardTitle>
                  <CardDescription>
                    Provide information about the study material you're uploading
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={materialData.title}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Introduction to Calculus"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={materialData.subject}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Mathematics"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={materialData.category}
                        onChange={handleChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="" disabled>Select category</option>
                        <option value="lecture_notes">Lecture Notes</option>
                        <option value="assignment">Assignment</option>
                        <option value="practice_problems">Practice Problems</option>
                        <option value="exam_prep">Exam Preparation</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="research_paper">Research Paper</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={materialData.description}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Briefly describe what this material covers and how it will help students"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      File Upload <span className="text-red-500">*</span>
                    </label>
                    
                    {!selectedFile ? (
                      <div className="border-2 border-dashed border-input rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <input
                          id="file-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer w-full">
                          <div className="flex flex-col items-center justify-center">
                            <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-base font-medium text-center">
                              Drag and drop your file here or click to browse
                            </p>
                            <p className="text-sm text-muted-foreground text-center mt-1">
                              Supports PDF, Word, PowerPoint, and Excel files (max. 50MB)
                            </p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                              <File className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{selectedFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <ButtonCustom
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                      disabled={isUploading}
                      className="sm:flex-1"
                    >
                      Cancel
                    </ButtonCustom>
                    <ButtonCustom
                      type="submit"
                      isLoading={isUploading}
                      disabled={isUploading || !selectedFile}
                      className="sm:flex-1"
                      leftIcon={isUploading ? undefined : <Upload className="h-4 w-4" />}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Material'}
                    </ButtonCustom>
                  </div>
                </CardFooter>
              </form>
            </CardCustom>
          </div>
          
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <CardCustom>
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm">
                      Files must be under 50MB in size
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm">
                      Accepted formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm">
                      All uploads will be reviewed by an administrator before being published
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-sm">
                      Ensure you have rights to distribute any uploaded materials
                    </p>
                  </div>
                </CardContent>
              </CardCustom>
              
              {isUploading && (
                <CardCustom>
                  <CardHeader>
                    <CardTitle>Upload Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {uploadProgress < 100 ? 'Uploading...' : 'Complete!'}
                        </span>
                        <span className="text-sm font-medium">{uploadProgress}%</span>
                      </div>
                    </div>
                  </CardContent>
                </CardCustom>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MaterialUpload;
