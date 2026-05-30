'use client';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useRouter } from 'next/navigation';

const NoteCreateModal = () => {
  const router = useRouter();
  const handleCloseModal = () => {
    router.back();
  };
  return (
    <Modal onClose={handleCloseModal}>
      <NoteForm onClose={handleCloseModal} />
    </Modal>
  );
};

export default NoteCreateModal;
