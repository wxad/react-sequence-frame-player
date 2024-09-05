// @ts-ignore
import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import useReactSequenceFramePlayer, { IReactSequenceFramePlayerHookProps } from './use-react-sequence-frame-player';

export interface IReactSequenceFramePlayerProps extends IReactSequenceFramePlayerHookProps {
  /**
   * 容器宽度
   */
  width?: number | string;
  height?: number | string;
}

export interface IReactSequenceFramePlayerRef {
  root: HTMLDivElement | null;
  play: () => void;
  pause: () => void;
}

const ReactSequenceFramePlayer: React.ForwardRefExoticComponent<
  IReactSequenceFramePlayerProps & React.RefAttributes<IReactSequenceFramePlayerRef>
> = forwardRef(({ width, height, ...otherProps }, ref) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { dom, play, pause } = useReactSequenceFramePlayer(otherProps);

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    play,
    pause,
  }));

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width,
        height,
      }}
    >
      {dom}
    </div>
  );
});

export default ReactSequenceFramePlayer;
