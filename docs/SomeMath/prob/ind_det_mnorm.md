---
tags:
- Algebra
- 概率论
include:
- math
---

# 正态二次型独立条件

设
$$X\sim N_n(0,I_n)$$
若$A$和$B$都是$n$阶实对称矩, 那么二次型$X'AX$与$X'BX$相互独立的充要条件是什么呢？

事实上有如下定理：

!!! theorem
    $X'AX$与$X'BX$相互独立等价于$AB=0$.

这个定理看起来非常美妙，为了证明它我们需要来自线性代数的一个引理。

## 引理

!!! theorem
    当且仅当$AB=BA$时（我们称之为commute，可换），两个可对角化矩阵$A$，$B$ 才有相同的特征向量矩阵。

也即对于可对角化的矩阵$A$，$B$（这里的对角化仅对方阵而言）
$$
\begin{aligned}
AB&=BA\\\\
&\Leftrightarrow \\\\
\exists S, \  \ S^{-1}AS&=\Lambda_1, \ \ S^{-1}BS=\Lambda_2
\end{aligned}
$$

为了证明这个引理，我们需要给出分块对角阵可对角化的条件：

### 分块对角阵可对角化

!!! theorem
    分块对角阵可对角化的等价条件是每个分块都可对角化。

也即对于一个分块对角阵：
$$
C=\begin{pmatrix}
C_{11}&  & \\\\
 & \ddots & \\\\
&  & C_{ss}
\end{pmatrix}
$$
$C$ 可对角化的充分必要条件是每个分块$C_{ii}$都可以对角化。

??? note "证明"
    充分性显然成立，若$C_{ii}$ 可以被$P_{ii}$对角化，则有：
    $$
    \begin{aligned}
    &\begin{pmatrix}
    P_{11}^{-1}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}^{-1}
    \end{pmatrix}
    \begin{pmatrix}
    C_{11}&  & \\\\
    & \ddots & \\\\
    &  & C_{ss}
    \end{pmatrix}
    \begin{pmatrix}
    P_{11}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}
    \end{pmatrix}\\\\
    =&\begin{pmatrix}
    P_{11}^{-1}C_{11}P_{11}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}^{-1}C_{ss}P_{ss}
    \end{pmatrix}\\\\
    =&\Lambda
    \end{aligned}
    $$
    记$Q$矩阵为：
    $$
    Q=\begin{pmatrix}
    P_{11}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}
    \end{pmatrix}
    $$
    则$Q^{-1}CQ=\Lambda$，充分性证毕，下证必要性。

    若$C$ 可对角化，则根据对角化理论，这等价于$C$ 有$n$（不妨设$C\in R^{n\times n}$）个线性无关的特征向量，不妨设为$x_i, \ i=1,2,\cdots,n$，而$C$ 有$s$个分块，不妨设每个分块的维度为$r_j,j=1,2,\cdots,s$，我们对$C$ 的每个特征向量也做同样的分块：
    $$
    x_i=\begin{pmatrix}
    x_{1}^i\\\\
    \vdots\\\\
    x_{s}^i
    \end{pmatrix}
    $$
    于是，根据特征向量的定义：
    $$
    \begin{aligned}
    &Cx_i=\lambda_ix_i\\\\
    &\Rightarrow\begin{pmatrix}
    C_{11}x_{1}^i\\\\
    \vdots\\\\
    C_{ss}x_{s}^i
    \end{pmatrix}=\begin{pmatrix}
    \lambda_ix_{1}^i\\\\
    \vdots\\\\
    \lambda_ix_{s}^i
    \end{pmatrix}
    \end{aligned}
    $$
    所以当$x_i^j\ne0$时，$x_i^j$ 是$C_{jj}$的特征向量。而$C_{jj}$ 的维度为$r_j$，所以$rank\\{x_i^j\\}\le r_j$，求和得到$\sum_{j=1}^s rank\\{x_i^j\\}\le n$。

    另外一方面，$\begin{pmatrix}
    0\\\\
    \vdots\\\\
    x_j^i\\\\
    \vdots\\\\
    0
    \end{pmatrix}$是由$x_j^i$ 增加若干零元的来，于是$rank\\{\begin{pmatrix}
    0\\\\
    \vdots\\\\
    x_j^i\\\\
    \vdots\\\\
    0
    \end{pmatrix}\\}=rank\\{x_i^j\\}$，并且$x_i$可由$\begin{pmatrix}
    0\\\\
    \vdots\\\\
    x_j^i\\\\
    \vdots\\\\
    0
    \end{pmatrix}$线性组合得到，于是
    $$
    \begin{aligned}
    &rank\\{\begin{pmatrix}
    x_{1}^i\\\\
    \vdots\\\\
    0
    \end{pmatrix}\\}+\cdots+\\\\
    &rank\\{\begin{pmatrix}
    0\\\\
    \vdots\\\\
    x_j^i\\\\
    \vdots\\\\
    0
    \end{pmatrix}\\}+\cdots+\\\\
    &rank\\{\begin{pmatrix}
    0\\\\
    \vdots\\\\
    x_{s}^i
    \end{pmatrix}
    \\}\ge rank\\{x_i\\}
    \end{aligned}
    $$
    也即是
    $$
    n\ge \sum_{j=1}^s rank\\{x_i^j\\}\ge rank\\{x_i\\}=n
    $$
    此不等式两边都取等号，所以$rank\\{x_i^j\\}=r_j$，每个维度为$r_j$ 的分块，都有$r_j$ 个线性无关的特征向量，所以每个分块都可以对角化，证毕。

### 引理的证明

??? note "必要性证明"
    如果$A$，$B$同时被$S$对角化了，那么显然有
    $$
    \begin{aligned}
    AB&=S\Lambda_1S^{-1}S\Lambda_2S^{-1}\\\\
    &=S\Lambda_1\Lambda_2S^{-1}\\\\
    &=S\Lambda_2\Lambda_1S^{-1}\\\\
    &=S\Lambda_2S^{-1}S\Lambda_1S^{-1}\\\\
    &=BA
    \end{aligned}
    $$
    证毕。
??? note "充分性证明"
    如果可对角化的矩阵$A$，$B$可换也就是
    $$
    AB=BA
    $$
    我们首先考虑$A$的对角化：
    $$
    P^{-1}AP=\Lambda_1
    $$
    并且记
    $$
    P^{-1}BP=C
    $$
    于是：
    $$
    \begin{aligned}
    C\Lambda_1&=P^{-1}BPP^{-1}AP\\\\
    &=P^{-1}BAP\\\\
    &=P^{-1}ABP\\\\
    &=P^{-1}APP^{-1}BP\\\\
    &=\Lambda_1C\\\\
    \end{aligned}
    $$
    也即$C$ 和 $\Lambda_1$可换，我们做如下分块：
    $$
    C=\begin{pmatrix}
    C_{11}& \cdots & C_{1s}\\\\
    \vdots & \ddots & \vdots\\\\
    C_{s1}& \cdots & C_{ss}
    \end{pmatrix}
    $$

    $$
    \Lambda_1=\begin{pmatrix}
    \lambda_1I_{r_1}&  & \\\\
    & \ddots & \\\\
    &  & \lambda_sI_{r_s}
    \end{pmatrix}
    $$

    其中$r_i$代表$A$的互异特征值$\lambda_i$的代数重数，等同于$\lambda_i$在对角阵中出现的次数，也就是分块对角阵中每个分块的维度；$I_{r_i}$代表 $r_i$阶的单位矩阵。我们可以选取合适的$P$（交换$P$ 的行可以实现），使得属于相同特征值的特征向量排列在一起，于是有了上述的分块矩阵形式，结合可换的性质有：
    $$
    \begin{aligned}
    &\begin{pmatrix}
    C_{11}& \cdots & C_{1s}\\\\
    \vdots & \ddots & \vdots\\\\
    C_{s1}& \cdots & C_{ss}
    \end{pmatrix}
    \begin{pmatrix}
    \lambda_1I_{r_1}&  & \\\\
    & \ddots & \\\\
    &  & \lambda_sI_{r_s}
    \end{pmatrix}\\\\
    &=\\\\
    &\begin{pmatrix}
    \lambda_1I_{r_1}&  & \\\\
    & \ddots & \\\\
    &  & \lambda_sI_{r_s}
    \end{pmatrix}
    \begin{pmatrix}
    C_{11}& \cdots & C_{1s}\\\\
    \vdots & \ddots & \vdots\\\\
    C_{s1}& \cdots & C_{ss}
    \end{pmatrix}
    \end{aligned}
    $$
    考虑$(C\Lambda_1)[ij]$也就是上述分块矩阵乘积结果的$i$行$j$列的分块矩阵。等式左端为$\lambda_j C_{ij}$，等式右端为$\lambda_i C_{ij}$，于是得到：
    $$
    \lambda_iC_{ij}=\lambda_jC_{ij}
    $$
    而当$i\ne j$时，$\lambda_i\ne\lambda_j$（它们本身就定义为$A$互不相同的特征值），进而$C_{ij}=0\quad(i\ne j)$。
    
    所以$P^{-1}BP=C$为分块对角矩阵：
    $$
    P^{-1}BP=\begin{pmatrix}
    C_{11}&  & \\\\
    & \ddots & \\\\
    &  & C_{ss}
    \end{pmatrix}
    $$
    而已知$B$可对角化，进而与之相似的$P^{-1}BP$也是可对角化的，所以它的每个分块都可对角化。设$C_{ii}$的对角化矩阵为$P_{ii}$，则有：
    $$
    \begin{aligned}
    &\begin{pmatrix}
    P_{11}^{-1}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}^{-1}
    \end{pmatrix}
    \begin{pmatrix}
    C_{11}&  & \\\\
    & \ddots & \\\\
    &  & C_{ss}
    \end{pmatrix}
    \begin{pmatrix}
    P_{11}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}
    \end{pmatrix}\\\\
    =&\begin{pmatrix}
    P_{11}^{-1}C_{11}P_{11}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}^{-1}C_{ss}P_{ss}
    \end{pmatrix}\\\\
    =&\begin{pmatrix}
    \Lambda_{11}&  & \\\\
    & \ddots & \\\\
    &  & \Lambda_{ss}
    \end{pmatrix}\\\\
    =&\Lambda_2
    \end{aligned}
    $$
    记$Q$矩阵为：
    $$
    Q=\begin{pmatrix}
    P_{11}&  & \\\\
    & \ddots & \\\\
    &  & P_{ss}
    \end{pmatrix}
    $$
    于是：
    $$
    \begin{aligned}
    &Q^{-1}CQ\\\\
    =&Q^{-1}P^{-1}BPQ\\\\
    =&(PQ)^{-1}B(PQ)\\\\
    =&\Lambda_2
    \end{aligned}
    $$
    而Q作用于$\Lambda_1$上不改变其对角阵形式：
    $$
    \begin{aligned}
    &Q^{-1}\Lambda_1Q\\\\
    =&Q^{-1}P^{-1}APQ\\\\
    =&(PQ)^{-1}A(PQ)\\\\
    =&\Lambda_1
    \end{aligned}
    $$
    可见$S=PQ$就是我们要找的可以同时对角化$A$，$B$ 的矩阵，证毕。

## 独立条件

我们之前已经证明了如下定理:

!!! theorem
    当且仅当$AB=BA$时, 两个可对角化矩阵$A$, $B$可以一个特征向量矩阵同时对角化.

对于**两个可换的实对称矩阵**来说, 则可以证明它们可以同时**正交对角化**：

!!! note "同时正交对角化"
    设$A$, $B$都是实对称矩阵，并且$AB=BA$。

    实对称矩阵自然可以正交对角化：

    $$
    PAP' = \Lambda_1
    $$

    带入$AB=BA$得到：
    $$
    \begin{aligned}
    &P'\Lambda_1PB = BP'\Lambda_1P \\\\
    \iff & \Lambda_1PBP' = PBP'\Lambda_1
    \end{aligned}
    $$
    也就是$PBP'$和一个对角矩阵可交换。这个矩阵显然是对称的：
    $$
    (PBP')' = PB'P' = PBP'
    $$

    因此它也可以正交对角化：
    $$
    QPBP'Q' = \Lambda_2
    $$
    把这个矩阵乘在$A$的对角化形式上得到：
    $$
    QPAP'Q' = Q\Lambda_1Q' = \Lambda_1
    $$
    于是我们找到了可以同时对角化A、B的正交矩阵$QP$

设$A$, $B$都是实对称矩阵, 根据对角化理论, **实对称矩阵必然可以正交对角化**, 并且由$AB=0$得到
$$(AB)'=B'A'=BA=0$$
进而$AB=BA=0$, 所以它们是可换的. 应用引理可得:
$$
\text{存在正交矩阵}S\\\\
S^{-1}AS=\Lambda_1=diag(\lambda_1^{(1)},\lambda_2^{(1)},\cdots,\lambda_n^{(1)})\\\\
S^{-1}BS=\Lambda_2=diag(\lambda_1^{(2)},\lambda_2^{(2)},\cdots,\lambda_n^{(2)})
$$
所以:
$$
\begin{aligned}
&AB\\\\
=&S\Lambda_1S^{-1}S\Lambda_2S^{-1}\\\\
=&S\Lambda_1\Lambda_2S^{-1}\\\\
=&0\\\\
\Rightarrow\\\\
&\Lambda_1\Lambda_2=0
\end{aligned}
$$
所以$\lambda_i^{(1)}\lambda_i^{(2)}=0$两者总有一个为$0$. 记

$$Y=S'X\sim N_n(0,S'I_nS)=N_n(0,I_n)$$

则$Y$的各个分量相互独立, $X=SY$进而:
$$
\begin{aligned}
X'AX&=(SY)'A(SY)\\\\
&=Y'(S'AS)Y\\\\
&=Y'\Lambda_1Y\\\\
&=\sum_{i=1}^n\lambda_i^{(1)}Y_i^2
\end{aligned}
$$
与
$$
\begin{aligned}
X'BX&=(SY)'B(SY)\\\\
&=Y'(S'BS)Y\\\\
&=Y'\Lambda_2Y\\\\
&=\sum_{i=1}^n\lambda_i^{(2)}Y_i^2
\end{aligned}
$$
可见$X'AX$与$X'BX$依赖于不同的$Y_i$,从而它们相互独立, 证毕.

此致.
