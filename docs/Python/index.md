---
title: Python从入门到入狱
tags:
- PyIntro
hide:
- tags
- toc
---

# 蟒蛇🐍

<div class="console">

```console
$ python -c "import this"
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!


```

</div>

## 绪
学了很久的Python了，在网上看了许许多多的教程，平时我也写过很多笔记也有很多编程的案例。总想着哪天系统整理一下，放到网上。一方面是方便自己查阅，另外一方面也是希望能帮助到一些入门的小伙伴。构想了许久，终于在这个寒假开启了这个项目。

<s>我这套教程</s>（我的笔记！）预计会包含基础语法、高级语法、标准库和第三方库这四个板块，详细的内容我[列个思维导图在后面](#_3)。

需要说明的是，涉及到的库我不会事无巨细地介绍所有的api（这些内容官网都是有的），而是会讲解主要的api，然后再以案例的形式展现常见的用法（这个似乎官网也有哈哈哈）。

语法方面我也没法面面俱到，只能讲一个大致的脉络。我希望能把自己对Python的理解传达给读者，而不是把Python的documentation搬运过来。

希望你我都有所收获！

> Python != python，官方名称是需要大写P的，当然我经常不大写，见谅。
## 思维导图

!!! info "FYI"
    点击思维导图中的节点即可跳转到相应的文章（点不了就是没写完）。

> 以下内容基于Python 3.10.9

```mermaid
flowchart LR
    subgraph 内置类
    学会查文档
    借助类理解Python
    内置数据类型
    内置函数
    end
    subgraph 内置关键字
    条件和循环
    自定义函数
    自定义类
    异常处理
    包的使用
    end
    subgraph 面向对象编程
    类属性和实例属性
    类方法
    魔法方法
    元类
    end
    subgraph 函数式编程
    函数详解
    迭代器
    生成器
    装饰器
    end
    Python --- 基础语法 & 高级语法 & 标准库 & 第三方库
    基础语法 --- 内置类 & 内置关键字
    高级语法 ---函数式编程 &  面向对象编程
    
    subgraph 画图
    matplotlib
    seaborn
    Pillow
    end
    subgraph 数据处理
    numpy
    pandas
    end
    subgraph 统计机器学习
    scipy
    sklearn
    statsmodel
    pytorch
    end
    subgraph web技术
    requests
    parsel
    django
    flask
    end
    
    第三方库 --- 包管理 & 自己写一个库 & 画图 & 数据处理 & 统计机器学习 & web技术
    subgraph 文件和系统
    os;io;shutil;platform;
  	zipfile;tarfile;
    end
    subgraph 数据
    string;re;datetime;calender;time;
    collections;copy;pprint;hashlib;
    end
    subgraph 数学
    math; cmath; fractions; random; statistics; array
    end
    subgraph 函数式编程模块
    itertools; functools; operator
    end
    subgraph 并发控制
    threading; multiprocessing; subprocess;
    end
    subgraph 网络
    asyncio;email; json; html; urllib; http;
    end
    subgraph 开发
    typing;doctest;unittest;
    end
    subgraph 其他
    tkinter;dis;timeit;venv;sys;atexit;ast;
    end
    标准库 --- 文件和系统 & 数据 & 数学 & 函数式编程模块 & 并发控制 & 网络 & 开发 & 其他
    click Python "."
    %% 基础语法
    click 学会查文档 "./BasicSyntax/builtin_class/#dirhelp"
    click 借助类理解Python "./BasicSyntax/builtin_class/#python"
    click 内置数据类型 "./BasicSyntax/builtin_class/#_3"
    click 内置函数 "./BasicSyntax/builtin_class/#_5"
    click 条件和循环 "./BasicSyntax/builtin_keyword/#if"
    click 自定义函数 "./BasicSyntax/builtin_keyword/#_3"
    click 自定义类 "./BasicSyntax/builtin_keyword/#_4"
    click 异常处理 "./BasicSyntax/builtin_keyword/#_9"
    click 包的使用 "./BasicSyntax/builtin_keyword/#import"
    %% 高级语法
    click 函数详解 "./SeniorSyntax/functional_programming/#_2"
    click 迭代器 "./SeniorSyntax/functional_programming/#_8"
    click 生成器 "./SeniorSyntax/functional_programming/#_9"
    click 装饰器 "./SeniorSyntax/functional_programming/#_12"
    click 类属性和实例属性 "./SeniorSyntax/OOP/#attribute"
    click 类方法 "./SeniorSyntax/OOP/#method"
    click 魔法方法 "./SeniorSyntax/OOP/#magic-method"
    click 元类 "./SeniorSyntax/OOP/#_20"
    %% 标准库
    click os "./StandardLibrary/os/"
    click re "./StandardLibrary/re/"
    click time "./StandardLibrary/time/"
    click doctest "./StandardLibrary/doctest/"
    click fractions "./StandardLibrary/fractions/"
    %% 第三方库
    click 包管理 "./ThirdPartyLibrary/package_management/"
    click 自己写一个库 "./ThirdPartyLibrary/DIY/"
    click numpy "./ThirdPartyLibrary/numpy/"
    click pandas "./ThirdPartyLibrary/pandas/"
    click matplotlib "./ThirdPartyLibrary/matplotlib/"
    click pytorch "./ThirdPartyLibrary/pytorch/"
```

