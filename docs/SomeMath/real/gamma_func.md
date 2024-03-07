---
tags:
- 数学分析
include:
- math
---

# Gamma函数
> 本文纯手敲, 内容摘自靳志辉著《神奇的伽玛函数》，仅作为个人的学习笔记。
## 引入
### 指数函数
我们对世界的认知是从自然数开始的，从幼儿园到小学、中学再到大学，我们对**数**的认知在不断扩展。

例如：
如果你认得

$$2$$

倒也没什么，谁不认识呢？

如果你认得

$$2^2=4$$

那应该已经有小学（大概，毕竟我也忘记小学有没有学过整数幂了）的水准了。

如果你认得

$$2^{-2}=\frac{1}{4}$$

和

$$2^{0.25}=\sqrt[4]{2}=\sqrt{\sqrt{2}}$$

那至少是中学水准。

而到了大学，那你应该会认得

$$2^{i}=\exp(i\ln2)=\cos(\ln2)+i\sin(\ln2)$$

和

$$
2^{\sqrt{2}}= \sum_{n=0}^{\infty} \frac{\left(\sqrt{2} \ln 2\right)^n}{n!}
$$

*（实际中学的指数函数定义在实数集上，但是具体如何计算无理数次幂并未明确定义，这里给出的是更通用的级数定义，也可以用极限来定义）*

上面的例子就是我们所熟知的指数函数

$$2^x$$

它的定义域从自然数集“扩展”到整数集、有理数集，再到实数集、复数集的过程。

### 阶乘的延拓
而今天我们来介绍另外一个常见运算的“扩展”——阶乘。高中学习组合数学的时候我们见识过阶乘运算

$$n!=n\times(n-1)\cdots 2\times 1$$

它是定义在自然数集上的一个函数，实际意义是$n$个元素全排列的结果数。那我们又如何把这样一个函数“扩展”到更广的定义域上去呢？

这样一个问题，在数学中有更加专业的叫法：函数的**延拓**。

> 设$E$与$F$为两个集合，$P$为$E$的子集，而$f$为从$P$到$F$中的映射. 任一从$E$到$F$中的映射，如果它在$P$上的限制为$f$，则称该映射为$f$在$E$上的延拓。（摘自百度百科）

### 阶乘插值问题
或者从另外一个角度来看，我们做的事情是（在实数域、乃至复数域上）寻找一条光滑的、可解析的曲线，使他通过整数格点$(n,n!)$，这样一来就变成了**插值**问题。
> 在数学的数值分析领域中，内插，或称插值（英语：Interpolation），是一种通过已知的、离散的数据点，在范围内推求新数据点的过程或方法。（摘自维基百科）

而具体的做法想必你也已经猜到了，毕竟我们的标题至今还未出现，它就是魔法师——$\Gamma$ 函数

$$\Gamma(z)=\int_{0}^\infty t^{z-1}e^{-t}dt$$

$\Gamma$ 函数就是阶乘在(非负)实数域上的延拓。实际上也可以进一步延拓到复数域。并且利用这一工具我们也可以定义“**分数阶导数**”甚至“**实数阶导数**”这样的东西：

$$\frac{d^a}{dx^a}f(x), \ a\in R$$

## Gamma函数的导出
上节我们从指数函数说起, 提出了这样一个问题:
> 如何把阶乘运算"扩展"到实数域乃至复数域上, 也就是阶乘函数的**延拓**问题; 或者从另外一个角度来说, 如何寻找一条光滑曲线使得它通过整数格点$(n,n!)$, 也就是阶乘的**插值**问题.

其实后一种说法, 也就是阶乘的插值问题被研究得更早, 毕竟解析延拓所属的复分析理论要到十九世纪才全面发展.

### 无穷乘积形式

哥德巴赫很早就开始考虑阶乘的插值问题, 但是却无法解决这个问题. 于是他先后请教了尼古拉斯·贝努利和丹尼尔·贝努利. 前者也没有取得什么进展, 后者则在1729年给出了一个解答:

用**无穷乘积**的方式来延拓阶乘

$$
\lim_{m\to \infty}\frac{1\cdot2\cdot3\cdots m}{(1+n)(2+n)\cdots(m-1+n)}\left(m+\frac{n}{2}\right)^{n-1}=n!
$$

*(这一步从有限跳跃到无穷非常地 "分析 " )*

这样只要$m$取整数趋向于无穷大就可以了, $n$可以取一切实数.

而当时欧拉和丹尼尔·贝努利同在圣彼得堡学院任职, 于是他也得知了这个问题. 受到丹尼尔的启发他也给出了一个无穷积的插值公式:

$$
\left[\left(\frac{2}{1}\right)^n\frac{1}{n+1}\right]\left[\left(\frac{3}{2}\right)^n\frac{2}{n+2}\right]\cdots=n!
$$

整理即可得:

$$
\lim_{m\to \infty}\frac{1\cdot2\cdot3\cdots m}{(1+n)(2+n)\cdots(m+n)}\left(m+1\right)^n=n!
$$

这个式子比丹尼尔给出的式子稍微简洁一些, 但实际上收敛速度并不比丹尼尔的快. 

### 积分形式
不过更为重要的是此后欧拉还计算了一些特殊值的阶乘, 从而进行归纳与猜想, 例如:

$$
\begin{aligned}
&\left(\frac{1}{2}\right)! \\\\
=&\sqrt{\frac{2}{1}}\cdot\frac{2}{3}\cdot\sqrt{\frac{3}{2}}\cdot\frac{4}{5}\cdot\sqrt{\frac{4}{3}}\cdot\frac{6}{7}\cdot\sqrt{\frac{5}{4}}\cdot\frac{8}{9}\cdots \\\\
=&\sqrt{\frac{4}{2}}\cdot\frac{2}{3}\cdot\sqrt{\frac{6}{6}}\cdot\frac{4}{5}\cdot\sqrt{\frac{8}{6}}\cdot\frac{6}{7}\cdot\sqrt{\frac{10}{8}}\cdot\frac{8}{9}\cdots \\\\
=&\sqrt{\frac{4}{3}\cdot\frac{2}{3}}\cdot\sqrt{\frac{6}{5}\cdot\frac{4}{5}}\cdot\sqrt{\frac{8}{7}\cdot\frac{6}{7}}\cdot\sqrt{\frac{10}{9}\cdot\frac{8}{9}}\cdots \\\\
=&\sqrt{\frac{2}{3}\cdot\frac{4}{3}\cdot\frac{4}{5}\cdot\frac{6}{5}\cdot\frac{6}{7}\cdot\frac{8}{7}\cdots} \\\\
=&\sqrt{\frac{\pi}{4}}
\end{aligned}
$$

其中最后一步运用了著名的沃利斯公式:

$$
\begin{aligned} 
&\frac{\pi}{2} \\\\
=&\prod_{n=1}^{\infty}\left(\frac{4 n^{2}}{4 n^{2}-1}\right) \\\\ 
=&\prod_{n=1}^{\infty} \frac{(2 n)(2 n)}{(2 n-1)(2 n+1)}\\\\
=&\frac{2}{1} \cdot \frac{2}{3} \cdot \frac{4}{3} \cdot \frac{4}{5} \cdot \frac{6}{5} \cdot \frac{6}{7} \cdot \frac{8}{7} \cdot \frac{8}{9} \cdots \end{aligned}
$$

欧拉看到分数阶乘的结果中出现了$\pi$ 便敏锐的认识到$n!$的延拓形式可能与积分有关. 并且其中用到的沃利斯公式虽然是在微积分还未发明的1655年给出的, 但是实际上的思想也是微积分的思想. 于是欧拉开始寻求积分形式的插值公式.

欧拉首先考虑了这样一个积分(后来被称为**第一类欧拉积分**, 也就是Beta函数):

$$
B(a,b)=\int_0^1x^a(1-x)^bdx
$$

其中$a$为正实数, $b$为正整数.

使用分部积分我们可以得到:

$$
B(a,b)=\frac{b}{a+1}B(a+1,b-1)
$$

重复迭代下去, 得到:

$$
B(a,b)=\frac{b\cdot(b-1)\cdots 1}{(a+1)(a+2)\cdots(a+b+1)}
$$

于是有:

$$
b!=(a+1)(a+2)\cdots (a+b+1)\int_0^1x^a(1-x)^bdx
$$

至此, 已经把阶乘表示为一个积分的形式了. 但是由于因子

$$
(a+1)(a+2)\cdots (a+b+1)
$$

的存在, $b$ 仍然限制在整数. 而此时的$a$是任意的实数, 我们考虑**让$a$趋于无穷**看会发生什么事情.

这里的技巧性很强, 我们设$a=\frac{f}{g}$, 整理得到:
$$
\begin{aligned}
&\frac{b !}{(f+g)(f+2 g) \cdots(f+b g)}\\\\
\\\\
=&\frac{f+(b+1) g}{g^{b+1}} \int_{0}^{1} x^{\frac{f}{g}}(1-x)^{b} d x
\end{aligned}
$$
令$f\to 1$, $g\to 0$, 等式左侧趋于$b!$

为了简化计算我们记$x=t^h$, $h=\frac{g}{f+g}$, 此时有$h\to0$带入整理得:

$$
\begin{aligned}
&\frac{b !}{(f+g)(f+2 g) \cdots(f+b g)}\\\\
\\\\
=&\frac{f+(b+1) g}{g^{b+1}} \int_{0}^{1} h\left(1-t^{h}\right)^{b} d t \\\\ 
=&\frac{f+(b+1) g}{(f+g)^{b+1}} \int_{0}^{1}\left(\frac{1-t^{h}}{h}\right)^{b} dt
\end{aligned}
$$

而根据导数的定义:

$$
\begin{aligned}
&\lim_{h\to0}\frac{1-t^h}{h}\\\\
=&\lim_{h\to0}-\frac{1-t^h}{0-h}\\\\
=&-\left.\frac{d}{dh}t^h\right|_{h=0}\\\\
=&-t^0\ln t\\\\
=&-\ln t
\end{aligned}
$$

另外容易得到

$$
\lim_{g\to 0,f \to 1}\frac{f+(b+1) g}{(f+g)^{b+1}}=1
$$

带入得到

$$
b!=\int_0^1\left(-\ln t\right)^bdt
$$

再做变量代换$t=e^{-s}$有

$$
b!=\int_0^\infty s^be^{-s}ds
$$

此时的表达式可以轻松延拓到实数域上, 这就是我们常见的$\Gamma$ 函数, 通常也称为**第二类欧拉积分**:

$$
\Gamma(a) = \int_0^\infty t^a e^{-t}dt
$$

至此我们已经导出了（差不多的）伽马函数.

### n!还是(n-1)!

注意到上述欧拉推导出的积分形式和我们最常见的$\Gamma$函数还差了一点**修正**：
$$
\color{RedViolet}\Gamma(z)=(z-1)!=\int_0^\infty t^{z-1}e^{-t}dt
$$
同样$B$函数也进行修正：
$$
\begin{aligned}
\text{修正前 }&\tilde B(a,b)=\int_0^1x^{a}(1-x)^{b}dx\\\\
\text{修正后 }&B(a,b)=\int_0^1x^{a-1}(1-x)^{b-1}dx
\end{aligned}
$$

这是由**勒让德**首次作出的修正，并且$\Gamma$这个符号也是他首次引入进而流传开来的。这样一个细微的修正虽然只是把$\Gamma$函数平移了一下，看起来$\Gamma(z)=(z-1)!$也缺乏美感。但是这样一来，在更多其他的场合却能得到**更优雅**的形式，例如：
$$
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$
而未修正前：
$$
\tilde B(a,b)=\frac{\tilde\Gamma(a)\tilde\Gamma(b)}{\tilde\Gamma(a+b+1)}
$$

前者更具美感。当然这种解释只是后人给出的猜想，没人知道勒让德为什么选择了进行位移修正。

今天我们接着介绍伽马函数**其他的导出方法**以及它的**性质**

### 另外一种导出方法

有这样一种通俗易懂的方法可以导出伽马函数，我们考虑下述展开式：

$$
\begin{aligned}
&\frac{1}{1-x}\\\\
\text{离散展开}=&\sum_{n=0}^\infty x^n\\\\
\text{连续展开}=&\int_0^\infty e^{-(1-x)t}dt\\\\
e^{xt}\text{ 展开}=&\int_0^\infty e^{-t}\sum_{n=0}^\infty \frac{(xt)^n}{n!}dt\\\\
\text{(**)}=&\sum_0^\infty \frac{\int_0^\infty e^{-t}t^ndt}{n!}x^n\\\\
\end{aligned}
$$

比较离散展开和$(**)$的系数可知

$$
\frac{\int_0^\infty e^{-t}t^ndt}{n!}=1
$$

也即是

$$
\Gamma(n+1) = \int_0^\infty e^{-t}t^ndt=n!
$$

值得注意的是，这里$(**)$步骤交换了无穷求和和无穷积分的顺序，这实际上是由于它们的**一致收敛性**。

> 此方法摘自百度百科

## 性质

这里我们简要介绍一些伽马函数常用的性质，更多内容以及证明过程详见文末的参考文献。

### 递推关系

$$
\color{RedViolet}\Gamma(z+1)=z\cdot\Gamma(z)
$$

使用**分部积分法**可以证明。

### 与Beta函数的关系


$$
\color{RedViolet}B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

把$\Gamma(a)\Gamma(b)$转化为**二重积分**可以证明。

### 欧拉无穷乘积

我们在上一篇文章已经介绍了欧拉给出的无穷乘积插值公式：
$$
\left[\left(\frac{2}{1}\right)^n\frac{1}{n+1}\right]\left[\left(\frac{3}{2}\right)^n\frac{2}{n+2}\right]\cdots=n!
$$
其等价形式为：
$$
\color{RedViolet}\Gamma(z)=\frac{1}{z}\prod_{n=1}^\infty \\{ (1+\frac{z}{n})^{-1}\left(1+\frac{1}{n}\right)^z\\}
$$
这个式子除了在$z=-n$外，都是良好定义的。

### 魏尔施特拉斯无穷乘积

上述欧拉无穷乘积的极限形式为：
$$
\begin{aligned}
&\Gamma(z)\\\\
=&\lim_{n\to \infty}\frac{1\cdot2\cdot3\cdots n}{z(1+z)(2+z)\cdots(n+z)}n^z
\end{aligned}
$$
考虑把最后一个因式改写：
$$
\begin{aligned}
&n^{z}\\\\
=&\exp (z \ln n)\\\\
=&\exp \\{z\left[\ln n-\sum_{m=1}^{n} \frac{1}{m}\right]\\} \prod_{m=1}^{n} \mathrm{e}^{z / m}
\end{aligned}
$$
得到：
$$
\color{RedViolet}\frac{1}{\Gamma(z)}=z \mathrm{e}^{\gamma z} \prod_{n=1}^{\infty}\\{\left(1+\frac{z}{n}\right) \mathrm{e}^{-z / n}\\}
$$
其中$\gamma$为**欧拉常数**：
$$
\color{RedViolet}\gamma = \lim_{n\to\infty}\\{\sum_{m=1}^n\frac{1}{m}-\ln n\\}
$$
在证明**调和级数发散**时我们遇到过这个极限。

### 余元公式
也叫欧拉反射公式：

$$
\color{RedViolet}\Gamma(z)\Gamma(1-z)=\frac{\pi}{\sin \pi z}
$$

使用上述的魏尔施特拉斯无穷乘积可以证明：
$$
\begin{aligned}
&\Gamma(z)\Gamma(-z)\\\\
=&-\frac{1}{z^2}\prod_{n=1}^{\infty}\left(1-\frac{z^2}{n^2}\right)^{-1}
\end{aligned}
$$
而这一结果恰好含有三角函数$\frac{\sin \pi z}{\pi z}$的无穷乘积形式。

**简单理解**如下：（无穷乘积实际上有更完善的理论支持）

$g(z)=\frac{\sin \pi z}{\pi z}$的零点为所有的非零整数，也就是
$$
\cdots-n\cdots-1,1\cdots n\cdots
$$
而这样一个无穷乘积：
$$
\prod_{n=1}^\infty\left(1-\frac{z^2}{n^2}\right)=0
$$
恰好可以包括$g(z)$所有的零点，可以理解为它的因式分解，且$z=0$时上式恰好等于$\lim_{z\to0}g(z)=1$。

于是：
$$
\color{RedViolet}\frac{\sin \pi z}{\pi z} = \prod_{n=1}^\infty\left(1-\frac{z^2}{n^2}\right)
$$


带入到本节最初的式子：
$$
\begin{aligned}
&\Gamma(z)\Gamma(-z)\\\\
=&-\frac{1}{z^2}\prod_{n=1}^{\infty}\left(1-\frac{z^2}{n^2}\right)^{-1}\\\\
=&-\frac{1}{z^2}\frac{\pi z}{\sin \pi z}\\\\
\Rightarrow\\\\
&\Gamma(z)\Gamma(1-z)\\\\
=&\Gamma(z)\left[(-z)\cdot\Gamma(-z)\right]\\\\
=&-z\cdot\Gamma(z)\Gamma(-z)\\\\
=&\frac{\pi}{\sin \pi z}
\end{aligned}
$$

### 倍元公式

勒让德倍元公式：
$$
\color{RedViolet}\Gamma(z)\Gamma(z+\frac{1}{2})=2^{1-2z}\sqrt{\pi}\Gamma(2z)
$$
一般的：
$$
\color{RedViolet}
\begin{aligned}
&\prod_{k=1}^{n-1}\Gamma\left(z+\frac{k}{n}\right)\\\\
\\\\
=&(2 \pi)^{\frac{1}{2}(n-1)} n^{\frac{1}{2} n z} \Gamma(n z)
\end{aligned}
$$
该式证明较为复杂，**关键步骤**需要构造一个辅助函数如下：
$$
\phi_{n}(z)=\frac{n^{n z}}{n \Gamma(n z)} \prod_{k=0}^{n-1}\Gamma\left(z+\frac{k}{n}\right)
$$
证明它的取值仅和$n$相关，进而可以取$z=\frac{1}{n}$。


## Gamma函数的应用

本节来介绍$\Gamma$函数的一些实际应用场景。

我们首先补充一个定理，说明$\Gamma$函数作为阶乘的延拓，其特殊性

>  $\text{Bohr–Mollerup theorem}$
>
> $\Gamma(x)$ is the **only** function that satisfies $f(x+1)=xf(x)$ with $\log f(x)$ convex and also with $f(1)=1$.

也就是说，虽然诸如
$$
f(x)=\Gamma(x)+\sin(x\pi)
$$
这样的函数也可以通过所有的整数格点：$(n,n!)$，但是它的性质没有$\Gamma(x)$好，没有**对数凸性**。从这个定理描述的唯一性看来，欧拉构造的$\Gamma$函数颇有一种**函数本天成，妙手偶得之**的感觉。

在概率论中，$\Gamma$函数最常见于各种**积分运算**。

### 标准正态分布规范性

标准正态分布的密度函数如下：
$$
\begin{aligned}
&X\sim N(0,1)\\\\
\\\\
&f_X(x)=\frac{1}{\sqrt{2\pi}}\exp\\{-\frac{x^2}{2}\\}
\end{aligned}
$$

它的**规范性**基于如下积分：
$$
\color{RedViolet}\int_{-\infty}^{+\infty}\exp\\{-\frac{x^2}{2}\\}dx=\sqrt{2\pi}
$$
**证明法一**（$\Gamma$函数）：
$$
\begin{aligned}
&\int_{-\infty}^{+\infty}\exp\\{-\frac{x^2}{2}\\}dx\\\\
=&2\int_{0}^{+\infty}\exp\\{-\frac{x^2}{2}\\}dx\\\\
\\\\
&t=\frac{x^2}{2}, dx=\frac{1}{\sqrt{2t}}dt\\\\
\\\\
=&2\int_{0}^{+\infty}\frac{1}{\sqrt{2t}}e^{-t}dt\\\\
=&\sqrt{2}\color{RedViolet}\int_{0}^{+\infty}t^{\frac{1}{2}-1}e^{-t}dt\\\\
=&\sqrt{2}\cdot \Gamma(\frac{1}{2})\\\\
=&\sqrt{2\pi}
\end{aligned}
$$

**证明法二**（二重积分）：

令
$$
I_1=\int_{-\infty}^{+\infty}\exp\\{-\frac{x^2}{2}\\}dx
$$
则有
$$
\begin{aligned}
&I_1^2\\\\
=&\int_{-\infty}^{+\infty}\exp\\{-\frac{x^2}{2}\\}dx\int_{-\infty}^{+\infty}\exp\\{-\frac{y^2}{2}\\}dy\\\\
=&\int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}\exp\\{-\frac{x^2}{2}\\}\exp\\{-\frac{y^2}{2}\\}dxdy\\\\
=&\iint_{R^2}\exp\\{-\frac{x^2+y^2}{2}\\}dxdy\\\\
\\\\
&x=r\cos\theta\\\\
&y=r\sin\theta\\\\
\\\\
=&\int_0^{2\pi}\int_{0}^{\infty}\exp\\{-\frac{r^2\cos^2\theta+r^2\sin^2\theta}{2}\\}rdrd\theta\\\\
=&\int_0^{2\pi}\left[\int_{0}^{\infty}\exp\\{-\frac{r^2}{2}\\}\frac{1}{2}dr^2\right]d\theta\\\\
=&\int_0^{2\pi}1d\theta\\\\
=&2\pi
\end{aligned}
$$
于是
$$
I_1=\int_{-\infty}^{+\infty}\exp\\{-\frac{x^2}{2}\\}dx=\sqrt{2\pi}
$$

### 标准正态分布k阶矩

$$
\begin{aligned}
&X\sim N(0,1)\\\\
\\\\
&E(X^k)=\begin{cases}
&0&k\text{为奇数}\\\\
&(k-1)!!&k\text{为偶数}
\end{cases}
\end{aligned}
$$

其中$(k-1)!!=\prod_{i=1}^{\frac{k}{2}}(2i-1)$，表示**双阶乘**

证明：
$$
\begin{aligned}
&E(X^k)\\\\
=&\int_{-\infty}^{+\infty}x^k\frac{1}{\sqrt{2\pi}}\exp\\{-\frac{x^2}{2}\\}dx\\\\
=&\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{+\infty}x^k\exp\\{-\frac{x^2}{2}\\}dx\\\\
\end{aligned}
$$
令
$$
I_2=\int_{-\infty}^{+\infty}x^k\exp\\{-\frac{x^2}{2}\\}dx\\\\
$$
当$k$为奇数时，被积函数为奇函数而积分区域关于原点对称，$I=0$显然

当$k$为偶数时，令$t=\frac{x^2}{2}, dx=\frac{1}{\sqrt{2t}}dt$
$$
\begin{aligned}
&I_2\\\\
=&2\int_{0}^{+\infty}x^k\exp\\{-\frac{x^2}{2}\\}dx\\\\
=&2\cdot\sqrt{2^k}\cdot\int_{0}^{+\infty}t^{(\frac{k}{2}+1)-1}e^{-t}\frac{1}{\sqrt{2t}}dt\\\\
=&\sqrt{2}\cdot\sqrt{2^k}\color{RedViolet}\cdot\int_{0}^{+\infty}t^{\frac{k+1}{2}-1}e^{-t}dt\\\\
=&\sqrt{2^{k+1}}\cdot\Gamma\left(\frac{k+1}{2}\right)\\\\
=&\sqrt{2^{k+1}}\cdot\frac{k-1}{2}\cdot\Gamma\left(\frac{k-1}{2}\right)\\\\
&\cdots\\\\
=&\sqrt{2^{k+1}}\frac{(k-1)!!}{\sqrt{2^k}}\Gamma(\frac{1}{2})\\\\
=&\sqrt{2\pi}(k-1)!!
\end{aligned}
$$
于是$k$为偶数时
$$
E(X^k)=\frac{I_2}{\sqrt{2\pi}}=(k-1)!!
$$
诸如此类，概率论中经常会遇到含有$\Gamma$函数的积分，笔者也是在这个场合首次遇到了$\Gamma$函数。

### Gamma分布

一个更加直接的例子就是$\Gamma$分布

我们知道$\Gamma$函数定义如下：
$$
\Gamma(z)=\int_0^\infty t^{z-1}e^{-t}dt
$$
把被积函数作为**核**，于是有定义在$(0,+\infty)$上的$\Gamma$分布：
$$
\begin{aligned}
&T\sim\Gamma(z,1)\\\\
\\\\
&f_T(t)=\frac{t^{z-1}e^{-t}}{\Gamma(z)}
\end{aligned}
$$
显然满足规范性
$$
\int_0^{+\infty} f_T(t)dt=1
$$
如果再做变换$Y=\frac{1}{\lambda}T$，就得到一般的$\Gamma$分布，其中$\lambda$为**尺度参数**
$$
\begin{aligned}
&Y\sim \Gamma(z,\lambda)\\\\
\\\\
&\color{RedViolet}f_Y(y)=\frac{\lambda^z y^{z-1}e^{-\lambda y}}{\Gamma(z)}
\end{aligned}
$$
$\Gamma$分布在概率论中非常重要，它与**三大抽样分布**$\chi^2$分布、$t$分布、$F$分布紧密相关；它有**良好的性质**，如独立可加性；也有**易于计算**的$k$阶中心矩；在很多时候它也是**优良的先验分布**，这里就不过多赘述，以后会出专门的推文介绍各大分布。

### 数论中的Gamma函数

这部分内容讲了也没什么意思，我也一知半解。总之就是和**黎曼猜想**，**质数的分布**，**黎曼函数**，**双伽马函数(Digamma)**，**巴塞尔问题**，**欧拉常数**这些词条相关，感兴趣的同学可以自己了解。

### 分数微积分
**分数微积分**是数学分析的一个分支，研究微分算子$D=\frac{d}{dx}$和积分算子$J$的**实数次幂**的可能应用。

我们知道
$$
f(x)=x^n
$$
它的$k$阶导数为
$$
\frac{d^k}{dx^k}f(x)=\frac{n!}{(n-k)!}x^{n-k}
$$
这样就出现了阶乘，我们用伽马函数代替它，就有：
$$
\color{RedViolet}(D^kf)(x)=\frac{\Gamma(n+1)}{\Gamma{n-k+1}}x^{n-k}
$$
这里的$k$可以延拓到实数，于是我们类似地定义其他函数的实数阶导数。利用**函数项级数**，我们可以定义更多函数的实数阶导数，也就是微分算子的实数次幂。

我们也可以定义**积分算子**的实数次幂：
$$
\color{RedViolet}(J^\alpha f)(x)=\frac{1}{\Gamma(\alpha)}\int_0^x(x-t)^{\alpha-1}f(t)dt
$$
这样定义出来的积分算子具有半群性：
$$
J^\alpha J^\beta=J^{\alpha+\beta}
$$
更多关于分数微积分的内容，参见维基百科的**分数微积分**词条。