import { type FC, type PropsWithChildren } from 'react';

/**
 * Adding the children prop to React 18 FC type
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type FCC<P = {}> = FC<PropsWithChildren<P>>;
