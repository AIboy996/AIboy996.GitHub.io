---
tags:
 - Shell
 - Linux
hide:
 - math
---

# echo
> write arguments to the standard output


`echo`顾名思义就是`回响，回声`的意思，你输入什么，他就会返回什么。

<div class="console">

```console
$ echo hello
hello
```

</div>

你可以用`echo`查看很多系统变量，例如`$PATH`：

<div class="console">

```console
$ echo -e ${PATH//:/\\n} # 分行查看PATH
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
/usr/games
/usr/local/games
/snap/bin
```

</div>

`*`是一个特殊的输入，`echo *`会输出当前路径下的所有文件和文件夹的名称。

<div class="console">

```console
$ echo *
Applications Library Users Volumes bin boot dev etc home lib media mnt opt private proc root run sbin srv sys tmp usr var
```

</div>