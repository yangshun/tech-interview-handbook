import React from 'react';

function PaginatorNavLink({permalink, title, subLabel}) {
  return (
    <a className="pagination-nav__link" href={permalink}>
      {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
      <div className="pagination-nav__label">{title}</div>
    </a>
  );
}

export default PaginatorNavLink;
