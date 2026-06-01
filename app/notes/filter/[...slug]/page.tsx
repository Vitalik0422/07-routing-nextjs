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
  const tag = slug[0] as TagType;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, slug: tag, search: '' }],
    queryFn: () =>
      slug[0] === 'all' ? fetchNotes() : fetchNotes('', 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterListClient tag={tag} />
    </HydrationBoundary>
  );
};

export default Page;
