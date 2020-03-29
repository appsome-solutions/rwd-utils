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

const getRWDData = (): RWDContextData => {
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
    RWDData.less[key] = window.innerWidth <= BREAKPOINTS[key];
    RWDData.more[key] = window.innerWidth > BREAKPOINTS[key];
  });

  return RWDData;
};

export const RWDProvider: FunctionComponent = ({ children }) => {
  const [RWDData, setRWDData] = useState(getRWDData());

  useEffect(() => {
    window.addEventListener('resize', () => setRWDData(getRWDData()), false);

    return window.removeEventListener('resize', () => setRWDData(getRWDData()), false);
  }, []);

  return <RWDContext.Provider value={RWDData}>{children}</RWDContext.Provider>;
};

export const useRWD = (): RWDDataType => useContext(RWDContext) as RWDDataType;
