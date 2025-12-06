'use client';

import { deleteUser } from '@/service/actions/userActions';
import { useState } from 'react';

interface DeleteButtonProps {
  userId: string;
  userName: string;
}

export default function DeleteButton({ userId, userName }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteUser(userId);
      if (!result.success) {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
