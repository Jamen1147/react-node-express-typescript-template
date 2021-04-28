import React from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  domNode: HTMLElement | string;
};

const Portal = ({
  domNode,
  children,
}: React.PropsWithChildren<PortalProps>) => {
  const portal =
    typeof domNode === 'string' ? document.getElementById(domNode) : domNode;

  if (!portal) {
    // eslint-disable-next-line no-console
    console.warn(
      `Cannot find element with the provided portal id <${domNode}>`
    );
    return children as React.ReactElement;
  }

  return createPortal(children, portal);
};

export default Portal;
