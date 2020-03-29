import { css, FlattenSimpleInterpolation } from 'styled-components';

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export type MediaCss = (args: TemplateStringsArray) => FlattenSimpleInterpolation;

export type BreakpointsKeysType = keyof (typeof BREAKPOINTS);

export type Media = Partial<Record<BreakpointsKeysType, MediaCss>>;

export type NotUndefinedMedia = Record<BreakpointsKeysType, MediaCss>;

export const BreakpointsKeys: BreakpointsKeysType[] = Object.keys(BREAKPOINTS) as BreakpointsKeysType[];

// Mobile first:
export const media: NotUndefinedMedia = BreakpointsKeys.reduce((acc: Media, label: BreakpointsKeysType) => {
  acc[label] = (...args) => css`
    @media (min-width: ${BREAKPOINTS[label]}px) {
      ${css(...args)};
    }
  `;

  return acc;
}, {}) as NotUndefinedMedia;
