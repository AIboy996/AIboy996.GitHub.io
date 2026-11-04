---
tags:
- mkdocs
include:
- math
---

# 写数学公式的坑

MkDocs 的 Markdown 解析发生在 MathJax 之前。如果公式里出现 `*`、`_`、`\`、`<` 这些字符，Markdown 可能会把它们当成强调、转义或 HTML 标签，导致公式被破坏。

!!! info "最新实现：2026-11-04"
    本站所有的数学公式现在由 `hooks/math_protect.py` 统一处理：

    在 Markdown 解析前把 `$...$` 和 `$$...$$` 保护起来，公式内容原样交给 MathJax。因此公式内部可以按**标准 TeX** 写，不需要再做额外的转义。

    此前出现的`\\ = \`,`\\{ = \{`之类的非标准tex语法都已经修复、`*_`之类的markdown保留符号也不会和数学符号再起冲突，感谢AI！

## `*` 和 `_`

直接写即可：

```markdown
$a*b*c$，$x_1*x_2*x_3$
```

以前需要在 `*` 前加反斜杠（`\*`）来躲开 Markdown 的强调语法；现在不需要了。下标也直接写 `_`；如果要在 `\text{}` 里写一个字面下划线，再用 `\_`。

## `\\`：换行

矩阵、`aligned`、`cases` 等环境里，行与行之间用 `\\`：

```markdown
$$
\begin{pmatrix}
1&0\\
0&2
\end{pmatrix}
$$
```

不要写成 `\\\\`。在标准 TeX 里 `\\` 就是换行；写四个反斜杠反而可能多出空行。

## `\{` 和 `\}`：字面大括号

直接用 `\{`、`\}`：

```markdown
$$
\exp\left\{ -\frac{x^2}{2} \right\}
$$
```

也不要把反斜杠翻倍成 `\\{`。

## `<` 和 `>`

公式里的 `<`、`>` 也会被保护，直接写：

```markdown
$$
1 < a > 2
$$
```

MathJax 会收到原始的 `<`、`>`，不会把它们当成 HTML 标签。

## 适用范围

`hooks/math_protect.py` 只对 frontmatter 里写了 `include: math` 的页面启用。如果页面没有引入 MathJax，或者公式写在代码块里，仍然按普通 Markdown 规则处理。

TBC:数学公式的坑
