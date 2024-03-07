---
tags:
- 数学分析
include:
- math
---

# 导数
导数就是**线性**近似！！

## 一阶导数
### 一元数值函数
$$
f: \mathbb{R} \to \mathbb{R}
$$
对于这样的函数，如果存在一个常数$a\in \mathbb{R}$使得
$$
f(x_0+t) = f(x_0)+a \cdot t+o(t)
$$
我们就说$a=f'(x_0)$是$f$在$x_0$处的导数。

### 多元数值函数
$$
f: \mathbb{R}^n \to \mathbb{R}
$$
对于这样的函数，如果存在一个常向量$a\in \mathbb{R}^n$使得
$$
f(x_0+h) = f(x_0)+ \langle a,h \rangle +o(\lVert h \rVert_2)
$$
我们就说$a=\nabla f(x_0)$是$f$在$x_0$处的导数（也常称为梯度）。

### 多元向量值函数
$$
F: \mathbb{R}^n \to \mathbb{R}^m
$$
对于这样的函数，如果存在一个常矩阵$A\in \mathbb{R}^{m\times n}$使得
$$
F(x_0+h) = F(x_0)+ Ah +o(\lVert h \rVert_2)
$$
我们就说$A=\mathrm{J} F(x_0)$是$F$在$x_0$处的导数（也常称为Jacobi矩阵）。

至此矩阵完美地诠释了**线性近似**这一想法。
### 半正定锥上的导数
$$
G: \mathbb{R}^n \to \mathcal{S}^p
$$
这类函数就有些特殊了，陪域$\mathcal{S}^p$是一个特殊的线性空间。

例如
$$
G(x,y) = \begin{pmatrix}
x^2&2&1\\\\
2&y^3&\cos x\\\\
1&\cos x&xy
\end{pmatrix}
$$

我们照葫芦画瓢给出一个定义：

若存在$A\in \mathrm{L}(\mathbb{R}^n, \mathcal{S}^p)$（有界线性算子）满足
$$
G(x_0+h)=G(x_0)+A(h)+o(\lVert h \rVert_2)
$$
我们就说$A=\mathrm{D}G(x_0)$是$G$在$x_0$处的导数。

### Fréchet导数


## 二阶导数

## 复合导数


TBD:导数