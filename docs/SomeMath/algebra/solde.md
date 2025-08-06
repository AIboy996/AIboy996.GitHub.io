---
tags:
- Algebra
include:
- math
---

# 常系数线性微分方程组

## 方程形式

所谓的常系数线性微分方程组(System of ODEs), 指的是形如下列的微分方程组.

**矩阵形式**：
$$
\frac{\partial \mathbf{y}}{\partial x}=A\mathbf{y}+\mathbf{b}(x)
$$
其中$\mathbf{y}$和$\mathbf{b}$都是一元$n$维向量值函数, $A\in \mathbb{R}^{n\times n}$为常系数矩阵.

或者**分量形式**：
$$
\begin{cases}
y_1'=a_{11}y_1+a_{12}y_2+\cdots a_{1n}y_n+b_1(x)\\\\
y_2'=a_{21}y_1+a_{22}y_2+\cdots a_{2n}y_n+b_2(x)\\\\
\quad\vdots\\\\
y_n'=a_{n1}y_1+a_{n2}y_2+\cdots a_{nn}y_n+b_n(x)
\end{cases}
$$

## Intuition

### 非齐次到齐次

考虑$n=1$的情形
$$
y'=ay+b(x)
$$
这样的方程称为一阶常系数线性微分方程.

不难发现, 如若$f^\star$是一个特解, 那么对任何一个解$g$
$$
\begin{aligned}
g'&=ag+b(x)\\\\
{f^\star}'&=af^\star+b(x)
\end{aligned}
$$
两式相减得到$g-f^\star$满足的微分方程
$$
(g-f^\star)'=a(g-f^\star)
$$
于是我们只需要求该齐次线性微分方程
$$
y'=ay
$$
的通解$h$,然后加上一个特解$f^\star$,即可得到原方程的通解
$$
g=h+f^\star
$$
这样的性质是由于方程的**线性形式**. 在$n>1$的情形下有类似的性质.

### 齐次方程

如此一来问题的核心就转化为**齐次微分方程**的求解, 因为情况下一般特解$f^\star$是很容易求得的（？）.
$$
y'=ay
$$
而上面这个齐次方程很容易解得：
$$
y=e^{ax}C
$$
是它的通解.

最后我们解得
$$
\begin{aligned}
&y'=ay+b(x)\\\\
\implies &y=e^{ax}C+y^\star
\end{aligned}
$$

### 类推

如此一来, 我们忍不住遐想$n>1$的情形, 是否有同样的形式呢?
$$
\begin{aligned}
&\frac{\partial \mathbf{y}}{\partial x}=A\mathbf{y}+\mathbf{b}(x)\\\\
\overset{?}{\implies} &\mathbf{y}=e^{Ax}C+\mathbf{y}^\star
\end{aligned}
$$
答案是肯定的.

## 解的形式

### 矩阵指数的性质

高等代数中定义了这样一个矩阵函数:
$$
e^A = \sum_{n=0}^{\infty}\frac{A^n}{n!}
$$
可以这样定义的原因在于幂级数
$$
\sum_{n=0}^{\infty}\frac{x^n}{n!}
$$
收敛半径为无穷, 因此任何一个矩阵的谱半径都在收敛域内，矩阵级数也就收敛.

类似我们熟悉的指数函数, 矩阵指数函数有如下几个性质

- 若$AB=BA$, 则
$$e^{A+B}=e^Ae^B$$
- 若$P$非奇异, 则
$$e^{PAP^{-1}}=Pe^AP^{-1}$$
- 对任意的$A$, 矩阵$e^A$可逆, 且

$$
(e^A)^{-1}=e^{-A}
$$

- 对于一个指数矩阵函数
    $$
    \mathbf{\Phi}(x)=e^{Ax}=\sum_{n=0}^{\infty}\frac{x^nA^n}{n!}
    $$
    在任意有限区间上一致收敛, 因而逐项可导.

### 通解的导出

那么我们逐项求导即得
$$
\begin{aligned}
&\frac{\partial\mathbf{\Phi}(x)}{\partial x}\\\\
=&\frac{\partial e^{Ax}}{\partial x}\\\\
=&\sum_{n=1}^{\infty}\frac{nx^{n-1}A^n}{n!}\\\\
=&A\sum_{n=1}^{\infty}\frac{x^{n-1}A^{n-1}}{(n-1)!}\\\\
=&Ae^{Ax}\\
\end{aligned}
$$

这也就暗涵了
$$
\frac{\partial \mathbf{y}}{\partial x}=A\mathbf{y}
$$
的通解为
$$
y=e^{Ax}C
$$
其中$C\in \mathbb{R}^{n\times 1}$, 那么按照前面所述的性质, 再加上任意一个特解即得一般的常系数线性微分方程组的通解.

### 求解$e^{Ax}$

那么核心问题就转化为了如何求$e^{Ax}$这个线性代数的问题.

实际操作的时候, 对于$e^{Ax}$的处理办法万变不离其宗, 可以把$A$对角化(谱分解), 或是利用$A$的Jordan标准型, 还有先确定$e^{Ax}C$的基向量然后使用待定系数法等, 但总体上还是依赖于幂级数的定义, 这里不再赘述.

只给出最常用的一种简单情形, 若$A$有$n$个不同的特征值. 那么
$$
A = PDP^{-1}
$$
也就有
$$
e^{Ax}=Pe^{xD}P^{-1}
$$
其中$xD=\mathrm{diag}\\{x\lambda_1,\cdots,x\lambda_n\\}$, 很容易得到
$$
e^{xD}=\sum_{n\ge0}\frac{(xD)^n}{n!}=\mathrm{diag}\\{e^{x\lambda_1},\cdots,e^{x\lambda_n}\\}
$$
从而可以求得$e^{Ax}$.

通解为
$$
y=e^{Ax}C=Pe^{xD}P^{-1}C
$$
其中$P^{-1}$不易求得, 但是$P$是一个满秩矩阵,$P^{-1}C$的自由度仍然是$n$. 因而可以把$P^{-1}C$整体作为自由系数, 那么通解为
$$
y=Pe^{xD}C
$$

## 应用

最后举一个随机过程中的例子.

!!! question
    一个机器需要添加润滑油才能工作, 设添加一次润滑油后能正常工作的时长$X\sim \exp(\mu)$, 停止工作后重新添加润滑油耗时$Y\sim \exp(\lambda)$. 已知机器在$t=0$时刻工作, 问机器在$t=10$时正常工作的概率.

这是一个**生灭过程**. 状态空间为$\\{0,1\\}$, 其中$0$表示不工作, $1$表示工作. 我们的目标是求转移概率$P_{1,1}(10)$

根据题意可知以下参数

- 从不工作转化为工作的速率为$v_0=\lambda$
- 从工作转化为不工作的速率为$v_1=\mu$
- 状态间转移概率$P_{0,1}=1,P_{1,0}=1$
- 生速率$\lambda_0=\lambda,\lambda_i=0 \quad i\ne0$
- 灭速率$\mu_1=\mu,\mu_i=0 \quad i\ne1$

于是我们根据柯尔莫哥洛夫向后方程
$$
{P_{i,j}'}(t)=\lambda_i P_{i+1,j}(t)+\mu_iP_{i-1,j}(t)-(\lambda_i+\mu_i)P_{i,j}(t)
$$
列出微分方程组
$$
\begin{aligned}
&P_{1,1}'(t)=\mu\left[P_{0,1}(t)-P_{1,1}(t)\right]\\\\
&P_{0,1}'(t)=\lambda\left[P_{1,1}(t)-P_{0,1}(t)\right]
\end{aligned}
$$
矩阵形式为
$$
\frac{\partial}{\partial t}\begin{bmatrix}
P_{1,1}(t)\\\\
P_{0,1}(t)
\end{bmatrix}=
\begin{bmatrix}
-\mu & \mu\\\\
\lambda &-\lambda
\end{bmatrix}
\begin{bmatrix}
P_{1,1}(t)\\\\
P_{0,1}(t)
\end{bmatrix}
$$
这是一个常系数齐次线性微分方程组, 通解为
$$
\begin{bmatrix}
P_{1,1}(t)\\\\
P_{0,1}(t)
\end{bmatrix}=e^{At}C
$$
下面我们考察$e^{At}$
$$
A=\begin{bmatrix}
-\mu & \mu\\\\
\lambda &-\lambda
\end{bmatrix}
$$
特征向量为
$$
\mathbf{\gamma_1}=\begin{bmatrix}
1\\\\
1
\end{bmatrix}
$$
满足$A\mathbf{\gamma_1}=0\mathbf{\gamma_1}$

和
$$
\mathbf{\gamma_2}=\begin{bmatrix}
-\mu\\\\
\lambda
\end{bmatrix}
$$
满足
$A\mathbf{\gamma_2}=-(\lambda+\mu)\mathbf{\gamma_2}$

根据上述两个不相等的特征值以及他们对应的特征向量, 通解为
$$
\begin{bmatrix}
P_{1,1}(t)\\\\
P_{0,1}(t)
\end{bmatrix}=\begin{bmatrix}
1&-\mu e^{-(\lambda+\mu)t}\\\\
1&\lambda e^{-(\lambda+\mu)t}
\end{bmatrix}C
$$
根据边界条件
$$
\begin{bmatrix}
P_{1,1}(0)\\\\
P_{0,1}(0)
\end{bmatrix}=
\begin{bmatrix}
1\\\\
0
\end{bmatrix}
$$
解得
$$
C=\begin{bmatrix}
\frac{\lambda}{\lambda+\mu}\\\\
\frac{-1}{\lambda+\mu}
\end{bmatrix}
$$
于是
$$
\begin{aligned}
\begin{bmatrix}
P_{1,1}(t)\\\\
P_{0,1}(t)
\end{bmatrix}
=&\begin{bmatrix}
1&-\mu e^{-(\lambda+\mu)t}\\\\
1&\lambda e^{-(\lambda+\mu)t}
\end{bmatrix}\begin{bmatrix}
\frac{\lambda}{\lambda+\mu}\\\\
\frac{-1}{\lambda+\mu}
\end{bmatrix}\\\\
=&\begin{bmatrix}
\frac{\lambda+\mu e^{-(\lambda+\mu)t}}{\lambda+\mu}\\\\
\frac{\lambda-\lambda e^{-(\lambda+\mu)t}}{\lambda+\mu}
\end{bmatrix}
\end{aligned}
$$
所以
$$
P_{1,1}(10)=\frac{\lambda+\mu e^{-10(\lambda+\mu)}}{\lambda+\mu}
$$
