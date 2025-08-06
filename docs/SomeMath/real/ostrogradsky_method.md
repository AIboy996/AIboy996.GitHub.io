---
tags:
- Calculus
include:
- math
---

# 奥式方法

奧斯特罗格拉德斯基（Ostrogradski）方法（下称奥式方法, 毕竟俄国数学家~名字老长了）是一种**从有理函数不定积分中分离出有理部分**的技术. 使用这一技术有时可以极大的简化复杂有理函数的积分.

例如
$$
\begin{aligned}
&F(x)\\\\
=&\int f(x)\mathrm{d}x\\\\
=&\int \frac{x^{2}+1}{(x+1)^{2}(x-1)} \mathrm{d} x\\\\
=&\int\left[\frac{1}{2(x+1)}-\frac{1}{(x+1)^{2}}+\frac{1}{2(x-1)} \mathrm{d}x\right]\\\\
=&\frac{1}{2} \ln \left|x^{2}-1\right|+\frac{1}{x+1}+C
\end{aligned}
$$
其中
$$
\frac{1}{x+1}
$$
称为$F(x)$的有理部分
$$\frac{1}{2}\ln|x^2-1|$$
称为$F(x)$的无理部分.

## 方法范式

设
$$
\frac{P(x)}{Q(x)}
$$
是被积函数, 如果它是假分式就用带余除法分解出一个整式即可, 所以我们只考虑它是有理真分式的情况, 也即是
$$
\deg P(x) \lt \deg Q(x)
$$
那么存在如下分解
$$
\int \frac{P(x)}{Q(x)}\mathrm{d}x=\frac{P_1(x)}{Q_1(x)}+\int \frac{P_2(x)}{Q_2(x)}\mathrm{d}x
$$
其中
$$
\frac{P_1(x)}{Q_1(x)}, \quad \frac{P_2(x)}{Q_2(x)}
$$
都是有理真分式, $Q_2(x)$的根与$Q(x)$的根相同, 但都是一重根, 并且有
$$
Q_1(x)Q_2(x)=Q(x)
$$
$P_1(x)$和$P_2(x)$可以利用待定系数法求出:
$$
\frac{P(x)}{Q(x)}=\frac{\mathrm{d}}{\mathrm{d}x}\frac{P_1(x)}{Q_1(x)}+\frac{P_2(x)}{Q_2(x)}
$$
这么说比较抽象, 我们还是用前面那个例子实操一下.

$$
\frac{P(x)}{Q(x)}=\frac{x^{2}+1}{(x+1)^{2}(x-1)}
$$
那么
$$
\begin{aligned}
&Q(x)=(x+1)^2(x-1)\\\\
\Rightarrow
&Q_2(x)=(x+1)(x-1)\\\\
\Rightarrow
&Q_1(x)=x+1
\end{aligned}
$$
设
$$
\begin{aligned}
&P_1(x)=a\\\\
&P_2(x)=bx+c
\end{aligned}
$$
这么设的依据是奥式方法中的$P_{1,2}(x)/Q_{1,2}(x)$是真分式.

于是我们得到
$$
\frac{x^{2}+1}{(x+1)^{2}(x-1)}=\frac{\mathrm{d}}{\mathrm{d}x}\frac{a}{x+1}+\frac{bx+c}{(x+1)(x-1)}
$$
也就是
$$
\begin{aligned}
&\frac{x^{2}+1}{(x+1)^{2}(x-1)}\\\\
=&\frac{-a}{(x+1)^2}+\frac{bx+c}{(x+1)(x-1))}\\\\
=&\frac{-a(x-1)+(bx+c)(x+1)}{(x+1)^2(x-1)}\\\\
\end{aligned}
$$
得到
$$
x^2+1=bx^2+(-a+b+c)x+a+c
$$
于是
$$
a=1 \quad b=1 \quad c=0
$$
回代得到
$$
\begin{aligned}
&\int \frac{x^{2}+1}{(x+1)^{2}(x-1)} \mathrm{d}\\\\
=&\frac{1}{x+1}+\int \frac{x}{(x+1)(x-1)}\mathrm{d}x
\end{aligned}
$$
我们也就在不完全求解原积分的情况下求得了有理部分为
$$
\frac{1}{x+1}
$$
这样的方法比起完全的部分分式分解要简单得多.

## 原理
>
> 奥式方法作为一个出现在卓里奇.数学分析.上册.第五章.第七节-原函数, 笔者也是从这里学到的这个方法. 这个方法虽然出现在分析学的书中, 但是更多地依赖的是代数学的理论.
>
### 部分分式分解

根据上一篇笔记介绍的[部分分式分解定理](./rational_func_int.md#_5), 任一有理函数都可以在实数域内分解为如下形式:
$$
\begin{aligned}
&\frac{P(x)}{Q(x)}\\\\
=&\sum_{i=1}^{s}\sum_{k=1}^{d_i}\frac{A_{ik}}{(x-a_i)^k}+\sum_{j=1}^{t}\sum_{k=1}^{e_j}\frac{B_{jk}x+C_{jk}}{(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)^k}\\\\
\end{aligned}
$$
上面这个东西做不定积分, 结果有下面几类

- 对数函数(超越函数)

$$
\int \frac{A_{ik}}{x-a_i}\mathrm{d}x
$$

- 对数函数+反正切函数(超越函数)

$$
\int\frac{B_{jk}x+C_{jk}}{x^2-2\alpha_j x+\alpha_j^2+\beta_j^2}\mathrm{d}x
$$

- 有理函数

$$
\int \frac{A_{ik}}{(x-a_i)^k}\mathrm{d}x
$$

- 有理函数

$$
\int\frac{B_{jk}x}{(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)^k}\mathrm{d}x
$$

- 以及比较复杂的有理函数+超越函数

$$
\int\frac{C_{jk}}{(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)^k}\mathrm{d}x
$$

### 最后一类不定积分的计算

> 这个积分刚好是吉米多维奇习题集中的习题#1921

前面几类比较显然, 下面我们来考察最后一类函数的积分

> 可以通过换元简化为如下形式

$$
\begin{aligned}
&I_k\\\\
=&\int \frac{1}{(x^2+c)^k}\mathrm{d}x\\\\
=&\frac{x}{(x^2+c)^k}-\int \frac{-2kx^2}{(x^2+c)^{k+1}}\mathrm{d}x\\\\
=&\frac{x}{(x^2+c)^k}+2k\int \frac{(x^2+c)-c}{(x^2+c)^{k+1}}\mathrm{d}x\\\\
=&\frac{x}{(x^2+c)^k}+2kI_k-2kcI_{k+1}
\end{aligned}
$$
得到$k\ge 1$时的递推式
$$
I_{k+1}=\frac{2k-1}{2kc}I_k+\frac{x}{2kc(x^2+c)^k}
$$
并且
$$
I_1=\frac{1}{c}\arctan(\frac{x}{c})
$$
于是$k\ge 2$时
$$
\begin{aligned}
&I_k\\\\
=&\frac{x}{2(k-1)c(x^2+c)^{k-1}}\\\\
&+\frac{2k-3}{2(k-1)c}\frac{x}{2(k-2)c(x^2+c)^{k-2}}\\\\
&\cdots\\\\
&+\frac{(2k-1)!!}{(2k)!!c^{k-1}}I_1\\\\
=&\sum_{n=1}^{k-1}\frac{c_nx}{(x^2+c)^n}+c_kI_1
\end{aligned}
$$
其中$c_n,n=1,2,...,k$为实系数. 由此可见最后一类的积分是混合着有理函数和超越函数的, 其中超越函数部分为$c_kI_1$

现在我们把所有的超越函数集中起来
$$
\begin{aligned}
&\int \sum_i\frac{A_{ik}}{x-a_i}\mathrm{d}x+\\\\
&\int\sum_j\frac{B_{jk}x+C_{jk}}{x^2-2\alpha_j x+\alpha_j^2+\beta_j^2}\mathrm{d}x+\\\\
&\int\sum_k\frac{c_kC_{jk}}{x^2-2\alpha_j x+\alpha_j^2+\beta_j^2}\mathrm{d}x
\end{aligned}
$$
可以看到通分之后的分母就是奥式方法所述的$Q_2(x)$, 也即$Q(x)$所有一次因子的积.

同样的我们把所有有理函数集中起来
$$
\begin{aligned}
&\int \sum_{k\gt1}\sum_i\frac{A_{ik}}{(x-a_i)^k}\mathrm{d}x+\\\\
&\int \sum_{k\gt1}\sum_j\frac{B_{jk}x}{(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)^k}\mathrm{d}x\\\\
&\sum_{k\gt1}\sum_{n=1}^{k-1}\frac{c_nC_{jk}x}{(x^2-2\alpha_j x+\alpha_j^2+\beta_j^2)^n}
\end{aligned}
$$
不难看出它的分母就是$Q_1(x)=Q(x)/Q_2(x)$, 也就是$Q(x)$所有的因子去掉一重.

这也就证明了奥式方法的分解形式
$$
\int \frac{P(x)}{Q(x)}\mathrm{d}x=\frac{P_1(x)}{Q_1(x)}+\int \frac{P_2(x)}{Q_2(x)}\mathrm{d}x
$$
其中
$$
\frac{P_1(x)}{Q_1(x)}和\frac{P_2(x)}{Q_2(x)}
$$
都是有理真分式显然成立, 否则左侧的被积函数不可能为有理真分式.

## 更进一步

证明完之后, 不难发现奥式方法虽然看起来很美好, 但也不是那么好用的. 想要从$Q(x)$得到$Q_2(x)$可没那么容易.

前面的例子中
$$
Q(x)=(x+1)^2(x-1)
$$
已经做好了因式分解, 可以直接得到
$$
Q_2(x)=(x+1)(x-1)
$$
现实生活可没有那么美好, 往往我们得到的式子都是没有好看的根的, 于是下面我们来介绍一种代数方法来求得$Q_2(x)$.

### 多项式无重因式的充分必要条件

!!! theorem
    **定理5.4.3**

    数域$\mathbb{K}$上的多项式$f(x)$没有重因子的充分必要条件是$f(x)$与它的导数$f'(x)$互素.  

    > 摘自姚慕生.高等代数学.复旦大学出版社.第三版

显然, 当$Q(x)$没有重因子时, $Q_2(x)= Q(x),Q_1(x)\equiv 1$那么$P_1(x)\equiv 0$,否则$P/Q$不成为真分式. 也就是说此时, 积分式没有有理部分.

这种情况比较简单, 我们考虑这个定理的逆否命题. 也就是当$Q(x)$存在重因子时, $Q(x)$与$Q'(x)$有公因式, 那么这个公因式是什么呢? 实际上就是我们的$Q_1(x)$.

也就是说下式总是成立的, $Q(x)$和$Q'(x)$最大公因式(何谓最大公因式很容易数论中的概念推广过来)
$$
\left(Q(x),Q'(x)\right)=Q_1(x)
$$

这也就是下述命题
!!! theorem
    **命题5.4.1**

    设$d(x)=(f(x),f'(x))$, 则$f(x)/d(x)$是一个没有重因式的多项式, 且这个多项式的不可约因式与$f(x)$的不可约因式相同(不计重数).  
    
    > 摘自姚慕生.高等代数学.复旦大学出版社.第三版

证明过程我就不摘过来了, 感兴趣的可以去看看, 我们直接把这个命题运用到奥式方法中.

用一个例题来说明
$$
\begin{aligned}
&P(x)=2x^6+3x^5+6x^4+6x^3+10x^2+3x+2\\\\
&Q(x)=x^7+3x^6+5x^5+7x^4+7x^3+5x^2+3x+1
\end{aligned}
$$

> 本题即是前文提到的卓里奇数学分析课后习题的一部分

这个题显然就不能求根来做了, 我们知道高次方程往往是不能求根的, 只能另辟蹊径.

现在我要求$Q_1(x)$, 即是求
$$
Q'(x)=7x^6+18x^5+25x^4+28x^3+21x^2+10x+3
$$
和
$$
Q(x)=x^7+3x^6+5x^5+7x^4+7x^3+5x^2+3x+1
$$
的最大公因式. 类比我们小学二年级学过的欧几里得辗转相除法, 我们也可以这么来求多项式的最大公因式. 过程比较繁琐, 好在我们可以用计算机实现.

下面使用python的`sympy`库实现符号计算

```python
>>> import sympy as sp
>>> x = sp.symbols("x")
>>> qx = x**7+3*x**6+5*x**5+7*x**4+7*x**3+5*x**2+3*x+1
>>> q1 = sp.gcd(qx, qx.diff(x)) # 最大公因式
>>> q2 = sp.cancel(qx/q1) # 约分
>>> q1
x**4 + 2*x**3 + 2*x**2 + 2*x + 1
>>> q2
x**3 + x**2 + x + 1
>>> sp.expand(q1*q2) == qx # 检验
True
```

我们得到了很漂亮的结果(我估摸着也是卓里奇凑出来的)
$$
\begin{aligned}
Q_1(x)=&(Q(x),Q'(x))\\\\
=&x^4+2x^3+2x^2+2x+1
\end{aligned}
$$
和
$$
\begin{aligned}
Q_2(x)=&Q(x)/Q_1(x)\\\\
=&x^3+x^2+x+1
\end{aligned}
$$
下面的问题就迎刃而解了.

我们接着上面的程序把答案算出来(手算太麻烦了, 也没必要)

```python
>>> px = 2*x**6+3*x**5+6*x**4+6*x**3+10*x**2+3*x+2
>>> sp.integrate(px/qx,x)
(3*x**3 + x**2 + x - 1)/(2*x**4 + 4*x**3 + 4*x**2 + 4*x + 2) 
+ log(x + 1) 
+ log(x**2 + 1)/2 
- atan(x)/2
```

也就是
$$
\begin{aligned}
&\int \frac{P(x)}{Q(x)}\mathrm{d}x\\\\
=&\frac{3x^3+x^2+x-1}{2x^4+4x^3+4x^2+4x+2}\\\\
&+\ln|x+1|+\frac{1}{2}\ln(x^2+1)\\\\
&-\frac{1}{2}\arctan x +C
\end{aligned}
$$
可以看到有理部分的分母确实就是我们算出来的$Q(x)$和$Q'(x)$最大公因式.
