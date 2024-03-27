---
tags:
  - 概率论
include:
- math
---
# Montmort问题
在这个问题里，你可以见到神秘常数$e$，调和级数以及一个失败的单身party

## Treize

本节的标题是法语里的数字13, 是当年法国数学家Montmort考虑的一个概率游戏（很可能就是扑克牌？），也就是后世所称的Montmort问题或者叫匹配问题、礼物交换问题、换帽子问题...

最早的出处是下面这篇文章

!!! cite 
    P. R. de Montmort, Essay d’Analyse sur les Jeux de Hazard, Quillau, Paris, published anonymously, 1708.

问题大致内容是：

!!! cite "Montmort问题" 
    Suppose you have a deck of N cards, numbered 1, 2, 3, . . . , N. After shuffling, you draw one card at a time, without replacement, counting out loud as each card is drawn: “1, 2, 3, . . . ”. What is the probability that there will be no coincidence, i.e., no drawing of a card bearing the number just called out?

我这里叙述一个更加现实的版本:

!!! cite "礼物交换问题"
    现有$n$个人的群体，每个人都准备了一份礼物,  把这些礼物混合打乱之后每个人再随机拿走一份礼物.

### 基础问题

??? question "没有任何一个人拿到自己礼物(我们称这是一个**匹配**)的概率$P_0(n)$是多少?"
    - 这显然是在交换礼物的时候我们不愿意看到的，但很无奈这个概率不是很小
    - 本题使用加法公式立得

    ??? note "Sloution"
        假设事件$A_i$代表第$i$个人拿到了自己的礼物，那么
        $$
        P(A_i) = \frac{(n-1)!}{n!} = \frac{1}{n}
        $$
        这是一个古典概率模型，样本空间总计$n!$种可能，$A_i$包含了$(n-1)!$个基本事件。

        类似地，我们可以得到
        $$
        \begin{aligned}
        &P(A_iA_j) = \frac{(n-2)!}{n!} \quad i\ne j \\\\
        &P(A_iA_jA_k) = \frac{(n-3)!}{n!} \quad i,j,k \text{互不相等}\\\\
        &P(\cap_{i=1}^n A_i) = \frac{1}{n!}
        \end{aligned}
        $$

        我们要求的概率就是
        $$
        P_0(n) = P(\cap_{i=1}^n \bar{A_i}) = 1-P(\cup_{i=1}^n A_i)
        $$
        根据加法公式
        $$
        \begin{aligned}
        &P(\cup_{i=1}^n A_i) \\\\
        = &\sum_{i} P(A_i) - \sum_{i\ne j} P(A_iA_j) +\cdots + (-1)^{n-1} P(\cap_{i=1}^n A_i)\\\\
        = &\sum_{k=1}^n {n \choose k} (-1)^{k-1}\frac{(n-k)!}{n!}\\\\
        = &\sum_{k=1}^n \frac{(-1)^{k-1}}{k!}
        \end{aligned}
        $$
        所以
        $$
        P_0(n) = 1-\sum_{k=1}^n \frac{(-1)^{k-1}}{k!} = \sum_{k=0}^n \frac{(-1)^{k}}{k!}
        $$
        有趣的是
        $$
        \lim_{n\to \infty} P_0(n) = e^{-1}\approx 0.3679
        $$


??? question "恰好有$k$个人拿到自己准备的礼物的概率$P_k(n)$是多少?"
    - 本题使用分布计数原理，先考虑$k$个人匹配, 再考虑余下的$n-k$个人无匹配.

    ??? note "Solution"
        依然是古典概率模型，样本空间共计$n!$个事件。

        使用分步计数原理计算我们感兴趣的事件个数：

        - 先选择$k$个人拿自己的礼物：$n\choose k$
        - 余下的人无匹配：$(n-k)!P_0(n-k)$，注意这里计算的是事件数，所以需要乘上$(n-k)!$

        所以
        $$
        \begin{aligned}
        &P_k(n) \\\\
        = &\frac{{n\choose k}(n-k)!P_0(n-k)}{n!} \\\\
        = &\frac{{n\choose k}(n-k)!\sum_{i=0}^{n-k} \frac{(-1)^{i}}{i!}}{n!} \\\\
        = &\frac{1}{k!}\sum_{i=0}^{n-k}\frac{(-1)^i}{i!}
        \end{aligned}
        $$
        有趣的是
        $$
        \lim_{n\to \infty} P_k(n) = \frac{e^{-1}}{k!}
        $$
        这恰好是均值为1的Poisson分布的p.m.f.：
        $$
        P(X=k) = \frac{\lambda^k}{k!}e^{-\lambda}
        $$

??? question "拿到自己礼物的人数$N(n)$的数学期望和方差是多少?"
    - 本题使用前面计算的分布列求解较为复杂
    - 可以利用数学期望的线性性质, 计算每个人匹配次数的期望, 以及不同人匹配次数之间的协方差. 进而可求解$N(n)$的期望和方差.

    ??? note "Solution"
        我们已经知道了
        $$
        N(n) \to^{d} \mathrm{Poisson}(1)
        $$
        也就是在极限情况下，均值方差都是1，而实际上这个随机变量的均值方差是恒定的1：
        $$
        \mathbb{E}(N(n)) = \mathbb{V}(N(n)) = 1
        $$

        求解的方法是通过期望的线性性质，观察到$N(n)$的加和结构：
        $$
        N(n) = I_1+I_2+\cdots+I_3
        $$
        其中$I_i$取值为1，如果第$i$个人拿到了自己的礼物，否则取值为0（相当于我们之前定义的$A_i$的示性函数）

        根据这个定义，我们知道
        $$
        \mathbb{E}(I_i) =  P(A_i) = \frac{1}{n}
        $$
        以及
        $$
        \mathbb{E}(I_iI_j) =  P(A_iA_j) = \frac{1}{n(n-1)} \quad i\ne j
        $$

        进一步有
        $$
        \mathrm{Cov}(I_i,I_j) = \mathbb{E}(I_iI_j) - \mathbb{E}(I_i)\mathbb{E}(I_j) = \frac{1}{n^2(n-1)} \quad i\ne j
        $$
        以及
        $$
        \mathbb{D}(I_i) = E(I_i^2) - E^2(I_i) = \frac{n-1}{n^2}
        $$
        于是我们相求的期望方差就可以计算了：
        $$
        \mathbb{E}(N(n)) = \sum_{i=1}^n \mathbb{E}(I_i) =  n*\frac{1}{n} = 1
        $$
        $$
        \begin{aligned}
        &\mathbb{D}(N(n)) \\\\
        = &\sum_{i=1}^n \mathbb{D}(I_i) + 2\sum_{i\ne j} \mathrm{Cov}(I_i,I_j) \\\\
        = & n\frac{n-1}{n^2} + 2{n \choose 2}\frac{1}{n^2(n-1)} \\\\
        = & \frac{n-1}{n} + \frac{1}{n} = 1
        \end{aligned}
        $$

以上三个问题回答了这个问题的分布列以及基本数字特征

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

> 什么单身派对，小团体

之所以单独提出循环这个概念, 是因为这样一来不同的循环就可以看作不同群体之间的礼物交换了. 也就是说我们把$n$个人的礼物分配问题, 转化为若干个小群体内(例如$c$和$n-c$)的礼物交换问题. 背后有一种**分而治之**的思想!

那么:

??? question "成对的数量$M(n)$的期望是多少?"
    - 利用期望的线性性质, 求${n\choose 2}$对人, 每一对成对的概率即可. 这个概率就是对应示性函数的期望.

    ??? note "Solution"
        这题的解法和之前的类似，利用$M(n)$的加和结构，设$I(i,j)=1$代表$i,j$成对，否则为0.

        那么
        $$
        M(n) = \sum_{1\le i<j \le n} I(i,j)
        $$

        其中$I(i,j)\quad 1\le i<j \le n$共计$n\choose 2$个同分布随机变量，期望是：
        $$
        \mathbb{E}(I(i,j)) = \frac{(n-2)!}{n!} = \frac{1}{n(n-1)}
        $$
        所以
        $$
        \mathbb{E}(M(n)) = {n\choose 2} \frac{1}{n(n-1)} = \frac{1}{2}
        $$
        成对的个数真是少的可怜，单身party大失败！

??? question "在$n$个人交换礼物的过程中, 形成的循环个数$C(n)$的期望是多少?"
    - 本题可以条件于第一个人所处循环的长度, 使用条件期望公式来求.

    ??? note "Solution 1"
        条件于第一个人所在的循环长度$X$，根据条件期望公式有：
        $$
        \mathbb{E}(C(n)) = \sum_{k=1}^n \mathbb{E}(C(n) \mid X=k)P(X=k)
        $$
        $X=1$代表TA拿到了自己的礼物，$X=k$代表形成了一个循环：
        $$
        1 \to i_2 \to i_3 \to \cdots \to i_{k-1} \to 1
        $$
        这一排列问题事件数为：
        $$
        {n-1 \choose k-1}(k-1)!(n-k)!
        $$
        其中${n-1 \choose k-1}$代表从出了第一个人之外的$n-1$个人中选取$k-1$个参与这个循环，$(k-1)!$代表选出来的人都全排列，$(n-k)!$代表剩下人的全排列。

        所以
        $$
        P(X=k) = \frac{{n-1 \choose k-1}(k-1)!(n-k)!}{n!} = \frac{1}{n}
        $$
        这是一个均匀分布。

        此外，不难想象：
        $$
        \mathbb{E}(C(n) \mid X=k) = \mathbb{E}(C(n-k))+1
        $$

        于是
        $$
        \mathbb{E}(C(n)) = 1+\frac{1}{n}\sum_{k=1}^n \mathbb{E}(C(n-k))
        $$

        > $C(0) = 0$
        
        这个一个递推数列问题：
        $$
        a_n = 1+\frac{1}{n}S_{n-1},\quad a_1 = 1
        $$
        也就是
        $$
        S_{n-1} = na_n-n
        $$
        阶差得到
        $$
        a_n = S_n-S_{n-1} = (n+1)a_{n+1}-n-1-na_n+n
        $$
        于是
        $$
        (n+1)(a_{n+1}-a_n) = 1\quad n\ge 2
        $$
        累加就得到
        $$
        \mathbb{E}(C(n)) = a_n = \sum_{i=1}^n \frac{1}{i}
        $$
        调和级数（部分和）居然也出现了！！

        我们知道这个数列的增长速度是$\log n$：
        $$
        \lim_{n\to \infty} (\mathbb{E}(C(n)) - \log n) = \gamma
        $$

        循环个数的期望是发散的，这件事情也不难接受。在一个无限大的总体中，交换礼物形成的“小团体”是无穷多个。
    
    - 也可以构造一个加和结构，利用期望的线性性质
    
    ??? note "Solution 2"
        第二种方法就妙不可言了，我们可以手动构造一个加和结构：
        $$
        C(n) = \sum_{i=1}^n \frac{1}{c_i}
        $$
        其中$c_i$是第$i$个人所在的循环的长度。

        这一点不难证明：

        我们假设第$l$个循环是$C_l$，那么它的长度是$|C_l|= c_l$，于是我们可以把同一个循环的人聚集起来求和：
        $$
        \sum_{i=1}^n \frac{1}{c_i} = \sum_{l=1}^{C(n)} \sum_{i\in C_l} \frac{1}{c_l} = \sum_{l=1}^{C(n)}  1 = C(n)
        $$
        这就是循环的个数了。

        在第一种解法中我们已经给出了循环长度$c_i$的分布，是一个在$1,2,\cdots,n$上的均匀分布。

        所以
        $$
        \mathbb{E}(\frac{1}{c_i}) = \sum_{k=1}^n \frac{1}{k} *\frac{1}{n}
        $$
        于是我们很快就可以得出之前的结论：
        $$
        \mathbb{E}(C(n)) = \sum_{k=1}^n \frac{1}{k}
        $$

??? question "$1,2,3,\cdots,k$ 这$k$ 个人在同一个循环内的概率是多少?"
    
    - 古典概率模型，较为简单
    
    ??? note "Solution"
        假设他们$k$个人所在的循环长度为$k+l$，也就是还有另外$l$个人也在循环里，记这个事件的概率是$P_{k+l}$。

        - 如果$l=0$

        那么
        $$P_{k+l} = \frac{(k-1)!(n-k)!}{n!}$$
        > 注意这是一个环形的排列问题：$i_1\to i_2 \to i_3 \to \cdots i_{k-1} \to \to i_1$

        - 如果$l\ne 0$，就需要先选出这$l$个人：

        $$
        P_{k+l} = {n-k \choose l} \frac{(k+l-1)!(n-k-l)!}{n!}
        $$
        
        两种情况实际上是统一的，最终我们可以求得感兴趣的概率是：
        $$
        \sum_{l=0}^{n-k} P_{k+l}
        $$


??? question "换一个方法再次求$P_0(n)$?"
    - 启发自前面的问题，我们可以条件于第一个人所处的循环的长度来求$P_0(n)$
    
    ??? note "Solution 1"
        条件于第一个人所在的循环长度$X$，根据条件期望公式有：
        $$
        P_0(n) = \sum_{k=1}^n P(\text{无匹配}| X=k)P(X=k)
        $$
        注意到$k=2$的时候，实际上是有匹配的，所以$P(\text{无匹配}| X=2)=0$，我们可以去掉这一项：
        $$
        P_0(n) = \sum_{{\color{red} k=2}}^n P(\text{无匹配}| X=k)P(X=k)
        $$
        也就是
        $$
        P_0(n) = \sum_{{\color{red} k=2}}^n P_0(n-k)\frac{1}{n}
        $$
        这又是一个递推数列问题了，我就不求了。
    
    - 其实也不一定要条件于**循环长度**这么奇怪的变量，可以直接条件于**第一个人是否拿到自己礼物**这一事件。

    ??? note "Solution 3"
        设无匹配为事件$A$，第一个人拿到自己礼物为事件$B$，那么
        $$
        P(A) = P(A|B)P(B)+ P(A|\bar B)P(\bar B)
        $$
        其中$P(A|B) = 0$可以去掉这一项，而
        $$
        P(\bar B) = 1-P(B) = 1-\frac{(n-1)!}{n!} = \frac{n-1}{n}
        $$
        我们之前计算过。

        设1拿到了s的礼物，考虑第三个事件$C$代表**s拿到了1的礼物**，那么：
        $$
        P(A|\bar B) =P(A|C\bar B)P(C)+P(A|\bar C\bar B)P(\bar C) = \frac{1}{n-1}P_0(n-2) + P_0(n-1)
        $$

        其中
        $$
        P(C) = \frac{1}{n-1}
        $$
        很好理解。

        $\bar B C$就是1和c互换礼物情况，这时候问题就简化成$n-2$的子问题了，所以
        $$
        P(A|\bar B C) = P_0(n-2)
        $$

        最后，根据Bayse公式
        $$
        P(A|\bar C\bar B)P(\bar C) = P(A\bar C| \bar B)
        $$
        问题变成：已知1没有拿到自己的礼物，想要求无匹配并且1和s没有交换礼物的概率。

        1已经拿走了s的礼物，现在还有$n-1$个礼物，我们**把1的礼物当作是s的礼物**，问题就变成了这剩下的$n-1$个人无匹配。

        > 由于把1的礼物当作是s的礼物，所以$\bar C$（s不拿到1的礼物）相当于是要求无匹配。

        所以
        $$
        P(A\bar C| \bar B) = P_0(n-1)
        $$

        综上所述
        $$
        P(A) = \frac{n-1}{n}(\frac{1}{n-1}P_0(n-2) + P_0(n-1))
        $$

        这个递推式和前面几种解法都是等价的。

        妙哉！！！