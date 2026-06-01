'use client';
import css from './NoteModalDescription.module.css';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const NoteModalDescriptionClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    retry: false,
    throwOnError: true,
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  const handleCloseModal = () => {
    router.back();
  };

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  return (
    <Modal onClose={handleCloseModal}>
      <button onClick={handleCloseModal} className={css.modalCloseBtn}></button>
      {note && (
        <div className={css.noteModalThumb}>
          <h2 className={css.noteModalTitle}>{note.title}</h2>
          <p className={css.noteModalContent}>{note.content}</p>
        </div>
      )}
    </Modal>
  );
};

export default NoteModalDescriptionClient;
