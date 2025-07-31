---
tags:
- About
hide:
- tags
include:
- ai-summary
---

# 站内导航🧭

!!! quote "Stephen R. Covey"
    Live your life by a compass, not a clock.

## 本站的几个板块

- [**About**](../About/index.md)：当前板块，提供网站基本信息。
- [**Note**](../Note/index.md)（胡编乱造）：笔记板块，放一些杂七杂八的教程、笔记。
- [**Blog**](../Blog/index.md)（胡言乱语）：博客板块，分享日常。
- [**Python**](../Python/index.md)：Python板块，包含基础、高级语法知识和各种库的使用。
- [**Go**](../Go/index.md)：Go板块。
- [**Project**](../Project/index.md)（胡作非为）：项目板块，鄙人做的一些项目。
- [**Statistics**](../Statistics/index.md)（几乎处处）：鄙人专业相关。
- [**SomeMath**](../SomeMath/index.md)（胡数八道）：数学相关。
- [**PlayGround**](../Playground/index.md)：用来调试mkdocs-material提供的markdown的扩展语法
- [**Tags**](../Tags/index.md)：文章分类归纳。

## 本站的一些功能

### AI摘要

使用[mkdocs-ai-summary](https://github.com/AIboy996/mkdocs-ai-summary)插件实现的AI摘要功能。会在某些文章最开头添加一个AI生成的摘要。

> FYI: 本站（正文中）的外链都会加上这样的小箭头：[github](https://github.com)

暂时有三种AI模型可用：

!!! tongyiai-summary "通义千问"
    阿里的模型

!!! chatgpt-summary "ChatGPT"
    openai的模型

!!! deepseek-summary "Deepseek"
    Deepseek的模型

### 分类标签

本站所有的文章都会加上一个简明的分类标签，你可以在[**Tags**](../Tags/index.md)板块按照分类标签查看文章。

!!! success "新功能：标签云"
    本站最近添加了*Tag Cloud* 功能，可以更加直观地显示各个标签，在[首页](../index.md)和[Tags](../Tags/index.md)页面可以看到。点击标签云中的标签可以直接跳转到对应标签的文章列表。

### <s>搜索</s>（已弃用）

如果你想搜索本站的内容，可以使用Google或者Bing等搜索引擎。例如搜索本站**统计推断**相关的内容，只需要加上过滤器`site:yangzhang.site`即可：

- [Google搜索](https://www.google.com/search?q=%E7%BB%9F%E8%AE%A1%E6%8E%A8%E6%96%AD+site%3Ayangzhang.site)
- [Bing搜索](https://www.bing.com/search?q=%E7%BB%9F%E8%AE%A1%E6%8E%A8%E6%96%AD+site%3Ayangzhang.site)

<s>
本站有搜索功能（由[lunrjs](https://lunrjs.com/)驱动，mkdocs material内置），支持搜索文章标题、文字内容、代码等。
</s>

??? question "为何弃用？"
    一方面，我认为搜索功能没什么意义，因为站内的文章已经非常有条理了。

    另外一方面，这个插件会极大影响页面的加载速度。

### 页面反馈

> 需要使用Cookies

本站有反馈功能（由[Google Analytics](https://analytics.google.com/analytics/web/)驱动，需要有cookie许可才能正常运作），在页面底部有`Was this page helpful?`的选项。

如果你觉得该页面很好，可以留下🙂；如果您发现该页面有任何问题，可以选择🙁，并且填写相应的表单（会自动跳转到**GitHub的issue板块**）。

### 评论

> 需要使用Cookies

本站有评论功能（由[giscus](https://giscus.app/)驱动），评论的内容保存在**GitHub的discuss板块**中（所以需要先使用GitHub账号登录之后才可以评论）。

### RSS

本站的Blog板块支持RSS订阅（由[mkdocs-rss-plugin](https://guts.github.io/mkdocs-rss-plugin/)驱动），订阅地址为：[创建序订阅源](/feed_rss_created.xml)，该链接是按照**创建日期**排序的。

你也可以从[更新序订阅源](/feed_rss_updated.xml)（*不推荐，我偶尔会更新旧的文档，这会导致顺序混乱*）获取按照文档**更新日期**排序的订阅。

### 颜色彩蛋

从周日到周六，本站的主题色会每天切换（暗示我的心情）：

- 周日：<span style="background-color:#ab47bd;padding:5px;margin:3px;color:white;">purple</span>
- 周一：<span style="background-color:#757575;padding:5px;margin:3px;color:white;">grey</span>
- 周二：<span style="background-color:#546d78;padding:5px;margin:3px;color:white;">blue grey</span>
- 周三：<span style="background-color:#009485;padding:5px;margin:3px;color:white;">teal</span>
- 周四：<span style="background-color:#4051b5;padding:5px;margin:3px;color:white;">indigo</span>
- 周五：<span style="background-color:#e92063;padding:5px;margin:3px;color:white;">pink</span>
- 周六：<span style="background-color:#7e56c2;padding:5px;margin:3px;color:white;">deep purple</span>

### 多语言（i18n）

等我有空了，会做某些文章的英语版，mkdocs matreials本身也是很好地支持了多语言的。

<s>本站使用[mkdocs-static-i18n](https://github.com/ultrabug/mkdocs-static-i18n)实现多语言的支持，如果没有对应的语言默认展示中文的页面。</s>

> 已经弃用mkdocs-static-i18n，转而使用原生的i18n功能。因为mkdocs-static-i18n太重了，会极大影响其他插件的工作。
