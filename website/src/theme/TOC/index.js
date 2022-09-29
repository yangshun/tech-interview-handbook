import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css'; // Using a custom className
import SidebarAd from '../../components/SidebarAd';
// This prevents TOC highlighting to highlight TOCInline/TOCCollapsible by mistake

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

function TOC({ className, ...props }) {
  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <div className="margin--md">
        <SidebarAd position="table_of_contents" />
      </div>
      <h3
        className="padding-left--md padding-top--md margin-bottom--none"
        style={{
          textTransform: 'uppercase',
          fontSize: '0.75em',
          color: 'var(--ifm-color-emphasis-700)',
          letterSpacing: '0.5px',
        }}>
        Table of Contents
      </h3>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}

export default TOC;
