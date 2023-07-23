---
tags:
- mkdocs
---
!!! info "注意"
    如果要学怎么搭建网站，推荐看下一篇文章[《实践》](../实践/)，这里写的内容比较杂乱，仅供我个人备忘。
## 流程

1. 先用markdown格式来撰写文章。
2. 然后用mkdocs转化为带格式的html文件。
3. 最后借助GitPages部署到互联网，以便访问。

## 使用markdown撰写文稿

参见：[markdownguide](https://www.markdownguide.org/)

基础的markdown语法：
#### 标题
=== "效果"
    #### 一级标题
    ##### 二级标题
=== "源代码"
    ```markdown
    # 一级
    ## 二级
    ```
#### 代码块
=== "效果"
    ```python
    x = sum(i**2 for i in range(10))
    ```
=== "源代码"
    ````markdown
    ```python
    x = sum(i**2 for i in range(10))
    ```
    ````
#### LaTex
=== "效果"
    对于任意的$\theta\in\mathbb{R}$，都有
    $$
    \sin^2\theta+\cos^2\theta=1
    $$
=== "源代码"
    ```markdown
    对于任意的$\theta\in\mathbb{R}$，都有
    $$
    \sin^2\theta+\cos^2\theta=1
    $$
    ```
#### 列表
=== "效果"
    - 首先
    - 其次
    - 最后

=== "源代码"
    ```markdown
    - 首先
    - 其次
    - 最后
    ```
## 使用mkdocs构建网页文件
参见：[mkdocs](https://www.mkdocs.org/)

需要注意，mkdocs是基于python的，所以需要提前配置python环境。
#### 安装mkdocs
```title="使用pip"
pip install mkdocs
```
#### 初始化项目
```bash title="在你想建站的文件夹下执行"
mkdocs new my-project
cd my-project
```
会自动在my-project文件夹下生成如下文件：
```
.
├─ docs/
│  └─ index.md
└─ mkdocs.yml

```
#### 预览效果
```title="在项目文件夹下执行"
mkdocs serve
```
#### 添加页面
把需要添加到网站的页面放入docs文件夹，然后修改`mkdocs.yml`文件
```yaml title="mkdocs.yml文件的内容"
site_name: MkLorum
site_url: https://example.com/
nav:
    - Home: index.md
    - About: about.md
```
#### 构建静态页面
可以但没有必要
```title="在项目文件夹下执行"
mkdocs build
```
## 使用mkdocs-material主题
参见：[mkdocs-material](https://squidfunk.github.io/mkdocs-material/)

#### 安装
```title="使用pip"
pip install mkdocs-material
```
#### 套用主题
```yaml title="mkdosc.yml"
theme:
  name: material
```
之后可以进行更多的个性化配置。
## 使用GitPages发布网站
参见：[GitPages](https://pages.github.com/)

注意，需要配置好在哪个branch发布你的页面，如果需要https加密访问，那么还需要在Custom domain选项中单独勾选。
## 使用Gitflow工作流自动发布
在项目的根目录创建文件`.github/workflow/issueMySite.yml`

注意文件夹的嵌套关系，最后的文件名可以自己取。

```yaml title="issueMySite.yml"
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
      - # 使用mkdocs-material部署gh-pages分支
      - run: mkdocs gh-deploy --force 
```
这样每次push的时候，GitHub都会在云端服务器帮助我们运行这些代码，自动build整个项目。从而实现页面自动发布。
## 自定义域名
- 首先购买一个域名，国内的话阿里云、腾讯云之类的都可以。
- 然后再购买域名的服务商哪儿配置DNS解析服务。
- 最后再GitPages上配置自定义域名。