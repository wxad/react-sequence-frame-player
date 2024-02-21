// @ts-ignore
import React from 'react';
import { useEffect, useRef } from 'react';

export interface IReactSequenceFramePlayerHookProps {
  // 图片地址数组，如果 urls?.length > 0，pattern 参数无效
  urls?: string[];
  // 图片地址 pattern，其中必须包含 %d 或 %02d 或 %04d，以指定序号的规则是几位数，组件会依靠此规则请求图片
  pattern?: string;
  // 序列帧 fps
  fps?: number;
  // 序列帧总数，如果 urls?.length > 0，此参数无效
  total?: number;
  // 序列帧开始序号
  startIndex?: number;
  // 是否自动播放
  autoPlay?: boolean;
  // 是否显示第一帧
  showFirstFrame?: boolean;
  // 是否循环播放
  loop?: boolean;
  // 准备好后的回调，代表所有图片已加载完成
  onReady?: () => void;
  // 开始播放时的回调
  onStart?: () => void;
  // 播放完成时的回调，注意当 loop 为 true 时，此回调不会触发
  onEnd?: () => void;
  // 播放进度回调，参数为 0 ~ 1 的小数
  onProgress?: (progress: number) => void;
  // 播放循环回调，参数为当前循环次数
  onLooped?: (loop: number) => void;
}

const absoluteFullStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
} as const;

const useReactSequenceFramePlayer = ({
  urls = [],
  pattern = '',
  fps = 30,
  total = 0,
  startIndex = 0,
  autoPlay = true,
  loop = true,
  showFirstFrame = true,
  onReady = () => {},
  onStart = () => {},
  onEnd = () => {},
  onProgress = () => {},
  onLooped = () => {},
}: IReactSequenceFramePlayerHookProps) => {
  const rootElRef = useRef<HTMLDivElement | null>(null);
  const imagesElsRef = useRef<HTMLImageElement[]>([]);
  const intervalRef = useRef(0);
  const currentFrameIndexRef = useRef(0);
  const loopCountRef = useRef(0);
  const interval = 1000 / (fps || 30);
  const loadedImagesRef = useRef(new Set<string>());
  const startIndexRef = useRef(startIndex);

  const imgs = urls;
  if (!imgs.length && pattern) {
    for (let i = startIndex; i < total + startIndex; i++) {
      let url = '';
      if (pattern.includes('%d')) {
        url = pattern.replace(/%d+/, i.toString());
      } else if (pattern.includes('%02d')) {
        url = pattern.replace(/%02d+/, i.toString().padStart(2, '0'));
      } else if (pattern.includes('%04d')) {
        url = pattern.replace(/%04d+/, i.toString().padStart(4, '0'));
      }
      imgs.push(url);
    }
  }

  const handleReady = () => {
    onReady();
    if (rootElRef.current) {
      imagesElsRef.current = Array.from(
        rootElRef.current.querySelectorAll('img')
      );
    }

    if (autoPlay) {
      play();
    }
  };

  const clearInterval = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  };

  const handleStart = () => {
    clearInterval();
    imagesElsRef.current.forEach((el, i) => {
      el.style.opacity = i === startIndexRef.current ? '1' : '0';
    });
    onStart();
  };

  const handleEnd = () => {
    clearInterval();
    onEnd();
  };

  const play = () => {
    if (intervalRef.current) {
      return;
    }
    handleStart();
    let index = startIndexRef.current;
    intervalRef.current = window.setInterval(() => {
      if (index >= imgs.length) {
        if (loop) {
          index = startIndex;
          loopCountRef.current++;
          onLooped(loopCountRef.current);
        } else {
          handleEnd();
          return;
        }
      }
      currentFrameIndexRef.current = index;
      const prevIndex = index - 1 < 0 ? imgs.length - 1 : index - 1;

      if (imagesElsRef.current[prevIndex]) {
        imagesElsRef.current[prevIndex].style.opacity = '0';
      }
      if (imagesElsRef.current[index]) {
        imagesElsRef.current[index].style.opacity = '1';
      }

      index++;
      onProgress(index / imgs.length);
    }, interval);
  };

  const pause = () => {
    clearInterval();
    startIndexRef.current =
      currentFrameIndexRef.current === imgs.length - 1
        ? 0
        : currentFrameIndexRef.current;
  };

  const dom = (
    <>
      <div style={absoluteFullStyle} ref={rootElRef}>
        {imgs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt=""
            style={{
              opacity: showFirstFrame && index === 0 ? 1 : 0,
              ...absoluteFullStyle,
            }}
            onLoad={() => {
              loadedImagesRef.current.add(url);
              if (loadedImagesRef.current.size === imgs.length) {
                handleReady();
              }
            }}
          />
        ))}
      </div>
    </>
  );

  useEffect(() => {
    return () => {
      clearInterval();
    };
  }, []);

  return {
    dom,
    play,
    pause,
  };
};

export default useReactSequenceFramePlayer;
