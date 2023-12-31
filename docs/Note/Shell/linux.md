---
tags:
 - Linux
hide:
 - math
---

# All About Linux

好吧，我是标题党，本文最多算是`Little Bit About Linux`。

## Linux简介
Linux 是一个开源的类 UNIX 操作系统内核。它被广泛用于服务器环境、嵌入式系统和个人计算机。

Linux发行版繁多，不同的系统的使用方法大同小异，我这里主要以Ubuntu（大概是最流行的Linux发行版）和MacOS（并非Linux，只是类UNIX）为主。

## 用户和登陆
用户分为普通用户和管理员（用户名是root），管理员拥有系统的一切权限，普通用户很多行为会受到限制。

如果你有一台本地的Linux计算机，开机后输入账号密码即可登录。

如果要登录到远程Linux服务器，可以使用`ssh`来登录：
```bash
ssh username@hostname -p 22 # 默认端口是22，很多时候为了安全考虑服务器不会使用22端口
```

如果你新安装了一个Linux系统，按照系统提示的操作新建一个用户即可。

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
增加新的用户：
```bash
useradd [options] LOGIN
```
删除用户：
```bash
userdel
```
修改用户：
```bash
usermod
```
修改登录口令（password，俗称密码）：
```bash
passwd
```
查看所有的用户：
```bash
cat /etc/passwd
```
```
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
...
```
Each line in the file has seven fields delimited by colons that contain the following information:

- User name.
- Encrypted password (x means that the password is stored in the /etc/shadow file).
- User ID number (UID).
- User’s group ID number (GID).
- Full name of the user (GECOS).
- User home directory.
- Login shell (defaults to /bin/bash).


### 权限管理
更改文件的所有者、权限等。
```bash
chmod

chown
```

### 进程管理
查看、挂起、结束进程。
```bash
top
ps
kill -s SIGSTOP <pid>
kill -s SIGCONT <pid>
kill <pid>
```