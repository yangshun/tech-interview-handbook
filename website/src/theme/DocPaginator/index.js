/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';

function DocPaginator(props) {
  const {metadata} = props;
  return (
    <nav
      className="pagination-nav"
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages navigation',
        description: 'The ARIA label for the docs pagination',
      })}>
      <div className="pagination-nav__item">
        {metadata.previous && (
          <a
            className="pagination-nav__link"
            href={metadata.previous.permalink}>
            <div className="pagination-nav__sublabel">
              <Translate
                id="theme.docs.paginator.previous"
                description="The label used to navigate to the previous doc">
                Previous
              </Translate>
            </div>
            <div className="pagination-nav__label">
              &laquo; {metadata.previous.title}
            </div>
          </a>
        )}
      </div>
      <div className="pagination-nav__item pagination-nav__item--next">
        {metadata.next && (
          <a className="pagination-nav__link" href={metadata.next.permalink}>
            <div className="pagination-nav__sublabel">
              <Translate
                id="theme.docs.paginator.next"
                description="The label used to navigate to the next doc">
                Next
              </Translate>
            </div>
            <div className="pagination-nav__label">
              {metadata.next.title} &raquo;
            </div>
          </a>
        )}
      </div>
    </nav>
  );
}

export default DocPaginator;
