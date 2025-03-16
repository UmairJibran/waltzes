import { LinkedInHonorAward } from "@/lib/types/linkedin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, PencilLine } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HonorAwardListProps {
  items: LinkedInHonorAward[];
  onChange: (items: LinkedInHonorAward[]) => void;
}

const emptyHonorAward: LinkedInHonorAward = {
  title: "",
  issuer: "",
  issued_on: null,
  description: null,
};

export function HonorAwardList({ items, onChange }: HonorAwardListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkedInHonorAward | null>(
    null
  );
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (honorAward: LinkedInHonorAward) => {
    if (editingIndex === -1) {
      onChange([...items, honorAward]);
    } else {
      const newItems = [...items];
      newItems[editingIndex] = honorAward;
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
        <h2 className="text-lg font-semibold">Honors & Awards</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingItem({ ...emptyHonorAward });
                setEditingIndex(-1);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Honor/Award
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIndex === -1 ? "Add Honor/Award" : "Edit Honor/Award"}
              </DialogTitle>
            </DialogHeader>
            <HonorAwardForm
              data={editingItem || emptyHonorAward}
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
              <p className="text-sm text-muted-foreground">{item.issuer}</p>
              {item.issued_on && (
                <p className="text-sm text-muted-foreground">
                  Issued: {item.issued_on.month}/{item.issued_on.year}
                </p>
              )}
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

interface HonorAwardFormProps {
  data: LinkedInHonorAward;
  onSave: (data: LinkedInHonorAward) => void;
  onCancel: () => void;
}

function HonorAwardForm({
  data: initialData,
  onSave,
  onCancel,
}: HonorAwardFormProps) {
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
        <label className="text-sm font-medium">Issuer</label>
        <Input
          value={data.issuer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, issuer: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Issue Date (Optional)</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Month"
            value={data.issued_on?.month || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({
                ...data,
                issued_on: e.target.value
                  ? {
                      day: 1,
                      month: Number(e.target.value),
                      year: data.issued_on?.year || new Date().getFullYear(),
                    }
                  : null,
              })
            }
          />
          <Input
            type="number"
            placeholder="Year"
            value={data.issued_on?.year || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({
                ...data,
                issued_on: e.target.value
                  ? {
                      day: 1,
                      month: data.issued_on?.month || 1,
                      year: Number(e.target.value),
                    }
                  : null,
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Optional)</label>
        <Textarea
          value={data.description || ""}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, description: e.target.value })
          }
          className="min-h-[100px]"
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
