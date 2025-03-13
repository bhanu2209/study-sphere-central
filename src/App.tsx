
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentLogin from "./pages/auth/StudentLogin";
import FacultyLogin from "./pages/auth/FacultyLogin";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import FacultyDashboard from "./pages/dashboard/FacultyDashboard";
import BrowseMaterials from "./pages/study-materials/Browse";
import CategoryMaterials from "./pages/study-materials/CategoryMaterials";
import MaterialUpload from "./pages/study-materials/Upload";
import EventsList from "./pages/events/List";
import EventDetails from "./pages/events/Details";
import ForumDiscussion from "./pages/forum/Discussion";
import CreateDiscussion from "./pages/forum/CreateDiscussion";
import Notices from "./pages/notice-board/Notices";
import NoticeManagement from "./pages/faculty/NoticeManagement";
import EventManagement from "./pages/faculty/EventManagement";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth/student-login" element={<StudentLogin />} />
                <Route path="/auth/faculty-login" element={<FacultyLogin />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/faculty" element={<FacultyDashboard />} />

                {/* Study Materials Routes */}
                <Route path="/study-materials/browse" element={<BrowseMaterials />} />
                <Route path="/study-materials/category/:categoryId" element={<CategoryMaterials />} />
                <Route path="/study-materials/upload" element={<MaterialUpload />} />
                
                {/* Events Routes */}
                <Route path="/events/list" element={<EventsList />} />
                <Route path="/events/details/:id" element={<EventDetails />} />
                <Route path="/faculty/event-management" element={<EventManagement />} />
                
                {/* Forum Routes */}
                <Route path="/forum/discussion" element={<ForumDiscussion />} />
                <Route path="/forum/create" element={<CreateDiscussion />} />
                
                {/* Notice Board Routes */}
                <Route path="/notice-board/notices" element={<Notices />} />
                <Route path="/faculty/notice-management" element={<NoticeManagement />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
