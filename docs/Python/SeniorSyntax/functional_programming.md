---
tags:
- python进阶
---

# 函数式编程
我们首先来介绍一下什么叫`函数式`，它区别于哪些方式？

!!! quote "维基百科——编程范型"
    编程范型、编程范式或程式設計法（英語：Programming paradigm），是指软件工程中的一类典型的编程风格。常见的编程范型有：函数式编程、指令式編程、过程式编程、面向对象编程等等。

    编程范型提供并决定了程序员对程序执行的看法。例如，在面向对象编程中，程序员认为程序是一系列相互作用的对象，由于方法论的不同，面向对象编程又分为基于类编程和基于原型编程，而在函数式编程中一个程序会被看作是一个无状态的函数计算的序列。

我不是软工专业的，这方面了解不多。我还找来了python官方文档对这方面内容的解读：

!!! quote "python 3.11 Documentation"
    编程语言支持通过以下几种方式来解构具体问题：

    - 大多数的编程语言都是 **过程式** 的，所谓程序就是一连串告诉计算机怎样处理程序输入的指令。C、Pascal 甚至 Unix shells 都是过程式语言。
    - 在 **声明式** 语言中，你编写一个用来描述待解决问题的说明，并且这个语言的具体实现会指明怎样高效的进行计算。 SQL 可能是你最熟悉的声明式语言了。 一个 SQL 查询语句描述了你想要检索的数据集，并且 SQL 引擎会决定是扫描整张表还是使用索引，应该先执行哪些子句等等。
    - **面向对象** 程序会操作一组对象。 对象拥有内部状态，并能够以某种方式支持请求和修改这个内部状态的方法。Smalltalk 和 Java 都是面向对象的语言。 C++ 和 Python 支持面向对象编程，但并不强制使用面向对象特性。
    - **函数式** 编程则将一个问题分解成一系列函数。 理想情况下，函数只接受输入并输出结果，对一个给定的输入也不会有影响输出的内部状态。 著名的函数式语言有 ML 家族（Standard ML，Ocaml 以及其他变种）和 Haskell。

觉得讲的非常直接明了，更加详细的内容参见[函数式编程指引](https://docs.python.org/zh-cn/3/howto/functional.html)。

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

例如`#!python [1, 2, 3]`就是一个可迭代对象，`#!python iter([1, 2, 3])`就是一个迭代器。

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

知道了这些，我们完全可以自己动手写一个迭代器：

=== "源代码"

    ```python
    class List:
        def __init__(self, *data):
            self.data = data
            self.cur = -1
        def __next__(self):
            if self.cur < len(self.data)-1:
                self.cur += 1
                return self.data[self.cur]
            else:
                raise StopIteration("迭代器终止")
    l = List(1, 2, 3)
    while 1:
        print(next(l))
    ```
=== "运行结果"

    ```text
    1
    2
    3
    Traceback (most recent call last):
    File "C:\Users\yangz\Desktop\AIboy996.GitHub.io\example.py", line 13, in <module>
        print(next(l))
    File "C:\Users\yangz\Desktop\AIboy996.GitHub.io\example.py", line 10, in __next__
        raise StopIteration("迭代器终止")
    StopIteration: 迭代器终止
    ```

好像有点麻烦？用生成器吧！

??? question "为什么要用迭代器？"

    一言蔽之就是节约资源。

    举例来说，我现在需要逐个计算并且输出斐波拉契数列的每一项（例如前1000项）。
    
    使用传统的递归写法，有点蠢：

    ```python
    def fib(n : int):
        assert isinstance(n, int) and n >= 0
        if n==0 or n==1:
            return 1
        else:
            return fib(n-1) + fib(n-2)
    for i in range(1000):
        print(fib(1000))
    ```

    稍作优化或许可以改成递推的写法：

    ```python
    def fib(n : int):
        l = [1]*n
        for i in range(n-2):
            a,b = l[i], l[i+1]
            l[i+2] = a + b
        return l
    print(*fib(10), sep='\n')
    ```
    但是不论哪种，都无法达成`即用即算`的效果。用黑话来说就是`同步`完成了所有的计算，无法`异步`计算。

    而如果使用迭代器，调用一次`fib(1000)`之后，就可以用`next()`来做异步计算，每次需要的时候再算一下就行。

    “异步”的特性我们会在下一节更加深入地去讲解。

    
## 生成器
迭代器虽然很重要，但是在函数式编程这一块我们不去深入学习它，只是作为生成器的引入。

**生成器**（generator）指的是含有`yield`关键字的函数的**返回值**，它是一种特殊的迭代器。其中返回生成器的函数称为**生成器函数**。
### 简单生成器

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

生成器既然是特殊的迭代器，就自然可以当作迭代器来使用：

=== "源代码"

    ```python
    def g(n):
        assert isinstance(n, int)
        for i in range(n):
            yield i

    g = g(3)
    while 1:
        print(next(g))
    ```
=== "运行结果"

    ```text
    0
    1
    2
    Traceback (most recent call last):
    File "C:\Users\yangz\Desktop\AIboy996.GitHub.io\example.py", line 8, in <module>
        print(next(g))
    StopIteration
    ```

### 协程
按照官方的说法：
> 生成器是一类用来**简化**编写迭代器工作的特殊函数。普通的函数计算并返回一个值，而生成器返回一个能返回数据流的迭代器。

生成器存在的意义就是简化迭代器工作。

但这可能只是初衷，发展到今天，现在的生成器已经有了很多独有的特性。

例如下面的例子，把`yield x`作为右值赋值给一个变量，可以实现“协程”的效果：

=== "源代码"

    ```python
    def imitator():
        """模仿者，不论你给他发什么都会返回你发的内容"""
        received = "hello"
        while True:
            received = yield received

    imt = imitator()
    print(imt.send(None))
    print(imt.send('are u ok?'))
    print(imt.send('why u repeat what i said?'))
    ```
=== "运行结果"

    ```text
    hello
    are u ok?
    why u repeat what i said?
    ```

再比如`yield from`这样的新语法（详见[PEP 342 – Coroutines via Enhanced Generators](https://peps.python.org/pep-0342/)），我就不再赘述了。
## 装饰器
最后来介绍我认为的Python中最好用的语法糖——装饰器（decorator）。

### 简单装饰器
对于一个已有的函数：
```python
def hello():
    print('hello')
```
我们可以通过“装饰器”来给他加上额外的效果。

装饰器的基本写法是：
```python
def hello():
    print('hello')

# 这个函数就叫做装饰器（decorator
def decorator(func):
    # 内层这个函数是wrapper，可以理解为包装纸
    # 它的作用就是给func函数的运行加上额外的效果
    # 注意到这里wrapper函数的参数是【*args, **kwargs】
    # 也就是来者不拒，并且在最后原封不动传递给了func
    def wrapper(*args, **kwargs):
        print('yang, ', end='')
        return func(*args, **kwargs)
    return wrapper

### 装饰器的使用方式 ##########
hello = decorator(hello)   ###
#############################


hello()  # 输出：yang, hello
```
可以看到，装饰器虽然名字很吓人。本质上就是一类函数。特殊之处在于，它的返回值也是函数（这样的函数称为高级函数）。

调用装饰过的`hello()`函数时，本质上就是在调用`decorator(hello)()`。

但是这样似乎不太优雅，更pythonic的`@`语法糖写法是：
```python
def enhance(func):
    def wrapper(*args, **kwargs):
        print('yang, ', end='')
        return func(*args, **kwargs)
    return wrapper

@enhance
def hello():
    print('hello')

```
??? question "为什么要用装饰器？"

    要给`hello()`加一个小功能，为什么要大费周章写一个装饰器函数呢？

    这样做的好处在于，我们不需要改变`hello()`的内部代码，也不需要把它的代码复制一份。

    我们写了一个**独立的**函数：
    ```python
    def enhance(func):
        def wrapper(*args, **kwargs):
            print('yang, ', end='')
            return func(*args, **kwargs)
        return wrapper
    ```
    使用`@enhance`就可以把它的功能扩展到了原有的函数上，如果我们有很多个函数需要扩展功能，就可以如法炮制快速完成了。

    这样的**模块化**扩展，使得程序的逻辑结构更加清晰，某种程度上也更加易读。

    总之
    - 独立性
    - 易用性【可复用】
    - 可读性

### 带参数的装饰器
很多时候，我们需要扩展的这个模块可自定义。

现在我们的装饰器只能加上一个特定的前缀`yang, `，如果要自定义这个前缀可以这样写：
```python
def to(name='yang')
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f'{name}, ', end='')
            return func(*args, **kwargs)
        return wrapper
    return decorator

@to('Alen')
def hello():
    print('hello')

hello() # 输出：Alen, hello
```

也不难理解，调用装饰完的`hello()`相当于调用`#!python to('Alen')(hello)()`。

### 装饰器的用途
前面提到的算是最常见的用途之一，日志。当我们想要某个函数运行的时候输出特定的内容，可以使用装饰器。

此外，装饰器还可以验证登录状态、处理输入的参数、处理异常等等。我分别举一个例子，权当抛砖引玉帮助读者拓宽思路。

#### 1
```python title="验证登录状态"
LOGIN = False

def need_login(status=True):
    def decorator(func):
        def wrapper(*args, **kwargs):
            if status:
                if LOGIN:
                    return func(*args, **kwargs)
                else:
                    raise Exception('需要登录')
            else:
                return func(*args, **kwargs)
        return wrapper
    return decorator

@need_login(False)
def login():
    global LOGIN
    LOGIN = True
    print('登陆成功')

@need_login(True)
def logout():
    global LOGIN
    LOGIN = False
    print('登出成功')

try:
    logout()
except Exception as e:
    print(e)
    login()
    logout()
```
上面的程序输出应该是：
```text
需要登录
登陆成功
登出成功
```
这样一种登录状态的验证在web服务器编程中是非常常见的，如果读者后续学习Flask、Django等框架应该还会见到。
#### 2
```python title="处理输入的参数"
def split(func):
    def wrapper(a,b):
        if b-a > 3:
            m = (a+b)/2
            return wrapper(a,m) + wrapper(m,b)
        else:
            return func(a,b)
    return wrapper

@split
def f(a,b):
    assert a < b
    return [(a,b)]

print(f(1,3)) # 输出：[(1, 3)]
print(f(-3,5)) # 输出：[(-3, -1.0), (-1.0, 1.0), (1.0, 3.0), (3.0, 5)]
```
这种装饰器也是很常见的一种，很多时候我们需要对输入的参数进行特殊处理。而这种处理可以用装饰器写成模块化的工具。

值得注意的是，这里在装饰器内部加入了递归写法，非常巧妙。
#### 3
```python title="处理异常"
import random
random.seed(10)

def retry(n=3, error=AssertionError):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(n):
                try:
                    return func(*args, **kwargs)
                    break
                except error:
                    print(f'retry({i+1})')
                    continue
        return wrapper
    return decorator

@retry(5)
def flip():
    r = random.random()
    print(r)
    assert r > .8

flip(n=5, error=AssertionError)
"""
输出：
0.5714025946899135
retry(1)
0.4288890546751146
retry(2)
0.5780913011344704
retry(3)
0.20609823213950174
retry(4)
0.81332125135732
"""
```
这也是很常见的用法，尤其是在网络通信编程中，重试是非常常见的需求。

上面的例子中我们写了一个装饰器捕捉特定的`error`，如果触发就重试直到满`n`次。

??? question "装饰器完之后还是原来的函数嘛？"

    例如：
    ```python
    def decorator(func):
        def wrapper(*args, **kwargs):
            """this is wrapper"""
            return func(*args, **kwargs)
        return wrapper 

    @decorator
    def f():
        """this is f"""
        pass

    print(f.__name__) # 输出：wrapper
    print(f.__doc__) # 输出：this is wrapper
    ```
    可见，被装饰器装饰的函数函数名`__name__`和函数文档`__doc__`都会被`wrapper`覆盖，换言之物是人非，已经完全变成了`wrapper`的形状。

    那有什么办法可以阻止这种覆盖呢？

    答案是下一节介绍的`functools.wraps`装饰器。
### python内置的装饰器
> 下面的例子都来自[官方](https://docs.python.org/3/library/functools.html)

在内置包`functools`里有非常一些好用的装饰器，例如`cache`就可以增加函数调用的缓存：
```python
from functools import cache

@cache
def factorial(n):
    print('call ', n)
    return n * factorial(n-1) if n else 1
```
可以很方便地实现下面的效果：
```python title="交互运行"
>>> factorial(5)      # 没有缓存，会有6层递归调用
call  5
call  4
call  3
call  2
call  1
call  0
120
>>> factorial(4)       # 前面已经计算过了4!，直接使用缓存
24
>>> factorial(7)      # 前面已经计算了5!，只需要两层新的计算
call  7
call  6
5040
```

再如`wraps`
```python
from functools import wraps
def my_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        print('Calling decorated function')
        return f(*args, **kwds)
    return wrapper

@my_decorator
def example():
    """Docstring"""
    print('Called example function')
```
`wraps`可以在我们使用装饰器的时候，保留原有函数的函数名`__name__`和文档`__doc__`。

```python title="交互运行"
>>> example()
Calling decorated function
Called example function
>>> example.__name__
'example'
>>> example.__doc__
'Docstring'
```

大家可以去[官方文档](https://docs.python.org/3/library/functools.html)了解更多。