---
tags:
 - Jupyter
---

今天我们介绍jupyter notebook的保姆级基本使用方法
## 安装和个性化配置
我们首先介绍如何在计算机上安装jupyter，这里以Windows为例，MacOS和Linux系统也差不多。
### Anaconda发行版
第一种安装方法非常简单，如果你从未接触过python，那么直接选择选择Anaconda发行版可以省去很多麻烦事。

*anaconda在英语中意为水蟒而python在英语中意为蟒蛇*
![](https://files.mdnice.com/user/25860/91e03115-a1fc-42b7-aa61-339127fb86ae.png)

<center>他们的logo都是🐍</center>


#### Step1
先从官网上下载Anaconda安装包。网站的服务器在国外，没有魔法可能下载很慢，如有需要后台回复**jupyter**我会把最新版的放在网盘供大家下载。

![](https://files.mdnice.com/user/25860/1775e6c6-3524-4094-af8b-71a361d83752.png)
网址：
> https://www.anaconda.com/products/individual

下载完之后直接双击运行。
#### Step2
然后进入到安装页面
![](https://files.mdnice.com/user/25860/e03dfb9f-e9fc-4e2b-85a5-7e4da5958f4e.png)
直接**Next**

![](https://files.mdnice.com/user/25860/63a9f010-cd20-4412-bd2c-3235bcdc12a9.png)
选择**I Agree**

![](https://files.mdnice.com/user/25860/87e69f0b-eb88-4450-a8bc-1d8ce11e5a90.png)
选择Just me或者All Users都可以，点击**Next**

![](https://files.mdnice.com/user/25860/75b03022-6749-4933-9d55-5f4bfb26574a.png)
这里要注意安装路径的选择，因为Anaconda非常臃肿，你使用一段时间后可能会达到**10GB**的占用，所以需要提前预算好，我这里是虚拟机演示，没有这方面的顾虑故直接**Next**


![](https://files.mdnice.com/user/25860/28ae93f5-c5cd-413f-b406-5a55ef9066d8.png)
这里两个选项需要**特别注意**。

第一个是把anaconda3添加到PATH，如果你点上了会有红色警示，说如果点上了会使得anaconda在任意目录下被找到。一般来说为了方便，我会点上这个选项，这样就可以在任何路径下使用anaconda的命令行工具。

第二个则是把anaconda的python 3.9解释器注册为默认python解释器。一般新手的python环境比较干净，这个选项不用去管。

选好之后**Install**

![](https://files.mdnice.com/user/25860/ac9dd2a6-b3d9-4333-8de3-b6397139f7bb.png)
稍作等待，出现以上画面，然后一连串的**Next**后，来到安装结束界面。

![](https://files.mdnice.com/user/25860/44327f32-1560-4992-a6a8-301c37a80d2e.png)
点击**Finsh**即可结束安装。

这时**开始菜单**中会自动添加Anaconda文件夹：

![](https://files.mdnice.com/user/25860/3b76bbbc-5c1e-4863-b957-11cb36a918c9.png)

> 总的来说，安装过程就是不断地Next，需要注意的就是**安装路径**和**是否添加到PATH**这两个地方。
#### 启动jupyter
有三种方式启动jupyter
##### 1 使用命令行启动
![](https://files.mdnice.com/user/25860/3b76bbbc-5c1e-4863-b957-11cb36a918c9.png)
点击上图第三个快捷方式Anaconda Prompt，会弹出一个命令行窗口：

![](https://files.mdnice.com/user/25860/b0ebd357-4cf9-4c6b-9f66-b67f00cf8bbe.png)
*注意这里的（base）代表当前激活的环境，如果使用其他prompt工具比如CMD、Powershell不会自动激活base环境，则需要先激活环境或者直接把anaconda添加到PATH才可以执行相关命令*

在命令行输入以下命令可以启动jupyter：
```shell
jupyter notebook
```
运行示例：
![](https://files.mdnice.com/user/25860/86388bea-0c0a-470e-8ab2-0314802ce6a2.png)
一般来说会自动弹出浏览器：
![](https://files.mdnice.com/user/25860/bc37fde7-a1e7-4ce4-9e63-a8220b6dfd1d.png)
至此jupyter notebook就安装成功，并且启动成功了。

这个命令还可以添加一些参数，例如在指定端口（默认8888）启动：
```shell
jupyter notebook --port=8888
```
再如不打开浏览器：
```shell
jupyter notebook --no-browser
```
更多选项可以输入一下命令查看：
```shell
jupyter notebook --help
```
##### 2 使用快捷方式启动
![](https://files.mdnice.com/user/25860/3b76bbbc-5c1e-4863-b957-11cb36a918c9.png)
点击上图第四个快捷方式在**默认配置**下启动jupyter notebook。
##### 3 使用Anaconda Navigator启动
**不推荐此方法**，因为Anaconda Navigator非常的卡，响应极慢！！
![](https://files.mdnice.com/user/25860/3b76bbbc-5c1e-4863-b957-11cb36a918c9.png)
点击上图第一个快捷方式，等待加载，然后在图形化界面可以启动jupyter notebook

![](https://files.mdnice.com/user/25860/14279667-ac12-4ea3-a582-a48b81cbec35.png)

#### 我需要Anaconda吗
> 不得不说，Anaconda实在是**非常臃肿**。作为一个数据科学软件包，他纳入了诸如jupyter, spyder, TensorFlow, Pytorch, Numba等等等诸多软件。而很多时候我们用不到这些软件，故下一节我们介绍**精简安装**。

![](https://files.mdnice.com/user/25860/7426bd79-d71a-4c35-9acd-2ccc4e4b5011.png)
<center>Anaconda内置的包</center>

### 精简安装（推荐）
#### Step1
安装python，安装包同样可以从官网*https://www.python.org/downloads/*
获取：
![](https://files.mdnice.com/user/25860/4a50ed11-f6b4-47d9-ac6f-fd13ed624336.png)
我们这里安装3.9.10的版本。点开安装包之后注意勾选上**Add TO PATH**否则只有在安装路径才能使用命令行工具，然后**Install Now**即可一键安装。
#### Step2
安装jupyter，我们首先打开任意的命令行窗口，Windows可以同时按下键盘上的`Win`和`R`调出快捷启动，然后输入CMD即可

![](https://files.mdnice.com/user/25860/9cb76765-158d-4b93-b6ac-b00b048c5596.png)
然后在命令行输入
```shell
pip install jupyter notebook
```
即可完成jupyter notebook的安装。

![](https://files.mdnice.com/user/25860/3487bbb6-ca8b-4a49-b9d0-dc04e9b2740a.png)
等待片刻，pip会自动进行安装：
![](https://files.mdnice.com/user/25860/34d54d55-d9db-4f16-9572-941c3f98ea8d.png)
见到如上字样即代表安装成功，可以在当前命令行直接输入
```shell
jupyter notebook
```
启动jupyter notebook

![](https://files.mdnice.com/user/25860/f8c06fa8-d3e4-4917-aa60-5f4a750671b0.png)

> 总的来说，使用pip安装jupyter nb实际上非常简单，也更加精简。我更推荐这个安装方法，毕竟你迟早得学会如何安装、管理python的各种库和包。
### 个性化配置
正式进入jupyter的使用界面，首先看到的是一系列的文件夹，对应着我们默认的工作目录`C:\Users\Username`，而很多人并不习惯把个人文件放在这个目录下（虽然微软的本意如此）
![](https://files.mdnice.com/user/25860/3cc1571d-5db6-4833-b98b-658145dd9152.png)
并且，我们每次运行jupyter notebook都会自动弹出一个浏览器窗口，有时这很烦人。

于是我们需要自定义一些配置，所幸jupyter notebook给足了自由发挥的空间。
#### 生成配置文件
还是在命令行，输入以下命令：
```shell
jupyter notebook --generate-config
```
而后会生成一个`.py`配置文件，并且提示它的位置
![](https://files.mdnice.com/user/25860/316bdace-cb2b-4fcb-b873-f0493ccac33a.png)
我们找到这个文件，用python默认的IDE或者其他任何文本编辑器(例如记事本, VScode, Sublime Text, Notepad等) 打开即可开始自定义。

可自定义的选项非常多，我们简单介绍几个常用配置。
#### 自定义工作目录
第`393行`
![](https://files.mdnice.com/user/25860/85a27e5c-b7ba-4eae-9a62-d41a23222917.png)
把`#`删去取消注释，然后把后面的字符串改为你想要的目录。

特别注意，windows下默认使用的是`C:\Users`这种以反斜杠作为目录分隔符的路径，但是在python字符串语法中，反斜杠代表转义符，所以需要在字符串前面加上`r`也就是`r'C:\Users\'`python才可以正确识别

![](https://files.mdnice.com/user/25860/deb81dba-3593-403f-9e3e-273c88094e81.png)

#### 自定义是否打开浏览器

第`401行`
![](https://files.mdnice.com/user/25860/1d5b73d8-bad9-4c70-b40c-afbd2ba518b5.png)
取消注释，把`True`改为`False`即可。
![](https://files.mdnice.com/user/25860/cef628cc-dc7c-4562-96fd-fdd38978bcf6.png)


其他诸多配置，可以根据需求配置。修改完成后，保存文件重启jupyter即可应用配置。
## 插件安装
在正式写notebook之前，我们先把插件安装了，这也是命令行工作，省的后面还要来回切换。

先执行
```shell
pip install jupyter_contrib_nbextensions
```
再执行
```shell
jupyter contrib nbextension install --user
```
这样再打开jupyter notebook我们就能看到插件目录了：

![](https://files.mdnice.com/user/25860/dbdd4d1b-1b5d-4535-a1e7-5b8d373d151f.png)
在这里你可以选用一些插件。这些插件具体有什么作用下面会有相应的解释，我们后续也会再出一篇推文单独介绍。我选择启用的插件如下：
![](https://files.mdnice.com/user/25860/ae562e3b-f5c2-4d54-aaee-5937a288e9bb.png)


## notebook的书写
终于可以写一点代码了
### 新建笔记本
在任意目录点击`New`可以选择新建文件
![](https://files.mdnice.com/user/25860/46fd6779-d3c5-4f53-9756-e19823bd6d6f.png)
点击`Python3(ipykernel)`可以新建笔记本，创建完成后自动打开
![](https://files.mdnice.com/user/25860/b5bd21b5-2e5c-4d77-80b6-ecc3d1b4ef8e.png)
这就是我们笔记本的编辑页面，下图有笔记本的基本介绍

![](https://files.mdnice.com/user/25860/1ccd6d5a-581e-47a7-a9f8-0e0f87cf69de.png)

### 快捷键
如此多的按钮，其实很少用到，因为jupyter notebook有一套非常好用的快捷键。首先我们定义单元格的mode. 一个单元格有两种mode：`command mode`和`edit mode`，对应左边会显示不同的颜色。

蓝色代表`command mode`
![](https://files.mdnice.com/user/25860/c814f884-c8e4-45e8-9199-f48b8ae1eb56.png)
绿色代表`edit mode`
![](https://files.mdnice.com/user/25860/301a9124-2931-4ca5-9d94-91a89e3a8ebf.png)

在快捷键在这两种场景下也是区分的，我常用的如下：
#### command mode
- `数字1-6`，把单元格转换为1-6级标题（实际上是markdown单元格
- `Y`，把单元格转换为代码单元格
- `M`，把单元格转换为markdown单元格
- `R`，把单元格转换为raw单元格
- `A`，在当前单元格上方添加一个单元格
- `B`，在当前单元格下方添加一个单元格
- `Double D`，连续按下两次`D`，删除选中的单元格
- `X`，剪切选中的单元格（通常我用剪切代替删除
- `C`，复制选中的单元格
- `V`，粘贴已经剪切或复制的单元格
- `K`，选中上一个单元格
- `J`，选中下一个单元格
- `L`，显示当前单元格的行号
- `Keep Shift`，按住`Shift`点击两个不同的单元格，可以一次性选中多个单元格，配合`X`,`C`,`V`使用
- `Enter`，进入`edit mode`
#### edit mode
- `Ctrl+Enter`，运行当前单元格
- `Shift+Enter`，运行当前单元格并且创建下一个单元格（默认进入edit mode

还有好多其他的快捷键，这里就不放了，可以通过下面的方式查看：

点击`Help`菜单中的`Keyboard shortcut`
![](https://files.mdnice.com/user/25860/9be0c753-494f-4114-b1e8-a6d8ae8772e6.png)
查看快捷键列表
![](https://files.mdnice.com/user/25860/63b1bd1c-cdf0-4e23-aa07-52883b5efb72.png)
在这里还可以自定义快捷键。
### 代码单元格
#### 运行
终于可以写点东西了，在jupyter notebook中单元格默认的格式就是代码单元格。你可以在这里写代码，然后运行：

![](https://files.mdnice.com/user/25860/1800e9a5-8eb0-4fed-a265-a5dee9b2110e.png)
<center><i>下面运行时间由插件Execute Time计算</i></center>
<br>
你也可以写一些复杂的代码，这时最好开启`行号`：

![](https://files.mdnice.com/user/25860/86b4c695-f9f2-4618-b038-3d920754713f.png)
单元格左侧`In:[23]`代表这是第十二个运行的代码，而`Out:[12]`代表这是第十二次运行的结果。

#### 输出
每次运行jupyter都会自动`输出`最后一行的运行结果。注意这里的输出并不局限于`print`，jupyter精心优化了图片、表格等等内容的输出：

![](https://files.mdnice.com/user/25860/609eb708-258b-45d3-8a3a-c1cbe506e0a1.png)
#### name space
注意，这里使用了前面单元格定义的`fib()`函数，也就是说整个笔记本是在同一个命名空间的，使用同样的内存。

这需要特别谨慎，因为当笔记本很长时，不要忘记你之前命名过的变量，不然会被覆盖。
#### magic command
比较特别的是，我们不仅可以在代码单元格运行python代码，还可以运行一些其他命令，jupyter称之为`magic command`，需要用`%`或者`%%`（两者有所不同）声明，例如计算程序的平均耗时

![](https://files.mdnice.com/user/25860/ea0ef20e-cab4-4c24-bb3f-1b7d2c69e8dd.png)
<center><i>一百万次运算的平均耗时</i></center>
<br>

更多其他的`magic command`我们后续的推文再介绍。
#### command
并且我们还可以运行命令行的`命令`，例如`ping`，需要用`!`声明
![](https://files.mdnice.com/user/25860/d9f89acb-7bee-4d25-aeaa-dd025d074aaf.png)
<center><i>校园网是真的拉</i></center>


### markdown单元格
markdown单元格就简单得多，如果你还不会md的语法也不要害怕，它真的非常简单，学会他只需要**2分钟**，但是学好了之后能极大的提升效率。~~我现在这段话也是我用markdown书写的~~:

![](https://files.mdnice.com/user/25860/f6fb395a-1cff-4299-b220-9ee848f3cab8.png)
<center><i>开始套娃</i></center>
<br>

markdown于我最大的意义就是可以较为简单地写一些LaTeX数学公式，以及在notebook中嵌入一些媒体内容：

![](https://files.mdnice.com/user/25860/47c840b0-1957-49e7-a00f-fc9b39c2557f.png)
上面的内容完全对应于下面的文本
```markdown
![](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png)
$$\int_{-\infty}^{\infty}e^{-x^2}dx=\sqrt{\pi}$$
[python](https://www.python.org/)
```
关于markdown的内容，后续也会单独出一个推文来介绍（疯狂挖坑~）
### 其他单元格
jupyter自带的就一个`Raw NBconvert`单元格
![](https://files.mdnice.com/user/25860/f02a4cd2-107f-4e00-ba1b-a5941b554db9.png)

功能非常简单，就是消除一切格式、高亮，用`plain text`的样式呈现。

如果安装了一些特殊的插件，可能会有一些其他特殊的单元格，例如`Rise`这个插件
![](https://rise.readthedocs.io/en/stable/_images/basic_usage.gif)
<center><i>可以实现PPT效果真的太酷了</i></center>

## notebook的导出

~~jupyter notebook那么好用，我觉得每个人电脑上都应该装一个。~~很多时候我们会遇到这样一个问题，你呕心沥血写好了一份notebook发过去，但是对方不会用，也懒得折腾。如果是好哥们还好，可以教育一下，如果是Leader或者老师就不太妙，只能自己想办法导出为漂亮的格式。

常见的有三种方案
### 网页打印
这个简单粗暴，因为jupyter notebook是实时渲染在网页上的，我们可以直接使用浏览器的打印功能生成pdf

![](https://files.mdnice.com/user/25860/6acf41b3-dafa-4b3b-8c78-067e9c9ec3d9.png)
### download as (nbconvert)
jupyter内置了一些可以导出的格式
![](https://files.mdnice.com/user/25860/8ed48160-864a-4f24-8ddc-ab6594d990dd.png)
但是只有少数的格式（例如markdown）可以在不配置任何外部软件的情况下导出成功，大多数文件格式都会导出失败

![](https://files.mdnice.com/user/25860/4a3148cd-e5ac-477b-a2a8-f93b4d2d15c9.png)
具体如何配置我们以后再说。
### pandoc

我们使用pandoc就可以实现格式转换。
> Pandoc是使用Haskell语言编写的一款跨平台、自由开源及命令行界面的标记语言转换工具，可实现不同标记语言间的格式转换，堪称该领域中的“瑞士军刀”。 摘自维基百科。

具体怎么用，这里实在写不下了，下次再说。

## 总结
洋洋洒洒写了快4千字了，早就超过了一般人会看完的长度。倒也不期待有人能看到这里，毕竟写这个也是用爱发电，周末无聊罢了。

jupyter notebook与我而言是陪伴我接触编程到爱上编程的朋友，我的电脑里至今还保存着我第一次学python时的notebook（python是我的first language）我遇到过各种问题，也解决了各种问题。在这样的过程中不断成长着，现在我已经能熟练地面向浏览器编程了，jupyter确实帮了我很多。

时间不早了，吃饭去了。




此致，祝好！