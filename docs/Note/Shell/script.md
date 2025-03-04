---
tags:
 - Shell
 - Linux
---

# Shell脚本
> 请参考[Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)

如果我们想实现比较复杂的操作，写脚本就不可避免了。

例如我们之前在管道里实现的99乘法表：

<div class='console'>

```console
$ seq 1 9 | awk '{for(j=1;j<=$1;j++) printf "%d×%d=%-2d ", j, $1, j*$1; print ""}'
1×1=1
1×2=2  2×2=4
1×3=3  2×3=6  3×3=9
1×4=4  2×4=8  3×4=12 4×4=16
1×5=5  2×5=10 3×5=15 4×5=20 5×5=25
1×6=6  2×6=12 3×6=18 4×6=24 5×6=30 6×6=36
1×7=7  2×7=14 3×7=21 4×7=28 5×7=35 6×7=42 7×7=49
1×8=8  2×8=16 3×8=24 4×8=32 5×8=40 6×8=48 7×8=56 8×8=64
1×9=9  2×9=18 3×9=27 4×9=36 5×9=45 6×9=54 7×9=63 8×9=72 9×9=81

```

</div>

这里面其实已经用了for循环，只不过由awl帮我们来执行了。

## builtin

或许你已经注意到了，我们之前介绍过的很多命令并不是在所有的平台都有。你可以通过`type`命令查询具体性质：

```
$ type ls pwd for awk
ls is an alias for ls -G
pwd is a shell builtin
for is a reserved word
awk is /usr/bin/awk
```

当然使用`which`也可以：

```
$ which ls pwd for awk
ls: aliased to ls -G
pwd: shell built-in command
for: shell reserved word
/usr/bin/awk
```

基本上Shell的脚本兼容是个**灾难问题**。

zsh各种花里胡哨的语法、命令和特性在fish上肯定没法完全兼容。所以我们需要尽量使用原生的Shell命令（`bash`：Bourne Again Shell）。

!!! chatgpt-summary "兼容性最强的Shell？"
    通常来说，Bash（Bourne Again Shell）被认为是最广泛支持且兼容性最强的选择。它是 Linux 和许多 Unix-like 系统中默认的 shell，支持大量的功能和语法特性，并且兼容原始的 Bourne Shell（/bin/sh）及其他一些经典的 shell。

一个再简陋的Linux平台都会提供命令，称为buint-in。

## 内置命令
`bash`完全兼容了`sh`。

### Bourne Shell Builtins

### Bash Builtin Commands

## 循环、条件和匹配

## 命令组合

TBD: Shell脚本