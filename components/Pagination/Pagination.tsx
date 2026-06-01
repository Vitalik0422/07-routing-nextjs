import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  page: number;
  handleChangePage: (selectedItem: { selected: number }) => void;
  totalPages: number;
}

const Pagination = ({
  page,
  handleChangePage,
  totalPages,
}: PaginationProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handleChangePage}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={page - 1}
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
