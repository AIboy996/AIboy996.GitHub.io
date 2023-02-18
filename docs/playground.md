---
title: Playground of Markdown
hide:
- navigation
---

## [👉本站的404页面](./none)

!!! note

    这里用于调试本站支持的各类markdown扩展语法，基础的语法这里就不赘述了，参见markdown官方教程[^1]。此外，这里涉及的全部内容都可以参见mkdocs material的官网[^2]。并非所有的语法都是原生支持的，有些需要额外的插件以及额外的选项开启，这些都可以在官网上找到。
## .md文件的meta信息
在markdown文件的开头可以进行meta信息的标注：
（下面这个加号是可以点击的）
```html title="可以设置的meta信息"
---
title: Playground of Markdown <!--(1)-->
tags: <!--(2)-->
  -  About Me
hide: <!--(3)-->
  - navigation
  - toc

---
```

1.  这是一个代码块注释的特殊写法，可以把注释的内容变成一个可点击的小加号！
	实现的方法就是把注释内容替换成`(num)`，然后在代码块下方用对应的数字`num.`开头书写注释内容
	
2.  tags控制页面的标签，便于归纳整理
3.  hide可以隐藏相应的内容，例如导航栏、目录等

## 代码块以及Annotations

=== "渲染效果"

    ``` python title="for loop"
    for i in range(10):
      # (1)
      print(i)
    ```
    
    1. 这是一个for循环，依次打印出0-9

=== "源代码"

    ````html
    <!-- (1)-->
    
    ``` python title="for loop"<!-- (2)-->
    for i in range(10):
      # (1)
      print(i)
    ```
    
    1.  这是一个for循环，依次打印出0-9
    ````
    
    1.  这里还有一个小技巧，如果要在markdown的代码环境中再写markdown代码，可以用(四个`)来避免语义冲突。
    2.  在三个`之后可以加上代码语言、代码块标题

现在这个样子还是有点丑的，虽然把注释内容隐藏了起来，但是注释符号还在，非常难受！不过mkdocs现在已经在测试进一步的功能，可以实现更加美观的样式，尽情期待~

## 并列内容
=== "python"
    ```python
    print("Hello, World!")
    ```
=== "C"
    ```C
    #include <stdio.h>
    int main() {
      printf("Hello, World!");
      return 0;
    }
    ```
上面这种两个代码并排显示也是一种扩展语法，写法如下：
````markdown
=== "Block1"
    ```python
    print(1)
    ```
=== "Block2"
    ```C
    #include <stdio.h>
    int main() {
      printf("Hello, World!");
      return 0;
    }
    ```
````
当然这种写法并不局限于并列代码块，可以嵌套组合出很多花样。
!!! example

    === "Unordered List"
    
        ``` markdown
        * Sed sagittis eleifend rutrum
        * Donec vitae suscipit est
        * Nulla tempor lobortis orci
        ```
    
    === "Ordered List"
    
        ``` markdown
        1. Sed sagittis eleifend rutrum
        2. Donec vitae suscipit est
        3. Nulla tempor lobortis orci
        ```

## 突出显示
Admonitions，也叫call-out，是一种突出内容的手段。
原生的样式比较简单：
> 突出内容
> 引用内容

mkdocs-material支持更多的扩展形式：
=== "渲染效果"
    ??? info "标题"
        
        这里可以写一些内容
=== "源代码"
    ```
    ??? info "标题"
        
        这里可以写一些内容
    ```
如果不需要折叠可以使用下面的写法：
=== "渲染效果"
    !!! caution "标题"
        
        这里可以写一些内容
=== "源代码"
    ```
    !!! caution "标题"
        
        这里可以写一些内容
    ```
支持以下的样式：

- note
- abstract, summary, tldr
- info, todo
- tip, hint, important
- success, check, done
- question, help, faq
- warning, caution, attention
- failure, fail, missing
- danger, error
- bug
- example
- quote, cite

## 图片以及LaTex
在原有markdown图片引用的基础之上，可以在末尾加上一些参数。LaTex则依然是依靠MathJax实现的，语法上需要小心并非所有的写法通用，具体有何差异可以去官网看一看[^3]。
=== "渲染效果"
    ![circle](./assets/images/circle.png){align=right width=400 loading=lazy}
	这是一个单位圆，图中$P$在第一象限，$PR\perp PQ$，$M,N$的横坐标都是2，问图示两个区域的面积何时相同？
	
	想要求解这个问题，我们只需要一些中学的三角函数知识就足矣。
	
	这是一个单位圆，那么可以设坐标
	$$
	P(\cos\theta,\sin\theta),\quad\theta\in (0,\frac{\pi}{2})
	$$
	进而我们可以求得
	$$
	R(\cos(\theta+\frac{\pi}{2}),\sin(\theta+\frac{\pi}{2}))
	和Q(\cos(\theta-\frac{\pi}{2}),\sin(\theta-\frac{\pi}{2}))
	$$
	更进一步联立相关直线方程也就不难求得$M,N$的坐标。
	
	最后只需要解方程
	$$
	(y_M-y_N)(2-x_P)=1
	$$
	即得最终的答案。
=== "源代码"
	```markdown
	![circle](./assets/images/circle.png){align=right width=450 loading=lazy}
	这是一个单位圆，图中$P$在第一象限，$PR\perp PQ$，$M,N$的横坐标都是2，问图示两个区域的面积何时相同？
	
	想要求解这个问题，我们只需要一些中学的三角函数知识就足矣。
	
	这是一个单位圆，那么可以设坐标
	$$
	P(\cos\theta,\sin\theta),\quad\theta\in (0,\frac{\pi}{2})
	$$
	进而我们可以求得
	$$
	R(\cos(\theta+\frac{\pi}{2}),\sin(\theta+\frac{\pi}{2}))
	和Q(\cos(\theta-\frac{\pi}{2}),\sin(\theta-\frac{\pi}{2}))
	$$
	更进一步联立相关直线方程也就不难求得$M,N$的坐标。
	
	最后只需要解方程
	$$
	(y_M-y_N)(2-x_P)=1
	$$
	即得最终的答案。
	```
但是`align`参数无法实现居中效果，可以用下面的写法
=== "渲染效果"
	<figure markdown>
      ![circle](./assets/images/circle.png){width=400}
      <figcaption>Image caption</figcaption>
    </figure>
=== "源代码"
	```markdown
	<figure markdown>
      ![circle](./assets/images/circle.png){width=400}
      <figcaption>Image caption</figcaption>
    </figure>
    ```
## 流程图
用的不过，参见mermaid的官网[^4]。我之前都是用的Graphviz，不过这些个东西都大差不差，背后都是用js实现的，有的时候还是用PPT画更快些。
=== "渲染效果"
    ``` mermaid
    graph LR
      A[Start] --> B{Error?};
      B -->|Yes| C[Hmm...];
      C --> D[Debug];
      D --> B;
      B ---->|No| E[Yay!];
    ```
=== "源代码"
	````
	``` mermaid
    graph LR
      A[Start] --> B{Error?};
      B -->|Yes| C[Hmm...];
      C --> D[Debug];
      D --> B;
      B ---->|No| E[Yay!];
    ```
    ````
[^1]: [markdown官方教程：markdownguide.org](https://www.markdownguide.org/)

[^2]: [mkdocs-material官网：squidfunk.github.io/mkdocs-material](https://squidfunk.github.io/mkdocs-material/)

[^3]: [MathJax官网：www.mathjax.org](https://www.mathjax.org/)

[^4]: [mermaid官网：mermaid-js.github.io/mermaid](https://mermaid-js.github.io/mermaid/#/)