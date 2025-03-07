import { LinkedInProject } from '@/lib/types/linkedin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, PencilLine } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProjectListProps {
  items: LinkedInProject[];
  onChange: (items: LinkedInProject[]) => void;
}

const emptyProject: LinkedInProject = {
  starts_at: { day: 1, month: 1, year: new Date().getFullYear() },
  ends_at: null,
  title: '',
  description: null,
  url: null,
};

export function ProjectList({ items, onChange }: ProjectListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkedInProject | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (project: LinkedInProject) => {
    if (editingIndex === -1) {
      onChange([...items, project]);
    } else {
      const newItems = [...items];
      newItems[editingIndex] = project;
      onChange(newItems);
    }
    setIsOpen(false);
    setEditingItem(null);
    setEditingIndex(-1);
  };

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingItem({ ...emptyProject });
                setEditingIndex(-1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIndex === -1 ? 'Add Project' : 'Edit Project'}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              data={editingItem || emptyProject}
              onSave={handleSave}
              onCancel={() => {
                setIsOpen(false);
                setEditingItem(null);
                setEditingIndex(-1);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-4 rounded-lg border"
          >
            <div className="space-y-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.starts_at.month}/{item.starts_at.year} -{' '}
                {item.ends_at
                  ? `${item.ends_at.month}/${item.ends_at.year}`
                  : 'Present'}
              </p>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {item.description}
                </p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Project URL
                </a>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditingItem({ ...item });
                  setEditingIndex(index);
                  setIsOpen(true);
                }}
              >
                <PencilLine className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProjectFormProps {
  data: LinkedInProject;
  onSave: (data: LinkedInProject) => void;
  onCancel: () => void;
}

function ProjectForm({ data: initialData, onSave, onCancel }: ProjectFormProps) {
  const [data, setData] = useState(initialData);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(data);
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={data.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, title: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Month"
              value={data.starts_at.month}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  starts_at: {
                    ...data.starts_at,
                    month: Number(e.target.value),
                  },
                })
              }
            />
            <Input
              type="number"
              placeholder="Year"
              value={data.starts_at.year}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  starts_at: {
                    ...data.starts_at,
                    year: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date (Optional)</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Month"
              value={data.ends_at?.month || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  ends_at: e.target.value
                    ? {
                        day: 1,
                        month: Number(e.target.value),
                        year: data.ends_at?.year || new Date().getFullYear(),
                      }
                    : null,
                })
              }
            />
            <Input
              type="number"
              placeholder="Year"
              value={data.ends_at?.year || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  ends_at: e.target.value
                    ? {
                        day: 1,
                        month: data.ends_at?.month || 1,
                        year: Number(e.target.value),
                      }
                    : null,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Optional)</label>
        <Textarea
          value={data.description || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, description: e.target.value })
          }
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Project URL (Optional)</label>
        <Input
          type="url"
          value={data.url || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, url: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
} 