'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { User, UpdateUserData } from '@/lib/types/user';

interface AccountFormProps {
  data: User;
  onSave: (data: UpdateUserData) => Promise<void>;
}

export function AccountForm({ data, onSave }: AccountFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserData>({
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone || '',
    portfolioUrl: data.portfolioUrl || '',
    linkedinUsername: data.linkedinUsername || '',
    githubUsername: data.githubUsername || '',
    additionalInstructions: data.additionalInstructions || '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [showLinkedInWarning, setShowLinkedInWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof UpdateUserData, value: string) => {
    if (field === 'linkedinUsername' && value !== data.linkedinUsername) {
      setShowLinkedInWarning(true);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const updateData: UpdateUserData = {
        ...formData,
        ...(newPassword ? { newPassword } : {}),
      };
      await onSave(updateData);
      setIsEditing(false);
      setNewPassword('');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Account Settings</h2>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Names Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
              ) : (
                <p className="text-base py-2">{formData.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                />
              ) : (
                <p className="text-base py-2">{formData.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Section */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <p className="text-base py-2">{data.email}</p>
          </div>

          {/* Social Profiles Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="githubUsername">GitHub Profile</Label>
              {isEditing ? (
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground px-3 py-2 rounded-l-md bg-muted flex-1/2">
                    https://github.com/
                  </span>
                  <Input
                    id="githubUsername"
                    value={formData.githubUsername}
                    onChange={e =>
                      handleChange('githubUsername', e.target.value)
                    }
                    className="rounded-l-none"
                  />
                </div>
              ) : (
                <p className="text-base py-2">
                  {formData.githubUsername ? (
                    <span>https://github.com/{formData.githubUsername}</span>
                  ) : (
                    <span className="text-muted-foreground">Not set</span>
                  )}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUsername">LinkedIn Profile</Label>
              {isEditing ? (
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground px-3 py-2 rounded-l-md bg-muted flex-1/2">
                    https://linkedin.com/in/
                  </span>
                  <Input
                    id="linkedinUsername"
                    value={formData.linkedinUsername}
                    onChange={e =>
                      handleChange('linkedinUsername', e.target.value)
                    }
                    className="rounded-l-none"
                  />
                </div>
              ) : (
                <p className="text-base py-2">
                  {formData.linkedinUsername ? (
                    <span>
                      https://linkedin.com/in/{formData.linkedinUsername}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Not set</span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Additional Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  type="tel"
                />
              ) : (
                <p className="text-base py-2">
                  {formData.phone || (
                    <span className="text-muted-foreground">Not set</span>
                  )}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl">Portfolio/Personal Site</Label>
              {isEditing ? (
                <Input
                  id="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={e => handleChange('portfolioUrl', e.target.value)}
                  type="url"
                />
              ) : (
                <p className="text-base py-2">
                  {formData.portfolioUrl || (
                    <span className="text-muted-foreground">Not set</span>
                  )}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="Leave blank to keep current password"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additionalInstructions">
                Additional Instructions
              </Label>
              {isEditing ? (
                <Textarea
                  id="additionalInstructions"
                  value={formData.additionalInstructions}
                  onChange={e =>
                    handleChange('additionalInstructions', e.target.value)
                  }
                  placeholder="Add any specific instructions for generating resumes/cover letters"
                  className="h-32"
                />
              ) : (
                <p className="text-base py-2">
                  {formData.additionalInstructions || (
                    <span className="text-muted-foreground">
                      No additional instructions
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showLinkedInWarning} onOpenChange={setShowLinkedInWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription>
              Changing your LinkedIn username will result in the loss of your
              existing LinkedIn data. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  linkedinUsername: data.linkedinUsername,
                }));
                setShowLinkedInWarning(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowLinkedInWarning(false)}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
