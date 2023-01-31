---
tags:
 - Jupyter
---


今天的推文是传销jupyter notebook的最后一篇啦！

`❗❗超级长文警告❗❗`
## 系列推文回顾
### 开端
第一篇推文作为系列的开端，给出了整个系列的大纲：
- 简介
- 基本使用
- 高阶使用
- markdown（番外

差不多刚好是四篇推文的规划，然后就简单介绍了jupyter的几个特点，重点在于交互式编程和web服务器。
### 基础使用
第二篇推文正式开始上手jupyter，我们介绍了：
- 如何安装jupyter
- 如何生成、修改配置文件
- 如何安装插件
- jupyter notebook的结构以及写法
- 一些快捷键
- 如何导出notebook

总的来说内容比较杂乱，前面安装的部分事无巨细，后面介绍用法的部分比较粗略，显得虎头蛇尾~~（写着写着没耐心了）~~，不过也还是倾注了很多心血，看完之后上手jupyter应该没什么问题。
### 乱入
第三篇推文和我的计划有些出入，本来远程连接这块只是一个甜点一样的东西，打算一带而过。然后写着写着发现这完全可以单独发一篇，就直接发了！

基本上这篇完全是兴趣使然，没什么大作用，但是成功之后有种莫名其妙的成就感。
### 堆料
于是今天我想要完结这个系列，就不得不写一个超级长文了。

## 安装其他kernel
首先我们来介绍如何在jupyter中安装其他kernel。
### 什么是kernel
所谓的kernel就是内核，笔记本的灵魂所在。

<center><s>不过它的灵魂经常挂掉就是了</s></center>

![](https://files.mdnice.com/user/25860/2a7b0dec-6d94-4b10-83dd-c6986d7be8aa.png)
<center><i>偶尔见</i></center>


![](https://files.mdnice.com/user/25860/a51b518c-de9d-428d-a220-27aee07f1678.png)
<center><i>经常见</i></center>

因为jupyter notebook本身只是一个工具、一种代码的组织形式、一个容器罢了。它所呈现的内容，所依托的程序包就是它的内核。例如python就可以作为它的内核，类似的也有很多其他编程语言可以作为jupyter notebook的内核。
### R语言

![](https://files.mdnice.com/user/25860/b74efb49-f4d2-4851-a7c6-e6c623c7705a.png)

上一篇推文的代码演示中就已经有R内核的身影了，现在我们正式介绍如何在jupyter中安装R内核。
#### Step1
我们首先安装R语言，如果你使用的是python的anaconda发行版，那么可以在命令行输入以下环境创建一个R语言的虚拟环境：
```
conda create -n r_env r-essentials r-base 
```
等待安装完成之后，用以下命令激活`r_env`环境：
```
conda activate r_env
```
然后键入`R`来启动R的命令行程序，出现以下界面说明安装成功！

![](https://files.mdnice.com/user/25860/0f3d1a89-03f1-49f3-a273-d51ba6046d24.png)
使用anaconda安装的好处就是，它会帮你自动配置好一切：

![](https://files.mdnice.com/user/25860/195d6596-2222-4333-b0d2-5e09572ac8ee.png)
正如创建虚拟环境成功之后命令行的提示，你已经可以在开始菜单看到相应的快捷方式。你已经可以通过这个快捷方式在jupyter里用上R语言了！！*（值得注意的是，你的R仅仅安装在了`r_env`环境下，如果你启动了`base`环境的jupyter依然是看不到R语言内核的）*

![](https://files.mdnice.com/user/25860/2d6399c8-38c0-4f5c-99ff-f370119a7c3f.png)
点开这个快捷方式之后就会发现，我们已经可以创建R内核的笔记本了！

![](https://files.mdnice.com/user/25860/f71af6e6-b1dc-4e59-827e-2320f6a12f9d.png)


> 这里参考`https://docs.anaconda.com/anaconda/user-guide/tasks/using-r-language/`官网永远有最好的教程！！！

不过如果你不喜欢臃肿的anaconda，你也可以选择单独安装R语言，自己进行相应的配置。

再如你已经是一个R语言老鸟了，已经在电脑上配置好了环境并且安装了许多包，那么创建一个新的环境显然不那么经济。

所以下面我们介绍不使用anaconda的方法。

#### Step2
我们在`R`的命令行运行下面的命令，就可以安装相应的库并且在jupyter中注册R内核：
```r
install.packages('IRkernel')
# to register the kernel in the current R installation
IRkernel::installspec()  
```
安装完之后，我们在Windows的命令行（一般CMD即可，可以使用快捷键`Win+R`打开运行窗口然后键入cmd快速打开）  
输入下面的命令查看jupyter的内核列表：
```
jupyter kernelspec list
```
如果安装成功应该会多出一个`ir kernel`

![](https://files.mdnice.com/user/25860/ea77dc95-0303-4193-92f0-ec687567a2b8.png)
这种方式安装的`R`内核，在默认的python环境即可使用，我们可以打开jupyter notebook查看：

![](https://files.mdnice.com/user/25860/720d35cf-1312-4ab2-9d0f-84e50714f77b.png)
#### 快速入门R内核的jupyter notebook
R内核的笔记本和python内核的笔记本有类似的地方也有截然不同的地方。
- 你可以在代码单元格运行一切的R code
![](https://files.mdnice.com/user/25860/e0c583c2-2ddc-4a9e-b4b9-41761c74db06.png)

- 有些插件需要额外配置才能在R内核的笔记本中正常工作，例如格式化代码工具`code prettify`，需要额外安装R包`formatR`

![](https://files.mdnice.com/user/25860/7962b5db-4aec-43cd-ba66-59b57cdcb3a4.png)
- `%`声明的魔法命令自然是不能用了，因为它其实是`ipython`的特性

![](https://files.mdnice.com/user/25860/baee57ff-457f-4b29-9e9c-19c96400daa8.png)
- `!`声明的快捷命令行也不再可用，这同样是`ipython`的特性

![](https://files.mdnice.com/user/25860/6f391770-519e-432e-879b-abd153f5afa2.png)

### 部分已支持的内核项目
其他的内核我本人使用的也不多就不再介绍，你可以在这些项目的介绍页面查看如何安装对应的kernel，感谢社区大佬们的倾情奉献。

<center><s>排名不分先后，python天下第一</s></center>

- Python（Defult kernel）

`https://github.com/ipython/ipython`
- Julia

`https://github.com/JuliaLang/IJulia.jl`
- R 

`https://github.com/IRkernel/IRkernel`
- Ruby 

`https://github.com/minrk/iruby`
- Haskell 

`https://github.com/gibiansky/IHaskell`
- Scala 

`https://github.com/Bridgewater/scala-notebook`
- node.js

`https://gist.github.com/Carreau/4279371`
- Go 

`https://github.com/takluyver/igo`
- Java

`https://github.com/SpencerPark/IJava/`

值得注意的是，每个项目都在相应的语言前面都加了一个`I`，例如`iruby`，这里的含义是`Interactive`，交互式的。
## markdown VS markup
### markdown
![](https://markdown.com.cn/hero.png)
或许上面的编程语言排序会让程序员撕一下B，但提到`markdown`程序猿们一定会团结一致。

不论前端还是后端，不论新手还是Hacker，老少皆宜、阖家欢乐、举国同庆、世界大同的一门语言非`markdown`莫属！它很有可能是当前程序员世界最流行的（非编程）语言。

不过不要被`语言`这个词吓到了，md的语法规则少得可怜，真的非常好写！保守估计2分钟上手，1小时熟练，1天精通。
### markup

![](https://files.mdnice.com/user/25860/5ed0ff1a-c5d1-410c-a8d4-06e6490d2526.png)

在正式介绍`markdown`语法之前，先介绍它的亲戚或者说祖先——`markup`，标记语言。

> 标记语言（markup language）是一种将文本（Text）以及文本相关的其他信息结合起来，展现出关于文档结构和数据处理细节的计算机文字编码。当今广泛使用的置标语言是超文本标记语言（HTML）和可扩展标记语言（XML）。标记语言广泛应用于网页和网络应用程序。标记最早用于出版业，是作者、编辑以及出版商之间用于描述出版作品的排版格式所使用的。

——摘自维基百科

互联网三大基石——HTML、JS、CSS之一的HTML就是一种`markup`语言，而根据上面的定义，`markdown`也算是一种`markup`语言，甚至大多数时候，markdown文档的呈现都是借助`HTML`实现的，后面我们也会看到这一点。
### 编辑器
我推荐使用的md编辑软件是`Typora`和`VS Code`。前者是专注markdown编辑的软件，bata测试了多年，前段时间正式开始收费，还掀起了一整风波；后者是全能型文本编辑器，巨硬出品，值得信赖！！

![](https://files.mdnice.com/user/25860/8eb4249d-feaa-4b9a-b11f-b80b84cd77f1.png)

另外，各大主流的博客网站也都支持markdown语法来输出内容，例如`知乎`、`CSDN`、~~还有`旦夕`的树洞哈哈哈~~
### 语法简述
下面我们就来看看这些东西如何用纯文本的markdown组织起来。
- 标题
```md
# 一级
## 二级
### 以此类推，最多六级
```
渲染效果：
![](https://files.mdnice.com/user/25860/cf8c9386-1dae-439b-bff6-9f5d1c1fe997.png)
- 着重
```md
**粗体**
*斜体*
~~删除线~~
```
渲染效果：
![](https://files.mdnice.com/user/25860/9261b042-34a0-475d-9f49-8aa9763c077d.png)
- 换行、换段
```md
注意直接回车是不能换行的  
需要在句末留下至少两个空格即可换行

段落之间留出一个空行可以实现换段。
```
渲染效果：
![](https://files.mdnice.com/user/25860/0f9ac0a4-9b54-405b-8a7f-e29fb9fe2444.png)
- 插入图片(可以使用网络路径，本地相对、绝对路径)
```md
![baidu](https://www.baidu.com/img/pc_9c5c85e6b953f1d172e1ed6821618b91.png)
```
渲染效果：
![](https://files.mdnice.com/user/25860/d594d112-0c8e-4df6-9059-6180610991be.png)
- 代码
```md
```python
x = [i**2 for i in range(10)]
``
这里也需要三个`，但是由于我这篇文档就是
使用markdown书写的这里会产生冲突，故而避讳
```
渲染效果：

![](https://files.mdnice.com/user/25860/b486acbe-2951-42d2-be97-42240c22605c.png)

- 引用
```md
> 这里是引用内容
```
渲染效果：
![](https://files.mdnice.com/user/25860/284423a1-c44f-4acb-965e-9066c3e1f827.png)

- 数学公式（扩展语法，大部分编辑器支持，但是原初的md似乎没有定义这部分内容

数学公式的书写借用了LaTex的语法！甚至有的时候你可以在里面写一些更复杂的LaTex
```md
行内公式$\sum X_n$
行间公式
$$
\prod X_n
$$
复杂LaTex
$$
\color{blue}
\begin{pmatrix}
1&2\\
2&1
\end{pmatrix}
$$
```
渲染效果：
![](https://files.mdnice.com/user/25860/d7f057e2-c9c8-42da-9b85-8aae5ed13dbc.png)

掌握以上的语法大概只是看几眼的事情（LaTex语法除外），大概也足够日常使用。
### 嵌入HTML
值得一提的是，markdown为了保持精简许多样式是不支持的，例如`下划线`，而前文也提到markdown大多时候是基于HTML实现的，所以我们可以在md文档中通过嵌入HTML标签的方式来引入内容。

- 例如特定格式的文本
```html
<center><u>居中、带下划线的文本</u></center>
<font color=red>我是红字</font>
```
渲染效果：
![](https://files.mdnice.com/user/25860/f6e44285-a957-49a1-839a-79b748c541e2.png)
- 再如svg图片
```html
<svg width="400" height="180">
  <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
  style="fill:red;stroke:black;stroke-width:5;opacity:0.5" />
</svg>
```
渲染效果：

![](https://files.mdnice.com/user/25860/8cea9df5-0d61-4726-b516-b7bcd9fc4247.png)
到这儿，你应该能感觉到其实markdown本质上就是简化版的HTML，你写的所有markdown都对应这一段HTML代码，编辑器在后台帮你做了这个事情。

例如
```md
# 标题
```
对应着
```HTML
<h1>标题</h1>
```
> 更多关于markdown的内容，推荐到它的官网查看   
`https://markdown.com.cn/`

![](https://files.mdnice.com/user/25860/17c3c8af-c1e5-4ea2-ad00-ec28f1b75aa9.png)

## 魔法命令介绍
### ipython
前文也提到了，魔法命令是`ipython`的特性，只有在python kernel的笔记本中才能使用。

ipython作为jupyter的父辈，很多时候可以作为jupyter notebook(python)的替代品（当你需要一个简单的交互环境又懒得打开notebook的时候）

你可以在命令行键入`ipython`打开程序：

![](https://files.mdnice.com/user/25860/8e5f8c23-5639-4a28-945e-81cc76cccfdd.png)
<center><i>pwd命令</i></center>

我们就通过ipython的命令行程序来了解各个魔法命令。

魔法命令分为两类，`line magics`和`cell magics`，前者需要用`%`声明，后者需要用`%%`声明，他们之间的区别可以通过下面的实例来体会
### Line magics

#### %automagic
或许你已经注意到了，虽然我一直说魔法命令需要用`%`或者`%%`来声明，但是很多时候我们不用百分号也可以正常使用。这是由于jupyter默认开启了`automagic`选项，可以缺省`%`前缀来使用魔法命令：
![](https://files.mdnice.com/user/25860/1b9a59d4-865a-47be-afbe-7c32b7373123.png)
#### %pwd
最常用的命令之一和Linux系统的命令作用相同，可以输出当前工作目录
![](https://files.mdnice.com/user/25860/ac9ba7ba-0ef5-4f30-8510-f1cd05b5bb75.png)
#### %ls
也是Linux常见的命令，作用是输出当前目录的文件

![](https://files.mdnice.com/user/25860/ac506a5f-5776-4e5d-bfde-1a3a7ac1b7e7.png)
#### %magic
输入这个命令可以查看magic command的说明文档！
![](https://files.mdnice.com/user/25860/b3aee789-ec4c-48d1-bf17-44859cdf8ae4.png)
#### %lsmagic
你可以通过这个命令查看所有可用的magic command，确实非常多我也就不继续介绍了，大家可以自己去看一看文档，实操一下！！
![](https://files.mdnice.com/user/25860/9f78961e-31cb-4e77-b3e0-961f5fa6250d.png)
### Cell magics
#### %%time
输出当前`Cell`的运行耗时
![](https://files.mdnice.com/user/25860/0834d2e5-5cf0-4313-8bae-7820841781ce.png)
### 这里实在写不下了
> 更多命令可以查看官方文档：  
> `https://ipython.readthedocs.io/en/stable/interactive/magics.html#line-magics`  
> 文档中有提到用户可以自己定义魔法命令，还可以使用社区中别人共享的魔法命令。这方面我也没有深入了解，感兴趣的可以自行挖掘。

我自己之前学习magic comamnd的时候也写了一点点笔记，**如有需要可以在后台回复`magic`，我会把笔记本放在网盘**

![](https://files.mdnice.com/user/25860/ee840e54-69b6-46a7-9bfc-4c64b80500ab.png)
<center><s>也就是把每个命令敲了一遍看看什么效果</s></center>

## 插件推荐
魔法命令介绍完了，再来介绍jupyter另外一个核心竞争力：强大、丰富的插件。

按照第二篇推文的方法安装完插件之后，我们在笔记本的首页就可以看到插件选项
![](https://files.mdnice.com/user/25860/9d3056e0-667c-4cfc-989d-5f23dac02dc6.png)
注意需要把箭头指向的tick取消勾选。

选中某个插件之后可以在下方查看详细的描述，下面介绍几个我常用的插件。
### Code prettify
这个插件的功能很简单，就是按照特定的标准格式化代码，点击小锤子按钮即可。这里不推荐Autopep8，因为它支持支python代码的格式化，而Code prettify可以支持其他语言的格式化。

#### 格式化python代码
![](https://files.mdnice.com/user/25860/7cba7b91-7a80-4c7f-b3c6-18cc809a767f.gif)
#### 格式化R代码
![](https://files.mdnice.com/user/25860/03b0d7dc-5f28-4e91-854f-27e706f67f36.gif)
### Codefolding
同样简单而强大的插件，可以把长代码进行折叠：

![](https://files.mdnice.com/user/25860/62d34283-bc8d-4720-b55d-80c7c2bd0008.png)
点击左侧的下三角即可折叠代码，和各大常见的IDE效果类似
![](https://files.mdnice.com/user/25860/db940607-ca83-4a33-8d9c-6de28d595fa1.png)
再点击`<->`即可展开代码
### ExecuteTime
可以自动记录程序运行开始的时间、运行耗时：
![](https://files.mdnice.com/user/25860/a2530bbf-0839-4fb7-b5e2-cf91a350d241.png)
代码单元格下方的时间信息就是由这个插件给出的。
### RISE
第二篇推文提到的另外一个插件，安装方法也已经介绍过了。

RISE是强大的演示插件，可以在jupyter中实现类似PPT的演示效果，如果你需要做一些coding的pre，那么RISE是不二之选：
![](https://files.mdnice.com/user/25860/5c31d72b-bf16-4255-bc14-a0d262fe2875.gif)
#### 操作逻辑
![](https://files.mdnice.com/user/25860/23eacaa5-096f-4388-b028-6bc89b6e0cb0.png)
在顶部菜单点击`幻灯片`可以激活RISE。
![](https://files.mdnice.com/user/25860/5bfbe08a-04be-46e5-afea-e0f6216ca358.png)
然后我们就可以针对每个单元格设置幻灯片类型
- `幻灯片`代表单独的一页，会开启一个单元
- `子幻灯片`在幻灯片之后，代表单元的每个小节
- `碎片`可以放在任何幻灯片之后，会呈现一个动画出现的效果
- `跳过`的内容不会出现在演示中
- `代码`也不会出现在演示中

点击顶部工具栏的演示按钮即可开始RISE演示
![](https://files.mdnice.com/user/25860/587d2df7-bb03-4b64-bd7a-cac8c23faf96.png)

演示：
![](https://files.mdnice.com/user/25860/6d49b619-4481-4229-ad9f-027aa18420f4.gif)
在演示页面点击❓可以查看快捷键：
![](https://files.mdnice.com/user/25860/36d125e7-4d64-42b9-9ffe-c5ea69454031.png)
### Table of Contents (2)
必装插件，没什么好说的，可以自动生成目录、自动添加标题序号：
![](https://files.mdnice.com/user/25860/7e991a0c-4b92-4ec3-9506-8a54264addf7.gif)
点击顶部的按钮可以开启左侧的目录，点击目录中的项目可以快速跳转，注意只有markdown单元格的标题内容会出现在目录中。

### Variable Inspector
一个还不错的变量监视器，可以实时显示global namespace的变量信息
![](https://files.mdnice.com/user/25860/bdb4e0c8-f0c7-4000-a961-977daa5a2628.gif)

也还要其他很多插件但是我平时一般不启用，大家可以多多探索！
## 自定义样式（美化
最后一部分我们来解决一下jupyter外观的问题，默认的确实有些问题，字号小、没有深色模式……
### 启用主题
命令行输入
```
pip install jupyterthemes
```
安装主题包，jupyterthemes的命令行使用`jt`作为快捷指令，输入下面的目录查看主题列表
```
jt -l
```
输入下面的目录安装特定的主题
```
jt -t chesterish
```
#### chesterish主题预览
![](https://files.mdnice.com/user/25860/f9dca664-e499-4a65-8b8c-0602ebf461f3.png)

不难看，但也不怎么好看。

更多主题相关的内容可以参考`知乎天意帝`的这篇博客：`https://zhuanlan.zhihu.com/p/54397619`
### 黑科技
很多时候我们只是想调节一下字体、字号（当然这个操作用`jt`也可以实现），那么可以参考`博客园ZhangHT97`大佬的文章：`https://www.cnblogs.com/ZhangHT97/p/13336975.html`

这位把jupyter web服务的CSS样式文件扒出来了，位于（anaconda路径因人而异）：
```
C:\Users\Username\anaconda3\Lib\site-packages\notebook\static\components\codemirror\lib
```
下面的CSS文件即使渲染jupyter网页使用的CSS之一
![](https://files.mdnice.com/user/25860/30be55cd-7b33-4955-be26-6a1c4e08f5a8.png)

打开该文件，修改`241行`的相关配置即可
![](https://files.mdnice.com/user/25860/d9508503-4f92-414f-9ef9-486caa79161b.png)

## 结语
至此这个系列就正式完结了，洋洋洒洒写了蛮多东西的，不过营养其实不多、毕竟都是网上可以查到的东西，我把他们整理在一起只是方便自己、也方便别人随时查阅，希望能帮助到你。



此致。
