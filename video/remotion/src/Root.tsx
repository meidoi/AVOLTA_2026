import React from 'react';
import {Composition} from 'remotion';
import {Main, TOTAL} from './Video';
import {S12, S12_TOTAL} from './S12';
export const Root: React.FC = () => (
  <>
    <Composition id="Exec" component={Main} durationInFrames={TOTAL} fps={30} width={1920} height={1080} />
    <Composition id="S12" component={S12} durationInFrames={S12_TOTAL} fps={30} width={1920} height={1080} />
  </>
);
