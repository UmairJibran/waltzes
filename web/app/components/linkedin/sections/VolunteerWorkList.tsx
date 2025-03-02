import { LinkedInVolunteerWork } from '@/lib/types/linkedin';
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

interface VolunteerWorkListProps {
  items: LinkedInVolunteerWork[];
  onChange: (items: LinkedInVolunteerWork[]) => void;
}

const emptyVolunteerWork: LinkedInVolunteerWork = {
  starts_at: { day: 1, month: 1, year: new Date().getFullYear() },
  ends_at: null,
  title: '',
  cause: '',
  company: '',
  company_linkedin_profile_url: null,
  description: null,
  logo_url: null,
};

export function VolunteerWorkList({ items, onChange }: VolunteerWorkListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkedInVolunteerWork | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (volunteerWork: LinkedInVolunteerWork) => {
    if (editingIndex === -1) {
      onChange([...items, volunteerWork]);
    } else {
      const newItems = [...items];
      newItems[editingIndex] = volunteerWork;
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
        <h2 className="text-lg font-semibold">Volunteer Work</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingItem({ ...emptyVolunteerWork });
                setEditingIndex(-1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Volunteer Work
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIndex === -1 ? 'Add Volunteer Work' : 'Edit Volunteer Work'}
              </DialogTitle>
            </DialogHeader>
            <VolunteerWorkForm
              data={editingItem || emptyVolunteerWork}
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
              <p className="text-sm text-muted-foreground">{item.cause}</p>
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

interface VolunteerWorkFormProps {
  data: LinkedInVolunteerWork;
  onSave: (data: LinkedInVolunteerWork) => void;
  onCancel: () => void;
}

function VolunteerWorkForm({
  data: initialData,
  onSave,
  onCancel,
}: VolunteerWorkFormProps) {
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
        <label className="text-sm font-medium">Organization</label>
        <Input
          value={data.company}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, company: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Cause</label>
        <Input
          value={data.cause}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, cause: e.target.value })
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
        <label className="text-sm font-medium">Organization LinkedIn URL (Optional)</label>
        <Input
          type="url"
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