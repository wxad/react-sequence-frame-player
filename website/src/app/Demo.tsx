'use client';

import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useReactSequenceFramePlayer, IReactSequenceFramePlayerHookProps } from 'react-sequence-frame-player';
import { Button } from '@/components/ui/button';

const Demo = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  const [params, setParams] = useState({
    radius: 35,
    cornerSmoothing: 0.8,
  });

  const baseProps: Partial<IReactSequenceFramePlayerHookProps> = {
    pattern: 'https://wxa.wxs.qq.com/wxad-design/yijie/bm23-test-2/mengxin/images/_1-61__%d.webp',
    total: 60,
    fps: 30,
    autoPlay: true,
    loop: true,
    showFirstFrame: true,
    onProgress: (progress) => {
      if (progressRef.current) {
        progressRef.current.innerText = `${(progress * 100).toFixed(2)}%`;
      }
    },
    onEnd: () => {},
    onLooped: (loop) => {
      if (loopRef.current) {
        loopRef.current.innerText = loop.toString();
      }
    },
  };

  const { dom, play, pause } = useReactSequenceFramePlayer({
    ...baseProps,
  });

  return (
    <>
      <div
        className="flex items-center justify-center relative bg-[length:40px_40px] border border-solid border-neutral-200 rounded-md overflow-auto py-16 text-xs text-right text-neutral-400 font-medium"
        style={{
          backgroundImage: 'url(grid.svg)',
        }}
      >
        <div className="absolute top-6 right-6 grid gap-1">
          <div>
            当前进度：
            <span ref={progressRef} />
          </div>
          <div>
            已循环次数：
            <span ref={loopRef}>0</span>
          </div>
        </div>
        <Button
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          onClick={() => {
            if (playing) {
              pause();
            } else {
              play();
            }
            setPlaying(!playing);
          }}
        >
          {playing ? '暂停' : '播放'}
        </Button>
        <div className="relative w-64 h-64">{dom}</div>
      </div>
      <div className="mt-4 mb-9 px-4 py-3 bg-neutral-50 rounded border border-solid border-neutral-200">
        <SyntaxHighlighter
          style={atomOneLight}
          wrapLines
          customStyle={{ backgroundColor: 'transparent' }}
          className="highlight"
          language="tsx"
        >
          {`const baseProps: Partial<IReactSequenceFramePlayerHookProps> = {
  pattern: 'https://wxa.wxs.qq.com/wxad-design/yijie/bm23-test-2/mengxin/images/_1-61__%d.webp',
  total: 60,
  fps: 30,
  autoPlay: true,
  loop: true,
  showFirstFrame: true,
  onProgress: (progress) => {},
  onEnd: () => {},
  onLooped: (loop) => {},
};

const { dom, play, pause } = useReactSequenceFramePlayer({
  ...baseProps,
});

return <>{dom}</>
`}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default Demo;
