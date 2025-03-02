import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api-client';
import { UpdateUserData, User } from '@/lib/types/user';

export function useUser() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => userApi.getData(),
  });

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: (data: UpdateUserData) => userApi.updateData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    data,
    isLoading,
    updateUser,
  };
} 