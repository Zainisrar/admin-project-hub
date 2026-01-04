import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Megaphone } from 'lucide-react';

export default function TrainingAdForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('https://projekanda.top/create-Training-advertisment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Advertisement created!',
          description: 'Your training advertisement has been successfully created.',
        });
        setTitle('');
        setDescription('');
        setStatus('active');
        setImage(null);
      } else {
        throw new Error('Failed to create advertisement');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create advertisement. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Megaphone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Create Training Ad</h2>
          <p className="text-sm text-muted-foreground">Add a new training advertisement</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter advertisement title"
            className="input-field"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ad-description">Description</Label>
          <Textarea
            id="ad-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your advertisement"
            className="input-field min-h-[100px] resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ad-status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ad-image">Image</Label>
          <div className="relative">
            <input
              id="ad-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label
              htmlFor="ad-image"
              className="flex items-center gap-3 p-4 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {image ? image.name : 'Click to upload image'}
              </span>
            </label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating...
          </>
        ) : (
          'Create Advertisement'
        )}
      </Button>
    </form>
  );
}
