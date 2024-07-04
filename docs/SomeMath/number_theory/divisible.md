---
tags:
- 数论
include:
- math
---

# 整除理论

> 本文内容摘录自《初等数论》，潘承洞、潘承彪，北京大学出版社

## 自然数

所谓自然数就是：
$$
0,1,2,3,4,\cdots
$$

这是日常生活中随处可见的数字。它的形成和我们认知的性质都源于经验。然而随着数学理论的发展，“自然数是什么”这个问题摆在数学家的面前。换言之如何精确刻画**自然数的集合**呢？我们有如下公理

!!! theorem "Peano公理"
    $\mathbb{N}$是非空集合，满足

    - $\forall n \in \mathbb{N},\quad \exists n^+ \in \mathbb{N}$与之对应。$n^+$称为后继元素。
    - 有一个元素$e\in \mathbb{N}$，它不是任何一个元素的后继。
    - $\mathbb{N}$中任意一个元素至多是一个元素的后继，即$a^+=b^+ \implies a=b$
    - （归纳公理）设$S$是$\mathbb{N}$的子集，$e\in S$。如果$\forall n \in S \implies n^+\in S$，那么$S=\mathbb{N}$

如果取$e=1$，取我们熟知的“加1”作为后继操作，那么$\mathbb{N} = \\{1,2,3,\cdots\\}$就是满足上述公理的自然数集。同时，我们把这个集合稍做扩展就得到整数集$\mathbb{Z} = \\{0,\pm 1, \pm 2, \cdots\\}$

根据归纳公理（**自然数的本质特征**），我们很容易就可以导出数学归纳法：

!!! theorem "第一数学归纳法"
    对于一个命题$P_n$，如果

    - $P_1$成立
    - $P_k \implies P_{k+1}\quad \forall k\in \mathbb{N}$
    
    那么$P_n$就对任意的自然数成立。

!!! theorem "第二数学归纳法"
    对于一个命题$P_n$，如果

    - $P_1$成立
    - $P_1, P_2, \cdots, P_k \implies P_{k+1}\quad \forall k\in \mathbb{N}$
    
    那么$P_n$就对任意的自然数成立。

此外不难想象，自然数的有限子集一定有**最大元素**和**最小元素**。无限子集如果有上界一定有最大元素。

自然数集的这些性质在初等数论中是很常用的。

## 整除
下面我们来研究整除。

!!! definition "整除"
    对于整数$a,b$，$a\ne 0$，如果存在整数$q$，使得$b=aq$，就说$b$被$a$整除，记作$$a\mid b$$
    
    也称$a$是$b$的**约数**，$b$是$a$的**倍数**。
    
    如果不存在这样的整数$q$则不能整除，记作$$a \nmid b$$

在这个定义下，我们很容易验证如下性质：

1. 传递性：$a\mid b,\quad b\mid c \implies a\mid c$
2. 线性性：$a\mid b,\quad a\mid c \implies a\mid xb+yc \quad \forall x,y \in \mathbb{Z}$
3. 一般地，$a\mid b_j \quad \forall j=1,2,\cdots, k \iff a\mid x_1b_1 + x_2b_2 + \cdots + x_k b_k \quad \forall x_j \in \mathbb{Z}$
4. $\forall m\ne 0,\quad  a\mid b \iff ma\mid mb$
5. $a\mid b, \quad b\mid a \implies a=\pm b$
6. $b\ne 0, a\mid b \implies |a|\le |b|$
7. 如果$a\ne 0, \quad b=qa+c$，那么$a\mid b \iff a\mid c$

这些性质较为简单，证明略去。

## 素数
由约数的概念可以引申出**素数**的概念：

!!! definition "素数"
    如果整数$p$满足$p\ne0,1,-1$，并且只有$\pm1$和$\pm p$这四个约数，那么就称$p$是素数，或者叫不可约数。
    
    如果除了$\pm1$和$\pm p$之外还有其他约数，就称$p$是合数。

    特别的，$0,1,-1$都不是素数，也不是合数。

一般而言我们说的素数都是特指正的素数，例如$2,3,5,7,11,\cdots$

## 公约数和公倍数
此外由整除的概念还可以引申出**公约数**和**公倍数**的概念：

!!! definition "公约数"
    如果$d\mid a,\quad d \mid b$那么称$d$是$a,b$的公约数。

    记它们所有公约数的集合为$\mathcal{D}(a,b)$。那么一定存在一个最大的公约数：
    $d_0 = \max {\mathcal{D}(a,b)}$，称为最大公约数，记作:
    $$
    d_0 = (a,b)
    $$

    特别的，如果$(a,b)=1$称$a,b$互素。

!!! definition "公倍数"
    如果$a\mid l,\quad b \mid l$那么称$l$是$a,b$的公倍数。

    记它们所有公倍数的集合为$\mathcal{L}(a,b)$。那么一定存在一个最小的（正的）公倍数：
    $l_0 = \min {\mathcal{L}(a,b)}$，称为最小公倍数，记作:
    $$
    l_0 = [a,b]
    $$

### 性质
最大公约数有如下一些性质：

1. $(a,b) = (b,a) = (-a, b) =(|a|, |b|)$
2. 如果$a\mid b_j \quad j=1,2,3,\cdots,k$那么$(a,b_1,b_2,\cdots,b_k) = (a)=|a|$
3. $\forall k \in \mathbb{Z}$都有$(a,b) = (a,b,ka)$
4. $\forall k \in \mathbb{Z}$都有$(a,b) = (a,b+ka)$
5. 如果$p$是素数，那么要么$(p,a) = 1$，要么$(p,a) = p$

这些性质较为简单，证明略去。

值得注意的是，根据整除的第三条性质：
$$
a\mid b_j \quad \forall j=1,2,\cdots, k \iff a\mid x_1b_1 + x_2b_2 + \cdots + x_k b_k \quad \forall x_j \in \mathbb{Z}
$$

我们知道$b_1,b_2,\cdots,b_k$的公约数集合和$x_1b_1 + x_2b_2 + \cdots + x_k b_k \quad \forall x_j \in \mathbb{Z}$的公约数集合相同。

我们把**有限**个数的公约数和**无限**个数的公约数联系了起来！

最小公倍数也有类似的性质：

1. $[a,b] =[b,a]=[-a,b]=[|a|,|b|]$
2. $a\mid b \implies [a,b] = b$
3. $d\mid a \implies [a,b,d] = [a,b]$

### 8个定理
最大公约数和最小公倍数还有如下一些常见的结论：

1. 公倍数是最小公倍数的倍数：$a_j\mid c \quad j=1,2,\cdots,k \iff [a_1,a_2,\cdots,a_k] \mid c$
2. 公约数是最大公约数的约数：$D =(a_1,a_2,\cdots,a_k) \iff (D\mid a_j \quad j=1,2,\cdots,k, \quad \forall d \quad d\mid a_j \implies d\mid D)$
3. 最大公约数的乘法分配律？：$\forall m>0 \quad m(b_1,b_2,\cdots, b_k) = (mb_1,mb_2,\cdots, mb_k)$
4. 最大公约数的结合律？：$(a_1,a_2,\cdots,a_k) = ((a_1,a_2),\cdots,a_k) = ((a_1,a_2,\cdots,a_j),(a_{j+1},\cdots,a_k))$
5. $(m,a)=1 \implies (m,ab)=(m,b)$
6. 如果$(m,a)=1$，那么$m\mid ab \implies m \mid b$
7. $(a,b)[a,b]= |ab|$
8. 设$a_1,a_2,\cdots,a_k$不全为零，那么$(a_1,a_2,\cdots,a_k) = \min_{s>0} s\in \\{s=a_1x_1+\cdots+a_kx_k, \quad x_j\in \mathbb{Z}\\}$

这8个定理中，8是最强的，可以由定理8出发证明其余所有的定理。

这里只给出定理8的证明：

设集合$S=\\{s=a_1x_1+\cdots+a_kx_k, \quad x_j\in \mathbb{Z} \\}$。由于
$$
a_1^2+a_2^2+\cdots+a_k^2 \in S
$$
所以$S$存在正整数，因此一定有最小的正整数，记作$s_0$。

对于任意一个公约数$d\mid a_j\quad j=1,2,\cdots,k$，根据整除的性质3一定有$d\mid s_0$，所以
$$
|d| \le s_0 \tag{1}
$$
我们对$a_j$做带余除法：
$$
a_j = q_js_0 + r_j,\quad 0\le r_j < s_0
$$

那么
$$
r_j = a_j- q_js_0 \in S
$$

如果$r_j>0$，为正整数，这就和$s_0$是$S$中最小正整数矛盾，于是$r_j=0$。

也就是说
$$
s_0 \mid a_j \quad j=1,2,\cdots,k \tag{2}
$$

结合(1)、(2)可知$s_0$就是最大公约数。

### 常见结论
有很多美好的结论，例如：

1. 对于任意正整数$m,n,a$如果$a\ge 2$，那么
$$
(a^m-1, a^n-1) = a^{(m,n)}-1
$$

2. 如果$p$是素数，那么
    - $p\mid C_p^j\quad \forall 1\le j \le p-1$（这里$C_p^j$代表组合数）
    - （**Fermat小定理**）$\forall a\in \mathbb{Z}^+, \quad p \mid a^p-a$
    - $\forall a\in \mathbb{Z}^+, (a,p)=1\quad p \mid a^{p-1}-1$

3. 
    - $(a,uv) = (a,(a,u)v)$
    - $(a,uv) \mid (a,u)(a,v)$
    - $(u,v)=1 \implies (a,uv) = (a,u)(a,v)$

4. 如果$q^k,q\in \mathbb{Q}$是整数，那么$q$是整数。
5. 设$k$是正整数
    - 如果$a,b$是整数，$(a^k,b^k) = (a,b)^k$
    - 如果$a,b$是正整数，且$(a,b)=1,ab=c^k$，那么
    $$
    a = (a,c)^k,\quad b = (b,c)^k
    $$
6. 设$m\ge 2, \quad (m,a)=1$
    - 那么存在$1\le d\le m-1$，使得$m\mid a^d -1$
    - 设$d_0$是满足前一条的最小$d$，那么
    $$m \mid a^h-1(h\ge 1) \iff d_0\mid h$$
    - 记$d_0 = \delta_m(a)$称为$a$对**模$m$的指数**

## 带余除法

利用前述的最大公约数性质可以求一些特殊的最大公约数，例如：
$$
\begin{aligned}
&(21n+4,14n+3) \\\\
=& (21n+4 - 14n-3 , 14n+3) \\\\
=& (7n+1 , 14n+3) \\\\
=& (7n+1 , 14n+3-7n-1) \\\\
=& (7n+1 , 2) = 1
\end{aligned}
$$

一般的，我们可以建立一套更加高效的算法来求最大公约数：辗转相除法。

要构造辗转相除法，首先需要引入带余除法：

!!! theorem "带余除法"
    对于整数$a,b$，$a\ne 0$。那么一定**存在唯一**的整数$q$和$r$满足：
    $$
    b = qa+r
    $$
    其中$0\le q < |a|$。

    $q$称为商，$r$称为余数，$a$称为除数，$b$称为被除数。

带余除法其实不是什么新鲜的东西，大家小学的时候都学过。那时候我们还没学分数，做除法只能够做带余除法。只不过定理中的**存在唯一性**你可能没有细想过。

### 一例
带余除法得到的**余数**是非常有趣的，例如：

$$
求证：a>2,\quad  2\nmid a \implies \exists d \in \mathbb{Z},\quad 0<d\le a-1 \quad a\mid 2^d -1
$$

这实际上就是在说存在某一个$d$使得$2^d$除以$a$的余数是$1$。

证明：

我们考虑
$$
2^0,2^1,\cdots,2^{a-1}
$$
这$a$个数字，显然他们都不能被奇数$a$整除，所以余数只能是$1,2,\cdots,a-1$这$a-1$个数字其中的某一个。那么根据抽屉原理，一定存在两个余数相同。不妨假设
$$
2^j = q_ja + r, \quad 2^k = q_ka + r,\quad j>k
$$
那么就有
$$
a\mid 2^j-2^k = a(q_j-q_k)
$$
也就是
$$
a \mid 2^k(2^{j-k}-1)
$$
$a$是奇数，整除关系肯定和$2^k$无关，于是
$$
a \mid 2^{j-k}-1
$$
证毕。

### 辗转相除法

下面我们使用带余除法来构造辗转相除法。

!!! theorem "辗转相除法"
    对给定的整数$u_0,u_1$，其中$u_1\ne 0$，$u_1 \nmid u_0$，那么我们一定可以重复带余除法得到下列等式：
    $$
    \begin{aligned}
    &u_0 = q_0u_1 + u_2, \quad 0 < u_2 < |u_1| \\\\
    &u_1 = q_1u_2 + u_3, \quad 0 < u_3 < u_2 \\\\
    &\vdots\\\\
    &u_{k-1} = q_{k-1}u_{k} + u_{k+1}, \quad 0 < u_{k+1} < u_k \\\\
    &u_k = q_k u_{k+1} \\\\
    \end{aligned}
    $$
    上述算法就称为辗转相除法或Euclid算法。

    有如下结论：

    1. 最终得到的$u_{k+1}$就是$u_0,u_1$的**最大公约数**，也即：
    $$
    u_{k+1} = (u_0, u_1)
    $$

    2. 并且一定存在$x,y$使得
    $$
    u_{k+1} = xu_0+yu_1
    $$

辗转相除法的证明也很简单，只需要注意到我们每次做带余除法的余数是**严格单调递减**的正整数：
$$
|u_1|>u_2>u_3>\cdots>u_{k+1}>0
$$
那么，由于$|u_1|$是确定的整数，**至多**做$|u_1|$次带余除法，余数一定会变成$0$。

于是，根据辗转相除法得到的$k+1$个等式，以及最大公约数的性质我们就可以得到
$$
\begin{aligned}
u_{k+1} = (u_{k+1},u_k)=(u_{k},u_{k-1})=\cdots= (u_{1},u_0)
\end{aligned}
$$
结论1成立。

然后只需要不断消去中间变量:
$$
u_{k-1} = q_{k-1}u_{k} + u_{k+1} \implies u_{k+1} = u_{k-1}-q_{k-1}u_{k}
$$
然后再消去$u_k$即可，以此类推结论2得证。

实际上，辗转相除法一般都可以很快给出最大公约数，例如求$(198,252)$：

$$
\begin{aligned}
252 &= 1\cdot 198+54\\\\
198 &= 3\cdot 54+36\\\\
54 &= 1\cdot 36+18\\\\
36 &= 2\cdot 18
\end{aligned}
$$
所以所求的最大公约数就是$18$。

## 算术基本定理

!!! theorem "算术基本引理"
    设$p$是素数，那么
    $$
    p\mid ab \implies (p \mid a)\lor(p \mid b)
    $$

!!! theorem "算术基本定理"
    $a>1$为正整数，那么必有
    $$
    a = p_1p_2\cdots p_s
    $$
    其中$p_j(1\le j\le s)$为素数。

    并且，在次序不计的情况下，这个分解是唯一的。这通常也称为正整数的**素因数分解**：

上述两个定理是等价的。

我们可以把重复的素数收集起来，写成**标准素因数分解**：
$$
a = p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_s^{\alpha_s}
$$
其中素数按照从小到大顺序排列：
$$
p_1 < p_2 < \cdots < p_s
$$

### 一例
算术基本定理给出了整数的分解形式，它展示了**素数的本质属性**。我们可以用它来很方便地证明一些结论，例如：


求证：$(a,[b,c]) = [(a,b),(a,c)]$

证明：

如果$a,b,c$中有$0$，显然成立。

考虑$a,b,c$是正整数的情况：

$$
\begin{aligned}
&a = p_1^{\alpha_1}\cdots p_s^{\alpha_s}\\\\
&b = p_1^{\beta_1}\cdots p_s^{\beta_s}\\\\
&c = p_1^{\gamma_1}\cdots p_s^{\gamma_s}
\end{aligned}
$$

于是
$$
[b,c] = p_1^{\delta_1}\cdots p_s^{\delta_s}
$$
其中
$$
\delta_j = \max \\{\beta_j, \gamma_j\\}
$$

那么
$$
(a,[b,c]) = p_1^{\epsilon_1}\cdots p_s^{\epsilon_s}
$$
其中
$$
\epsilon_j = \min \\{\alpha_j, \delta_j\\} = \min \\{\alpha_j, \max \\{\beta_j, \gamma_j\\}\\}
$$

类似的我们知道
$$
[(a,b),(a,c)] = p_1^{\zeta_1}\cdots p_s^{\zeta_s}
$$
其中
$$
\zeta_j = \max \\{\min \\{\alpha_j, \beta_j\\}, \min \\{\alpha_j, \gamma_j\\}\\}
$$

所以只需要证明：
$$
\max \\{\min \\{\alpha_j, \beta_j\\}, \min \\{\alpha_j, \gamma_j\\}\\}
= \min \\{\alpha_j, \max \\{\beta_j, \gamma_j\\} \\}
$$

可以验证，不论$\alpha_j,\beta_j,\gamma_j$大小顺序如何，上式都成立。

证毕。

### 阶乘的素因数分解

如果
$$
p^k \mid a, \quad p^{k+1} \nmid a
$$  
我们称，$p$的$k$次方恰好整除$a$，记作
$$
p^k \parallel a
$$

!!! theorem
    设$n$是正整数，$p$是素数。那么
    $$
    \alpha(p,n) = \sum_{j=1}^\infty \left[\frac{n}{p^j}\right]
    $$

    其中
    $$
    \alpha(p,n) = \alpha
    $$
    满足
    $$
    p^\alpha \parallel n!
    $$

    由此我们可以给出$n!$的素因数分解：
    $$
    n! = \prod_{p\le n} p^{\alpha(p,n)}
    $$

证明：

实际上
$$
\alpha(p,n) = \sum_{j=1}^\infty \left[\frac{n}{p^j}\right]
$$
右侧是一个有限求和，因为总存在$k$使得
$$
p^k \le n < p^{k+1}
$$
于是：
$$
\alpha(p,n) = \sum_{j=1}^k \left[\frac{n}{p^j}\right]
$$

设$c_j$是$1,2,3,\cdots,n$中能被$p^j$整除的数的个数，$d_j$是$1,2,3,\cdots,n$中**恰好**能被$p$的$j$次方整除的数的个数。

那么
$$
d_j = c_j - c_{j+1}
$$

我们很容易验证：
$$
c_j = [n/p^j]
$$

??? question "验证一下"
    显然，$1,2,3,\cdots, n$中能被$p^j$整除的数字只有$xp^j, \quad x\in \mathbb{Z}^+$，实际上最大的那一个就是$c_j p^j$。

    从
    $$
    n = c_j p^j + (n-c_j p^j)
    $$
    可以得到
    $$
    n/p^j = c_j  + (n-c_j p^j)/p^j
    $$

    根据$c_j$的最大性，$n-c_j p^j < p^j$，否则至少有$c_j+1$个数字可以被$p^j$整除，矛盾。

    所以$(n-c_j p^j)/p^j<1$，只需要取整即可得到：
    $$
    [n/p^j] = c_j
    $$

所以
$$
d_j = [n/p^j] - [n/p^{j+1}]
$$

容易看出：
$$
\alpha = 1\cdot d_1 + 2\cdot d_2 + \cdots + k\cdot d_k
$$
??? question "怎么看出来的？"
    我们考虑把$1,2,3,\cdots, n$分成$k$组，第$j$组是所有恰好能被$p^j$整除的数字。

    于是第$j$组中恰好有$d_j$个数字，他们的乘积恰好被$p$的$j\cdot d_j$次方整除。

    因此
    $$
    \alpha = 1\cdot d_1 + 2\cdot d_2 + \cdots + k\cdot d_k
    $$

带入$d_j$即可得到要证明的式子。

证毕。

来一个实际的例子：考虑$20!$的素因数分解。

先写出不超过$20$的所有素数：$2,3,5,7,11,13,17,19$

然后计算指数：
$$
\begin{aligned}
&\alpha(2,20) = [20/2]+[20/4]+[20/8]+[20/16] = 18\\\\
&\alpha(3,20) = [20/3]+[20/9] = 8\\\\
&\alpha(5,20) = [20/5] = 4\\\\
&\alpha(7,20) = [20/7] = 2\\\\
&\alpha(11,20) = [20/11] = 1\\\\
&\alpha(13,20) = [20/13] = 1\\\\
&\alpha(17,20) = [20/17] = 1\\\\
&\alpha(19,20) = [20/19] = 1
\end{aligned}
$$
于是
$$
20! = 2^{18}\cdot 3^8\cdot 5^4\cdot 7^2\cdot 11\cdot 13\cdot 17\cdot 19
$$