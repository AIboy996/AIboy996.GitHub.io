---
tags:
- About
---

# 本站编年史
> 倒序

## 2024
- 2024年06月01日
    - 更换文本字体为：`Noto Sans SC`。<p style="font-family:Roboto">mkdocs-material默认字体为Roboto：1lI</p> 
    - 解决了1lI的区分问题。 

- 2024年05月25日
    - 修改了`overrides/partials/source-file.html`，优先使用meta标签中的创建、修改时间。
    - 解决了旧文章搬运过来时间不准确的问题。

- 2024年05月24日
    - 修改了RSS插件配置，现在仅提供博客板块内容订阅。此外，修改了`mkdocs-static-i18n`插件的源代码，现在不提供博客板块的i18n。
    - 解决了RSS订阅中同一内容因为url不同而重复的问题。

- 2024年05月23日
    - 新增了`mkdocs-ai-summary`插件
    - 没解决啥问题，插件写着玩。

- 2024年05月19日
    - 修改了`color.js`，优化了每天切换颜色的功能，增加了渐变过渡。
    - 修改了`cookie consent`的样式，不再阻塞访问，减弱了存在感。
    - 解决了第一次访问很卡的问题。

- 2024年05月18日
    - 把原来的`mkdocs.yml`拆分成了`nav.yml`、`mkdocs.yml`、`plugins_full.yml`和`plugins_simplify.yml`。在本地调试时仅开启部分插件。
    - 解决了本地预览编译时间过长（3min -> 3s）的问题。

- 2024年04月10日
    - 新增了`alert`，对于相对隐私的内容会有一个弹窗确认。
    - 解决（缓解）了本人的尴尬癌。

- 2024年04月05日
    - 修改了`git-revision-date-localized`的时区配置。
    - 解决了文章更新时间不准确的问题（看起来经常半夜更新，实则美国时间）。

- 2024年04月03日
    - 新增了`overrides/custom_blog.html`，可以在博客页面显示最近更新的几条内容。

- 2024年03月07日
    - 修改了`math.js`的加载行为。从默认加载，需要使用`hide: math`才不加载；更改为，默认不加载，需要使用`include: math`才加载。
    - 简化了所有文章的meta标签。

- 2024年01月17日
    - 修改了数学公式的渲染方式，不再使用`pymdownx.arithmatex`，直接使用`MathJax`渲染。
    - 解决了部分数学公式错误渲染的问题。

## 2023

- 2023年11月22日
    - 增加了`i18n`插件，为此全站内链修改为相对链接。
    - 更方便地发布多语言版本的文章。

- 2023年07月31日
    - 增加了`termynal.js`组件。
    - 更生动地展示命令行操作。

- 2023年07月23日
    - 全站源文件更改为英文名。
    - 解决了评论系统无法正确匹配url的问题。

- 2023年07月19日
    - 增加了外链小箭头，增加了颜色轮换彩蛋`color.js`。

- 2023年07月10日
    - 增加了`rss`插件。

- 2023年04月27日
    - 增加了标签云组件。

- 2023年03月24日
    - 从GitPages部署，切换到CloudFare Pages部署。

- 2023年03月01日
    - 新增了`math.js`，实现了数学公式自动换行。
    - 解决了长公式在手机上显示错误的问题。

- 2023年01月30日
    - 增加了`giscus`评论系统。

- 2023年01月20日
    - 增加了图片缩放插件。

## 2022

- 2022年07月26日
    - 增加了Google Analysis。

- 2022年07月24日
    - remake，从[Gridea](https://gridea.dev/)迁移到mkdocs。