import PropTypes from 'prop-types';
import React from 'react';
import { WithBreakpoint, isWidthUp } from '@versionone/with-breakpoint';
import { createComponent, styleUtils } from '@versionone/style-container';
import { StyleProvider } from '@versionone/style-provider';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';
const SpacedGroupImpl = createComponent(
  ({ breakpoint, direction, xs, sm, md, lg, xl }) => {
    const margin =
      (isWidthUp('xl', breakpoint) && xl) ||
      (isWidthUp('lg', breakpoint) && lg) ||
      (isWidthUp('md', breakpoint) && md) ||
      (isWidthUp('sm', breakpoint) && sm) ||
      (isWidthUp('xs', breakpoint) && xs);
    return {
      display: 'flex',
      'flex-direction': direction === HORIZONTAL ? 'row' : 'column',
      '> *': {
        ...styleUtils.margin(margin),
      },
      'flex-wrap': 'wrap',
    };
  },
  'div',
);
const SpacedGroup = props => (
  <StyleProvider>
    <WithBreakpoint>
      {breakpoint => <SpacedGroupImpl {...props} breakpoint={breakpoint} />}
    </WithBreakpoint>
  </StyleProvider>
);
const spacingUnits = [0, 8, 16, 24, 32, 40];
SpacedGroup.propTypes = {
  /**
   * @deprecated do not use this fake prop
   */
  fake: PropTypes.string,
  /**
   * Set components to equally space.
   */
  children: PropTypes.node,
  /**
   * Set the direction elements should be rendered.
   */
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /**
   * Set the amount to space to apply between elements when the screen is phone and up
   */
  xs: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet portrait and up
   */
  sm: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet landscape and up
   */
  md: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is small desktop and up
   */
  lg: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is large desktop and up
   */
  xl: PropTypes.oneOf(spacingUnits),
};
SpacedGroup.defaultProps = {
  direction: HORIZONTAL,
  xs: 8,
};
SpacedGroup.themeDefinition = {
  color: PropTypes.string.isRequired,
  test: PropTypes.oneOf([1, 2, 4]),
};
SpacedGroup.defaultThemeValues = {
  color: 'blue',
  test: 2,
};
export default SpacedGroup;
