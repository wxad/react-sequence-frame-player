import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Header from '@/components/Header';
const ArtDots = dynamic(() => import('@/components/ArtDots'), { ssr: false });
const Demo = dynamic(() => import('./Demo'), { ssr: false });

function App() {
  return (
    <div>
      <ArtDots />
      <div className={clsx('flex flex-col min-h-screen', 'border-x border-solid border-neutral-200')}>
        <Header />
        <div className="relative z-1 mx-auto px-12 max-w-[1088px] w-3/4 min-w-[640px]">
          <div className="mt-8 mb-4 text-xl font-bold">安装使用</div>
          <div className="mb-2 px-4 py-3 bg-neutral-50 rounded border border-solid border-neutral-200">
            <SyntaxHighlighter
              style={atomOneLight}
              wrapLines
              customStyle={{ backgroundColor: 'transparent' }}
              className="highlight"
              language="bash"
            >
              pnpm install react-sequence-frame-player
            </SyntaxHighlighter>
            <br />
            <SyntaxHighlighter
              style={atomOneLight}
              wrapLines
              customStyle={{ backgroundColor: 'transparent' }}
              className="highlight"
              language="tsx"
            >
              {`import {
  useReactSequenceFramePlayer,
  IReactSequenceFramePlayerHookProps,
} from 'react-sequence-frame-player';`}
            </SyntaxHighlighter>
          </div>
          <div className="mt-8 mb-4 text-xl font-bold">演示</div>
          <Demo />
        </div>
        <div className="relative z-1 mt-16 py-16 font-medium text-sm text-neutral-300 bg-white border-t border-solid border-neutral-200">
          <div className="text-center mx-auto px-48 max-w-1800">
            <div className="flex justify-center">
              <div className="relative mr-[1px] w-[30px] h-[30px] bg-neutral-300 rounded-b-full">
                <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-neutral-50 rounded-tl-full rounded-br-full" />
              </div>
              <div className="mr-[1px] relative w-[30px] h-[30px]">
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-neutral-300 rounded-tr-full rounded-bl-full" />
                <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-neutral-300 rounded-tl-full rounded-br-full" />
                <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-neutral-300 rounded-tr-full rounded-bl-full" />
                <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-neutral-300 rounded-tl-full rounded-br-full" />
              </div>
              <div className="w-[30px] h-[30px]">
                <div className="mb-[3px] h-2 bg-neutral-300" />
                <div className="mb-[3px] h-2 bg-neutral-300" />
                <div className="h-2 bg-neutral-300" />
              </div>
            </div>
            <div className="mt-2">aragakey@qq.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
