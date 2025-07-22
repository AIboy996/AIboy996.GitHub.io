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

## 脚本🦶

??? deepseek-summary "脚本为什么叫脚本？"
    > script再怎么看也和脚丫子不沾边。

    “脚本”之所以叫“脚本”，其实和“脚”**没有直接关系**，而是中文在翻译时的用词选择。它的核心含义来源于“**表演的底本**”（如戏剧、影视的剧本），后来被借用到计算机领域。具体可以分两点解释：

    1. **词源来自“表演剧本”**
        - **“脚本”原指戏剧、影视的台词文本**（比如“电影脚本”），强调它是**表演的依据**，记录动作、对话和流程。
        - 计算机领域的“脚本”借用了这一概念，因为：
            - 脚本代码像剧本一样**逐行指导计算机执行任务**。
            - 脚本通常是**轻量、灵活的**（类似短剧剧本），而大型程序更像“长篇小说”。
    2. **为什么用“脚”字？**
        - 中文的“脚本”是日语“**脚本（きゃくほん）**”的直接借用（日语原意也是戏剧剧本）。
        - “脚”在日语中有“基础”“底本”的含义（如“脚注”），而“本”指文本，合起来就是“**表演的基础文本**”。
        - **汉语误以为和“脚”有关**，其实只是翻译时的用字巧合，和“脚”本身无关。

    想象导演拍电影时依赖剧本（脚本）——程序员写脚本时，计算机就像“演员”，严格按照脚本的“台词”（代码）一步步执行。（如果非要关联“脚”，可以强行联想为“脚本是计算机行动的‘脚印’”，但这属于趣味解读，并非真实来源 😉）

### Shebang

一个bash脚本的第一行往往是Shebang：

```bash
#!/bin/bash
echo "Hello, World!"
```

它指明了脚本的解释器，这是unix系统的约定。不仅仅是Shell脚本，Python、Perl等其他语言的脚本也是如此。

除了可以严格指定解释器的路径，还可以通过环境变量来查找：

```bash
#!/usr/bin/env bash
echo "Hello, World!"
```

这里面`/usr/bin/env bash`就会在环境中寻找bash，根据环境变量的不同来决定使用的程序。

### 变量

bash脚本中使用`=`定义变量，注意`=`的前后不能有空格：

```bash
a=2
```

后续可以用`$`符号来访问变量：

```bash
a=2
echo $a
```

使用`readonly`定义只读的变量：
```bash
readonly PI=3.14159
```

除了自定义变量，还可以使用环境变量，它们无需定义由环境提供，例如：

```bash
echo $SHELL
```

所有可用的环境变量可以使用`env`来查看：

```bash
$ env
TERM_PROGRAM=iTerm.app
SHELL=/usr/local/bin/fish
TERM=xterm-256color
TMPDIR=/var/folders/yz/c544wnmx1nz207z6c212d5p00000gn/T/
CONDA_SHLVL=1
GOBIN=/Users/admin/go/bin/
TERM_PROGRAM_VERSION=3.5.14
CONDA_PROMPT_MODIFIER=(base)
GOHOME=/Users/admin/go/
...
```

### 数据类型

bash只支持以下几种数据结构：

- 字符串
    - 根据unix哲学，unix世界几乎所有的东西都是字符串
- 整数
    - 通常直接定义的变量不被认为是整数，例如`a=2`会被认为是字符串
    - 需要特别申明：`let a=2`或者`declare -i num=10`
- 数组
    - 数组是多个变量的集合例如：`fruits=(apple orange banana)`
    - 可以用`[]`来取数组中的元素，例如`echo ${fruits[0]}`就会输出apple

### 引号与扩展

bash中允许使用单引号、双引号和反引号。

双引号允许变量扩展（Expansions，或者叫变量替代），例如：

```bash
$ echo "hello $SHELL"
hello /usr/local/bin/fish
```

但是单引号不允许，只会输出字面量：
```bash
$ echo 'hello $SHELL'
hello $SHELL
```

反引号用来捕获命令的输出，例如：
```bash
$ echo "time now:`date`"
time now:2025年 7月22日 星期二 15时48分55秒 CST
```

使用`$()`可以实现和反引号相同的效果：
```bash
$ echo "time now:$(date)"
time now:2025年 7月22日 星期二 15时49分43秒 CST
```

当然，捕获的输出不一定要嵌在字符串里，可以赋值给变量：

```bash
a=$(ls | wc -l) # 可以使用管道等操作
```

### 命令的组合

bash支持多个命令的组合。包括以下几种方式：

- 顺序执行：`command1 ; command2 ; command3`
- 与连接：`command1 && command2 && command3`
    - 只有前一个执行成功才会执行下一个
- 或连接：`command1 || command2 || command3`
    - 只有前一个执行失败才会执行下一个
- 管道：`command1 | command2 | command3`
    - 前一个命令的输出作为下一个命令的输入
- 大括号分组：`{ command1; command2; } > output.txt`
    - 在当前shell执行，注意`{`后面和`}`前面的空格是必要的
- 小括号分组：`(command1; command2) > output.txt`
    - 新开一个子shell执行
- 后台执行：`command1 & command2`
    - command1将被放在后台

### 条件语句

bash支持if条件语句：

```bash
if [ 条件 ]; then
  # 命令
elif [ 条件 ]; then
  # 命令
else
  # 命令
fi
```

其中[条件](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)的写法有以下几种：

- 路径判断：`-f file`，`-d file`，`file1 -ef file2`等
- 选项判断：`-o -v -R -z -n`等
- 字符判断：`str1 == str2`，`str1 != str2`等
- 整数判断：`n -eq 2`，`n -gt 2`等

条件可以用`[ ]`来承载，也可以用更安全的、好用`[[ ]]`：

|特性|[[ ]]|[ ] (test)|
|--|--|--|
|逻辑运算符|`&&`, `||`|-a -o|
|模式匹配|`==`, `!=`（支持通配符，`*`, `?`, `[a-z]`等）|不支持|
|正则匹配|`=~`|不支持|
|变量安全|未定义变量不会报错|未加引号可能报错|
|数值比较|-eq, -lt 等|同 [[ ]]|
|文件测试|-f, -d 等|同 [[ ]]|

除了if条件句，bash还支持case语句：

```bash
read -p "输入一个月份 (1-12): " month

case $month in
    12|1|2)
        echo "冬季"
        ;;
    3|4|5)
        echo "春季"
        ;;
    6|7|8)
        echo "夏季"
        ;;
    9|10|11)
        echo "秋季"
        ;;
    *)
        echo "无效月份"
        ;;
esac
```

上面的语句用read读取了用户的输入，bash也支持select语句读取用户输入：

```bash
colors=("红色" "蓝色" "退出")

select color in "${colors[@]}"
do
    case $color in
        "红色")
            echo "你选择了红色"
            ;;
        "蓝色")
            echo "你选择了蓝色"
            ;;
        "退出")
            echo "退出菜单"
            break
            ;;
        *)
            echo "无效选择"
            ;;
    esac
done
```

脚本运行后，会进入一个交互模式，直到触发break语句退出do循环：
```text
1) 红色
2) 蓝色
3) 退出
#? 2
你选择了蓝色
#? q
无效选择
#? 3
退出菜单
```

### 循环语句

bash支持while循环：
```bash
count=0
while [ $count -lt 5 ]; do
  echo "Count: $count"
  ((count++))
done
```

也支持for循环：
```bash
for i in {1..5}; do
  echo "Number: $i"
done
```

> `{1..5}`也是Expansions的一种，详见专门的[笔记](./expansion.md)

还支持until循环（其实就是do循环）：
```bash
count=1
until [ $count -gt 5 ]#(1)!
do
    echo "Count: $count"
    ((count++))
done

```

1. 这里可以不加分号，只需要换一行写do即可

### 函数

bash支持函数定义：

```bash
greet() {
  echo "Hello, $1!"
}
greet "Alice"  # 输出 "Hello, Alice!"
```

函数中`$1`、`$2`等表示传入函数的参数，`$@`或者`$*`表示所有参数。

默认情况下，函数中定义的变量是全局的，使用`local`关键字声明局部变量：
```bash
test_scope() {
    local var1="local"
    var2="global"
}

test_scope
echo $var1  # 输出为空，因为var1是局部的
echo $var2  # 输出: global
```

bash的函数无法定义返回值，如需捕获返回值可以使用expansion：

```bash
add() {
    echo $(($1 + $2))
}

result=$(add 3 4) # 捕获返回值
echo "3 + 4 = $result"  # 输出: 3 + 4 = 7
```

### 脚本参数
脚本的全局变量空间中有如下变量可以使用：

- `$0`：脚本名。
- `$1`、`$2`等：第1、2个参数。
- `$#`：参数个数。
- `$@`或者`$*`：所有参数列表。
- `$?`：获取上一条命令的退出状态

如果脚本传入了`-`短选项或者`--`长选项，可以用while循环手动处理：

```bash title="opt.sh"
while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      echo "SOS"
      shift # 处理下一个参数
      ;;
    *)
      echo "未知参数: $1"
      shift
      ;;
  esac
done
```

这时候我们调用该脚本就可以传入对应的选项：

<div class='console'>

```console
$ bash opt.sh -h -a
SOS
未知参数: -a

```

</div>

当然除了手动处理，也可以使用getopts处理：
```bash title="getopts.sh"
while getopts ":ha:b:" opt; do
  case $opt in
    h)
      echo "SOS"
      ;;
    a)
      echo "a is $OPTARG"
      ;;
    b)
      echo "b is $OPTARG"
      ;;
    \?)
      echo "无效选项: -$OPTARG"
      ;;
  esac
done

```

处理起来更优雅：

<div class='console'>

```console
$ bash getopts.sh -h -a 2 -c
SOS
a is 2
无效选项: -c

```

</div>

### 99乘法表

至此我们终于可以输出99乘法表了：

```bash title="99.sh"
print99() {
    for x in {1..9}; do
        for y in {1..9}; do
            if [ $x -ge $y ]; then
                newline=$([ $x -eq $y ] && echo '\n' || echo '  ')
                printf "$y""x$x=$(expr $x \* $y)$newline"
            fi
        done
    done
}
print99
```

<div class='console'>

```console
$ bash 99.sh
1x1=1
1x2=2  2x2=4
1x3=3  2x3=6  3x3=9
1x4=4  2x4=8  3x4=12  4x4=16
1x5=5  2x5=10  3x5=15  4x5=20  5x5=25
1x6=6  2x6=12  3x6=18  4x6=24  5x6=30  6x6=36
1x7=7  2x7=14  3x7=21  4x7=28  5x7=35  6x7=42  7x7=49
1x8=8  2x8=16  3x8=24  4x8=32  5x8=40  6x8=48  7x8=56  8x8=64
1x9=9  2x9=18  3x9=27  4x9=36  5x9=45  6x9=54  7x9=63  8x9=72  9x9=81

```

</div>

## builtin

或许你已经注意到了，之前用过的很多命令并不是在所有的平台都有。你可以通过`type`命令查询具体性质：

```
$ type ls pwd for awk type
ls is an alias for ls -G
pwd is a shell builtin
for is a reserved word
awk is /usr/bin/awk
type is a shell builtin
```

你可以在[bash的手册](https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html)看看那些命令是内置的。

这里列出所有的bash保留字：

```text
if	then	elif	else	fi	time
for	in	until	while	do	done
case	esac	coproc	select	function
{	}	[[	]]	!
```

基本上Shell的脚本兼容是个**灾难问题**。zsh各种花里胡哨的语法、命令和特性在fish上肯定没法完全兼容。所以我们需要尽量使用原生的Shell命令（`bash`：Bourne Again Shell）。

!!! chatgpt-summary "兼容性最强的Shell？"
    通常来说，Bash（Bourne Again Shell）被认为是最广泛支持且兼容性最强的选择。它是 Linux 和许多 Unix-like 系统中默认的 shell，支持大量的功能和语法特性，并且兼容原始的 Bourne Shell（/bin/sh）及其他一些经典的 shell。
