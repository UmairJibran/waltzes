'use client';

import { LinkedInEducation } from '@/lib/types/linkedin';
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

interface EducationListProps {
  items: LinkedInEducation[];
  onChange: (items: LinkedInEducation[]) => void;
}

const emptyEducation: LinkedInEducation = {
  starts_at: { day: 1, month: 1, year: new Date().getFullYear() },
  ends_at: null,
  description: null,
  logo_url: null,
  activities_and_societies: null,
  degree_name: '',
  field_of_study: '',
  grade: null,
  school: '',
  school_facebook_profile_url: null,
  school_linkedin_profile_url: null,
  location: null,
};

export function EducationList({ items, onChange }: EducationListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkedInEducation | null>(
    null
  );
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (experience: LinkedInEducation) => {
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
        <h2 className="text-lg font-semibold">Education</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingItem({ ...emptyEducation });
                setEditingIndex(-1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingIndex === -1 ? 'Add Education' : 'Edit Education'}
              </DialogTitle>
            </DialogHeader>
            <EducationForm
              data={editingItem || emptyEducation}
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
              <h3 className="font-medium">{item.degree_name}</h3>
              <p className="text-sm text-muted-foreground">{item.school}</p>
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

interface EducationFormProps {
  data: LinkedInEducation;
  onSave: (data: LinkedInEducation) => void;
  onCancel: () => void;
}

function EducationForm({
  data: initialData,
  onSave,
  onCancel,
}: EducationFormProps) {
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
          value={data.degree_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, degree_name: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">School</label>
        <Input
          value={data.school}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, school: e.target.value })
          }
        />
      </div>

      <div className="space-y-2 flex flex-row gap-2">
        <span className="w-full">
          <label className="text-sm font-medium">Field of Study</label>
          <Input
            value={data.field_of_study}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, field_of_study: e.target.value })
            }
          />
        </span>
        <span className="w-full">
          <label className="text-sm font-medium">Grade</label>
          <Input
            value={data.grade || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, grade: e.target.value })
            }
          />
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          value={data.location || ''}
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
        <label className="text-sm font-medium">Activities/Societies</label>
        <Textarea
          value={data.activities_and_societies || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, activities_and_societies: e.target.value })
          }
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">School LinkedIn URL</label>
        <Input
          value={data.school_linkedin_profile_url || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, school_linkedin_profile_url: e.target.value })
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
