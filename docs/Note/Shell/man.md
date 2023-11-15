---
tags:
 - Shell
 - Linux
hide:
 - math
---

# man

## 什么是Shell

!!! cite "Wikipedia"
    A Unix shell is a command-line interpreter or shell that provides a command line user interface for Unix-like operating systems. The shell is both an interactive command language and a scripting language, and is used by the operating system to control the execution of the system using shell scripts.

简而言之，Shell是Unix-like操作系统（包括各种Linux、MacOS等）的交互界面，是一个最基本的应用程序，是一种命令行语言，同时也可以作为脚本语言。

### 各种版本的Shell

使用`cat /etc/shells`来查看所有可用的Shell。

<div class="console">

```console
$ cat /etc/shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

</div>

使用`echo $SHELL`查看当前使用的Shell。

<div class="console">

```console
$ echo $SHELL
/bin/zsh
```

</div>

下图展示了Shell在操作系统中的地位。

<figure markdown>
![Shell](./assets/shell.png){width=200}
</figure>

## 必备技能：RTFM

如果你想要学习Shell（学习Unix-like系统的使用），那么首先要学会的就是RTFM（read the fucking manual）。

使用`man`命令来查看**manual page**：

<div class="console">

```console
$ man
What manual page do you want?
```

</div>

例如，查看`man`自己的手册：

<div class="console">

```console
$ man man
MAN(1)                      General Commands Manual                     MAN(1)

NAME
     man, apropos, whatis – display online manual documentation pages

SYNOPSIS
     man [-adho] [-t | -w] [-M manpath] [-P pager] [-S mansect]
         [-m arch[:machine]] [-p [eprtv]] [mansect] page ...

     man -f [-d] [-M manpath] [-P pager] [-S mansect] keyword ...
     whatis [-d] [-s mansect] keyword ...

     man -k [-d] [-M manpath] [-P pager] [-S mansect] keyword ...
     apropos [-d] [-s mansect] keyword ...
...
```

</div>

通常，终端会进入这样一个**互动的浏览页面**：

![](assets/2023-11-15-11-24-18.png)

你可以按下方向键++arrow-up++和++arrow-down++（或者++j++和++k++）来上下滑动页面，按下++q++来退出这个页面。

这个页面的更多功能详见[less](/Note/Shell/less)。