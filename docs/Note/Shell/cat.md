---
tags:
 - Shell
 - Linux
hide:
 - math
---

# cat
> concatenate and print files

此`cat`并非🐱，而是concatenate的奇妙缩写。`cat`的功能很简单，就是拼接以及输出文件。

例如我们之前就提到过的`/etc/shells`文件，它记录了当前系统可用的Shell：

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

再例如主机hosts：

<div class="console">

```console
$ cat /etc/hosts
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
```

</div>