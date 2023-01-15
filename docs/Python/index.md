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

