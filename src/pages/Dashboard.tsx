import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectForm from '@/components/ProjectForm';
import TrainingAdForm from '@/components/TrainingAdForm';
import { LogOut, FolderPlus, Megaphone, Shield } from 'lucide-react';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects and training advertisements
          </p>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderPlus className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              Training Ads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="glass-card p-6">
              <ProjectForm />
            </div>
          </TabsContent>

          <TabsContent value="training">
            <div className="glass-card p-6">
              <TrainingAdForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
