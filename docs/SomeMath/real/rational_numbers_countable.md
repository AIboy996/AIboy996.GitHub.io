---
tags:
    - 数学分析
---

# 有理数集是可数的

## 双射

## 基数

## 证明

Define a map $f:\mathbb{Q} \to \mathbb{N}$ by
$$
f(x) = q_1^{2r_1}q_2^{2r_2}\cdots q_M^{2r_M}\times p_1^{2s_1-1}p_2^{2s_2-1}\cdots p_N^{2s_N-1}
$$

where the prime numbers $q_i$ and $p_j$ are defined by:

$$
x = \frac{m}{n} = \frac{q_1^{r_1}q_2^{r_2}\cdots q_M^{r_M}}{p_1^{s_1}p_2^{s_2}\cdots p_N^{s_N}}
\quad q_i \ne p_j \forall i,j
$$

We want to show $f$ is **bijective**.

### Step 1 show $f$ is injective
Which means: $f(x_1)=f(x_2) \implies x_1=x_2$
### Step 2 show $f$ is surjective
Which means: $\forall y \in \mathbb{N} \quad \exists x \in \mathbb{Q} \quad s.t.\quad f(x)=y$

TBD