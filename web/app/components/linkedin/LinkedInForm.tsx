import { LinkedInData } from "@/lib/types/linkedin";
import { SkillsList } from "./sections/SkillsList";
import { ExperienceList } from "./sections/ExperienceList";
import { EducationList } from "./sections/EducationList";
import { LanguageList } from "./sections/LanguageList";
import { HonorAwardList } from "./sections/HonorAwardList";
import { ProjectList } from "./sections/ProjectList";
import { VolunteerWorkList } from "./sections/VolunteerWorkList";
import { CertificationList } from "./sections/CertificationList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface LinkedInFormProps {
  data: LinkedInData;
  onSave: (data: LinkedInData) => void;
  isSaving?: boolean;
  requestLatestData: () => void;
}

export function LinkedInForm({
  data: initialData,
  onSave,
  isSaving,
  requestLatestData,
}: LinkedInFormProps) {
  const [data, setData] = useState(initialData);

  const updateField = <K extends keyof LinkedInData>(
    field: K,
    value: LinkedInData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(data);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Basic Information</h2>
        <Button onClick={requestLatestData} disabled={isSaving} type="button">
          Fetch Latest from LinkedIn
        </Button>
      </div>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              value={data.first_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("first_name", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              value={data.last_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("last_name", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Occupation</label>
          <Input
            value={data.occupation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateField("occupation", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Headline</label>
          <Input
            value={data.headline}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateField("headline", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">About</label>
          <Textarea
            value={data.about}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateField("about", e.target.value)
            }
            className="min-h-[150px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              value={data.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("location", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Input
              value={data.city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("city", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Input
              value={data.state}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("state", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Input
              value={data.country}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateField("country", e.target.value)
              }
            />
          </div>
        </div>
      </form>
      <SkillsList
        items={data.skills}
        onChange={(skills) => updateField("skills", skills)}
      />

      <ExperienceList
        items={data.experience}
        onChange={(experience) => updateField("experience", experience)}
      />

      <EducationList
        items={data.education}
        onChange={(education) => updateField("education", education)}
      />

      <LanguageList
        items={data.languages_and_proficiencies}
        onChange={(languages) =>
          updateField("languages_and_proficiencies", languages)
        }
      />

      <HonorAwardList
        items={data.accomplishment_honors_awards}
        onChange={(awards) =>
          updateField("accomplishment_honors_awards", awards)
        }
      />

      <ProjectList
        items={data.accomplishment_projects}
        onChange={(projects) =>
          updateField("accomplishment_projects", projects)
        }
      />

      <VolunteerWorkList
        items={data.volunteer_work}
        onChange={(volunteer) => updateField("volunteer_work", volunteer)}
      />

      <CertificationList
        items={data.certifications}
        onChange={(certifications) =>
          updateField("certifications", certifications)
        }
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}
