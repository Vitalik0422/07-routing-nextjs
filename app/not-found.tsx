import css from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.notFountTitle}>404 - Page not found</h1>
      <p className={css.notFountDescription}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
