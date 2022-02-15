import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css'; // Using a custom className
import SidebarAd from '../../components/SidebarAd';
// This prevents TOC highlighting to highlight TOCInline/TOCCollapsible by mistake

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

function TOC({className, ...props}) {
  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <div className="margin--md">
        <SidebarAd position="table_of_contents" />
      </div>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
      <div className="margin--md">
        <div className={clsx('padding--md', styles.socialLinksContainer)}>
          <div className={styles.socialLinks}>
            Follow us
            <a
              href="https://t.me/techinterviewhandbook"
              target="_blank"
              rel="noopener noreferrer"
              class="navbar-icon navbar-icon-telegram"
              aria-label="Telegram channel"
            />
            <a
              href="https://twitter.com/techinterviewhb"
              target="_blank"
              rel="noopener noreferrer"
              class="navbar-icon navbar-icon-twitter"
              aria-label="Twitter"
            />
            <a
              href="https://www.facebook.com/techinterviewhandbook"
              target="_blank"
              rel="noopener noreferrer"
              class="navbar-icon navbar-icon-facebook"
              aria-label="Facebook page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TOC;
