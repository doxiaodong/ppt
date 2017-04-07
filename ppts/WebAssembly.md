title: WebAssembly-Sample
speaker: 杜小东
transition: slide3
files: https://o71zxeens.qnssl.com/cdn/ppt/jl/full-screen.js
theme: moon
usemathjax: yes

[slide]
<button onclick="fullScreen()" class="btn btn-default" style="cursor: pointer;position:fixed;left:10px;top:10px;"></button>
# WebAssembly

[slide]
## 什么是 WebAssembly
----
* 定义一个可移植，体积紧凑，加载迅捷的二进制格式为编译目标，而此二进制格式文件将可以在各种平台（包括移动设备和物联网设备）上被编译，然后发挥通用的硬件性能以原生应用的速度运行。 {:&.rollIn}
* 在 web 环境中使用 javascript 以外的语言。

[slide]
## 为什么需要 WebAssembly
* 目标为二进制，理论上可以从任何语言编译 {:&.rollIn}
* 减小下载文件体积
* 加快解码速度

[slide]
## 历史
* asm.js(Mozilla) https://github.com/dherman/asm.js
* PNaCl(Google) Portable Native Client https://developer.chrome.com/native-client/nacl-and-pnacl
* FLT JIT(Apple) https://trac.webkit.org/wiki/FTLJIT

[slide]
## 和 javscript 对比
----
* 最初的 javascript 解释器 {:&.rollIn}
* JIT(v8)
```javascript
funtion add(a, b) {
  return a + b;
}
var c = add(1 + 2);
```
* Typescript/Dart

* asm.js
```javascript
function add1(x) {
  x = x | 0;
  return (x + 1) | 0;
}
```

[slide]
## 大家一合计（WebAssembly）

* 目前以 c/c++ asm.js 为高优先开发
* 实现以 asm.js 为核心即 大部分 c/c++代码会先转化为 asm.js

[slide]
## 兼容性
* Chrome 57+, Firefox 52+, 其余家不同颜色的浏览器
* node

[slide]
## 发展方向
* 在现有基础上加入 GC, WEB API, DOM 等；
* 实现 Typescript/ES7+ 直接编译成二进制文件(issue 很多提到，但是开发难度很大，也不是现在的重心)。

[slide]
## 使用场景
* 复杂繁重的 web 计算场景，（游戏，多媒体处理）
* 源代码隐藏

[slide]
## 工具
* [Emscripten](http://kripken.github.io/emscripten-site/)
* [Binaryen](https://github.com/WebAssembly/binaryen)
* [Wabt](https://github.com/WebAssembly/wabt)

[slide]
## 内存空间 和 变量映射表
* WebAssembly.Memory
* WebAssembly.Table

[slide]
## wasm 和 wast
* wast 是 wasm 对等的文本描述
* wast 是 S-表达式 https://en.wikipedia.org/wiki/S-expression

[slide]
## wasm 调用 js-api
## 在 c/c++ 里面调用

[slide]
## 运行速度对比

[slide]
## rust

[slide]
## 谢谢
* sample https://github.com/doxiaodong/WebAssembly-sample
