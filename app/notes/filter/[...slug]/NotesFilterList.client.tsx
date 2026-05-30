'use client';
import css from './NotesFilterList.module.css';
import InfoMessage from '@/components/InformMessage/InfoMessage';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';
import { TagType } from '@/types/note';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';

const NotesFilterListClient = () => {
  const [page, setPage] = useState<number>(1);
  const { slug } = useParams<{ slug: TagType }>();
  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, slug[0]],
    queryFn: () =>
      slug[0] === 'all'
        ? fetchNotes('', page)
        : fetchNotes('', page, 12, slug[0] as TagType),
    enabled: Boolean(slug[0]),
    retry: false,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;

  return (
    <>
      {isLoading ? (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#3483f8"
          secondaryColor="#3483f8"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperClass={css.MutatingDotsWrapper}
        />
      ) : data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <InfoMessage />
      )}
      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
};

export default NotesFilterListClient;
