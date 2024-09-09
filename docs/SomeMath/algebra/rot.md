---
tags:
  - Algebra
include:
- math
---

# 旋转变换矩阵

## 矩阵
众所周知，二维空间的旋转变换（逆时针旋转$\theta$）可以用矩阵来表示：
$$
\color{blue}
\begin{bmatrix}
\cos\theta &-\sin\theta\\\\
\sin\theta &\cos\theta
\end{bmatrix}
$$
$(x,y)$旋转后的坐标$(x',y')$可以用矩阵乘法来计算：
$$
\begin{bmatrix}
x'\\\\y'
\end{bmatrix}=
{\color{blue}
\begin{bmatrix}
\cos\theta &-\sin\theta\\\\
\sin\theta &\cos\theta
\end{bmatrix}}
\begin{bmatrix}
x\\\\y
\end{bmatrix}=
\begin{bmatrix}
x\cos\theta-y\sin\theta\\\\
x\sin\theta+y\cos\theta
\end{bmatrix}
$$

## 极坐标
如果你是高中生，那也没关系，我们可以用极坐标系的推导来给出这个公式：

假设
$$
(x,y)
$$
的极坐标表示是
$$
(\alpha, \rho)
$$
也就是说
$$
\begin{aligned}
\rho \cos\alpha = x\\\\
\rho \sin\alpha = y
\end{aligned}
$$
其中$\rho>0, \alpha\in[0,2\pi)$

那么逆时针旋转$\theta$之后极坐标变成：
$$
(\alpha+\theta, \rho)
$$
那么新的坐标就是：
$$
\begin{aligned}
\rho \cos(\alpha+\theta) = x'\\\\
\rho \sin(\alpha+\theta) = y'
\end{aligned}
$$
展开就得到:
$$
\color{blue}
\begin{aligned}
x' = x\cos\theta-y\sin\theta\\\\
y' = x\sin\theta+y\cos\theta
\end{aligned}
$$

## 复数乘法

这已经很简单了，但我们可以通过复数的乘法更快地、更好记忆地给出这个公式。把$(x,y)$放到复平面得到：
$$
x+y\mathrm{i}
$$
然后做乘法：
$$
\begin{aligned}
&(x+y\mathrm{i}){\color{blue}(\cos\theta + \mathrm{i} \sin\theta)} \\\\
= &(x\cos\theta-y\sin\theta) + \mathrm{i} (x\sin\theta+y\cos\theta)
\end{aligned}
$$
等式右侧的就是旋转之后的坐标。

还可以写成更炫酷的**指数形式**：
$$
(x+y\mathrm{i}){\color{blue}e^{\mathrm{i}\theta}} = (x\cos\theta-y\sin\theta) + \mathrm{i} (x\sin\theta+y\cos\theta)
$$

## 矩阵形式的复数
众所不那么周知，复数和特殊的矩阵可以建立一个一一对应的关系：
$$
a+b\mathrm{i} \to \begin{bmatrix}
a &-b\\\\
b &a
\end{bmatrix}
$$
并且这个表示是保持运算的（加减乘除都是显然的）：
$$
\color{blue}e^{\mathrm{i}\theta} = \cos\theta + \mathrm{i} \sin\theta
$$
对应
$$
\color{blue}\exp(\begin{bmatrix}
0 &-\theta\\\\
\theta &0
\end{bmatrix}) = \begin{bmatrix}
\cos\theta &-\sin\theta\\\\
\sin\theta &\cos\theta
\end{bmatrix}
$$
这里的矩阵指数使用**矩阵幂级数**来定义：

$$
\exp(M) = \sum_{n=0}^\infty \frac{M^n}{n!}
$$

对于
$$
M=\begin{bmatrix}
0 &-\theta\\\\
\theta &0
\end{bmatrix}
$$
这个矩阵，我们知道
$$
M^2 = \begin{bmatrix}
-\theta^2 &0\\\\
0 &-\theta^2
\end{bmatrix} = -\theta^2 I
$$
于是级数可以奇偶分开来计算：
$$
\exp(M) = \sum_{n=0}^\infty \frac{M^n}{n!} = \sum_{k=0}^\infty \frac{M^{2k}}{(2k)!} + \sum_{l=0}^\infty \frac{M^{2l+1}}{(2l+1)!}
$$
也就是：
$$
\exp(M) = \sum_{k=0}^\infty \frac{(-\theta^2)^k}{(2k)!} I + \sum_{l=0}^\infty \frac{(-\theta^2)^l}{(2l+1)!} \begin{bmatrix}
0 &-\theta\\\\
\theta &0
\end{bmatrix}
$$
也就是:
$$
\exp(M) = \sum_{k=0}^\infty \frac{(-\theta^2)^k}{(2k)!} I + \sum_{l=0}^\infty \frac{(-1)^l\theta^{2l+1}}{(2l+1)!} \begin{bmatrix}
0 &-1\\\\
1 &0
\end{bmatrix}
$$
我们知道泰勒级数
$$
\sum_{k=0}^\infty \frac{(-\theta^2)^k}{(2k)!} = \cos\theta
$$
和
$$
\sum_{l=0}^\infty \frac{(-1)^l\theta^{2l+1}}{(2l+1)!} = \sin\theta
$$
最终得到
$$
\exp(M) = \cos\theta \begin{bmatrix}
1 &0\\\\
0 &1
\end{bmatrix}+ \sin\theta \begin{bmatrix}
0 &-1\\\\
1 &0
\end{bmatrix} = \begin{bmatrix}
\cos\theta &-\sin\theta\\\\
\sin\theta &\cos\theta
\end{bmatrix}
$$

旋转的各种表示方法达成了**意料之中的统一。**