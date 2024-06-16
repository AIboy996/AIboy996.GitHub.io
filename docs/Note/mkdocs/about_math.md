---
tags:
- mkdocs
include:
- math
---

# 写数学公式的坑

在使用Mkdocs生成网页的过程中，如果你的markdown中包含大量的数学公式，那么你大概率会遇到各种各样的问题。

## `*`符号

我们知道这个符号在markdown中有特殊含义，在公式中使用此符号需要格外注意使用`\*`来取消它的特殊含义。

- 错误示范：
=== "渲染"
    $$
    a*b*c
    $$
=== "源代码"
    ```tex  hl_lines="2"
    $$
    a*b*c
    $$
    ```

- 正确示范：
=== "渲染"
    $$
    a\*b\*c
    $$
=== "源代码"
    ```tex hl_lines="2"
    $$
    a\*b\*c
    $$
    ```


## `\`的转义

我们都知道，`\`符号在tex中经常用到，而它markdown在文件中又是特殊的转义符号，需要格外注意。


### `\\`符号
如果你想写一个$2\times 2$的矩阵。

- 错误示范：
=== "渲染"
    $$
    \begin{pmatrix}
    1&0\\
    0&2
    \end{pmatrix}
    $$
=== "源代码"
    ```tex  hl_lines="3"
    $$
    \begin{pmatrix}
    1&0\\
    0&2
    \end{pmatrix}
    $$
    ```

- 正确示范：
=== "渲染"
    $$
    \begin{pmatrix}
    1&0\\\\
    0&2
    \end{pmatrix}
    $$
=== "源代码"
    ```tex hl_lines="3"
    $$
    \begin{pmatrix}
    1&0\\\\
    0&2
    \end{pmatrix}
    $$
    ```
### `\{`和`\}`
再比如我们要写一个自适应大小的大括号。

- 错误示范：
=== "渲染"
    $$
    \exp\left\{ -\frac{x^2}{2} \right\}
    $$
=== "源代码"
    ```tex hl_lines="2"
    $$
    \exp\left\{ -\frac{x^2}{2} \right\}
    $$
    ```

- 正确示范：
=== "渲染"
    $$
    \exp\left\\{ -\frac{x^2}{2} \right\\}
    $$

=== "源代码"
    ```tex hl_lines="2"
    $$
    \exp\left\\{ -\frac{x^2}{2} \right\\}
    $$
    ```

或者是写一个分段函数。

=== "渲染"
    $$
    q(x) = \left\\{
    \begin{aligned}
    &1 \quad x\in \mathbb{Q}\\\\
    &0\quad  \text{otherwise}
    \end{aligned} \right.
    $$
=== "源代码"
    ```tex hl_lines="4"
    $$
    q(x) = \left\\{
    \begin{aligned}
    &1 \quad x\in \mathbb{Q}\\\\
    &0\quad  \text{otherwise}
    \end{aligned} \right.
    $$
    ```
## `< >`符号
众所周知`<xxx>`和`</xxx>`这对符号在HTML中是特殊的保留字符，自然在以HTML为基础的markdown中他也会出现问题。

我们写不等式的时候，需要注意一下用空格隔开即可。

- 错误示范：
=== "渲染"
    $$
    1 <a> 2 \quad 1</a>2
    $$
=== "源代码"
    ```tex hl_lines="2"
    $$
    1 <a> 2 \quad 1</a>2
    $$
    ```

- 正确示范：
=== "渲染"
    $$
    1 < a > 2 \quad 1 < / a > 2
    $$

=== "源代码"
    ```tex hl_lines="2"
    $$
    1 < a > 2 \quad 1 < / a > 2
    $$
    ```


TBC:数学公式的坑