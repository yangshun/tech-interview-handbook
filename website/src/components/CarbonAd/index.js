import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default React.memo(() => {
  return (
    <BrowserOnly>
      {() => (
        <div>
          <script
            type="text/javascript"
            src="//cdn.carbonads.com/carbon.js?serve=CEAI4537&placement=wwwtechinterviewhandbookorg"
            id="_carbonads_js"
          />
          {process.env.NODE_ENV === 'development' && (
            <div id="carbonads">
              <span>
                <span className="carbon-wrap">
                  <a
                    href="https://srv.carbonads.net/ads/click/x/GTND42JWCABD6K7LCVYLYKQNCESIEKJLCKBIKZ3JCYBD527JC67DV2JKC6YDLK7WFTBDPKQJCK7IK23IFTADT23MHEYIK23UCEYDK53ECTNCYBZ52K?segment=placement:wwwtechinterviewhandbookorg;"
                    className="carbon-img"
                    target="_blank"
                    rel="noopener sponsored">
                    <img
                      src="https://cdn4.buysellads.net/uu/1/100164/1630683824-shortcut260x200.png"
                      alt="ads via Carbon"
                      border="0"
                      height="100"
                      width="130"
                      style={{maxWidth: 130}}
                    />
                  </a>
                  <a
                    href="https://srv.carbonads.net/ads/click/x/GTND42JWCABD6K7LCVYLYKQNCESIEKJLCKBIKZ3JCYBD527JC67DV2JKC6YDLK7WFTBDPKQJCK7IK23IFTADT23MHEYIK23UCEYDK53ECTNCYBZ52K?segment=placement:wwwtechinterviewhandbookorg;"
                    className="carbon-text"
                    target="_blank"
                    rel="noopener sponsored">
                    What if Your Project Management Tool Was Fast and Intuitive?
                    Try Shortcut (formerly Clubhouse).
                  </a>
                </span>
                <a
                  href="http://carbonads.net/?utm_source=wwwtechinterviewhandbookorg&amp;utm_medium=ad_via_link&amp;utm_campaign=in_unit&amp;utm_term=carbon"
                  className="carbon-poweredby"
                  target="_blank"
                  rel="noopener sponsored">
                  ads via Carbon
                </a>
              </span>
            </div>
          )}
        </div>
      )}
    </BrowserOnly>
  );
});
