---
tags:
- Mac
- Shell
---

# AppleScript

## OSA
其中[Open Scripting Architecture](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html)(OSA) 为 OS X 提供了一种标准且可扩展的机制，用于应用程序之间的通信。这种通信通过 **Apple Events** 的交换来实现，所谓的Apple事件就是一种封装了命令和数据的进程间消息。

- `osascript`是Mac OS X内置的一个脚本运行工具
- `osacompile`是Mac OS X内置的一个脚本编译工具
- `osalang`则可以查看电脑上已经安装的脚本语言

<div class='console'>

```console
$ osalang
AppleScript
JavaScript
Generic Scripting System

```

</div>

其中[AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html#//apple_ref/doc/uid/TP40000983-CH208-SW1)是由苹果公司创建的一种脚本语言。它允许用户直接控制可编写脚本的 Macintosh 应用程序以及 macOS 本身的部分功能。用户可以编写脚本一组书面指令来自动化重复的任务，结合多个可编写脚本的应用程序的功能，创建复杂的工作流程。

当然你也可以使用[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)作为脚本语言。不过我们这里主要使用AppleScript，因为它会提供很多独特、便捷的关键字函数。

## 例子
一个最简单的AppleScript例子是：

<div class='console'>

```console
$ osascript -e 'get current date'
date 2024年9月11日 星期三 15:29:30

```

</div>

再比如你可以通过AppleScript来查询软件的包名（Bundle ID）
<div class='console'>

```console
$ osascript -e 'id of app "wechat"'
com.tencent.xinWeChat


```

</div>