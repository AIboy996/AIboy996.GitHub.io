---
tags:
  - 概率论
---
## Treize

本节的标题是法语里的数字13, 是当年法国数学家Montmort考虑的一个概率游戏（很可能就是扑克牌？），也就是后世所称的Montmort问题或者叫匹配问题、礼物交换问题、换帽子问题...

最早的出处是下面这篇文章

!!! cite 
    P. R. de Montmort, Essay d’Analyse sur les Jeux de Hazard, Quillau, Paris, published anonymously, 1708.

问题大致内容是：

!!! cite "Montmort" 
    Suppose you have a deck of N cards, numbered 1, 2, 3, . . . , N. After shuffling, you draw one card at a time, without replacement, counting out loud as each card is drawn: “1, 2, 3, . . . ”. What is the probability that there will be no coincidence, i.e., no drawing of a card bearing the number just called out?

我这里叙述一个更加现实的版本:

!!! info "现有$n$个人的群体，每个人都准备了一份礼物,  把这些礼物混合打乱之后每个人再随机拿走一份礼物. "

### 基础问题

??? question "没有任何一个人拿到自己礼物(我们称这是一个**匹配**)的概率$P_0(n)$是多少?"
    - 这显然是在交换礼物的时候我们不愿意看到的
    - 本题使用加法公式立得.

??? question "恰好有$k$个人拿到自己准备的礼物的概率$P_k(n)$是多少?"
    - 本题使用条件概率公式, 考虑$k$个人匹配, 余下的$n-k$个人无匹配的概率.

??? question "拿到自己礼物的人数$N(n)$的数学期望和方差是多少?"
    - 本题使用前面计算的分布列求解较为复杂
    - 建议利用数学期望的线性性质, 计算每个人匹配次数的期望, 以及不同人匹配次数之间的协方差. 进而可求解$N(n)$的期望和方差.


以上三个问题回答了这个问题的分布列以及数字特征

### 进阶问题

不难发现, 很容易发生这样的事情:
$$
1\rightarrow 2\rightarrow 3\rightarrow1
$$
最终1拿到了3准备的礼物, 2拿到了1准备的礼物, 3拿到了2准备的礼物.

也就是$1,2,3$这三个人互换礼物形成了一个**循环**.

或者更简单的:
$$
1\rightarrow 2 \rightarrow 1
$$
也就是$1,2$这两人呼唤了礼物, 我们称这是一个**成对**, 很显然这也是一个循环.

> 什么单身派对

之所以单独提出循环这个概念, 是因为这样一来不同的循环就可以看作不同群体之间的礼物交换了. 也就是说我们把$n$个人的礼物分配问题, 转化为若干个小群体内(例如$c$和$n-c$)的礼物交换问题. 背后有一种**分而治之**的思想!

那么:

??? question "成对的数量$M(n)$的期望是多少?"
    - 利用期望的线性性质, 求$\begin{pmatrix}n\\2\end{pmatrix}$对人, 每一对成对的概率即可. 这个概率就是对应示性函数的期望.

??? question "在$n$个人交换礼物的过程中, 形成的循环个数$C(n)$的期望是多少?"
    - 本题可以条件于第一个人所处循环的长度, 使用条件期望公式来求.

??? question "$1,2,3,\cdots,k$ 这$k$ 个人在同一个循环内的概率是多少?"
    - 本题依然可以条件于第一个人所处的循环的长度来求.

??? question "换一个方法再次求$P_0(n)$?"
    - 本题依然可以条件于第一个人所处的循环的长度来求.

