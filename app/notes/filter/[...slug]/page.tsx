import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesFilterListClient from './Notes.client';
import { TagType } from '@/types/note';

interface FilterNotesProps {
  params: Promise<{ slug: TagType }>;
}

const Page = async ({ params }: FilterNotesProps) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, slug: slug[0], search: '' }],
    queryFn: () =>
      slug[0] === 'all'
        ? fetchNotes()
        : fetchNotes('', 1, 12, slug[0] as TagType),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterListClient />
    </HydrationBoundary>
  );
};

export default Page;
