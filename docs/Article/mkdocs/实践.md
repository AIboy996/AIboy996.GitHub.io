---
tags:
 -  mkdocs
---

!!! info "演示的环境"
    本次演示在HyperV创建的windows 10虚拟机中进行，提前没有安装任何软件，面向小白，从零开始，可以放心食用。

![image-20220806004451654](assets/image-20220806004451654.png)

## 成果展示

先给大家看看最终的效果，也欢迎自己去我的小站看一看：https://yangzhang.site，如果你想直接抄作业也可以到GitHub直接fork我的仓库，不要忘了点个star！

首页：

![image-20220806044524219](assets/image-20220806044524219.png)

搜索功能：

![image-20220806044556234](assets/image-20220806044556234.png)

分类标签：

![image-20220806044619481](assets/image-20220806044619481.png)

套娃：

![image-20220806044732280](assets/image-20220806044732280.png)

更多扩展语法：

![image-20220806044827473](assets/image-20220806044827473.png)

移动端：

- 手机竖屏

![image-20220806045058550](assets/image-20220806045058550.png)

- 手机横屏

![image-20220806045200989](assets/image-20220806045200989.png)

- iPad竖屏

![image-20220806045116265](assets/image-20220806045116265.png)

- iPad横屏

![image-20220806045141334](assets/image-20220806045141334.png)

## 理论

还是先解释一下整个流程，以及几个关键名词：

- 用markdown写文章【markdown是一种轻量的标记语言】
- 用mkdocs生成网页文件（html+js+css+...）【mkdocs是基于python的**静态网页**生成器】
- 用git把文件同步到云端（GitHub）【git是一个版本管理工具，GitHub提供远程git仓库存储服务】
- 用gitpages实现页面的发布【gitpages是GitHub提供的页面发布服务（发布之后，任何人都可以通过url访问）】
- 【可选】用gitflow实现第二步（也就是生build网页文件）的自动化【gitflow是GitHub提供的自动化工作流服务】

实现自动化build之后，我们的工作流就是：

- 在本地用markdown写文章
- 用git同步到GitHub
- 网站内容自动更新

下面进入实战~

## 安装一些必备的软件

### python

在官网下载最新版本即可，[Download Python | Python.org](https://www.python.org/downloads/)

![image-20220806005327326](assets/image-20220806005327326.png)

下载好之后双击安装：

![image-20220806005834306](assets/image-20220806005834306.png)

**注意**图中箭头所指的地方，需要勾选上`Add to PATH`的选项，然后安装即可。

![image-20220806005953959](assets/image-20220806005953959.png)

### git

也是去官网下载最新的版本即可，[Git - Downloading Package](https://git-scm.com/download/win)

![image-20220806005419912](assets/image-20220806005419912.png)

下载完之后运行安装，可以无脑下一步。

![image-20220806010104065](assets/image-20220806010104065.png)

点个六七次`Next`就安装好了

![image-20220806010200575](assets/image-20220806010200575.png)

### 文本编辑器

随便下一个就行了，个人推荐Sublime Text，[Sublime Text - Text Editing, Done Right](https://www.sublimetext.com/)

![image-20220806005708018](assets/image-20220806005708018.png)

同样傻瓜安装

![image-20220806010236664](assets/image-20220806010236664.png)

安装完成：

![image-20220806010248612](assets/image-20220806010248612.png)

## 安装mkdocs

### 如何打开CMD

下面需要用到命令行（CMD），下面我给出三种进入命令行的方法：

#### 开始菜单中的程序

在开始-Windos系统可以找到Command prompt这个软件，打开即可。

![image-20220806010629866](assets/image-20220806010629866.png)

#### `Win+R`快捷运行

使用快捷键`Win+R`，可以呼出运行窗口：

![image-20220806010721789](assets/image-20220806010721789.png)

输入cmd，然后回车即可运行CMD：

![image-20220806010743705](assets/image-20220806010743705.png)

#### 使用资源管理器快速在指定路径打开CMD

在资源管理器打开某个文件夹，然后在搜索栏输入cmd，回车。就可以**在当前路径**打开一个cmd窗口。

例如我这里在`Desotop`文件夹：

![image-20220806010917432](assets/image-20220806010917432.png)

上面输入了cmd，回车之后即可打开CMD：
![image-20220806010936399](assets/image-20220806010936399.png)

可以看到这样打开的CMD就是在`Desktop`文件夹的。

以上是CMD的打开方式，当然你也可以使用其他的命令行工具，例如我们下面会用到的`git bash`，再如也是windows自带的`powershell`……

### 检查软件的安装

进入了命令行之后，我们输入下面三个命令

```CMD
pip --version

python -V

git --version
```

![image-20220806011126269](assets/image-20220806011126269.png)

如果像图里这样成功输出了三个软件的版本，就说明他们都安装成功了。

### 安装mkdocs

这时候我们可以用`pip`来安装`mkdocs`，顺便把`mkdocs-material`也一起安装了：

```CMD
pip install mkdocs mkdocs-material
```

看到下面的结果就是安装成功了：

![image-20220806011533903](assets/image-20220806011533903.png)

## 用markdown写点东西

在桌面右击，如果你前面安装git的时候勾选了相关选项（默认是勾选的），就能看到`git bash here`的选项：

![image-20220806011725246](assets/image-20220806011725246.png)

使用这个快捷方式我们可以在桌面打开一个`git bash`窗口：

![image-20220806011809923](assets/image-20220806011809923.png)

我们输入：

```bash
touch hello.md
```

就可以在桌面创建一个`hello.md`文件：

（当然你也可以手动创建任意类型的文件，然后修改扩展名为`.md`）

![image-20220806011916539](assets/image-20220806011916539.png)

双击，选择使用我们之前安装的`sublime text`打开：

![image-20220806011948724](assets/image-20220806011948724.png)

然后就可以用markdown语法写点东西了：

![image-20220806012202342](assets/image-20220806012202342.png)

我随手写了这么点东西，仅作演示，更多的markdown语法可以参考我之前写的`jupyter`教程，上图的代码也放在下面：

````markdown
# hello
This is a sentence.
## A formula
$$
\sin^2\theta+\cos^2\theta=1
$$
## Code
```python
for i in range(10):
	print(i**2)
```
````

## 建站！

现在，我们就可以用mkdocs来构建网页文件了。

### 初始化

在你想创建项目的文件夹，打开一个命令行窗口，然后输入

```bash
mkdocs new my-project
```

然后mkdocs会自动创建、初始化一个文件夹

![image-20220806012515155](assets/image-20220806012515155.png)

文件夹的结构如下：

```
.
├─ docs/
│  └─ index.md
└─ mkdocs.yml
```

其中`mkdocs.yml`是项目的配置文件，后续我们要在里面写网站的各类配置。`docs/`则是存放文章的目录，我们把刚才写好的`hello.md`移动到这个文件夹下面：

![image-20220806012946667](assets/image-20220806012946667.png)

这个文件夹里本来就有一个`index.md`，这是网站的首页！

### 启动

下面我们就来启动服务器，来看看网站到底是什么样子，在命令行输入：

```
cd my-project
mkdocs serve
```

第一条命令是**切换到**`my-project`文件夹下面，第二条则是开始mkdocs的服务。

![image-20220806013135881](assets/image-20220806013135881.png)

**注意**，一定要**在项目文件夹下才**可以运行`mkdocs serve`，如果你不懂`cd`命令之类的，也可以用之前的方法，直接打开这个文件夹，然后打开CMD：

![image-20220806013356276](assets/image-20220806013356276.png)

一样可以运行服务：

![image-20220806013443797](assets/image-20220806013443797.png)

而如果你在错误的地方运行了这个命令就会报这个错误：

![image-20220806013538755](assets/image-20220806013538755.png)

有点啰嗦了，总之启动成功了之后命令行显示：

 ```
 Serving on http://127.0.0.1:8000/
 ```

我们就可以在浏览器里面输入网址`http://127.0.0.1:8000/`来访问我们的网站了：

![image-20220806013659952](assets/image-20220806013659952.png)

进入之后默认显示的是首页`index.md`，内容是一些基础的教程。而我们写的`hello.md`在左上角：

![image-20220806013803177](assets/image-20220806013803177.png)

点击之后就可以访问，可以看到，代码、标题都正常显示了，但是数学公式没有成功渲染。

### 修改配置文件

下面我们来添加一些配置，用sublime text打开项目根目录的`mkdocs.yml`：

![image-20220806014001779](assets/image-20220806014001779.png)

默认的文件只写了一个网站名字，我们添加以下内容：

```yaml
nav:
    - hello.md
theme:
  name: material
markdown_extensions:
  - pymdownx.arithmatex:
      generic: true
extra_javascript:
  - https://polyfill.io/v3/polyfill.min.js?features=es6
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js

```

也就是下面的样子

![image-20220806014450746](assets/image-20220806014450746.png)

这几个参数的含义分别是：

- nav：配置导航栏，让mkdocs知道哪些文件需要转化为网页。需要填写文件的**相对路径**（默认`"./" = "docs/"`）。
- theme：主题，我们之前安装的`mkdocs-material`就是一个主题。
- markdown_extensions：配置markdown扩展语法，这里打开了数学公式的支持
- extra_javascript：额外的JavaScript文件，让网页加载一些脚本。

例如这个脚本：

```
https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@3.0.8/js/maodian.js
```

就可以实现鼠标点击特效：

![image-20220806014852309](assets/image-20220806014852309.png)

上图也能看到，修改完配置文件后，网页自动刷新，已经套用了新的主题！

点击左侧的导航栏，来到我们自己写的`Hello`页面：

![image-20220806014948474](assets/image-20220806014948474.png)

可以看见之前无法正常显示的公式已经加载出来了！！

### build

你可以用下面的命令来构建网页的静态文件：

```CMD
mkdocs build
```

![image-20220806015130635](assets/image-20220806015130635.png)

然后在项目文件夹里就可以看到编译好的网页文件了：

![image-20220806015204745](assets/image-20220806015204745.png)

![image-20220806015215890](assets/image-20220806015215890.png)

打开任意一个网页文件都可以看到我们刚才的页面：

（注意现在是本地静态文件访问）

![image-20220806015250987](assets/image-20220806015250987.png)

至此，本地的所有工作就完成了。

你可以写更多的markdown文件来丰富你的网站，也可以探索更多的组件和功能，详情可以参考mkdocs-material的官网。

下面我们来介绍如何把网页放到网上，让所有人都能看到。

## 同步到远程仓库

开始就下载的git到现在还没用到，现在就来用！

### 创建仓库

在GitHub创建一个新的仓库：

![image-20220806015716549](assets/image-20220806015716549.png)

![image-20220806015729930](assets/image-20220806015729930.png)

你可以按照页面上的提示来操作，把本地的文件同步到GitHub上。如果你不会，那咱就接着看。

### ssh连接

GitHub从去年某个时候开始就不在支持账户密码连接了，只能用SSH或者token的方式连接，这里我们介绍更加方便的SSH。

#### 密钥对的创建

如果你之前没用过ssh工具，那么可以用

```CMD
ssh-keygen
```

来创建一个密钥-公钥对（使用了RSA算法）：

![image-20220806015951565](assets/image-20220806015951565.png)

然后你在`C:\Users\username\.ssh`就可以看到公钥和密钥文件了：

![image-20220806020147112](assets/image-20220806020147112.png)

#### Github权限开放

用Sublime Text打开上面的`id_rsa.pub`公钥文件，复制全部内容，然后到Github上打开自己的ssh配置，添加一个新的ssh key：

![image-20220806020412439](assets/image-20220806020412439.png)

然后尝试连接github：

```CMD
ssh git@github.com
```

![image-20220806020920249](assets/image-20220806020920249.png)

GitHub会自动识别我们刚才添加的ssh key，确认我们的身份。

此外，我们还需要在本地配置自己的名字和邮箱，以便git知道是谁在提交文件：

```git
git config --global user.name = ""
git config --global user.email = ""
```

![image-20220806022033298](assets/image-20220806022033298.png)

其中`-- global`选项可以不加，如果你想为每个项目单独配置一个用户，但是一般我也没有这类需求，还是加上省事儿。

### 本地仓库构建

下面我们用git构建本地仓库。

首先在项目根目录运行命令，初始化项目，让他成为一个git仓库：

```git
git init
```

![image-20220806022224789](assets/image-20220806022224789.png)

用`git status`可以查看项目当前的状态，这里也提示我们需要用`add`把文件加入到git的管理下（暂存区），我就用一个省事儿的写法了，可以一次性添加全部的文件：

```git
git add .
```

![image-20220806022540687](assets/image-20220806022540687.png)

然后把这些文件提交到本地的版本库

```
git commit -m "init"
```

后面的`-m "init"`是附加一个message，git要求的每次commit都需要一个备注来说明本次commit的内容是什么：

![image-20220806022843555](assets/image-20220806022843555.png)

commit完之后，再看status就是clean的了：

![image-20220806022911732](assets/image-20220806022911732.png)

### 把仓库push到GitHub

下面我们就来把本地的项目文件push到GitHub。

来到我们的仓库创建完的页面：

![image-20220806023049809](assets/image-20220806023049809.png)

这里也充分提示了如何在本地创建仓库、如何把本地的内容push过来。

先修改分支的名字，因为git的默认分支名是master而GitHub现在使用的默认分支名是main：

```
git branch -M main
```

![image-20220806023230498](assets/image-20220806023230498.png)

然后添加远程仓库（后面的仓库地址以实际情况为准）：

```
git remote add origin git@github.com:AIboy996/mkdocs-hello.git
```

![image-20220806023305768](assets/image-20220806023305768.png)

最后push：

```
git push -u origin main
```

这里的`-u`选项是设置为upstream的意思，也就是把这一次push的仓库设置为默认的远程仓库。以后再push，如果没有指定是哪一个仓库就默认push到upstream的仓库。

![image-20220806023403890](assets/image-20220806023403890.png)

这个时候我们再去GitHub上看，就发现文件已经同步过来了：

![image-20220806023648554](assets/image-20220806023648554.png)

## 用Gitpages发布网站

下面我们用gitflow实现自动化搭建网站。

### workflow

首先把之前生成的`site`文件夹删除掉，因为这是没用的：

![image-20220806024211709](assets/image-20220806024211709.png)

然后，创建`.github`文件夹

![image-20220806024243436](assets/image-20220806024243436.png)

再在`.github`文件夹下面创建`workflows`文件夹：

！！！千万要注意，`workflows`一个字母都不能差。我演示的时候就因为差了一个`s`，导致后续GitHub识别不到相关文件，实在是坑。

![image-20220806033325552](assets/image-20220806033325552.png)

在`workflows`文件夹下，创建一个`issue.yml`文件（这个名字任意）：

![image-20220806024406978](assets/image-20220806024406978.png)

在里面写上如下内容：

![image-20220806024437599](assets/image-20220806024437599.png)

```yaml
# 工作流的名称
name: publish site
# 在什么时候触发工作流
on: 
  # 在从本地main分支被push到GitHub仓库时
  push: 
    branches:
      - main
  # 在main分支合并别人提的pr时
  pull_request: 
    branches:
      - main
# 工作流的具体内容
jobs: 
  deploy:
    # 创建一个新的云端虚拟机 使用最新Ubuntu系统
    runs-on: ubuntu-latest 
    steps:
        # 先checkout到main分支
      - uses: actions/checkout@v2 
        # 再安装Python3和相关环境
      - uses: actions/setup-python@v2 
        with:
          python-version: 3.x
        # 使用pip包管理工具安装mkdocs-material
      - run: pip install mkdocs-material 
        # 使用mkdocs-material部署gh-pages分支
      - run: mkdocs gh-deploy --force 
```

然后我们把这些修改push到GitHub：

先`add`，再`commit`，最后`push`

![image-20220806024640027](assets/image-20220806024640027.png)

![image-20220806024701326](assets/image-20220806024701326.png)

push完之后，我们到GitHub就可以在`Actions`板块看到刚才提交的workflow代码的运行情况：

![image-20220806034041022](assets/image-20220806034041022.png)

绿色的对号说明运行成功了。

这里有两个Action，一个是我们写的`issue.yml`文件中的脚本，也就是`publish site`。

另外一个是GitHub自动运行的`pages-build-deployment`（带有`bot`标记），这是Gitpages的机器人程序，会帮助我们把页面发布到相应的地址。

### gitpages

这里稍微解释一下gitpages的相关事宜。

- gitpages的文件存放在微软的某个服务器上，是从你的仓库中复制过去的，到底复制那些内容由你指定。

- 任何一个仓库都可以发布到gitpages，但是每个仓库只能发布一个特定的branch。
- 所有的gitpages共用一个域名：username.github.io，当然你也可以自定义这个域名。
- ！这里需要注意名为`username.github.io`的仓库是特殊的，如果创建了就会位于顶级域名：`http://username.github.io`。其他的仓库则都是位于特定的子域名：`http://username.github.io/reponame`。那么，就可能会存在冲突（或者说是覆盖）：【例如某个仓库的名字比如叫`repo`和`username.github.io`仓库的某个页面重名，那么当你访问`http://username.github.io/repo`的时候，就只能访问最新发布的那一个了】

- gitpages提供https加密访问。
- gitpages的服务器在国外，自定义域名不需要**备案**也可以正常访问，不过访问就会玄学。如果使用国内服务器，则必须要备案，否则会被查封！


好，我们言归正传，gitflow运行完之后，我们就可以看到脚本自动创建的另外一个分支gh-pages了：

![image-20220806034107743](assets/image-20220806034107743.png)

![image-20220806034128854](assets/image-20220806034128854.png)

这里面就是`mkdocs build`生成的文件。

### 设置Gitpages

下面到仓库的settings页面，然后到pages选项

![image-20220806034219694](assets/image-20220806034219694.png)

把这里的branch改为刚才生成的gh-pages【这就是前面所说的，指定某个branch**发布**到gitpages，换言之**复制**到微软的某个服务器】，即可在上面的网址<https://aiboy996.github.io/mkdocs-hello/>访问刚才生成的页面了！

!!! info "最新消息"
    我已经弃用了gitpages，转而使用cloudfare pages，因为后者在国内的可访问性更好。
    
    所以我的个人域名<yangzhang.site>的DNS记录将解析到cloudfare的IP而非github的IP。也正因如此上述过程中出现的“自定义域名”<https://yangzhang.site/mkdocs-hello>也将不再可用。我把它挪到了<https://aiboy996.github.io/mkdocs-hello/>


至此，从零开始搭建个人网站就结束了！