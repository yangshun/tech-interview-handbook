import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

function PaginatorNavLink({hasArrow, permalink, title, subLabel, ...rest}) {
  console.log(rest);
  return (
    <a className={clsx('pagination-nav__link', styles.root)} href={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">{title}</div>
      {hasArrow && <span className={styles.arrow}>→</span>}
    </a>
  );
}

export default PaginatorNavLink;
