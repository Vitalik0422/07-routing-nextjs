import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesFilterListClient from './NotesFilterList.client';
import { TagType } from '@/types/note';

interface FilterNotesProps {
  params: Promise<{ slug: TagType }>;
}

const Page = async ({ params }: FilterNotesProps) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 'all'],
    queryFn: () => (slug[0] === 'all' ? fetchNotes() : fetchNotes(slug[0])),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterListClient />
    </HydrationBoundary>
  );
};

export default Page;
