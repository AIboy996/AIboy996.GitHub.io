---
tags:
 - Jupyter
---

诚如标题，一款好用的IDE对于编程来说太重要了！！而在芸芸众IDE中，jupyter无疑是一颗super star. 

*当然，一门好用的编程语言也是很重要的*

<center><s>人生苦短，我用python</s></center>

![](https://files.mdnice.com/user/25860/af66b27f-89af-46a2-9cb1-52e1cfa6525d.png)
## 敬请期待
我们这个系列的推文将从各个方面来介绍jupyter（主要是jupyter notebook）以及它的使用方法，预计将会包括以下内容：
- 1、jupyter简介（本文）
- 2、jupyter nb的基本使用
  - 安装及个性化配置
  - 插件
  - notebook的书写
    - 代码单元格
    - markdown单元格
    - 其他单元格
  - notebook的导出
- 3、jupyter nb的进阶使用
  - ipython介绍
  - 安装其他kernel
  - magic command
  - 远程连接、多人协同
- 4、markdown和latex基础（番外）
<table border="0" cellpadding="0" cellspacing="0" style="border:1px solid #000000;">
<tr>
<td><img src=https://files.mdnice.com/user/25860/179a46c0-9e3c-4867-ad8a-e3371b6929dd.png border=0></td>
<td><img src=https://files.mdnice.com/user/25860/76ee8088-704e-4a8d-ae86-8c1bed35903e.png border=0></td>
</tr>
</table>

<center><s>所以点个关注吧，不定期更新</s></center>

## jupyter的毒
我中了jupyter的毒，每次遇到编程项目就忍不住点开它，我控制不住自己。每每我想改过自新，就会发现jupyter的新功能，就这样不断深陷其中，不能自拔。终于到了某一天，仅仅自己使用jupyter已经不能满足我了，于是我开始疯狂向别人安利。我不知道这样的后果，但是我就是这样做了，希望您没事儿！

![](https://files.mdnice.com/user/25860/32204a6e-0b3b-4b92-82e1-4bd62b459433.png)


## 什么是Jupyter
### key words
[官网（点击可跳转）](https://jupyter.org/)的一句话介绍——
> Free software, open standards, and web services for interactive computing across all programming languages

提到了几个关键词：免费、开放的标准、web服务、交互式编程、多编程语言。

我这里主要提一下web服务和交互式编程
#### web服务
这里所说的web服务指的是jupyter的实现方式。用户启动jupyter相当于在本地建立了一个web服务器，然后就可以通过浏览器访问相应的网址，进而使用jupyter。

所以jupyter的一切都是基于web技术的，类似的软件也有很多，例如VScode的web服务版：code server

![](https://files.mdnice.com/user/25860/ad6111c1-a11a-4db4-96d4-dbb6f592c27a.png)

基于这样一个原理，那么我们很容易就可以实现远程访问，只要你把对应的web端口开放给互联网。也可以实现多人协同，因为作为一个网页当然可以多人同时访问。再进一步我们可以用Docker快速部署相应的环境……

#### 交互式编程
**交互式编程**区别于**脚本式编程**，前者代码是一行一行运行的，后者则是以一个文件为单位运行的。

例如下面最简单的python代码（巧的是这句话在R语言中也是合乎语法的）：
```python
print("Hello world!")
```
我们可以在交互式运行环境单独运行这一句话

![](https://files.mdnice.com/user/25860/757168d4-13b9-45bc-a726-f48bd067a7bd.png)

也可以把这句话写入python脚本`.py`文件，然后运行整个文件。

![](https://files.mdnice.com/user/25860/f105fb9b-0e17-47c3-adc4-031e745b1b94.png)
这两种方式没有孰优孰劣，但是用途迥然。

**交互式编程**尤其适合碎片化的探索过程，例如在数据分析的前期进行数据的摸索、整理等；另外也特别适合在学习编程的过程中使用，因为每一行代码都是相对独立的，可以单独理解，配合jupyter notebook可以写出可读性很强的文档。

**脚本式编程**则适合搭建大型项目，毕竟文件之间的依赖关系只能通过`.py`的脚本构建。

在我一般的工作流中，交互式编程是**探索**的过程，而脚本式编程则是**整合**代码的过程。每一个项目难免遇到各种问题，一开始就写在一个`.py`脚本里，比较难调试。当项目调试通畅之后，把代码整合到脚本中可以更加简洁地呈现。

有点像数学两大巨人**欧拉**和**高斯**，他们都很强，但是学术风格迥异。欧拉喜欢在论文中留下思考的痕迹、保留推演的过程，读他的著作往往让人受益良多；然而高斯喜欢抹去思考的痕迹、只留下漂亮的结果，读他的著作虽然也会感叹其精妙绝伦却难以学到很多。

想必作为学习者，绝大部分适合我们期待看到的是一份欧拉式的详尽文档，而不是孤零零的一个高斯式的`.py`脚本文件。

但是不得不说，python自带的交互式环境还是非常难用的，于是ipython应运而生！
![](https://files.mdnice.com/user/25860/6cf6c7e1-3701-4216-aba4-175e12e360a6.png)
ipython加入了许多新功能，属于是开天辟地级别。而后jupyter notebook在此基础之上更进一步，就成为了现在的样子。

### 项目历史
官网直接截的图，感兴趣的可以仔细逛逛官网。
![](https://files.mdnice.com/user/25860/ad921117-0856-4c20-b03f-4d842c1d7cc1.png)

### 概念图
![](https://files.mdnice.com/user/25860/d6006832-dc9a-4a09-9d18-b72894e6c54c.png)
这是官网的封面图，其中可以看到诸如Python、C#、R、VB、JS、Lua……超级多编程语言的图标。这也显示出jupyter强大的包容性，你可以用它~~快乐地~~撸各种语言的代码。

官网再往下滑，你就可以看到jupyter的几大产品：

### Jupyter Lab
未来jupyter的主力软件，但是现阶段还不是那么好用，属于一款战未来的产品。
![](https://files.mdnice.com/user/25860/7ff94ddf-5fa9-46ae-962b-8257d215262b.png)
### Jupyter Notebook
现阶段jupyter的主力软件，简直不要太好用。也是我们这个系列介绍的主角。

下面列举了四个特点，分别是多语言、易分享、交互式输出、大数据工具集成。
![](https://files.mdnice.com/user/25860/4006cb7f-88a6-4290-9f99-8a44437c9616.png)
### Jupyter Hub
没用过，现在怎么什么阿猫阿狗都有Hub，什么Github、Dockerhub、Po……Hub
![](https://files.mdnice.com/user/25860/8a040148-c010-4a55-adb2-5fa30e301d09.png)

## 快来用
总而言之，作为当下最热门的python IDE之一，jupyter有其独特的魔力。加之jupyter对其他语言的广泛支持，她已经成为我生活中不可或缺的一份子了！

希望通过这一系列推文，你也能领略到她的魅力！


此致。