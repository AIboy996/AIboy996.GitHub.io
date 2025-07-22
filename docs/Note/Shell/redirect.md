---
tags:
 - Shell
 - Linux
---

# Shell Redirection

## IO流

### 标准IO

Shell 处理三个标准 I/O（输入/输出）流，每个都有一个文件描述符（FD）：

- 标准输入（stdin）：文件描述符 0（默认来自键盘）
- 标准输出（stdout）：文件描述符 1（默认输出到终端）
- 标准错误（stderr）：文件描述符 2（默认输出到终端）

> 在`/dev/fd`目录你可以看到这些文件文件描述符号，同时这些文件描述符号还会自动**链接**到`/dev/stdout`等目录。

### 自定义fd

除了系统提供的012三个fd，我们也可以使用`<>`操作符自己打开一些文件来使用：

```bash
$ exec 4<>a.py # 打开a.py作为fd 4，可读可写
$ echo "print('hello')" >&4
$ python a.py
hello
```

## 输出重定向

默认情况下，程序的的输出会定向到**标准输出**：

<div class='console'>

```console
$ echo hello
hello
```

</div>

??? question "标准输出在哪"
    结合我们之前介绍的文件描述符，实际上标准输出就是一个虚拟的文件：`/dev/fd/1`。当然通常我们使用它的链接`/dev/stdout`来指代。在终端环境中，标准输出会显示在用户面前。

    因此，我们就不难理解下面两件事情是等价的：

    ```bash
    $ echo hello
    hello
    $ echo hello > /dev/stdout # 显式输出到stdout
    hello
    ```

我们可以通过`>`操作符来把输出流输出到其他地方，这个操作就称为输出重定向（Redirection）。

### 覆盖重定向

`>`操作符是覆盖重定向，它会尝试创建或者覆盖已有的文件。例如，写一行代码到`hello.py`，然后运行它：

<div class='console'>

```console
$ echo "print('Hello World')" > hello.py
$ python hello.py
Hello World

```

</div>

默认情况下，我们使用`>`重定向的是标准输出（stdout），如果要重定向标准错误需要使用文件描述符：

<div class='console'>

```console
$ python -c "print(1" 2>error.log
$ cat error.log
  File "<string>", line 1
    print(1
         ^
SyntaxError: '(' was never closed

```

</div>

当然也可以同时重定向：

```bash
# 1、2（stdout, stderr）都重定向到out
python -c "print(1);print('2)" > out 2>&1
# 也可以简写为
python -c "print(1);print('2)" &> out
```

??? question ">|"
    有的时候你还能看见`>|`这种重定向符号，它的含义是强制覆盖写。

    如果终端开启了选项`set -o noclobber`，这时候如果文件已经存在就无法`>`重定向，如果需要**强制覆盖写**就可以使用`>|`。

    ```bash
    $ set -o noclobber
    $ echo 1 > a
    $ echo 1 > a
    bash: a: cannot overwrite existing file
    $ echo 1 >| a
    ```

### 追加重定向

`>`操作符会把流输出到指定的文件，这个输出是覆盖的。如果我们想在原来的文件末尾添加新的内容，可以使用`>>`操作符。

<div class='console'>

```console
$ echo "print('You')" >> hello.py
$ python hello.py
Hello World
You

```

</div>

## 输入重定向

我们也可以使用`<`操作符把文件作为stdin：

<div class='console'>

```console
$ wc -l < out.txt # 统计行数
23

```

</div>

还可以使用`<<`输入多行文本：

```bash
$ python <<EOF
print(1)
print(2)
print("END")
EOF
1
2
END
```

</div>

## 管道
实际上管道也是一种重定向，它把上一个命令的 stdout 作为下一个命令的 stdin。


例如：

<div class='console'>

```console
$ echo "print('Hello'*10)" | python
HelloHelloHelloHelloHelloHelloHelloHelloHelloHello

```

</div>

根据unix哲学，Linux世界的绝大部分东西都是纯文本。因此，在管道的加持下我们可以迅速实现一些炫酷的操作。

!!! quote "Unix philosophy"
    It was later summarized by Peter H. Salus in A Quarter-Century of Unix (1994):[1]

    - Write programs that do one thing and do it well.
    - Write programs to work together.
    - Write programs to handle **text streams**, because that is a universal interface.

管道中经常用到下列文本处理命令（类似消费者）：

- `sort`：排序
- `uniq`：去重
- `grep`：过滤
- `wc`：字数统计
- `head`：文本的头部
- `tail`：文本的尾部
- `fold`：限制文本宽度
- `xargs`：construct argument list(s) and execute utility
- `awk`：pattern-directed scanning and processing language

以及下列文本产生命令（类似生产者）：

- `ps`：进程列表
- `ls`：当前目录文件列表
- `find`：查找文件
- `seq`：产生序列
- `pwd`：当前目录
- `echo`

下面给出一些实际案例
### 文件大小排序

对当前目录的所有文件和文件夹进行大小降序排列：

<div class='console'>

```console
$ du -sh * | sort -hr
1.2G	docs
1.1G	site
 52K	overrides
 24K	index.html
 24K	_ai_summary_cache_chatgpt.json
 20K	LICENSE
 12K	nav.yml
8.0K	mkdocs.yml
4.0K	requirements.txt
4.0K	plugins_simplify.yml
4.0K	plugins_full.yml
4.0K	build
4.0K	README.md

```

</div>

### .md 字数统计

递归寻找当前目录下的`.md`文件，并且统计文件中的字数。按照字数降序排列：

<div class='console'>

```console
$ find . -iname '*.md' -print0 | xargs -0 wc -c | sort -n -r | head -10
 1070731 total
   48432 ./docs/SomeMath/real/problems/recall_high_school_math.md
   32767 ./docs/Python/BasicSyntax/builtin_class.md
   32441 ./docs/Python/BasicSyntax/builtin_keyword.md
   29551 ./docs/Python/SeniorSyntax/OOP.md
   25553 ./docs/Blog/2023/travel_to_japan.md
   22002 ./docs/Python/SeniorSyntax/functional_programming.md
   19711 ./docs/Note/jupyter/jupyter4.md
   19418 ./docs/Note/mkdocs/practice.md
   19020 ./docs/SomeMath/real/gamma_func.md

```

</div>

### ASCII码表

输出ASCII码表

<div class='console'>

```console
$ printf "$(printf '\\%03o ' $(seq 32 126))\n" | fold -w 20
  ! " # $ % & ' ( )
* + , - . / 0 1 2 3
4 5 6 7 8 9 : ; < =
> ? @ A B C D E F G
H I J K L M N O P Q
R S T U V W X Y Z [
\ ] ^ _ ` a b c d e
f g h i j k l m n o
p q r s t u v w x y
z { | } ~

```

</div>

### 99乘法表

输出99乘法表

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

## 丢弃输出

如果不需要特定的流，可以把它重定向到`/dev/null`进行丢弃。

<div class='console'>

```console
$ python -m this > /dev/null


```

</div>