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
    $\mathcal{H}$是Hilbert空间，那么$\forall x\in \mathcal{H}$，任意非空闭子集$C\subset \mathcal{H}$，都**存在唯一**的$m \in C$使得
    $$
    m = \arg\min_{y \in C} \lVert x-y \rVert
    $$

    如果$C$还是线性子空间，那么$m$是唯一的元素使得$x-m \perp C$。

    其中$m$称为$x$在$C$上的投影（$m$是我们在$C$中找到的，对$x$对平方损失下的最佳近似）。

有了这个定理，我们就可以来构造期望和条件期望了。
### 期望
所有常数构成的集合$\mathbb{R}$是$L^2$的线性闭子空间，那么存在唯一的$m\in \mathbb{R}$：
$$
m = \arg\min_{y \in \mathbb{R}} \lVert X-y \rVert = \arg\min_{y \in \mathbb{R}} \mathbb{E}|X-y|^2
$$
这个优化问题有显示解：$m = \mathbb{E}(X)$，实际上这里的投影就是期望。

??? note "如何求解？"
    实际上
    $$
    m = \arg\min_{y \in \mathbb{R}} \mathbb{E}|X-y|^2
    $$
    就是
    $$
    m = \arg\min_{y \in \mathbb{R}} [E(X^2)+y^2-2yE(X)]
    $$
    这是关于$y$的二次函数，显然在
    $$
    m = E(X)
    $$
    取到最小值。

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
假设随机变量$Y\in L^2$，集合$G(Y) = \{ g(Y): g \text{可测} ,\quad  g(Y)\in L^2 \}$是$L^2$的线性闭子空间，那么对于任意$X\in L^2$，都存在（几乎处处相等的意义下）**唯一的**$m = e_X(Y)$：
$$
m = e_X(Y)= \arg\min_{y \in G(Y)} \lVert X-y \rVert
$$

这个$e_X(Y)$就是条件期望了。
> 一般也写作：$E(X|Y)$，可以理解为用$Y$表示的$X$的最优估计。

这时候正交条件是：
$$
\mathbb{E}(g(Y)(X-e_X(Y))) = 0 \quad \forall g \text{可测}
$$

??? note "证明"
    我们来证明，满足正交条件的$y^* = e_X(Y) = E(X|Y)$可以最小化：
    $$
    \lVert X-y \rVert = E(X-y)^2
    $$
    只需要做拆分：
    $$
    \begin{aligned}
    &\lVert X-y \rVert \\
    = &E(X-y)^2 \\
    = &E(X-y^*+y^*-y)^2\\
    = &E(X-y^*)^2+E(y^*-y)^2 + 2E(X-y^*)(y^*-y)\\
    \end{aligned}
    $$
    这个式子的第一项和$y$无关，并且$y^*-y \in G(Y)$，那么根据正交条件有第三项为0:
    $$
    E(y^*-y)(X-y^*) = 0
    $$
    于是
    $$
    \begin{aligned}
    &e_X(Y)\\
    =& \arg\min_{y \in G(Y)} \lVert X-y \rVert \\
    =& \arg\min_{y \in G(Y)} [E(y^*-y)^2]\\
    =& y^*
    \end{aligned}
    $$

??? question "唯一性"
    我们说的唯一性是在几乎处处相等的意义下的：
    $$
    x = y \iff E(x-y)^2=0
    $$
    举例来说，如果考虑
    $$
    Y = (y_1,y_2)^T = (X, 2X)^T
    $$
    那么
    $$
    E(X|Y) = y_1
    $$
    显然是最好的估计。同时：
    $$
    y_2-y_1,\quad 3y_1-y_2
    $$
    等等都是等价的最好的估计。

    但是，我们认为他们是“相同”的：
    $$
    E(y_1 - (y_2-y_1))^2 = E(y_1 - (3y_1-y_2))^2 = 0
    $$
    满足我们叙述的唯一性。

## 测度论
在测度论中，我们也学过一个条件期望的定义：

$Z$是$(\Omega,\mathcal{F}, P)$上的可积随机变量，$\mathcal{G}是\mathcal{F}$的子sigma代数。如果$m$满足：

- $m$是$(\Omega,\mathcal{F}, P)$上的可测函数
- $\forall A \in \mathcal{G}$都有$\int_A mdP = \int_A zdP$

那么$m$称为$Z$关于$\mathcal{G}$的条件期望，记为$\mathbb{E}(Z|\mathcal{G})$。

另外我们也定义：
$$
\mathbb{E}(Z|Y) = \mathbb{E}(Z|\sigma(Y)) 
$$
其中$\sigma(Y)$是随机变量$Y$生成的最小sigma代数。

实际上，测度论的这一套语言和Hilbert空间下的语言是完全一一对应的：

- 一般情况下，我们定义的条件期望是从Hilbert空间投影到一个闭子空间
    - 在测度论中就是一个子sigma代数
- 我们定义条件于随机变量的条件期望是投影到所有Borel可测函数的象集
    - 在测度论中就是由随机变量生成的最小sigma代数

略有不同的是，投影定理是从**最佳估计**出发的。而测度论的条件期望则是从**正交性**出发的。