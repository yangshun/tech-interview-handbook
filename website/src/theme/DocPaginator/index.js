import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';

function DocPaginator(props) {
  const {
    // previous,
    next,
  } = props;

  return (
    <nav
      className="pagination-nav docusaurus-mt-lg"
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages navigation',
        description: 'The ARIA label for the docs pagination',
      })}>
      <div className="pagination-nav__item">
        {next && (
          <PaginatorNavLink
            hasArrow={true}
            {...next}
            subLabel={
              <Translate
                id="theme.docs.paginator.next"
                description="The label used to navigate to the next doc">
                Next page
              </Translate>
            }
          />
        )}
      </div>
    </nav>
  );
}

export default DocPaginator;
