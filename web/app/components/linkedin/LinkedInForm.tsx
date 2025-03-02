import { LinkedInData } from '@/lib/types/linkedin';
import { EducationList } from './sections/EducationList';
import { ExperienceList } from './sections/ExperienceList';
import { Button } from '@/components/ui/button';

interface LinkedInFormProps {
  data: LinkedInData;
  onSave: (data: LinkedInData) => void;
  isSaving?: boolean;
}

export function LinkedInForm({ data, onSave, isSaving }: LinkedInFormProps) {
  return (
    <div className="space-y-8">
      <ExperienceList
        items={data.experience || []}
        onChange={experience => onSave({ ...data, experience })}
      />

      <EducationList
        items={data.education || []}
        onChange={education => onSave({ ...data, education })}
      />

      {/* TODO: Add other sections (Education, Languages, etc.) */}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
