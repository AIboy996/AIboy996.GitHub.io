---
tags:
  - 概率论
include:
- math
---

# 条件期望
条件期望的唯一存在性是一个非常漂亮的结论，今天来唠一下。
## 初等概率论
在初等概率论中，我们对条件期望的定义是基于**条件分布**的。

例如离散的情形：
$$
\mathbb{E}(X|Y=y) = \sum_x xP(X=x|Y=y)
$$

这个形式和期望几乎是相同的：
$$
\mathbb{E}(X) = \sum_x xP(X=x)
$$

条件分布的求解则是基于Bayes公式。这里不再赘述。

## Hilbert空间
在更一般的理论中，条件期望就不再依赖于条件分布了。并且情况恰恰相反，这时候条件分布可以用条件期望来定义：
$$
P(A|B) = \mathbb{E}(I(A)|B)
$$

我们考虑平方可积随机变量构成的$L^2(\Omega,\mathcal{F}, P)$空间，这个是一个Hilbert空间。

空间上的内积定义为：
$$
\langle X,Y \rangle = \mathbb{E}(XY)
$$

范数定义为：
$$
\lVert X \rVert = \sqrt{E|X^2|}
$$

在Hilbert空间上我们有：

!!! cite "投影定理"
    $\mathcal{H}$是Hilbert空间，那么$\forall x\in \mathcal{H}$，任意非空闭子集$C\subset \mathcal{H}$，都存在唯一的$m \in C$使得
    $$
    m = \argmin_{y \in C} \lVert x-y \rVert
    $$

    如果$C$还是线性子空间，那么$m$是唯一的元素使得$x-m \perp C$。

    其中$m$称为$x$在$C$上的投影。

有了这个定理，我们就可以来构造期望和条件期望了。
### 期望
所有常数构成的集合$\mathbb{R}$是$L^2$的子空间，那么存在唯一的$m\in \mathbb{R}$：
$$
m = \argmin_{y \in \mathbb{R}} \lVert X-y \rVert = \argmin_{y \in \mathbb{R}} \mathbb{E}|X-y|^2
$$
这个优化问题有显示解：$m = \mathbb{E}(X)$，实际上这里的投影就是期望。

或者我们可以通过正交条件：
$$
\forall z \in \mathbb{R}\quad X-m \perp z
$$
也就是
$$
\mathbb{E}(z(X-m))=0 \quad \forall z \in \mathbb{R}
$$
直接得到：$m=\mathbb{E}(X)$
### 条件期望
假设随机变量$Y\in L^2$，集合$G(Y) = \{ g(Y): g \text{可测} ,\quad  g(Y)\in L^2 \}$是$L^2$的子空间，那么存在唯一的$m = e_X(Y)$：
$$
m = e_X(Y)= \argmin_{y \in G(Y)} \lVert X-y \rVert
$$

这个$e_X(Y)$就是条件期望了。

这时候正交条件是：
$$
\mathbb{E}(g(Y)(X-e_X(Y))) = 0 \quad \forall g \text{可测}
$$

## 测度定义
TBC:条件期望