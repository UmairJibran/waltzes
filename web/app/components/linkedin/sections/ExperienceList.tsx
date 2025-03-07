'use client';

import { LinkedInExperience } from '@/lib/types/linkedin';
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

interface ExperienceListProps {
  items: LinkedInExperience[];
  onChange: (items: LinkedInExperience[]) => void;
}

const emptyExperience: LinkedInExperience = {
  starts_at: { day: 1, month: 1, year: new Date().getFullYear() },
  ends_at: null,
  company: '',
  company_linkedin_profile_url: null,
  company_facebook_profile_url: null,
  title: '',
  description: null,
  location: '',
  logo_url: null,
};

export function ExperienceList({ items, onChange }: ExperienceListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkedInExperience | null>(
    null
  );
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (experience: LinkedInExperience) => {
    if (editingIndex === -1) {
      onChange([...items, experience]);
    } else {
      const newItems = [...items];
      newItems[editingIndex] = experience;
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
        <h2 className="text-lg font-semibold">Experience</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingItem({ ...emptyExperience });
                setEditingIndex(-1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingIndex === -1 ? 'Add Experience' : 'Edit Experience'}
              </DialogTitle>
            </DialogHeader>
            <ExperienceForm
              data={editingItem || emptyExperience}
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
              <p className="text-sm text-muted-foreground">{item.company}</p>
              <p className="text-sm text-muted-foreground">{item.location}</p>
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

interface ExperienceFormProps {
  data: LinkedInExperience;
  onSave: (data: LinkedInExperience) => void;
  onCancel: () => void;
}

function ExperienceForm({
  data: initialData,
  onSave,
  onCancel,
}: ExperienceFormProps) {
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Company</label>
        <Input
          value={data.company}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, company: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          value={data.location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, location: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              placeholder="Day"
              value={data.starts_at.day}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  starts_at: { ...data.starts_at, day: Number(e.target.value) },
                })
              }
            />
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
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              placeholder="Day"
              value={data.ends_at?.day || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  ends_at: {
                    day: Number(e.target.value),
                    month: data.ends_at?.month || 1,
                    year: data.ends_at?.year || new Date().getFullYear(),
                  },
                })
              }
            />
            <Input
              type="number"
              placeholder="Month"
              value={data.ends_at?.month || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  ends_at: {
                    day: data.ends_at?.day || 1,
                    month: Number(e.target.value),
                    year: data.ends_at?.year || new Date().getFullYear(),
                  },
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
                  ends_at: {
                    day: data.ends_at?.day || 1,
                    month: data.ends_at?.month || 1,
                    year: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={data.description || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, description: e.target.value })
          }
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Company LinkedIn URL</label>
        <Input
          value={data.company_linkedin_profile_url || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, company_linkedin_profile_url: e.target.value })
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
