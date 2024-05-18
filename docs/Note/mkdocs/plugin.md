---
tags:
- mkdocs
---

# 控制插件加载

随着本站的内容越来越多，每次编译的速度越来越慢。为了提高写文的体验，决定在开发的时候禁用一些插件。


可以使用环境变量单独控制特定的插件是否启用：

```yml
plugins:
  - git-revision-date-localized:
      enabled: !ENV [DEPLOY, true]
```

但并非所有插件都支持`enabled`这个变量。


也可以使用官方的`group`插件，来批量控制插件的开启：
```yml
plugins:
  - group:
      enabled: !ENV [DEPLOY, true]
      plugins:
      - optimize
      - minify
```
但是这个插件和我用的mkdocs-static-i18n插件不兼容。

于是我只能采用第三种方法，在配置文件中使用环境变量来控制是否加载插件列表：
```yml
INHERIT: !ENV [PLUGIN, ./plugins_simplify.yml]
```

如果需要全部的插件，就传递`PLUGIN`环境变量即可：
```bash
PLUGIN="./plugins_full.yml" mkdocs serve
```


结果这番操作，原本需要30秒的编译，现在只需要2秒了，不得不说 mkdocs 真是慢啊！