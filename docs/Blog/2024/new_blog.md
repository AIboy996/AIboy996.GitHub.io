---
tags:
- blog
---

# 新版博客！

最近重写了本站的博客板块，现在可以自动列出**最近更新**的几条博客了。

核心的代码就是：
```html
{% set recent_blog_pages=[] %}
{% for p in (pages | sort(attribute="page.meta.git_creation_date_localized", reverse=True)) %}
    {% set page=p.page %}
    {% if page.meta.tags and ("blog" in page.meta.tags) %}
        {{ recent_blog_pages.append(page) or ""}} 
    {% endif %}
{% endfor %}

{% for page in recent_blog_pages[:3] %}
    <details class="quote">
    <summary>{{ page.meta.git_creation_date_localized }} posted: {{ page.title }}</summary>
    <br>
    {{ page.content }}
    {% if page.meta and page.meta.git_revision_date_localized %}
        {% include "partials/source-file.html" %}
    {% endif %}
    </details>
{% endfor %}
```

熟悉Django的同学可能一眼就发现，这是jinjia2的模版语法。其中`pages`是`mkdocs`在渲染过程中构造的变量，它包含了所有的页面。通过对`git_creation_date_localized`的逆向排序，我们就可以选出最近更新的三条blog了。呈现的形式我选择了`details class="quote"`，对应于`mkdocs-material`的callout语法。关于`pages`这个变量，更加详细的内容可以参考[mkdocs develop guide](https://www.mkdocs.org/dev-guide/themes/)。

实在不是很优雅的实现方式，但也满足我的基本设想了。

## mkdocs-material
本来是想用`mkdocs-material`自带的blog插件的，但是发现最新的版本已经太高了（现在已经更新到了`9.5.17`，而我还在用`8.5.11`）感觉会出很多兼容性问题。

并且我看了一眼，他们做的Blog未免有些太复杂，需要我提供很多meta信息才能正确渲染（尤其是日期！居然不能自动读取git日期）。

## DIY插件
也有其他人做的插件，比如<https://blog.mcdic.net/>这位哥的主页，写了一个自定义的Blog页面。我也是受他的启发才使用了现在的方案。

![](/Blog/2024/assets/2024-04-03-18-55-52.png)

不过他是通过python源代码写的插件实现的，我是通过template文件实现的。

## 其他平台
我还看了很多其他的方案，比如<https://www.ftls.xyz/posts/2023-08-13-mricoblog/>这位哥提到的方案，看起来很炫酷、还能在手机上发Blog。但是好麻烦，于是放弃！

![](/Blog/2024/assets/2024-04-03-18-54-53.png)
