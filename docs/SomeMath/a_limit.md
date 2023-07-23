---
tags:
    - 数学分析
---
## 题目

题目来自哔哩哔哩UP主`@考研竞赛凯哥`：
$$
\lim_{x\to 0}\left\\\{1-\ln\left[\ln(x+e^{(1+x)^{1/x}})\right]\right\\\}/x
$$
有点复杂，但是泰勒展开可以一战。



我们只需要知道**两个公式**
$$
\begin{aligned}
&\ln(1+x)\\\\
=&x-\frac{x^2}{2}+\frac{x^3}{3}+\cdots\\\\
=&x+o(x)
\end{aligned}
$$
和
$$
\begin{aligned}
&e^x\\\\
=&1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots\\\\
=&1+x+o(x)
\end{aligned}
$$
和一些**泰勒展开常用的技巧**即可。

### 第一步

根据前面的公式
$$
\frac{\ln(1+x)}{x}=1-\frac{1}{2}x+o(x)
$$
那么带入指数函数有
$$
\begin{aligned}
&\exp(\frac{\ln(1+x)}{x})\\\\
=&e^{1-\frac{1}{2}x+o(x)}\\\\
=&ee^{-\frac{1}{2}x}e^{o(x)}\\\\
=&e(1-\frac{1}{2}x+o(x))(1+o(x))\\\\
=&e-\frac{e}{2}x+o(x)
\end{aligned}
$$
其中**第二个等式**把
$$
e^1
$$
提取出来**至关重要**，这是泰勒展开常用的技巧。

**最后一个等式**是因为
$$
\begin{aligned}
&(1-\frac{1}{2}x+o(x))(1+o(x))\\\\
=&(1-\frac{1}{2}x+o(x))\times1+\color{blue}{(1-\frac{1}{2}x+o(x))\times o(x)}\\\\
=&1-\frac{1}{2}x+o(x)+\color{blue}{o(x)}\\\\
=&1-\frac{1}{2}x+o(x)
\end{aligned}
$$
这里的第二个等式用到了**高阶无穷小的性质**，任何一个**多项式函数**乘上去还是高阶无穷小
$$
p(x)\times o(x)=o(x) \quad \forall p(x)\in P(x)
$$
并且两个等价无穷小线性组合还是等价无穷小
$$
ao(x)+bo(x)=o(x) \quad \forall a,b\in R
$$
最终我们得到
$$
\begin{aligned}
&(1+x)^{1/x}\\\\
=&\exp(\frac{\ln(1+x)}{x})\\\\
=&\color{red}{e-\frac{e}{2}x+o(x)}
\end{aligned}
$$

### 第二步

**如法炮制**，把上面这个式子再带入指数函数有
$$
\begin{aligned}
&e^{(1+x)^{1/x}}\\\\
=&\exp(\color{green}{e-\frac{e}{2}x+o(x)})\\\\
=&e^ee^{-ex/2}e^{o(x)}\\\\
=&e^e(1-\frac{e}{2}x+o(x))(1+o(x))\\\\
=&e^e(1-\frac{e}{2}x)+o(x)\\\\
=&e^e-\frac{e^{e+1}}{2}x+o(x)
\end{aligned}
$$
再加上一个$x$就是
$$
\begin{aligned}
&x+e^{(1+x)^{1/x}}\\\\
=&\color{red}{e^e+(1-\frac{e^{e+1}}{2})x+o(x)}
\end{aligned}
$$

### 第三步

把上面这个式子再带入对数函数有
$$
\begin{aligned}
&\ln(x+e^{(1+x)^{1/x}})\\\\
=&\ln(\color{green}{e^e+(1-\frac{e^{e+1}}{2})x+o(x)})\\\\
=&\ln e^e+\ln(1+(e^{-e}-\frac{e}{2})x+o(x))\\\\
=&\color{red}{e+(e^{-e}-\frac{e}{2})x+o(x)}
\end{aligned}
$$
其中**第二个等式**把
$$
\ln(e^e)
$$
提取出来至关重要。

**最后一个等式**是由于我们前面提到的的公式
$$
\ln(1+x)=x+o(x)
$$

### 第四步

**如法炮制**，再把上面一步的结果带入对数函数有
$$
\begin{aligned}
&\ln\left\\\{\ln(x+e^{(1+x)^{1/x}})\right\\\}\\\\
=&\ln(\color{green}{e+(e^{-e}-\frac{e}{2})x+o(x)})\\\\
=&\ln e+\ln(1+(e^{-e-1}-\frac{1}{2})x+o(x))\\\\
=&1+(e^{-e-1}-\frac{1}{2})x+o(x)
\end{aligned}
$$
于是
$$
\begin{aligned}
&1-\ln\left[\ln(x+e^{(1+x)^{1/x}})\right]\\\\
=&\color{red}-(e^{-e-1}-\frac{1}{2})x+o(x)
\end{aligned}
$$

### 最后

回代最初的题目得到
$$
\begin{aligned}
&\lim_{x\to0}\left\\\{1-\ln\left[\ln(x+e^{(1+x)^{1/x}})\right]\right\\\}/x\\\\
=&\lim_{x\to0}-(e^{-e-1}-\frac{1}{2})x/x+\lim_{x\to0}o(x)/x\\\\
=&\frac{1}{2}-e^{-e-1}
\end{aligned}
$$

## 总结

泰勒展开是一个非常强大的工具，从这题可见一斑。

如此复杂的一个函数
$$
1-\ln\left[\ln(x+e^{(1+x)^{1/x}})\right]
$$
通过**简单的、机械的、暴力的**几个步骤就可以求得泰勒展开，进而解决一些问题，也难怪泰勒展开在计算机中广泛应用。



并且虽然上述过程看起来很复杂，实际上熟练了之后手算可以非常快，考试的时候也是一种实用的方法。

