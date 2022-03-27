import React, {useEffect, useRef} from 'react';

// Credits: https://github.com/tannerlinsley/react-query/blob/master/docs/src/components/CarbonAds.js
function buildScript(src, attrs = {}) {
  if (typeof document !== 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = src;
    Object.keys(attrs).forEach((attr) =>
      script.setAttribute(attr, attrs[attr]),
    );

    return script;
  }
}

export default React.memo(() => {
  const ref = useRef();

  useEffect(() => {
    const script = buildScript(
      '//cdn.carbonads.com/carbon.js?serve=CEAI4537&placement=wwwtechinterviewhandbookorg',
      {
        type: 'text/javascript',
        id: '_carbonads_js',
      },
    );

    ref.current.appendChild(script);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      [...ref.current.children].forEach((child) => {
        if (child && child.id && child.id.startsWith('carbonads_')) {
          ref.current.removeChild(child);
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  return <div ref={ref} />;
});
