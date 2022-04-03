// Swizzled to add sidebar ad below mobile nav items.
import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';

import SidebarAd from '../../../components/SidebarAd';

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={(item) => {
          // Mobile sidebar should only be closed if the category has a link
          if (item.type === 'category' && item.href) {
            mobileSidebar.toggle();
          }

          if (item.type === 'link') {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
      <div className="margin--md">
        <SidebarAd position="mobile_sidebar" />
      </div>
    </ul>
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
