---
tags:
  - 时间序列
---
介绍如何求解一般的线性齐次差分方程，分为两种理解方式

- 特征方程
- 差分算子

以下的定义和定理可以对举着来看
## 定义1（线性齐次递推）

一个常系数的**k阶**线性**齐次**递推关系是形如：
$$
a_n = c_1a_{n-1}+c_2a_{n-2}+\cdots+c_ka_{n-k}\tag{1}
$$
的递推关系，其中$c_i,i=1,2,\cdots,k$ 是实数，$c_k\ne0$。

## 定义2（线性齐次差分方程）

如果定义了延迟算子$B$，那么（1）式也可以写成一个k阶线性齐次差分方程：
$$
\left(1-c_1B-c_2B^2-\cdots-c_kB^k\right)a_n=0\tag{2}
$$
其中$B$ 为延迟算子，$B^ka_n = a_{n-k}$。

## 定义3（特征方程）

如果$a_n = r^n(r\ne0)$是（1）式的一个解，那么就有：
$$
r^n = c_1r^{n-1}+c_2r^{n-2}+\cdots+c_kr^{n-k}\tag{3}
$$
等价变换为**特征方程**：
$$
r^k-c_1r^{k-1}-c_2r^{k-2}-\cdots-c_{k-1}r-c_k=0\tag{4}
$$
因此，$a_n = r^n(r\ne0)$是（1）式的一个解，当且仅当$r$是上述特征方程的一根，特征方程的根称为**特征根**。

## 定义4（延迟算子多项式）

（2）式中的延迟算子的多项式写为：
$$
C(B) =1-c_1B-c_2B^2-\cdots-c_kB^k\tag{5}
$$
若$1/r$是$C(B)=0$的一个根，则有：
$$
C(B)a_n = (1-rB)C'(B)a_n=0\tag{6}
$$
也就是说：
$$
(1-rB)a_n=0\tag{7}
$$
的解$a_n=r^{n-1}a_0$是（2）式的一个特解。

则这里（5）式延迟算子多项式的根和上述特征方程（4）的根实际上一一对应，成倒数的关系。

## 定理1（无重根）

如果特征方程（4）有k个不相等的根$r_i,i=1,2,\cdots,k$。那么递推关系（1）的通解为：
$$
a_n = \alpha_1r_1^n+\alpha_2r_2^n+\cdots+\alpha_kr_k^n\tag{8}
$$
其中$\alpha_i,i=1,2,\cdots,k$为常数。

## 定理2（有重根）

如果特征方程（5）有t个不相等的根$r_i,i=1,2,\cdots,t$，其**重数**分别为$m_1,m_2,\cdots,m_t$，满足$m_i\geq1,i=1,2,\cdots,t$，且$\sum_{i=1}^tm_i=k$。

那么递推关系（1）的通解为：
$$
\begin{aligned}
a_n=&\left(a_{1,0}+a_{1,1}n+\cdots+a_{1,m_1-1}m^{m_1-1}\right)r_1^n \\\\
&+\left(a_{2,0}+a_{2,1}n+\cdots+a_{2,m_2-1}m^{m_2-1}\right)r_2^n \\\\
&+\cdots+\left(a_{t,0}+a_{t,1}n+\cdots+a_{t,m_t-1}m^{m_t-1}\right)r_t^n &&(9) \\\\
\end{aligned}
$$
其中$a_{i,j}$是常数，$1\leq i\leq t$ 且 $0\leq j\leq m_i-1$。

## 例1

斐波拉契数列：$0,1,1,2,3,5,8,\cdots$
$$
\begin{aligned}
&f_{n+2}= f_n+f_{n+1},\\\\
&\text{When} \ \ f_0=0, f_1=1
\end{aligned}
$$
求通项：

特征方程为$x^2-x-1=0$，特征根为$\frac{1\pm\sqrt{5}}{2}$。

于是$f_n$的通解为：
$$
f_n=a\left(\frac{1+\sqrt{5}}{2}\right)^n+b\left(\frac{1-\sqrt{5}}{2}\right)^n
$$
其中$a,b$ 由方程组：
$$
\begin{cases}
f_1=a\left(\frac{1+\sqrt{5}}{2}\right)+b\left(\frac{1-\sqrt{5}}{2}\right)=1\\\\
f_0=a+b=0
\end{cases}
$$
解出，得到：
$$
\begin{cases}
a=\frac{1}{\sqrt5}\\\\
b=-\frac{1}{\sqrt5}
\end{cases}
$$


于是：
$$
f_n = \frac{1}{\sqrt5}\left(\frac{1+\sqrt{5}}{2}\right)^n-\frac{1}{\sqrt5}\left(\frac{1-\sqrt{5}}{2}\right)^n
$$

## 例2

考虑另外一个数列：$0,1,-1,-2,-1,1,2,1,-1,-2,\cdots$
$$
\begin{aligned}
&a_{n+2} = a_{n+1}-a_n\\\\
&\text{When} \ \ a_0=0,a_1=1
\end{aligned}
$$
可以观察到这是一个周期数列
$$
a_n=\begin{cases}
&0&\text{if  n=0}\\\\
&1&\text{if  n=1+6k}, \ k\in N\\\\
&-1&\text{if  n=2+6k}, \ k\in N\\\\
&-2&\text{if  n=3+6k}, \ k\in N\\\\
&-1&\text{if  n=4+6k}, \ k\in N\\\\
&1&\text{if  n=5+6k}, \ k\in N\\\\
&2&\text{if  n=6+6k}, \ k\in N\\\\
\end{cases}
$$
用上述理论解之：

特征方程$x^2-x+1=0$,特征根为$\frac{1\pm\sqrt{3}i}{2}$。

写为三角形式为$\cos\frac{\pi}{3}+i\sin\frac{\pi}{3}$和$\cos\frac{5\pi}{3}+i\sin\frac{5\pi}{3}$。

则$a_n$ 的通解为：
$$
\begin{aligned}
a_n &= \alpha\left(\cos\frac{\pi}{3}+i\sin\frac{\pi}{3}\right)^n+\beta\left(\cos\frac{5\pi}{3}+i\sin\frac{5\pi}{3}\right)^n\\\\
&=\alpha\left(\cos\frac{n\pi}{3}+i\sin\frac{n\pi}{3}\right)+\beta\left(\cos\frac{5n\pi}{3}+i\sin\frac{5n\pi}{3}\right)\\\\
&=(\alpha+\beta)\cos\frac{n\pi}{3}+(\alpha-\beta)i\sin\frac{n\pi}{3}
\end{aligned}
$$
其中$\alpha+\beta$由方程组：
$$
\begin{align}
&a_1=\alpha\cos\frac{\pi}{3}+\beta\cos\frac{5\pi}{3}=1\\\\
&\alpha-\beta=0（a_n的虚部为0）
\end{align}
$$
解出$\alpha=\beta=1$。

确定，于是：
$$
a_n = 2\cos\frac{n\pi}{3},n\in N^*
$$
此例可以看出，实数根与虚数根的处理方法完全相同，只需要注意利用虚数的一些性质。

但是，在虚数根的情形下，不难发现序列具有周期性。利用这个性质可以不用上述复杂的步骤，直接确定序列的通项。


