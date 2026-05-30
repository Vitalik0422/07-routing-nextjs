import css from './Header.module.css';
// import SearchBox from '../SearchBox/SearchBox';
import Link from 'next/link';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <Link href="/notes/create">Створити нотатку +</Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
