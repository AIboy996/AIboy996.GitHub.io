---
tags:
- About
hide:
- tags
- math
---

# 站内导航🧭

!!! quote "Stephen R. Covey"
	Live your life by a compass, not a clock.

## 本站的几个板块

- [**About**](/About)：当前板块，提供网站基本信息。
- [**Article**](/Article)：“文章”板块，放一些杂七杂八的教程、笔记。
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

!!! question "新功能：标签云"
	本站最近添加了*Tag Cloud* 功能，可以更加直观地显示各个标签，在[首页](/)和[Tags](/Tags/)页面可以看到。点击标签云中的标签可以直接跳转到对应标签的文章列表。

### 搜索
本站有搜索功能（由[lunrjs](https://lunrjs.com/)驱动，mkdocs material内置），支持搜索文章标题、文字内容、代码等。

目前理论上是不支持中文搜索（`lunr.zh.js`）的，仅支持英语和日文（`lunr.ja.js`）搜索，但是基于日语的支持实际上也可以搜到一些汉字。

??? question "为什么不支持中文"

	!!! quote "squidfunk commented on Jul 20, 2021"
	
		Adding Chinese language support to the search plugin is currently **not possible** because of a dependency on `nodejieba`. `nodejieba` itself **depends on** `path` and `node-pre-gyp` and potentially other libraries that are not available in a browser environment, and – even worse – seems to include native code. Until those dependencies are removed from lunr-languages and it's upstream dependencies, and replaced with isomorphic JavaScript, adding Chinese search support is blocked.

	简而言之就是`lunr.zh.js`有太多依赖，现在无法引入。

	不过也有奇淫巧计可以实现`lunr.ja.js`的中文搜索效果：<https://github.com/mkdocs/mkdocs/issues/2509>
	
	这个issue上有一个哥们稍微修改了mkdocs的源代码（`mkdocs.contrib.search.search_index.py`），用`jieba库`+`lunr.ja.js`实现了不错的中文搜索效果：
	
	![](https://user-images.githubusercontent.com/15652226/133886857-557cbe82-ea5e-486c-a40c-917176f9a387.png)

### 页面反馈
本站有反馈功能（由[Google Analytics](https://analytics.google.com/analytics/web/)驱动，需要有cookie许可才能正常运作），在页面底部有`Was this page helpful?`的选项。

如果你觉得该页面很好，可以留下🙂；如果您发现该页面有任何问题，可以选择🙁，并且填写相应的表单（会自动跳转到**GitHub的issue板块**）。

### 评论
本站有评论功能（由[giscus](https://giscus.app/)驱动），评论的内容保存在**GitHub的discuss板块**中（所以需要先使用GitHub账号登录之后才可以评论）。

### RSS
本站支持RSS订阅（由[mkdocs-rss-plugin](https://guts.github.io/mkdocs-rss-plugin/)驱动），订阅地址为：[更新序订阅源（推荐）](/feed_rss_updated.xml)，该链接是按照**更新日期**排序的。

你也可以从[创建序订阅源](/feed_rss_created.xml)获取按照文档**创建日期**排序的订阅。

### 颜色彩蛋
随着星期几的变化，本站的主题色会随之改变：

- 周日：<span style="background-color:#7e56c2;padding:5px;margin:3px;color:white;">deep purple</span>
- 周一：<span style="background-color:#757575;padding:5px;margin:3px;color:white;">grey</span>
- 周二：<span style="background-color:#546d78;padding:5px;margin:3px;color:white;">blue grey</span>
- 周三：<span style="background-color:#009485;padding:5px;margin:3px;color:white;">teal</span>
- 周四：<span style="background-color:#4051b5;padding:5px;margin:3px;color:white;">indigo</span>
- 周五：<span style="background-color:#e92063;padding:5px;margin:3px;color:white;">pink</span>
- 周六：<span style="background-color:#7e56c2;padding:5px;margin:3px;color:white;">deep purple</span>