---
tags:
- Calculus
include:
- math
---

# 有理函数积分范式

在各类积分运算中，我们常见到这样一类函数，它们有貌离神合的计算方法——有理函数。

例如
$$
\int \frac{1}{x}\mathrm{d}x=\ln|x|+C,\quad x \ne 0
$$
又如
$$
\int x^n\mathrm{d}x=\frac{x^{n+1}}{n+1}+C,\quad n\ne -1
$$
再如
$$
\int \frac{1}{1+x^2}\mathrm{d}x=\arctan x+C
$$
上述三例倒也不是随意举出来的，利用上述三个最简积分公式加上一些技巧，我们可以计算出**任一有理函数的（不定）积分**，下面我们就来介绍具体的范式。

> 一些定积分的技巧我们在这里不做讨论，下面所言积分都是不定积分

## 有理函数

首先，我们明确一下何谓有理函数，形如：
$$
f(x)=\frac{P_m(x)}{Q_n(x)}
$$
其中
$$
 P_m(x)=\sum_{i=0}^ma_ix^i,Q_n(x)=\sum_{j=0}^nb_jx^j,Q_n(x)\ne0
$$
也就是两个多项式的商称为有理函数，这个概念显然是有理数某种意义上的推广：
$$
\mathbb{Q}=\left\\{f=\frac{p}{q}\mid p,q\in \mathbb{Z}, q\ne 0\right\\}
$$
并且类似的，我们也定义真分式：
$$
\text{proper fraction}=\left\\{f(x)=\frac{P_m(x)}{Q_n(x)}\mid m<n\right\\}
$$
和假分式：
$$
\text{improper fraction}=\left\\{f(x)=\frac{P_m(x)}{Q_n(x)}\mid m\ge n\right\\}
$$

> 上面写成了集合形式，有些显而易见的条件就略去了，并且在我们讨论有理函数积分的场景下，不妨假设$P_m$和$Q_n$最高次项的系数都为1

## 分解技术

从上面的定义看得出来，有理函数和多项式的关系非常密切，实际上为了求解一般有理函数的积分我们需要下面两个分解：

### 因式分解

因式分解是对于一个多项式而言的，根据代数基本定理，$Q_n(x)$在**复数域**内有如下分解形式：
$$
Q_n(x)=\prod_{i=1}^n(x-x_i)
$$
其中$x_i\in \mathbb{C}$是$Q_n(x)=0$的根。
更进一步，我们有：
$$
Q_n(x)=\prod_{i=1}^{n_1}(x-x_i)\prod_{j=1}^{(n-n_1)/2}(x-x_j)(x-\overline{x_j})
$$
其中$\overline{x_j}$代表复数$x_j,j=1,\cdots,\frac{n-n_1}{2}$的共轭，$x_i,i=1,\cdots,n_1$都是实数。

能做出第二个形式是因为，实系数多项式的零点若不是实数，那么它的**共轭**必然也是零点，也就是说**非实数零点是成对出现的**。

这是显然成立的，$Q(x)=0$两边取共轭有，$\overline{Q(x)}=0$，根据复数的性质（加、减、乘运算和共轭运算可交换），所以有$Q(\overline{x})=0$，这样就说明了非实数零点成对出现。

如果取$x_j=\alpha_j + \beta_j \mathrm{i}$ 其中$ \alpha_j,\beta_j \in \mathbb{R}$，那么很容易得到下面的分解形式：
$$
Q_n(x)=\prod_{i=1}^{n_1}(x-x_i)\prod_{j=1}^{(n-n_1)/2}(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)
$$
这也就是$Q_n(x)$在**实数域**内的因式分解。

如果我们把重根合并在一起，就有
$$
f(x)=\prod_{i=1}^{s}(x-a_i)^{d_i}\prod_{j=1}^{t}(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)^{e_j}
$$
其中$d_i$为实根$a_i$的重数，$e_j$为共轭复根对$\alpha_j + \beta_j \mathrm{i}$的重数。

### 部分分式分解

有了上述$Q_n(x)$的实数域内的分解形式，我们就可以得到下面有理真分式的部分分式分解形式：
$$
\begin{aligned}
&\frac{P(x)}{Q(x)}\\\\
=&\sum_{i=1}^{s}\sum_{k=1}^{d_i}\frac{A_{ik}}{(x-a_i)^k}+\sum_{j=1}^{t}\sum_{k=1}^{e_j}\frac{B_{jk}x+C_{jk}}{(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)^k}
\end{aligned}
$$
其中$A_i,B_j,C_j \in \mathbb{R}$

可以证明，上述待定系数一定有解。

我见过两种证明方法，一种是使用多项式的理论，详见
> 傅莺莺.有理真分式部分分式分解的证明及系数公式[J].大学数学,2014,30(02):82-87.

另外一种是使用线性空间的理论，详见
> 高翔宇,杨洪福,王世鹏.有理分式函数分解定理的新证明[J].大学教育,2020(12):103-104+154.

我们这里不多赘述，下面直接利用部分分式分解的形式来计算有理函数的积分。

## 积分范式

我们用一个例题来呈现有理函数积分的一般过程。

### 例一

$$
F(x)=\int \frac{x^4}{x^3+1}\mathrm{d}x
$$

### 分离整式

如果$f(x)$是一个有理假分式, 我们使用**带余除法**可以把$f(x)$分解为一个整式和有理分式, 积分也就分为两块, 整式部分的积分非常简单, 真分式的部分进入下一流程. 另外, 如果分母不是首一多项式, 直接把系数提出来即可.

步骤1, 分离整式:

$$
\begin{aligned}
&F(x)\\\\
=&\int \frac{x^4}{x^3+1}\mathrm{d}x\\\\
=&\int \left[x-\frac{x}{x^3+1}\right]\mathrm{d}x\\\\
=&\frac{1}{2}x^2-\int \frac{x}{x^3+1}\mathrm{d}x
\end{aligned}
$$

### 部分分式分解

前文提到任何一个有理真分式都可以做部分分式分解, 其中待定系数的求法较为灵活. 主要包括三种, 其一是极限法: 对分解式取不同极限可以得到系数的值, 其二是列出待定系数的线性方程组求解(通用), 其三是利用导数求解.

步骤2, 有理真分式的部分分解：
$$
x^3+1 = (x+1)(x^2-x+1)
$$
于是有部分分解
$$
\begin{aligned}
&\frac{x}{x^3+1}\\\\
=&\frac{x}{(x+1)(x^2-x+1)}\\\\
=&\frac{A}{x+1}+\frac{Bx+C}{x^2-x+1}
\end{aligned}
$$
通分得到
$$
\begin{aligned}
x=A(x^2-x+1)+(Bx+C)(x+1) \quad \text{(#)}
\end{aligned}
$$
下面求待定系数.

!!! note "极限"
    **法一(极限法)**：

    (#)式取$x\to -1$立得$A=-\frac{1}{3}$;

    再取$x \to 0$立得$C=-A=\frac{1}{3}$;

    最后取$x \to 1$可得$B=\frac{1}{3}$.

!!! note "方程"
    **法二(线性方程组)**：

    比较(*)式中各次项系数即可得到线性方程组:
    $$
    \begin{aligned}
    x^2& \ | \ A+B=0\\\\
    x^1& \ | \ -A+B+C=1\\\\
    x^0& \ | \ A+C=0
    \end{aligned}
    $$
    解得$-A=B=C=\frac{1}{3}$

!!! note "导数"
    **法三(导数)**：

    对(*)求0,1,2阶导数可得:
    $$
    \begin{aligned}
    0& \ | \ x=A(x^2-x+1)+(Bx+C)(x+1)\\\\
    1& \ | \ 1=2Ax-A+B(x+1)+Bx+C\\\\
    2& \ | \ 0=2A+B+B
    \end{aligned}
    $$
    同样比较各次项系数可得方程组, 进而解得$-A=B=C=\frac{1}{3}$.

总而言之，我们可以得到部分分式分解形式：
$$
\begin{aligned}
&F(x)\\\\
=&\frac{1}{2}x^2-\int \frac{x}{x^3+1}\mathrm{d}x\\\\
=&\frac{1}{2}x^2-\int \left[ \frac{-\frac{1}{3}}{x+1}+\frac{\frac{1}{3}x+\frac{1}{3}}{x^2-x+1}\right]\mathrm{d}x
\end{aligned}
$$

### 两类积分

做完部分分式分解之后，我们需要处理的只有两种积分

#### 分母为一次项

也就是
$$
\int \frac{A}{x-a}\mathrm{d}x=A\ln|x-a|+C
$$

#### 分母为二次项

也就是
$$
\begin{aligned}
&\int \frac{Bx+C}{x^2-2\alpha x+\beta}\mathrm{d}x\\\\
=&\int \frac{B(x-\alpha)+C+\alpha B}{(x-\alpha)^2+\beta-\alpha^2}\mathrm{d}(x-\alpha)\\\\
=&\int \frac{Bt+C+\alpha B}{t^2+\beta-\alpha^2}\mathrm{d}t\\\\
=&\int \frac{1}{2}\frac{B}{t^2+\beta-\alpha^2}\mathrm{d}t^2+\int \frac{C+\alpha B}{t^2+\beta-\alpha^2}\mathrm{d}t\\\\
=&\frac{B}{2}\ln|t^2+\beta-\alpha^2|+\int \frac{C+\alpha B}{t^2+\beta-\alpha^2}\mathrm{d}t
\end{aligned}
$$
若$\beta-\alpha^2=0$
$$
\begin{aligned}
&\int \frac{C+\alpha B}{t^2+\beta-\alpha^2}\mathrm{d}t\\\\
=&-\frac{C+\alpha B}{t}+C
\end{aligned}
$$
若$\beta-\alpha^2<0$
$$
\begin{aligned}
&\int \frac{C+\alpha B}{t^2+\beta-\alpha^2}\mathrm{d}t\\\\
=&\frac{C+\alpha B}{2\sqrt{-\beta+\alpha^2}}\int \left[\frac{1}{t+\sqrt{-\beta+\alpha^2}}-\frac{1}{t-\sqrt{-\beta+\alpha^2}}\right]\mathrm{d}t\\\\
=&\frac{C+\alpha B}{2\sqrt{-\beta+\alpha^2}} \left[\ln|t+\sqrt{-\beta+\alpha^2}|+\ln|t-\sqrt{-\beta+\alpha^2}|\right]+C
\end{aligned}
$$
若$\beta-\alpha^2>0$
$$
\begin{aligned}
&\int \frac{C+\alpha B}{t^2+\beta-\alpha^2}\mathrm{d}t\\\\
=&\frac{C+\alpha B}{\sqrt{\beta-\alpha^2}}\arctan (\frac{t}{\sqrt{\beta-\alpha^2}})+C
\end{aligned}
$$
以上三种情况注意回代$t=x-\alpha$

利用以上两种积分公式, 我们就可以完全解决部分分解之后的积分问题了.

例1 步骤3, 部分分式分解完之后应用积分公式求解
$$
\begin{aligned}
&F(x)\\\\
=&\frac{1}{2}x^2-\int \left[ \frac{-\frac{1}{3}}{x+1}+\frac{\frac{1}{3}x+\frac{1}{3}}{x^2-x+1}\right]\mathrm{d}x\\\\
=&\frac{1}{2}x^2+\frac{1}{3}\ln|x+1|-\int \frac{\frac{1}{3}(x-0.5)+\frac{1}{2}}{(x-0.5)^2+0.75}\mathrm{d}(x-0.5)\\\\
=&\frac{1}{2}x^2+\frac{1}{3}\ln|x+1|-\int \frac{\frac{1}{3}t+\frac{1}{2}}{t^2+0.75}\mathrm{d}t\\\\
=&\frac{1}{2}x^2+\frac{1}{3}\ln|x+1|-\frac{1}{6}\ln|(x-\frac{1}{2})^2+\frac{3}{4}|+\frac{\sqrt{3}}{3}\arctan(\frac{2\sqrt{3}}{3}(x-\frac{1}{2}))+C\\\\
=&\frac{1}{6}\left\\{3x^2+2\ln|x+1|-\ln(x^2-x+1)-2\sqrt{3}\arctan(\frac{2x-1}{\sqrt{3}})\right\\}+C
\end{aligned}
$$

## 例题

我们再给出几个例题

### 例二(分母无重因子)

$$
\int \frac{\mathrm{d}x}{(x^2+1)(x^2+x)}
$$
解:
$$
\begin{aligned}
&\int \frac{\mathrm{d}x}{(x^2+1)(x^2+x)}\\\\
&=\int\left[\frac{1}{x}-\frac{1}{2(x+1)}-\frac{1+x}{2\left(x^{2}+1\right)}\right] \mathrm{d} x \\\\
&=\ln |x|-\frac{1}{2} \ln |x+1|-\frac{1}{2} \arctan x-\frac{1}{4} \int \frac{\mathrm{d}\left(x^{2}+1\right)}{x^{2}+1} \\\\
&=\ln |x|-\frac{1}{2} \ln |x+1|-\frac{1}{2} \arctan x-\frac{1}{4} \ln \left(x^{2}+1\right)+C
\end{aligned}
$$

### 例三(分母有重因子)

$$
\int \frac{x^{2}+1}{(x+1)^{2}(x-1)} \mathrm{d} x
$$
解:
$$
\begin{aligned}
&\int \frac{x^{2}+1}{(x+1)^{2}(x-1)} \mathrm{d} x\\\\
=&\int\left[\frac{1}{2(x+1)}-\frac{1}{(x+1)^{2}}+\frac{1}{2(x-1)} \mathrm{d}x\right]\\\\
=&\frac{1}{2} \ln \left|x^{2}-1\right|+\frac{1}{x+1}+C
\end{aligned}
$$

### 例四(分母无实根)

$$
\int \frac{x^2+1}{x^4+1}\mathrm{d}x
$$
解:
$$
\begin{aligned}
F(x)=& \frac{1}{2} \int \frac{d x}{x^{2}-\sqrt{2} x+1}+ \frac{1}{2} \int \frac{d x}{x^{2}+\sqrt{2} x+1} \\\\
=& \frac{1}{2} \int \frac{d x}{\left(x-\frac{\sqrt{2}}{2}\right)^{2}+\frac{1}{2}}+ \frac{1}{2} \int \frac{d x}{\left(x+\frac{\sqrt{2}}{2}\right)^{2}+\frac{1}{2}}\\\\
=&\frac{1}{\sqrt{2}} \arctan (\sqrt{2} x-1)+ \frac{1}{\sqrt{2}} \arctan (\sqrt{2} x+1)+C
\end{aligned}
$$

### 例五(经典题)

$$
\int \frac{\mathrm{d} x}{x^{3}+1}
$$
解:
$$
\begin{aligned}
& \int \frac{\mathrm{d} x}{x^{3}+1}\\\\
=&\int\left[\frac{1}{3(x+1)}-\frac{x-2}{3\left(x^{2}-x+1\right)}\right] \mathrm{d} x \\\\
=& \frac{1}{3} \int \frac{\mathrm{d} x}{x+1}-\frac{1}{6} \int \frac{2 x-1}{x^{2}-x+1} \mathrm{~d} x+\frac{1}{2} \int \frac{\mathrm{d}\left(x-\frac{1}{2}\right)}{\left(x-\frac{1}{2}\right)^{2}+\frac{3}{4}} \\\\
=& \frac{1}{6} \ln \frac{(x+1)^{2}}{x^{2}-x+1}+\frac{1}{\sqrt{3}} \arctan \frac{2 x-1}{\sqrt{3}}+C .
\end{aligned}
$$

### 例六(最好别用我们的范式)

$$
\int \frac{\mathrm{d} x}{x^{4}-1}
$$
解:
$$
\begin{aligned}
&\int \frac{\mathrm{d} x}{x^{4}-1}\\\\
=&\frac{1}{2} \int\left[\frac{1}{x^{2}-1}-\frac{1}{x^{2}+1}\right] \mathrm{d} x\\\\
=&\frac{1}{4} \ln \left|\frac{x-1}{x+1}\right|-\frac{1}{2} \arctan x+C
\end{aligned}
$$

## 结语

至此, 有理函数积分的范式就介绍完了. 但是切忌盲目使用此方法, 老实说这种范式更加适合计算机——没有任何技巧性但是运算量较大. 更多时候积分的题目还是需要运用一些技巧灵活应对, 不过当你手足无措的时候, 不要忘了还有这样一套办法.

祝你好运！
