import React, { useState, useContext, useEffect, FunctionComponent, createContext } from 'react';

import { BREAKPOINTS, BreakpointsKeys, BreakpointsKeysType } from './media';

/* ----- Context ----- */
const RWDContext = createContext({});

export interface RWDDataType {
  width: number;
  less: Record<BreakpointsKeysType, boolean>;
  more: Record<BreakpointsKeysType, boolean>;
}

export type RWDContextData = RWDDataType | {};

export type BreakpointsType = { [key: string]: number; }

const getRWDData = (breakpoints: BreakpointsType): RWDContextData => {
  // For server side rendering:
  const isClient: boolean = typeof window === 'object';

  if (!isClient) {
    return {};
  }

  // Not sure how to correctly type empty object state before initialization to match desired type
  const RWDData: RWDDataType = ({
    width: window.innerWidth,
    less: {},
    more: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any) as RWDDataType;

  BreakpointsKeys.forEach(key => {
    RWDData.less[key] = window.innerWidth <= breakpoints[key];
    RWDData.more[key] = window.innerWidth > breakpoints[key];
  });

  return RWDData;
};

export type RWDProviderProps = {
  breakpoints?: BreakpointsType,
};

export const RWDProvider: React.FunctionComponent<RWDProviderProps> = ({ children, breakpoints = BREAKPOINTS }) => {
  const [RWDData, setRWDData] = useState(getRWDData(breakpoints));

  useEffect(() => {
    window.addEventListener('resize', () => setRWDData(getRWDData(breakpoints)), false);

    return window.removeEventListener('resize', () => setRWDData(getRWDData(breakpoints)), false);
  }, [breakpoints]);

  return <RWDContext.Provider value={RWDData}>{children}</RWDContext.Provider>;
};

export const useRWD = (): RWDDataType => useContext(RWDContext) as RWDDataType;
