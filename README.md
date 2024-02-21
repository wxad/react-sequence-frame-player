# React 序列帧组件

提供两种使用方式：hook `useReactSequenceFramePlayer()` 和 组件式 `<ReactSequenceFramePlayer />`。

https://www.npmjs.com/package/react-sequence-frame-player

## hook

```jsx
import {
  useReactSequenceFramePlayer,
  IReactSequenceFramePlayerHookProps,
} from "react-sequence-frame-player"

const baseProps: Partial<IReactSequenceFramePlayerHookProps> = {
  pattern:
    "https://wxa.wxs.qq.com/wxad-design/yijie/bm23-test-2/mengxin/images/_1-61__%d.webp",
  total: 60,
  fps: 30,
  autoPlay: false,
  loop: true,
  showFirstFrame: true,
  onProgress: (progress) => {},
  onEnd: () => {},
  onLooped: (loop) => {},
}
const { dom, play, pause } = useReactSequenceFramePlayer({
  ...baseProps,
})
```

## 组件

```jsx
import {
  ReactSequenceFramePlayer,
  IReactSequenceFramePlayerRef,
  IReactSequenceFramePlayerHookProps,
} from "react-sequence-frame-player"

return (
  <ReactSequenceFramePlayer
    ref={playerRef}
    width={300}
    height={300}
    {...baseProps}
  />
)
```
