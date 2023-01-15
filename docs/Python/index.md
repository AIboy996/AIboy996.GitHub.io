---
title: Python从入门到入狱
tags:
- python入门
hide:
- tags
- toc
---

# Python🐍

!!! quote "The Zen of Python, by Tim Peters"
    Beautiful is better than ugly.
    
    Explicit is better than implicit.
    
    Simple is better than complex.
    
    Complex is better than complicated.
    
    Flat is better than nested.
    
    Sparse is better than dense.
    
    Readability counts.
    
    Special cases aren't special enough to break the rules.
    
    ……


## 绪
学了很久的python了，在网上看了许许多多的教程，平时我也写过很多笔记也有很多编程的案例。总想着哪天系统整理一下，放到网上。一方面是方便自己查阅，另外一方面也是希望能帮助到一些入门的小伙伴。

我这套教程预计会包含基础语法、高级语法、标准库和第三方库这四个板块，详细的内容我列个图表在后面。需要说明的是，涉及到一些库我不会事无巨细地介绍所有的api（这些内容官网都是有的），而是会讲解主要的api，然后再以案例的形式展现常见的用法（这个似乎官网也有哈哈哈）。

另外再提一句，虽然网上已经有了数不清的python教程，但是我还是要写。一方面与我自己而言算是一个系统的复习、回顾，另一方面则是我希望自己能做出一个不一样的教程，带入自己的思考、用全新的思路讲好它。

希望你我都有所收获！

> 2023.1.15
## 知识图谱

> 以下内容基于python 3.10.9

```mermaid
flowchart LR
    Python --- 基础语法 & 高级语法 & 标准库 & 第三方库
    基础语法 --- 内置数据类型 & 条件和循环语句 & 函数 & 内置异常
    高级语法 --- 面向对象编程 & 函数式编程
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
    end
    subgraph web技术
    requests
    parsel
    django
    flask
    end
    
    第三方库 --- 画图 & 数据处理 & 统计机器学习 & web技术
    subgraph 文件和系统
    os;io;time;shutil;
  	zipfile;tarfile;
    end
    subgraph 数据
    string;re;datetime;
    collections;copy;pprint;
    end
    subgraph 数学
    math; cmath; fractions; random; statistics
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
    subgraph 其他
    tkinter;dis;timeit;venv;sys;atexit;dis
    end
    标准库 --- 文件和系统 & 数据 & 数学 & 函数式编程模块 & 并发控制 & 网络 & 其他
    
    
```

