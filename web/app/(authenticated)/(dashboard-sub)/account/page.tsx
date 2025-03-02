'use client';

import { AccountForm } from '@/app/components/account/AccountForm';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/use-user';
import { UpdateUserData } from '@/lib/types/user';

export default function AccountPage() {
  const { data: user, isLoading, updateUser } = useUser();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSave = async (data: UpdateUserData) => {
    try {
      await updateUser(data);
      toast({
        title: 'Success',
        description: 'Your account has been updated.',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to update your account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container py-8">
      <AccountForm
        data={user}
        onSave={handleSave}
      />
    </div>
  );
} 