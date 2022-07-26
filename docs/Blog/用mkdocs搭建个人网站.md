---
tags:
- mkdocs
---
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

## 自定义域名
- 首先购买一个域名，国内的话阿里云、腾讯云之类的都可以。
- 然后再购买域名的服务商哪儿配置DNS解析服务。
- 最后再GitPages上配置自定义域名。