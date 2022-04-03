// Swizzled to change the appearance of a paginator nav link.
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function PaginatorNavLink({hasArrow, permalink, title, subLabel, ...rest}) {
  return (
    <Link className={clsx('pagination-nav__link', styles.root)} to={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">{title}</div>
      {hasArrow && <span className={styles.arrow}>→</span>}
    </Link>
  );
}

export default PaginatorNavLink;
