---
tags:
 - Linux
hide:
 - math
---

# All About Linux

好吧，我是标题党，本文最多算是`Little Bit About Linux`。
> 抖机灵地说本文确实有一句话可以称得上这个题目: All about Linux is all about files.

## Linux是什么？
Linux 是一众开源的类 UNIX **操作系统**（Operating System, i.e. OS）。它被广泛用于云服务器、嵌入式系统和个人计算机。可以说互联网世界的基石之一就是Linux。

Linux发行版（Distribution）繁多，不同的系统的使用方法大同小异，我这里的介绍主要以Ubuntu（大概是最流行的Linux发行版）和MacOS（并非Linux，只是类UNIX）为主。

## 用户和登陆
和Windows或者MacOS类似的，作为一个操作系统需要一套用户管理的逻辑。

Linux用户分为普通用户和管理员（用户名是root），管理员拥有系统的一切权限，普通用户很多行为会受到限制。

- 如果你有一台本地的Linux计算机，开机后输入账号密码即可登录。

- 如果要登录到远程Linux服务器，可以使用`ssh`来登录：

```bash
ssh username@hostname -p 22 # 默认端口是22，很多时候为了安全考虑服务器不会使用22端口
```

- 如果你新安装了一个Linux系统，按照系统提示的操作新建一个用户然后登录即可。

## 文件和目录
Linux的世界，一切都是文件。

GPT说：

!!! quote "为什么说Linux一切皆文件"
    "Linux 一切皆文件" 是指在 Linux 操作系统中，几乎所有的设备、资源、进程等都以文件的形式存在。这个思想是 Linux 设计的一个基本原则，被称为 "一切皆文件" 的哲学。

    这个哲学的核心思想包括以下几点：

    1. **统一的接口：** 在 Linux 中，文件是统一的接口，无论是硬件设备、网络连接、进程还是其他资源，都可以通过读写文件的方式进行访问和操作。这种一致性使得系统更加简洁和易于理解。

    2. **使用标准工具：** 由于一切都是文件，可以使用标准的文件操作工具（如 `cat`、`echo`、`cp`、`mv` 等）来处理各种不同类型的数据。这种一致性使得管理和操作系统变得更加简单。

    3. **抽象层次：** 文件系统提供了一个抽象层，隐藏了底层硬件和具体实现的细节。这样，应用程序和用户可以通过相同的方式与不同的资源进行交互，而不必关心底层的硬件或协议。

    举例来说：

    - **设备文件：** 在 `/dev` 目录下，你可以找到表示硬件设备的文件，如硬盘、键盘、鼠标等。这些设备可以通过读写对应的文件进行访问和控制。

    - **进程信息：** 在 `/proc` 目录下，你可以找到表示系统进程的文件。每个进程都有一个相应的目录，目录中包含了该进程的相关信息，如进程号、命令行参数等。通过读取这些文件，可以获取有关系统进程的信息。

    - **网络连接：** 在 `/proc/net` 目录下，你可以找到表示网络连接的文件。这些文件提供了关于网络连接状态、端口信息等的数据。

    总体来说，"Linux 一切都是文件" 的理念是 Linux 操作系统设计的一项重要特征，它使得 Linux 成为一个非常灵活且易于管理的操作系统。


所以，你可以在目录里找到各种各样的文件，控制着整个系统的行为。
> 所以，随意删除未知的文件是非常危险的行为。

MIT的课程《[The Missing Semester of Your CS Education](https://missing.csail.mit.edu/2020/course-shell/)》讲了一个好玩的例子，你可以通过改变系统某个文件的内容来控制笔记本电脑的屏幕亮度：

!!! cite "change brightness of laptop"
    For example, the brightness of your laptop’s screen is exposed through a file called brightness under

    `/sys/class/backlight`

    By writing a value into that file, we can change the screen brightness. Your first instinct might be to do something like:
    ```bash
    $ sudo find -L /sys/class/backlight -maxdepth 2 -name '*brightness*'
    /sys/class/backlight/thinkpad_screen/brightness
    $ cd /sys/class/backlight/thinkpad_screen
    $ echo 3 | sudo tee brightness
    ```

## Shell
Shell是人机交互的桥梁，用户可以使用Shell完成一切的工作。

作为一般用户，我们在Shell下可以使用已有的各种命令行工具。一般`/usr/bin`会列出所有可用的命令。

例如使用文本编辑器`vim`：
```bash
$ vim
~
~                              VIM - Vi IMproved
~
~                               version 9.0.1894
~                           by Bram Moolenaar et al.
~                 Vim is open source and freely distributable
~
~                           Sponsor Vim development!
~                type  :help sponsor<Enter>    for information
~
~                type  :q<Enter>               to exit
~                type  :help<Enter>  or  <F1>  for on-line help
~                type  :help version9<Enter>   for version info
~
~
```
再如使用`cat`在命令行输出某个文件的内容：

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

如果你有管理员账号，那么还可以做下面的事情。

### 包管理
使用系统提供的包管理器来安装、更新、卸载、修复软件包。
例如在Ubuntu上安装Python：
```bash
sudo apt install package_name    # Ubuntu/Debian
```
使用`pip`安装`NumPy`：
```bash
pip install numpy
```

### 用户管理
使用`useradd`命令增加新的用户，使用`userdel`删除用户，使用`usermod`修改用户，使用`passwd`修改登录口令（password，俗称密码）等。


`/etc/passwd`文件存放了所有用户的信息，可以用`cat`输出该文件的内容来查看所有的用户：
```bash
cat /etc/passwd
```

```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
...
```

这个文件的每一行都包含用冒号分隔的七个字段，它们分别是：

- User name.
- Encrypted password (x means that the password is stored in the /etc/shadow file).
- User ID number (UID).
- User’s group ID number (GID).
- Full name of the user (GECOS).
- User home directory.
- Login shell (defaults to /bin/bash).


### 权限管理
我们可以用`chmod`更改文件的权限，用`chown`更改文件的所有者。

### 进程管理
`kill`目录可以挂起、恢复、结束进程。
```bash
kill -s SIGSTOP <pid> # 挂起进程
kill -s SIGCONT <pid> # 恢复进程
kill <pid> # 结束进程
```

还可以使用`top`目录来实时查看当前在运行中的进程：

```bash
top - 19:59:37 up 6 min,  0 users,  load average: 0.03, 0.01, 0.00
Tasks:  14 total,   1 running,  13 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   5250.9 total,   4735.2 free,    244.6 used,    271.0 buff/cache
MiB Swap:   7298.8 total,   7298.8 free,      0.0 used.   4731.4 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
      1 root      20   0  165768   9344   7296 S   0.0   0.2   0:00.07 systemd
      7 root      20   0 1233644   7168   5888 S   0.0   0.1   0:00.00 orbstac+
    114 root      19  -1   48000  15360  14592 S   0.0   0.3   0:00.03 systemd+
    146 systemd+  20   0   16272   7552   6656 S   0.0   0.1   0:00.03 systemd+
    157 root      20   0    9120   2432   2304 S   0.0   0.0   0:00.00 cron
    158 message+  20   0    8684   3712   3456 S   0.0   0.1   0:00.00 dbus-da+
    161 root      20   0   34164  17536   9344 S   0.0   0.3   0:00.03 network+
    162 syslog    20   0  222028   4224   3584 S   0.0   0.1   0:00.00 rsyslogd
    163 root      20   0   15700   6912   6016 S   0.0   0.1   0:00.02 systemd+
    169 root      20   0    7816   1920   1920 S   0.0   0.0   0:00.00 agetty
    178 yang      20   0   16944   8320   7168 S   0.0   0.2   0:00.00 systemd
    187 yang      20   0  104232   4332   1664 S   0.0   0.1   0:00.00 (sd-pam)
    252 yang      20   0   10136   3584   3072 S   0.0   0.1   0:00.00 bash
    259 yang      20   0   12840   3200   2688 R   0.0   0.1   0:00.00 top
```

使用`ps`命令可以输出当前在运行的进程信息：

<div class="console">

```console
$ ps
    PID TTY          TIME CMD
    252 pts/1    00:00:00 bash
    273 pts/1    00:00:00 ps
```

</div>

值得一提的是PID是每个进程的唯一标识符。

并且按照我们之前的说法，Linux世界一切皆文件，而每个进程就对应于`/proc/<pid>`文件夹，你可以在里面找到这个进程的很多信息。

例如`/proc/<pid>/status`文件：

```bash
Name:	bash
Umask:	0022
State:	S (sleeping)
Tgid:	252
Ngid:	0
Pid:	252
PPid:	7
TracerPid:	0
Uid:	501	501	501	501
Gid:	501	501	501	501
FDSize:	256
Groups:	4 27 44 50 501
NStgid:	252
NSpid:	252
NSpgid:	252
NSsid:	252
Kthread:	0
VmPeak:	   10280 kB
VmSize:	   10248 kB
VmLck:	       0 kB
VmPin:	       0 kB
VmHWM:	    3584 kB
VmRSS:	    3584 kB
RssAnon:	     512 kB
RssFile:	    3072 kB
RssShmem:	       0 kB
VmData:	     672 kB
VmStk:	     132 kB
VmExe:	    1332 kB
VmLib:	    1924 kB
VmPTE:	      48 kB
VmSwap:	       0 kB
CoreDumping:	0
THP_enabled:	1
untag_mask:	0xffffffffffffff
Threads:	1
SigQ:	0/20980
SigPnd:	0000000000000000
ShdPnd:	0000000000000000
SigBlk:	0000000000010000
SigIgn:	0000000200384004
SigCgt:	000000004b813efb
CapInh:	0000000000000000
CapPrm:	0000000000000000
CapEff:	0000000000000000
CapBnd:	000001ffffffffff
CapAmb:	0000000000000000
NoNewPrivs:	0
Seccomp:	2
Seccomp_filters:	1
Speculation_Store_Bypass:	thread vulnerable
SpeculationIndirectBranch:	unknown
Cpus_allowed:	ff
Cpus_allowed_list:	0-7
Mems_allowed:	1
Mems_allowed_list:	0
voluntary_ctxt_switches:	333
nonvoluntary_ctxt_switches:	155
```