---
tags:
- 概率论
- Statistics
include:
- math
---

# 大数定律和中心极限定理

!!! note
    这些定律的证明在李贤平老师的《概率论基础》第三版中都有详细的叙述。

大数定律（LLN）和中心极限定理（CLT）是基础概率论的终极目标，都是非常深刻的洞察，在此回顾一下。

## LLN

大数定律分为强弱两种形式，他们在概率论的语言中描述的是随机变量序列的收敛性。在数理统计的语境下描述的是统计量（尤指**样本均值**）的收敛性。

### 弱大数定律

!!! theorem "弱大数定律（WLLN）"
    > 辛钦（Khinchin）大数定律

    独立同分布的样本$x_i$，如果$E(x_1)\lt \infty$，那么样本均值**依概率收敛**于期望：
    $$
    \frac{1}{n} \sum_{i=1}^n x_i \stackrel{p}{\longrightarrow} \mathbb{E}(x_1) \quad as \quad n \to \infty
    $$

    也就是$\forall \epsilon \gt 0$
    $$
    \lim_{n\to\infty} \mathbb{P}(\mid \frac{1}{n} \sum_{i=1}^n x_i - \mathbb{E}(x_1) \mid \gt \epsilon ) = 0
    $$

### 强大数定律

!!! theorem "强大数定律（SLLN）"
    > 柯尔莫哥洛夫（Kolmogorov）大数定律

    独立同分布的样本$x_i$，如果$E(x_1)\lt \infty$，那么样本均值**以概率1收敛**于期望：
    $$
    \frac{1}{n} \sum_{i=1}^n x_i \stackrel{a.s.}{\longrightarrow} \mathbb{E}(x_1) \quad as \quad n \to \infty
    $$

    也就是
    $$
    \mathbb{P}(\lim_{n\to\infty} \frac{1}{n} \sum_{i=1}^n x_i = \mathbb{E}(x_1) ) = 1
    $$

## CLT

中心极限定律比大数定律更进一步，它不仅描述了极限情况下统计量的收敛情况，还给出了其**极限分布**。

### 独立同分布

!!! theorem "林德伯格-莱维（Lindeberg-Levy）定理"
    独立同分布的样本$x_i$，如果$E(x_i)=\mu, 0 \lt D(x_i)=\sigma^2 \lt \infty$，那么标准化随机变量和：

    $$
    \zeta_n = \frac{1}{\sigma \sqrt{n}} \sum_{i=1}^n (x_i - \mu)
    $$

    满足

    $$
    \lim_{n\to \infty} \mathbb{P}(\zeta_n \le x) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^x e^{-t^2/2} \mathrm{d}t
    $$

    也即
    $$
    \zeta_n  \stackrel{d}{\longrightarrow} \mathcal{N}(0, 1)
    $$

    ---

    值得一提的是这个结论对**多元情形**依然成立。

    也就是独立同分布的多维样本$x_i$，如果$E(x_i)=\mu, D(x_i)=\Sigma$，那么
    $$
    \eta_n = \frac{1}{\sqrt{n}}\sum_{i=1}^n (x_i - \mu)
    $$
    满足
    $$
    \eta_n \stackrel{d}{\longrightarrow} \mathcal{N}(0, \Sigma)
    $$

### 独立不同分布

独立同分布的情形下，CLT直接成立。不过条件放宽到独立但是不同分布就不行了，需要一些额外条件。

1922年林德伯格提出了独立不同分布情形下CLT的充分条件。

1935年费勒进一步指出，在费勒条件下林德伯格条件是CLT的充分必要条件。

> 当然，一般费勒条件指的是另外一个东西。我这里暂且这么叫。

#### 一些记号

对于独立的样本$x_i$，数学期望和方差有限。记
$$
a_k = E(x_k), \quad b_k^2 = D(x_k), \quad B_n^2 = \sum_{k=1}^n b_k^2
$$
记标准化数：
$$
\zeta_n = \sum_{k=1}^n \frac{x_k-a_k}{B_n}
$$

!!! theorem "林德伯格-费勒（Lindeberg-Feller）定理"

    林德伯格条件是$\zeta_n \stackrel{d}{\longrightarrow} \mathcal{N}(0, 1)$的充分条件。另外，在费勒条件成立的情况下，林德伯格条件也是必要条件。

    换言之：
    $$\text{林德伯格条件} \iff \text{费勒条件} + \text{CLT}$$

    ==林德伯格条件==：

    $$
    \lim_{n\to \infty} \frac{1}{B_n^2} \sum_{k=1}^n \int_{|x-a_k| \gt \tau B_n} (x-a_k)^2 \mathrm{d}F_k(x) = 0, \quad \forall \tau\gt 0
    $$

    > 其中$F_k(x)$是$x_k$的分布函数。

    ??? question "咋搞出来的这条件？"
        想要标准化数是渐进正态的，就需要各个加项**均匀地小**。

        考虑这样的事件：

        $$
        A_k = \left\\{ |x_k - a_k| \gt \tau B_n \right\\}
        $$

        各个加项**均匀地小**描述为：

        $$
        \begin{aligned}
        &P(\max_{1\le k\le n} |x_k-a_k|\gt \tau B_n) \\\\
        = &P(\cup_{k=1}^n A_k )\\\\
        \le & \sum_{k=1}^n P(A_k )\\\\
        = &\sum_{k=1}^n \int_{|x-a_k| \gt \tau B_n} \mathrm{d}F_k(x)\\\\
        \le &\frac{1}{\tau^2B_n^2}\sum_{k=1}^n \int_{|x-a_k| \gt \tau B_n} (x-a_k)^2 \mathrm{d}F_k(x)
        \end{aligned}
        $$
    
    ==费勒条件==：

    $$
    \lim_{n\to\infty} \max_{k\le n} \frac{b_k}{B_n} = 0
    $$

    当然，这等价于：
    
    $$
    \lim_{n\to\infty} B_n = \infty, \quad \lim_{n\to\infty} \frac{b_n}{B_n} = 0
    $$

#### 更常用的CLT形式

林德伯格-费勒定理有两个推论，更加常用：

!!! theorem "李亚普诺夫（Lyapunov）定理"
    $$
    \text{李亚普诺夫条件} \implies \text{林德伯格条件}
    $$

    ==李亚普诺夫条件==：
    $$
    \exists \delta\gt 0, \quad \frac{1}{B_n^{2+\delta}} \sum_{k=1}^n E|x_k-a_k|^{2+\delta} \to 0,\quad as \quad n\to \infty
    $$

!!! theorem "有界随机变量的CLT"
    如果随机变量序列$x_i$可以被一个常数列控制住：
    $$
    \max_{1\le j \le n} |x_j| \le K_n
    $$
    并且
    $$
    \lim_{n\to \infty} \frac{K_n}{B_n} = 0
    $$

    那么CLT成立。
