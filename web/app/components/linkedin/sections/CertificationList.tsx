import { LinkedInCertification } from '@/lib/types/linkedin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, PencilLine } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CertificationListProps {
  items: LinkedInCertification[];
  onChange: (items: LinkedInCertification[]) => void;
}

const emptyCertification: LinkedInCertification = {
  starts_at: null,
  ends_at: null,
  name: '',
  license_number: null,
  display_source: '',
  authority: '',
  url: null,
};

export function CertificationList({ items, onChange }: CertificationListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkedInCertification | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (certification: LinkedInCertification) => {
    if (editingIndex === -1) {
      onChange([...items, certification]);
    } else {
      const newItems = [...items];
      newItems[editingIndex] = certification;
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
        <h2 className="text-lg font-semibold">Certifications</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingItem({ ...emptyCertification });
                setEditingIndex(-1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIndex === -1 ? 'Add Certification' : 'Edit Certification'}
              </DialogTitle>
            </DialogHeader>
            <CertificationForm
              data={editingItem || emptyCertification}
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
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.authority}</p>
              <p className="text-sm text-muted-foreground">{item.display_source}</p>
              {item.license_number && (
                <p className="text-sm text-muted-foreground">
                  License: {item.license_number}
                </p>
              )}
              {item.starts_at && (
                <p className="text-sm text-muted-foreground">
                  Issued: {item.starts_at.month}/{item.starts_at.year}
                  {item.ends_at && ` - Expires: ${item.ends_at.month}/${item.ends_at.year}`}
                </p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Certificate
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

interface CertificationFormProps {
  data: LinkedInCertification;
  onSave: (data: LinkedInCertification) => void;
  onCancel: () => void;
}

function CertificationForm({
  data: initialData,
  onSave,
  onCancel,
}: CertificationFormProps) {
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
        <label className="text-sm font-medium">Name</label>
        <Input
          value={data.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, name: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Issuing Organization</label>
        <Input
          value={data.authority}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, authority: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Display Source</label>
        <Input
          value={data.display_source}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, display_source: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">License Number (Optional)</label>
        <Input
          value={data.license_number || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, license_number: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Issue Date (Optional)</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Month"
              value={data.starts_at?.month || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  starts_at: e.target.value
                    ? {
                        day: 1,
                        month: Number(e.target.value),
                        year: data.starts_at?.year || new Date().getFullYear(),
                      }
                    : null,
                })
              }
            />
            <Input
              type="number"
              placeholder="Year"
              value={data.starts_at?.year || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  starts_at: e.target.value
                    ? {
                        day: 1,
                        month: data.starts_at?.month || 1,
                        year: Number(e.target.value),
                      }
                    : null,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Expiry Date (Optional)</label>
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
        <label className="text-sm font-medium">Certificate URL (Optional)</label>
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