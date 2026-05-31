'use client';
import css from './NotesFilterList.module.css';
import InfoMessage from '@/components/InformMessage/InfoMessage';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { TagType } from '@/types/note';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';

const NotesFilterListClient = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuey] = useState<string>('');
  const [search] = useDebounce(searchQuery, 1000);
  const { slug } = useParams<{ slug: TagType }>();
  const { data, isLoading } = useQuery({
    queryKey: ['notes', { page: page, slug: slug[0], search: search }],
    queryFn: () =>
      slug[0] === 'all'
        ? fetchNotes(search, page)
        : fetchNotes(search, page, 12, slug[0] as TagType),
    enabled: Boolean(slug[0]),
    retry: false,
    placeholderData: keepPreviousData,
  });

  const handleSearchNoteInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuey(e.target.value);
    setPage(1);
  };

  const totalPages = data?.totalPages || 1;

  return (
    <>
      <SearchBox
        searchValue={searchQuery}
        handleSearchNoteInput={handleSearchNoteInput}
        isLoading={isLoading}
      />
      {isLoading && (
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
      )}
      {data && data.notes.length > 0 ? (
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
