import { LinkedInLanguage } from '@/lib/types/linkedin';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LanguageListProps {
  items: LinkedInLanguage[];
  onChange: (items: LinkedInLanguage[]) => void;
}

const emptyLanguage: LinkedInLanguage = {
  name: '',
  proficiency: 'ELEMENTARY',
};

const proficiencyLabels = {
  ELEMENTARY: 'Elementary',
  FULL_PROFESSIONAL: 'Full Professional',
  NATIVE_OR_BILINGUAL: 'Native or Bilingual',
};

export function LanguageList({ items, onChange }: LanguageListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkedInLanguage | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (language: LinkedInLanguage) => {
    if (editingIndex === -1) {
      onChange([...items, language]);
    } else {
      const newItems = [...items];
      newItems[editingIndex] = language;
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
        <h2 className="text-lg font-semibold">Languages</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingItem({ ...emptyLanguage });
                setEditingIndex(-1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIndex === -1 ? 'Add Language' : 'Edit Language'}
              </DialogTitle>
            </DialogHeader>
            <LanguageForm
              data={editingItem || emptyLanguage}
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
              <p className="text-sm text-muted-foreground">
                {proficiencyLabels[item.proficiency]}
              </p>
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

interface LanguageFormProps {
  data: LinkedInLanguage;
  onSave: (data: LinkedInLanguage) => void;
  onCancel: () => void;
}

function LanguageForm({ data: initialData, onSave, onCancel }: LanguageFormProps) {
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
        <label className="text-sm font-medium">Language</label>
        <Input
          value={data.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, name: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Proficiency</label>
        <Select
          value={data.proficiency}
          onValueChange={(value: LinkedInLanguage['proficiency']) =>
            setData({ ...data, proficiency: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ELEMENTARY">Elementary</SelectItem>
            <SelectItem value="FULL_PROFESSIONAL">Full Professional</SelectItem>
            <SelectItem value="NATIVE_OR_BILINGUAL">Native or Bilingual</SelectItem>
          </SelectContent>
        </Select>
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