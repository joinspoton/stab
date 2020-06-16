// @flow

import React from 'react';
import URLs from '../../URLs';
// import {
//   buildQueryParams,
//   getSite,
//   post,
//   checkAdblocker,
// } from '../../Util';
import {
  buildQueryParams,
  getSite,
  checkAdblocker,
} from '../../Util';

type DirectSaleAdTilePropsType = {
  shortname: ?string,
  config: DirectSaleAdType
};


function getVenatusConfig(
  config: DirectSaleAdType
): ?{venatusConfigId: string, venatusSiteId: string} {
  let venatusConfigId = '598c3ef246e0fb0001c407d0';
  let venatusSiteId = '598c3ecf46e0fb0001272bd8';

  if (
    config.directSale.mediaType === 'html' &&
    config.directSale.venatusConfig
  ) {
    venatusConfigId = config.directSale.venatusConfig.id;
    venatusSiteId = config.directSale.venatusConfig.siteId;
    return {
      venatusConfigId: venatusConfigId,
      venatusSiteId: venatusSiteId,
    };
  } else {
    return null;
  }
}

export default function AdTile(
  props: DirectSaleAdTilePropsType
): React.Element<any> {
  const {
    config: { _id },
    config,
  } = props;

  const site = getSite();
  const referrer = document.referrer;
  const siteQueryParams = site ? '?site=' + site : '';
  const referrerQueryParams = site
    ? '&referrer=' + referrer
    : '?referrer=' + referrer;
  //const randomKey = Math.random().toString().replace('0.', '');

  const renderVenatusCreative = () => {
    const venatusConfig = getVenatusConfig(config);
    if (venatusConfig) {
      // const {venatusConfigId, venatusSiteId} = venatusConfig;
      // post( `${URLs.getDomain()}/api/track/venatus`, {
      //   site,
      //   id: venatusConfigId,
      // });
      // const venatusAdContainer: any =
      // document.getElementById("vmv3-ad-manager-" + randomKey);
      // venatusAdContainer.innerHTML = `
      //   <iframe id="vmv3-frm-${randomKey}"
      // src="javascript:\'<html><body></body></html>\'"
      //   style="border: none; outline: 0; margin: 0; padding: 0;"
      //   width="0" height="0" data-mode="tag" data-stanza="true"
      // data-site-id="${venatusSiteId}"
      //   data-placement-id="${venatusConfigId}"></iframe>;
      // `;
      window.top.__vm_add = window.top.__vm_add || [];
      document.write('<div class="vm-placement" data-id="58da716946e0fb0001b87a42"></div>');
      var elm = document.querySelector('.vm-placement[data-id="58da716946e0fb0001b87a42"]');
      window.top.__vm_add.push(elm);
      // const loaderFrame: any =
      // document.getElementById("vmv3-frm-" + randomKey);
      // const loaderFrameWindow = loaderFrame.contentWindow
      //   ? loaderFrame.contentWindow
      //   : loaderFrame.contentDocument;
      // const scriptTag = document.createElement('script');
      // scriptTag.type = 'text/javascript';
      // scriptTag.src = '//hb.vntsm.com/v3/live/ad-manager.min.js';
      // document.head.appendChild(
      // '<script src="//hb.vntsm.com/v3/live/ad-manager.min.js"
      // type="text/javascript" async></script>');
      // document.head.appendChild(scriptTag);
      // loaderFrameWindow.document.open();
      // loaderFrameWindow.document.write(
      //   '<scr'+'ipt src="//hb.vntsm.com/v3/live/ad-manager.min.js"
      // type="text/javascript" async>'+'</scr'+'ipt>'
      // );
      // loaderFrameWindow.document.close();
    }
  };

  const tryRenderVenatusCreative = () => {
    checkAdblocker((adBlockerOn: boolean) => {
      if (!adBlockerOn) {
        renderVenatusCreative();
      }
    });
  };

  let src;

  if (
    props.config.directSale.mediaType === 'video' &&
    !props.config.directSale.venatus
  ) {
    src = URLs.getDomain() + '/directsale/video/' + _id + siteQueryParams + referrerQueryParams;
  } else if (
    props.config.directSale.mediaType === 'html' &&
    !props.config.directSale.venatus
  ) {
    const html = props.config.directSale.html;
    const query = buildQueryParams({
      site: getSite(),
    }, html.url);

    src = html.url + query + referrerQueryParams;
  }
  const venatusConfig = getVenatusConfig(config);
  return (
    <div className='tile dynamic-content-tile'>
      {
        !venatusConfig
        ?
        <iframe
          src={src}
          width='300'
          height='250'
          frameBorder='0'
          scrolling='no'
        />
        :
        <div
          style={{
            width: 300,
            height: 250,
            position: 'relative',
            background: 'black',
          }}
          id={"vm-dynamic-placement"}
          className="vm-placement"
          data-id="5b19474946e0fb0001aa0c82"
        >
          <img src={''} onError={tryRenderVenatusCreative} />
        </div>
      }
    </div>
  );
}