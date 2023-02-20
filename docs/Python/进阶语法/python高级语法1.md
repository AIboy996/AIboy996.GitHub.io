---
tags:
- python进阶
---

# 函数式编程
我们首先来介绍一下什么叫`函数式`，它区别于哪些方式？

!!! quote "维基百科——编程范型"
    编程范型、编程范式或程式設計法（英語：Programming paradigm），是指软件工程中的一类典型的编程风格。常见的编程范型有：函数式编程、指令式編程、过程式编程、面向对象编程等等。

    编程范型提供并决定了程序员对程序执行的看法。例如，在面向对象编程中，程序员认为程序是一系列相互作用的对象，由于方法论的不同，面向对象编程又分为基于类编程和基于原型编程，而在函数式编程中一个程序会被看作是一个无状态的函数计算的序列。

俺不是软工专业的，这方面了解不多。

我找来了python官方文档对这方面内容的解读：

!!! quote "python 3.11 Documentation"
    编程语言支持通过以下几种方式来解构具体问题：

    - 大多数的编程语言都是 **过程式** 的，所谓程序就是一连串告诉计算机怎样处理程序输入的指令。C、Pascal 甚至 Unix shells 都是过程式语言。
    - 在 **声明式** 语言中，你编写一个用来描述待解决问题的说明，并且这个语言的具体实现会指明怎样高效的进行计算。 SQL 可能是你最熟悉的声明式语言了。 一个 SQL 查询语句描述了你想要检索的数据集，并且 SQL 引擎会决定是扫描整张表还是使用索引，应该先执行哪些子句等等。
    - **面向对象** 程序会操作一组对象。 对象拥有内部状态，并能够以某种方式支持请求和修改这个内部状态的方法。Smalltalk 和 Java 都是面向对象的语言。 C++ 和 Python 支持面向对象编程，但并不强制使用面向对象特性。
    - **函数式** 编程则将一个问题分解成一系列函数。 理想情况下，函数只接受输入并输出结果，对一个给定的输入也不会有影响输出的内部状态。 著名的函数式语言有 ML 家族（Standard ML，Ocaml 以及其他变种）和 Haskell。

我觉得讲的非常直接明了，更加详细的内容参见[函数式编程指引](https://docs.python.org/zh-cn/3/howto/functional.html)。

## 深入了解函数
为了学习函数式编程，我们需要把函数方面的知识扩宽一下。

### 形参和实参
我们在定义一个函数的时候，需要声明它可以接受的参数，这称为形参（形式参数），等到实际函数运行的时候需要传入一些参数，这称为实参（实际参数）。

所有的形参在定义的时候都可以设置默认值，不带默认值的形参调用函数的时候必须传递实参，带默认值的形参可以不传递实参。

实参传递的时候有`位置实参`和`关键字实参`两种方式。

- 位置实参：`f(1, 2)`
- 关键字实参：`f(a = 1, b=2)`
- 混合：`f(1, b=2)`

但是请注意，位置实参必须在关键字实参之前传递，否则会触发错误：`SyntaxError: positional argument follows keyword argument`。

我们可以在定义形参的时候限制实参传递的方法，下面是从python官方文档抄来的一个标注：
```python title="限制实参传递的方式"
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
      -----------    ----------     ----------
        |             |                  |
        |        Positional or keyword   |
        |                                - Keyword only
         -- Positional only
```
其中`/`和`*`都是分隔符，不会被解读为形参。

- `/`之前的参数是位置实参；
- `*`之后的参数是关键字实参；
- `/`和`*`之间的参数传递方式不限制。

### 形参打包
另外，形参还有一类特殊的打包写法：
```python
def f(*args, **kwargs):
    print(args, kwargs)
```
这个函数的第一个形参`*args`会捕获所有的位置实参组合成一个**元组**，第二个形参`**kwargs`会捕获所有的关键字实参组合成一个**字典**。

举例来说：
```python
def f(*args, **kwargs):
    print(args, kwargs)

f(1,'hello', [2,3], name='Alen', day='SUN')
```
他的输出结果为：
```text
(1, 'hello', [2, 3]) {'name': 'Alen', 'day': 'SUN'}
```

这种打包形参的写法也可以和其他写法混合使用，例如：
=== "源代码"

    ```python
    def f(a, b, **kwargs):
        print(a, b)
        print(kwargs)

    f(1, b=2, name='Amy')
    ```
=== "运行结果"

    ```text
    1 2
    {'name': 'Amy'}
    ```
这个函数的`a,b`参数是必须要传递的参数，传递方式任意, 后面可以跟上任意多的位置参数。
### 实参解包
和形参打包写法相对应地，实参有解包的传递方法：
```python
def f(*args, **kwargs):
    print(args, kwargs)

f(1j, *[1, 'yes', True], **{'name':'Mily', 'year':2023})
# 运行输出为：(1j, 1, 'yes', True) {'name': 'Mily', 'year': 2023}
```
其中`*`会把一个可迭代对象解包，把各个元素作为位置实参传递进去。`**`会把一个字典的**键值对**作为关键字实参传递进去。
### 函数的返回值
函数的返回值使用`return`关键字来声明的，并且一旦返回了一个值，函数就会立即终止。
=== "源代码"

    ```python
    def f():
        print('line 1')
        return 1
        print('line 3')
        return 2

    print(f())
    ```
=== "运行结果"

    ```text
    line 1
    1
    ```

有一种特殊的返回值：函数自身的调用，这被称为**递归**调用，例如下面的求斐波拉契数列第n项的函数：
```python
def fib(n : int):
    assert isinstance(n, int) and n >= 0
    if n==0 or n==1:
        return 1
    else:
        return fib(n-1) + fib(n-2)


print(fib(2)) # 返回值是2
print(fib(3)) # 返回值是3
print(fib(4)) # 返回值是5
print(fib(5)) # 返回值是8
```
它的返回值是自身的一个调用。

如果需要写递归函数，请务必明确定义**递归的出口**，否则代码将陷入无止境的递归。

递归函数的运行过程可以借助下面的代码可视化来理解：
<iframe width="800" height="600" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=def%20fib%28n%20%3A%20int%29%3A%0A%20%20%20%20assert%20isinstance%28n,%20int%29%20and%20n%20%3E%3D%200%0A%20%20%20%20if%20n%3D%3D0%20or%20n%3D%3D1%3A%0A%20%20%20%20%20%20%20%20return%201%0A%20%20%20%20else%3A%0A%20%20%20%20%20%20%20%20return%20fib%28n-1%29%20%2B%20fib%28n-2%29%0A%0Aprint%28fib%284%29%29%20%23%20%E8%BF%94%E5%9B%9E%E5%80%BC%E6%98%AF4&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>

### 函数的注释
我一直强调`help`函数的重要性，现在我们自己写了一个函数，如果把他丢进`help`函数会发生什么呢？
=== "源代码"

    ```python title="零注释"
    def add(a, b):
        return a+b

    help(add)
    ```
=== "运行结果"

    ```text
    Help on function add in module __main__:

    add(a, b)
    ```
可以看见，啥也没有，这对于用户来说（甚至对于自己来说）都是非常不友好的。因此我们需要对函数进行一些注释：
=== "源代码"

    ```python title="完备注释"
    def add(a : int, b : int) -> str:
        """
        输入两个整数a和b
        返回他们的加和的字符串形式
        """
        return str(a+b)

    help(add)
    ```
=== "运行结果"

    ```text
    Help on function add in module __main__:

    add(a: int, b: int) -> str
        输入两个整数a和b
        返回他们的加和的字符串形式
    ```

这样一来，输入什么，输出什么，参数都应该是什么类型的一目了然。并且还有类型注释（形参`a : int`和返回值`-> str`）以及文字注释。

三引号内的内容被称作`documentation string`，可以用`__doc__`来访问：
```python
def f():
    """这里是函数的doc"""
    pass

print(f.__doc__)
# 输出：这里是函数的doc
```
写完备的注释，你好我好大家好。
## 迭代器
`迭代器（iterator）`和之前遇到过的`可迭代对象（iterable）`有点类似。

迭代器指的是实现了`__next__`方法的对象（通常是一个数据流），能够通过这个方法（或者`next()`函数）访问数据流中的下一个。

可迭代对象指的是实现了`__iter__`方法的对象，把该对象传递给`iter()`函数可以返回一个迭代器。

例如`#!python [1, 2, 3]`就是一个可迭代对象，`iter([1, 2, 3])`就是一个迭代器。

下面是一个示例：

=== "源代码"

    ```python
    iterable = [1,2,3]
    iterator = iter(iterable)
    print(iterator.__class__)
    while 1:
        try:
            print(iterator.__next__())
        except StopIteration:
            print('迭代器终止')
            break
    ```
=== "运行结果"

    ```text
    <class 'list_iterator'>
    1
    2
    3
    迭代器终止

    ```
## 生成器
迭代器虽然很重要，但是在函数式编程这一块我们不去深入学习它，只是作为生成器的引入。

生成器（generator）指的是使用`yield`关键字的函数的返回值。

例如：
```python
def g(n):
    assert isinstance(n, int)
    for i in range(n):
        yield i

print(g(2).__class__) # 打印出 <class 'generator'>
```

上例中`g(2)`就是一个生成器。

虽然这个函数并没有一般意义上的输出`return`，但是它仍然是有返回值的。每当我们传递一个整数进去，他都会返回一个生成器。
## 装饰器