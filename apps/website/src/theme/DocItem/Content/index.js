import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}
export default function DocItemContent({ children }) {
  const syntheticTitle = useSyntheticTitle();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <div className="margin-bottom--lg">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=yangshun&amp;repo=tech-interview-handbook&amp;type=star&amp;count=true&amp;size=large"
          frameBorder={0}
          width={170}
          height={30}
          title="GitHub Stars"
        />
      </div>
      <div className="margin-bottom--lg">
        <a
          className="shoutout"
          href="https://www.linkedin.com/in/yangshun"
          target="_blank">
          👋 Hi there, I'm Yangshun, an ex-Meta Staff Engineer, author of this
          handbook and Blind 75. Follow me on <u>LinkedIn</u> for Software
          Engineering advice and interview tips!
        </a>
      </div>
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
