---
tags:
- 概率论
include:
- math
---

# 随机变量的函数

## 题目

!!! question
    已知一随机变量$X$的分布函数$F(x)$如下
    $$
    X\sim F(x)=
    \begin{aligned}
    \begin{cases}
    &0&x<0\\\\
    &\frac{1}{4}+\frac{3}{4}x&0\leq x\leq1\\\\
    &1&x>1
    \end{cases}
    \end{aligned}
    $$
    而$Y=-\ln F(X)$，求$Y$的分布函数

## 存疑

### 有这样一种做法

显然$X$仅在$(0,1)$上有密度累计，于是考虑$y(x)=-\ln F(x),x\in (0,1),y\in (0,\ln4)$的逆变换，$x(y)=(4e^{-y}-1)/3$，那么$Y$在$(0,\ln4)$密度函数为
$$
\begin{aligned}
g(y)&=f(x(y))\left|\frac{dx(y)}{dy}\right|\\\\
&=\frac{dF(x)}{dx}\mid_{x=x(y)}\times\left|\frac{dx(y)}{dy}\right|\\\\
&=\frac{3}{4}\times\frac{4}{3}e^{-y}\\\\
&=e^{-y}
\end{aligned}
$$
于是$Y$的分布函数为：
$$
G_Y(y)=
\begin{aligned}
\begin{cases}
&0&y<0\\\\
&\int_{0}^{y}g(y)dy&0\leq y<\ln4\\\\
&1&y\geq\ln4
\end{cases}
\end{aligned}
$$
计算得：
$$
G_Y(y)=
\begin{aligned}
\begin{cases}
&0&y<0\\\\
&1-e^{-y}&0\leq y<\ln4\\\\
&1&y\geq\ln4
\end{cases}
\end{aligned}
$$
虽然这样做出来的答案是正确的，但是过程非常糟糕。我们没有讨论任何的边界情况，仅仅是随意地给他们赋了值。另外这种求逆变换、导数的方法实际上只适用于连续随机变量，我们后续会说明**$X$并非连续随机变量**。

### 还有另外一种做法

我们避开$Y$的密度函数，直接用定义求$Y$的分布函数：
$$
\begin{aligned}
&G_Y(y)\\\\
=&P(Y\leq y)\\\\
=&P(-\ln F(X)\leq y)\\\\
=&\begin{cases}
\begin{aligned}
&0&y<0\\\\
&P(X\ge \frac{4e^{-y}-1}{3})&0\leq y<\ln4\\\\
&1&y\geq\ln4
\end{aligned}\end{cases}\\\\
=&\begin{cases}
\begin{aligned}
&0&y<0\\\\
&1-P(0 \le X < \frac{4e^{-y}-1}{3})&0\leq y<\ln4\\\\
&1&y\geq\ln4
\end{aligned}\end{cases}
\end{aligned}
$$
其中：
$$
\begin{aligned}
&P(0 \le X < \frac{4e^{-y}-1}{3})\\\\
=&\int_{0}^{\frac{4e^{-y}-1}{3}}\frac{3}{4}dx=e^{-y}-\frac{1}{4}
\end{aligned}
$$
于是
$$
G_Y(y)=
\begin{cases}
\begin{aligned}
&0&y<0\\\\
&\frac{5}{4}-e^{-y}&0\leq y<\ln4\\\\
&1&y\geq\ln4
\end{aligned}
\end{cases}
$$
这里得出的答案就显然不正确了，$G_Y(y)$在$0$处取到了大于$1$的值。**错误的关键就在于**
$$
P(0 \le X < \frac{4e^{-y}-1}{3})\ne\int_{0}^{\frac{4e^{-y}-1}{3}}\frac{3}{4}dx
$$
这是由于$X$并非连续随机变量，在$0$这一点处**有异常的概率累计**。

正确的计算应该是：
$$
\begin{aligned}
&P(0 \le X < \frac{4e^{-y}-1}{3})\\\\
=&P(X \le \frac{4e^{-y}-1}{3})\\\\
&-P(X=\frac{4e^{-y}-1}{3})\\\\
&-P(X\le 0)+P(X=0)\\\\
\\\\
=&F(\frac{4e^{-y}-1}{3})-0-F(0)\\\\
&+\left[F(0)-\lim_{x\to 0^-}F(x)\right]\\\\
\\\\
=&e^{-y}
\end{aligned}
$$
这样就可以导出正确的答案。

## 分析

这个题目的关键在于$X$并不是连续的随机变量，因为$X$的分布函数$F(x)$在$x=0$这一点不连续，可一个连续随机变量的分布函数应该是处处连续的；

或者从另外一个角度也可以得到同样的结论，考虑$X$落在$0$ 这一点的概率：
$$
\begin{aligned}
&P(X=0)\\\\
=&F(0)-\lim_{x\to 0-}F(x)\\\\
=&\frac{1}{4}-0\\\\
=&\frac{1}{4}
\end{aligned}
$$
而一个连续随机变量落在一个单独点的概率是$0$，所以$X$不是连续随机变量。

进而$X$根本不存在密度函数（这个概念是对于连续随机变量而言的），这题在求$Y$的分布函数时不能简单的使用随机变量的变换（求逆变换，然后求导数尔尔）来求，而应该从定义出发：
$$
\begin{aligned}
&G_Y(y)\\\\
=&P(Y\leq y)\\\\
=&P(-\ln F(X)\leq y)
\end{aligned}
$$

## 正解

具体做法如下：
$$
\begin{aligned}
G_Y(y)=&P(Y\leq y)=P(-\ln F(X)\leq y)\\\\
=&P(F(X)\geq e^{-y})\quad\text{(#)}\\\\
\\\\
&\text{(全概率)}\\\\
=&P(F(X)\geq e^{-y}\mid X<0)\\\\
&+P(F(X)\geq e^{-y}\mid X>1)\\\\
&+P(F(X)\geq e^{-y}\mid 0\leq X\leq 1)\\\\
=&P(0\geq e^{-y}\mid X<0)\\\\
&+P(1\geq e^{-y}\mid X>1)\\\\
&+P(\frac{1}{4}+\frac{3}{4}X\geq e^{-y}\mid 0\leq X\leq 1)\\\\
\\\\
&\text{(前两项为0)}\\\\
=&P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4})\mid 0\leq X\leq 1)\\\\
\\\\
&\text{(条件概率)}\\\\
=&\frac{P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4}), 0\leq X\leq 1)}{P(0\leq X\leq 1)}\\\\
=&P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4}), 0\leq X\leq 1)\end{aligned}
$$

其实这题可以直接看出$G_Y(y)=P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4}), 0\leq X\leq 1)$, 可以直接写，条件概率的推导过程只是为了说的更清楚也更具有一般性, 另外这里特别要注意(#)式中的$X$是一个随机变量，不可以简单的带入$F(x)$，应该从概率事件的角度来理解。

以下分情况讨论：

### $1^o$

当$0\le y < \ln4$时，$0 < e^{-y}-\frac{1}{4}\le1$
$$\begin{aligned}
&P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4}), 0\leq X\leq 1)\\\\
=&P(\frac{4}{3}(e^{-y}-\frac{1}{4})\leq X\leq1)\\\\
=&F(1)-F(\frac{4}{3}(e^{-y}-\frac{1}{4}))\\\\
=&1-e^{-y}\end{aligned}$$
$y=\ln4$不放入此情况是因为$y=\ln4$时$P(0\leq X\leq 1)$中间存在$F(x)$的不连续点$0$，形式不统一故单独讨论。
### $2^o$
当$y<0$时，$e^{-y}-\frac{1}{4}> 1$
$$
\begin{aligned}
&P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4}), 0\leq X\leq 1)\\\\
=&P(\emptyset)\\\\
=&0
\end{aligned}
$$
### $3^o$
当$y>\ln4$时，$e^{-y}-\frac{1}{4}< 0$
$$
\begin{aligned}
&P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4}), 0\leq X\leq 1)\\\\
=&P(\frac{4}{3}(e^{-y}-\frac{1}{4})\leq X\leq 1)\\\\
=&1
\end{aligned}
$$
### $4^o$
当$y=\ln4$时，$e^{-y}-\frac{1}{4}=0$
$$
\begin{aligned}
&P(X\geq \frac{4}{3}(e^{-y}-\frac{1}{4}), 0\leq X\leq 1)\\\\
=&P(0\leq X\leq 1)\\\\
=&1
\end{aligned}
$$
综上所述:
$$
G_Y(y)=
\begin{cases}
\begin{aligned}
&0&y<0\\\\
&1-e^{-y}&0\leq y<\ln4\\\\
&1&y\geq\ln4
\end{aligned}
\end{cases}
$$

此致。
