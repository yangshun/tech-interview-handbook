import type { ReactNode } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import type { Placement } from '@popperjs/core';

type TooltipProps = Readonly<{
  children: ReactNode;
  placement?: Placement;
  tooltipContent: ReactNode;
}>;

export default function Tooltip({
  children,
  tooltipContent,
  placement = 'bottom-start',
}: TooltipProps) {
  const {
    getTooltipProps,
    getArrowProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    interactive: true,
    placement,
    trigger: ['focus', 'hover'],
  });
  return (
    <>
      <div ref={setTriggerRef}>{children}</div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className: 'tooltip-container ',
          })}>
          {tooltipContent}
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
        </div>
      )}
    </>
  );
}
