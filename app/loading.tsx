'use client';
import css from './Loading.module.css';

import { MutatingDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#3483f8"
      secondaryColor="#3483f8"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperClass={css.loading}
    />
  );
};

export default Loader;
