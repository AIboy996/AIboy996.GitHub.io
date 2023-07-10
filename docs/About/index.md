---
tags:
- About
hide:
- tags
---

# 站内导航🧭

!!! quote "Stephen R. Covey"
	Live your life by a compass, not a clock.

## 本站的几个板块

- [**About**](/About)：当前板块，提供网站基本信息。
- [**Article**](/Article)：“文章”板块，放一些杂七杂八的“文章”。
- [**Blog**](/Blog)：博客板块，放一些记录日常的博客。
- [**Python**](/Python)：Python板块，放一些笔记，包含基础、高级语法知识和各种库的使用。
- [**Project**](/Project)：项目板块，本人的一些开源项目。
- [**Statistics**](/Statistics)：统计学相关。
- [**SomeMath**](/SomeMath)：数学相关。
- [**PlayGround**](/Playground)：用来调试mkdocs-material提供的markdown的扩展语法
- [**Tags**](/Tags/)：👇
## 本站的一些功能
### 分类标签
本站所有的文章都会加上一个简明的分类标签，你可以在[**Tags**](/Tags)板块按照分类标签查看文章。

!!! question "性功能：标签云"
	本站最近添加了*Tag Cloud* 功能，可以更加直观地显示各个标签，在[首页](/)和[Tags](/Tags/)页面可以看到。点击标签云中的标签可以直接跳转到对应标签的文章列表。

### 搜索
本站有搜索功能（由[lunrjs](https://lunrjs.com/)驱动，mkdocs material内置），支持搜索文章标题、文字内容、代码等。

目前理论上是不支持中文搜索的，仅支持英语、日文搜索，但是基于日语的支持实际上也可以搜到一些汉字。
### 页面反馈
本站有反馈功能（由[Google Analytics](https://analytics.google.com/analytics/web/)驱动，需要有cookie许可才能正常运作），在页面底部有`Was this page helpful?`的选项。

如果你觉得该页面很好，可以留下🙂；如果您发现该页面有任何问题，可以选择🙁，并且填写相应的表单（会自动跳转到**GitHub的issue板块**）。

### 评论
本站有评论功能（由[giscus](https://giscus.app/)驱动），评论的内容保存在**GitHub的discuss板块**中（所以需要先使用GitHub账号登录之后才可以评论）。

!!! info "已知问题"
	现在的评论系统有点问题，具体来说就是：子页面的评论会出现在父页面。例如[函数式编程](https://yangzhang.site/Python/%E8%BF%9B%E9%98%B6%E8%AF%AD%E6%B3%95/python%E9%AB%98%E7%BA%A7%E8%AF%AD%E6%B3%951/)的评论会出现在[Python首页](https://yangzhang.site/Python/)中。推测是URL中含有quoted中文的缘故。

### RSS
本站支持RSS订阅（由[mkdocs-rss-plugin](https://guts.github.io/mkdocs-rss-plugin/)驱动），订阅地址为：[更新序订阅源（推荐）](https://yangzhang.site/feed_rss_updated.xml)，该链接是按照**更新日期**排序的。

你也可以从[创建序订阅源](https://yangzhang.site/feed_rss_created.xml)获取按照文档**创建日期**排序的订阅。