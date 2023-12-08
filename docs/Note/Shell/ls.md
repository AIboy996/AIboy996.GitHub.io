---
tags:
 - Shell
 - Linux
hide:
 - math
---

# ls
> list directory contents


`ls`大概是程序员最爱（使用频率意义下的）的命令之一（和`cd`不相上下），他的功能就是列出当前目录的所有文件和文件夹（**list directory contents**）。

`ls`有一些常用的参数，可以复合使用：

- `-a`或者`--all`，显示所有的文件（包括隐藏文件）
- `-l`，显示较为丰富的信息（包括读取权限，修改时间等）
- `-h`，使用Byte, Kilobyte,Megabyte, Gigabyte, Terabyte and Petabyte作为单位。


<div class="console">

```console
$ ls -alh /
total 12K
drwxr-xr-x   1 root root  198 Dec  4 21:23 .
drwxr-xr-x   1 root root  198 Dec  4 21:23 ..
drwxrwxr-x  62 yang yang 2.0K Dec  4 21:23 Applications
drwxr-xr-x  71 yang yang 2.3K Dec  4 21:15 Library
drwxr-xr-x   5 yang yang  160 Dec  4 21:14 Users
drwxr-xr-x   3 yang yang   96 Dec  4 21:16 Volumes
lrwxrwxrwx   1 root root    7 Sep 13 15:44 bin -> usr/bin
drwxr-xr-x   1 root root    0 Apr 18  2022 boot
drwxr-xr-x   7 root root  740 Dec  4 21:23 dev
drwxr-xr-x   1 root root 2.3K Sep 14 20:23 etc
drwxr-xr-x   1 root root    8 Sep 14 10:09 home
lrwxrwxrwx   1 root root    7 Sep 13 15:44 lib -> usr/lib
drwxr-xr-x   1 root root    0 Sep 13 15:44 media
drwxr-xr-x   1 root root   32 Sep 14 10:09 mnt
drwxr-xr-x   1 root root   28 Sep 14 10:09 opt
drwxr-xr-x   6 yang yang  192 Dec  4 21:15 private
dr-xr-xr-x 238 root root    0 Dec  4 21:23 proc
drwx------   1 root root   56 Dec  4 21:24 root
drwxr-xr-x  12 root root  360 Dec  4 21:23 run
lrwxrwxrwx   1 root root    8 Sep 13 15:44 sbin -> usr/sbin
drwxr-xr-x   1 root root    0 Sep 13 15:44 srv
dr-xr-xr-x  11 root root    0 Dec  4 21:23 sys
drwxrwxrwt   8 root root  160 Dec  4 21:24 tmp
drwxr-xr-x   1 root root   84 Sep 13 15:44 usr
drwxr-xr-x   1 root root   90 Sep 13 15:46 var
```

</div>