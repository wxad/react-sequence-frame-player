# React 序列帧组件

提供两种使用方式：hook `useReactSequenceFramePlayer()` 和 组件式 `<ReactSequenceFramePlayer />`。

https://www.npmjs.com/package/react-sequence-frame-player
https://github.com/wxad/react-sequence-frame-player

## hook

```jsx
import {
  useReactSequenceFramePlayer,
  IReactSequenceFramePlayerHookProps,
} from 'react-sequence-frame-player';

const baseProps: Partial<IReactSequenceFramePlayerHookProps> = {
  // 图片地址数组，如果 urls?.length > 0，pattern 参数无效
  // urls: [],
  // 图片地址 pattern，其中必须包含 %d 或 %02d 或 %04d，以指定序号的规则是几位数，组件会依靠此规则请求图片
  pattern:
    'https://wxa.wxs.qq.com/wxad-design/yijie/bm23-test-2/mengxin/images/_1-61__%d.webp',
  // 序列帧总数，如果 urls?.length > 0，此参数无效
  total: 60,
  // 序列帧 fps
  fps: 30,
  // 序列帧开始序号，默认为 0
  // startIndex: 0,
  // 是否自动播放
  autoPlay: false,
  // 是否循环播放
  loop: true,
  // 是否显示第一帧
  showFirstFrame: true,
  // 准备好后的回调，代表所有图片已加载完成
  onReady: () => {},
  // 开始播放时的回调
  onStart: () => {},
  // 播放进度回调，参数为 0 ~ 1 的小数
  onProgress: progress => {},
  // 播放完成时的回调，注意当 loop 为 true 时，此回调不会触发
  onEnd: () => {},
  // 播放循环回调，参数为当前循环次数
  onLooped: loop => {},
};
const { dom, play, pause } = useReactSequenceFramePlayer({
  ...baseProps,
});
```

## 组件

```jsx
import {
  ReactSequenceFramePlayer,
  IReactSequenceFramePlayerRef,
  IReactSequenceFramePlayerHookProps,
} from 'react-sequence-frame-player';

return (
  <ReactSequenceFramePlayer
    ref={playerRef}
    width={300}
    height={300}
    {...baseProps}
  />
);
```
