---
tags:
- python进阶
---

# 面向对象编程
虽然函数式编程也很好玩，但是我认为python最丰富、可玩性最高的还是OOP（面向对象编程，Object Oriented Programming）。

在这里你几乎可以**控制Python对象的一切行为**：

- `with`语句如何创建对象
- `for`语句如何迭代对象
- `print(object)`会输出什么东西
- `()`,`[]`,`.`,`+`,`-`,`*=`,`/=`等操作符的行为

诸如此类。

甚至可以用元类（metaclass）来控制定义类的过程，比如要求所有的方法命名都必须用小写字母。

之前的两篇文章[内置关键字](../BasicSyntax/builtin_keyword)和[内置类](../BasicSyntax/builtin_class)已经回答了下面的问题：

- 什么是类？
    - 类就是某些对象的抽象，几乎python中一切的东西都是类（或者由类生成的对象或者叫实例 i.e. instance）
- 为什么使用类？
    - 因为类是一类对象的抽象，可以很好的提供这些对象的统一接口便于维护，极大提高了代码的复用率。同时类之间的继承关系也可以很方便地简化代码。
    - 类的关键在于**抽象**和**复用**。
- 如何自定义一个类？
    - 使用`class`关键字
- 如何访问类的属性、方法？
    - 使用`.`运算符
- 从类到对象的过程？
    - 例如`a = A()`
    - 首先会运行`A.__new__(cls)`方法来创建一个实例，必须传入参数`cls`，返回一个实例`a`。
    - 然后会运行`A.__init__(self)`方法来初始化实例，这个方法必须传入参数`self`，没有返回值。
    - 于是乎一个实例就被创造好了。
- 如何继承一个类？
    - 这么写：`class MyClass(FatherClass)`

这篇文章我们来补充一些OOP的知识。

## 属性（attribute）
> 属性就是类命名空间中的变量

### 类属性和实例属性

我们定义这样一个类来展示类中几种不同的属性：

```python
>>> class Example:
...     class_attribute = '类属性'
...     __private = '私有 类属性'
...     _private = '惯用私有 类属性'
...     def __init__(self):
...         self.instance_attribute_in_method = '实例属性'
...     @property
...     def property_attribute(self):
...         return 'property装饰的类属性'
```
先看看里面都有啥：
```python
>>> dir(Example)
['_Example__private', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_private', 'class_attribute', 'property_attribute']
>>> e = Example() 
>>> e.__dir__()
[ '_Example__private', '__class__', '__delattr__',
  '__dict__', '__dir__', '__doc__', '__eq__', 
  '__format__', '__ge__', '__getattribute__', 
  '__gt__', '__hash__', '__init__', '__init_subclass__',
  '__le__', '__lt__', '__module__', '__ne__', 
  '__new__', '__reduce__', '__reduce_ex__', 
  '__repr__', '__setattr__', '__sizeof__', 
  '__str__', '__subclasshook__', '__weakref__',
  '_private', 'class_attribute', 
  'instance_attribute_in_method', 'property_attribute']
>>> e.__dict__
{'instance_attribute_in_method': '实例属性'}
```
可以发现，`e.__dir__()`可以查到所有的类属性以及实例属性：

- `_Example__private`：（私有变量会被重命名）
- `_private`
- `class_attribute`
- `class_attribute_in_method`
- `property_attribute`

!!! caution "类属性是共享的"
    请注意，类属性是这个类的所有实例共享的。每个实例都可以访问、修改这个属性。请不要把本该属于实例的属性放到类属性中。

但是`e.__dict__`只能查到通过`self.`赋值的变量（也就是实例属性）。
```python
>>> e.class_attribute
'类属性'
>>> try:
...     print(e.__private)
... except AttributeError as error:
...     print(error)
'Example' object has no attribute '__private'
>>> e.instance_attribute_in_method
'实例属性'
>>> e.property_attribute
'property装饰的类属性'
>>> e._Example__private
'私有 类属性'
>>> e._private
'惯用私有 类属性'
```

此外，如果同样的属性名称同时出现在实例和类中，则属性查找会优先选择实例。
```python
>>> class Warehouse:
...    purpose = 'storage'
...    region = 'west'
...
>>> w1 = Warehouse()
>>> print(w1.purpose, w1.region)
storage west
>>> w2 = Warehouse()
>>> w2.region = 'east'
>>> print(w2.purpose, w2.region)
storage east
```

### 模式匹配
`__match_args__`，定义了`match`语句中对象的行为，规定了使用哪些变量来进行匹配。

```python
class A:
    __match_args__ = ('a','b')
    def __init__(self, x, y, z):
        self.a = x
        self.b = y
        self.c = z
        
obj = A(2,2,3)

match obj:
    case A(2,2):
        print(2,2) # this case matched
    case A(1,1):
        print(1,1)
```

### 限定属性
最后，类定义中还可以规定一个特殊的属性：`__slots__`，使用它可以声明所有的属性。从而显著节省空间、提高属性的查找速度。

用法就是：
```python
class A:
  __slots__  = ['data']
  pass
```
这样A的所有实例就都只有`data`这个属性了，也不可以通过赋值的方式增加其他属性。

## 方法（method）
> 方法就是命名空间中的函数

如果你直接在`class`的定义内写一个普通的函数:
```python
>>> class Example:
...     def f(s):
...         print(s)
```
那么它只能通过`Example.f`来调用。
```python
>>> Example.f('asd')
asd
```

实例化之后它的行为就会变化，他会默认**把自身作为第一个参数传入**：

??? info "把实例自身作为参数传入类方法"
    Python中约定俗称的习惯是，如果你需要使用实例自身作为第一个参数传入，那么这个形参应该定义为`self`（前面的例子说明了，定义成其他的也不是不行，这是个软约束）。

    另外，在其他语言中也广泛存在这样的行为，例如JavaScript的`this`、Java中的`this`、C++中也有`this`指针。这些概念和Python的`self`非常类似。

```python
>>> e = Example()
>>> e.f()
<__main__.Example object at 0x102c437d0>
```
这个时候函数就没法实现我们想要的功能了：
```python
>>> e.f('asd')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: Example.f() takes 1 positional argument but 2 were given
```

### 类方法装饰器
我们在函数式编程已经介绍了装饰器。在类的方法定义中，我们也常用装饰器来实现一些功能。

> 根据我们之前的介绍，所谓装饰器就是一个返回函数的函数。所以Python中所谓的内置装饰器就是内置函数，大概只有`staticmethod`, `classmethod`和`property`。也有很多其他的装饰器被python安置在了各个标准库中，例如`functools.cache`等。

`@staticmethod`装饰的**静态方法**可以解决我们上面提到的问题，静态方法不会把`self`作为第一个参数传入。

`@classmethod`装饰的**类方法**可以在不实例化的使用。

`@property`装饰的**方法会成为一个属性**。这个属性会有`getter`, `setter`, `deleter`三个方法，分别使用`@property`, `@x.setter`, `@x.deleter`装饰即可。使用这个装饰器可以更加精细地控制属性的行为，例如我希望`person.age`这个属性永远是正整数，就可以写一个方法来实现。

例如：
```python
class C:
    def __init__(self):
        self._x = None

    @property
    def x(self):
        """I'm the 'x' property."""
        return self._x

    @x.setter
    def x(self, value):
        self._x = value

    @x.deleter
    def x(self):
        del self._x
```

再如`abc`包中的`@abstractmethod`，是用于声明抽象方法的装饰器。一般用于抽象基类中为实现的方法。

更多的内容我们在介绍标准库的时候再来看。

### 多态（polymorphism）
多态是一个计算机术语，也就是同一个接口在不同的类上表现出的行为不同。例如：
```python
>>> class Person:
...     def __init__(self, name):
...         self.name = name
...     def hello(self):
...         print(f"I am {self.name}")
...
>>> class Doctor(Person):
...     def hello(self):
...         print(f"I am Dr.{self.name}")
...
>>> alice = Person('Alice')
>>> alice.hello()
I am Alice
>>> galler = Doctor('Galler')
>>> galler.hello()
I am Dr.Galler
```
## 魔法方法（magic method）
类的方法中最好玩的一部分就是魔法方法了。

这些方法是Python设计的用于定义类的一些重要行为（例如重载运算符）的方法，命名前后都有双下划线。例如：

- `__init__`
- `__new__`
- `__call__`

需要注意，很多时候我们并不是完全重写这些方法，只是想要在默认的行为中加上一点内容。所以我们首先需要学会如何复现默认的行为（实际上这在前面的文中已经展示过了）。

例如我们想要在`__hash__`被调用的时候输出一句话，然后采用默认的行为：

```python
class A:
  def __hash__(self):
    print('__hash__() is called')
    return super().__hash__(self) # 父类的hash函数
```

这里面`super()`返回`A`的父类。所以`super().__hash__(self)`实际上就是调用`A`的父类的`__hash__`方法，在这个例子里就是`object.__hash__(self)`（python类定义时默认的父类是object）。

学会了这一手，就可以来看Python中各种神奇的魔法方法。

### 类的构造方法
也就是`__new__`、`__init__`和`__del__`这三个方法。分别定义了如何生成类的实例、如何初始化实例和实例被销毁（Python有自动的内存回收机制）时候的行为。

- `__new__`的目的主要是允许不可变类型的子类 (例如 int, str 或 tuple) 定制实例创建过程：
```python
>>> class inch(float):
...     "Convert from inch to meter"
...     def __new__(cls, arg=0.0):
...         return float.__new__(cls, arg*0.0254)
...
>>> print(inch(12))
0.3048
```

- `__init__`几乎是每个类都会重载的重要方法，它控制着类的实例化行为。一个基类如果有`__init__`方法，则其所派生的类如果也有`__init__`方法，就必须显式地调用它以确保实例基类部分的正确初始化；例如: `super().__init__([args...])`。

- `__del__`控制类销毁的行为。如果一个基类具有`__del__`方法，则其所派生的类如果也有`__del__`方法，就必须显式地调用它以确保实例基类部分的正确清除。

下面给出一个文件处理的例子：
```python
from os.path import join

class FileObject:
    '''文件对象的装饰类，用来保证文件被删除时能够正确关闭。'''

    def __init__(self, filepath='~', filename='sample.txt'):
        # 使用读写模式打开filepath中的filename文件
        self.file = open(join(filepath, filename), 'r+')

    def __del__(self):
        self.file.close()
        del self.file
```

!!! caution "何谓对象的销毁？"
    根据Python的垃圾回收机制（garbage collector）当对象的引用计数为0的时候对象就会被销毁。所以`del x`并不直接调用 `x.__del__()`，前者会将 x 的引用计数减一，而后者仅会在 x 的引用计数变为零时被调用。

    要查看对象的引用计数可以使用`gc.get_count()`函数。

    由于调用`__del__`方法时周边状况已不确定，在其执行期间发生的**异常将被忽略**，改为打印一个警告到`sys.stderr`。

### 类的表示方法
`__repr__`, `__str__`, `__format__`, `__hash__`, `__bool__`和`__bytes__`依次控制了`repr(object)`, `str(object)`, `hash(object)`, `format(object)`, `bool(object)`和`bytes(object)`的行为。

例如：
```python
>>> class Vector:
...     def __init__(self, *data):
...       self.data = data
...     def __repr__(self):
...       return 'vec(%s)' % (','.join(map(str,self.data)))
>>> v = Vector(1,2,3)
>>> print(v)
vec(1,2,3)

```
!!! caution "`__hash__`和`__eq__`的关联"
    如果一个类没有定义 `__eq__()` 方法那么它也不应该定义 `__hash__()` 操作；
    
    如果它定义了 `__eq__()` 但没有定义 `__hash__()`，则其实例将不可被用作可哈希多项集的条目。 
    
    如果一个类定义了可变对象并实现了 `__eq__()` 方法，则它不应该实现 `__hash__()`，因为 hashable 多项集的实现要求键的哈希值是不可变的（如果对象的哈希值发生改变，它将位于错误的哈希桶中）。

### 比较运算符
运算符号与方法名称的对应关系如下：

- `x<y` 调用 `x.__lt__(y)`
- `x<=y` 调用 `x.__le__(y)`
- `x==y` 调用 `x.__eq__(y)`
- `x!=y` 调用 `x.__ne__(y)`
- `x>y` 调用 `x.__gt__(y)`
- `x>=y` 调用 `x.__ge__(y)`

这些运算符一般需要返回`True` or `False`。

当然，也可以返回任意值。比如我就要定义`a < 2`是a的二进制值向左移2（这个操作的一般写法是`a << 2`），也不是不可以。

### 二元运算符
主要包括（`+, -, *, @, /, //, %, divmod(), pow(), **, <<, >>, &, ^, |`）。

对应英文简写（`add, sub, mul, matmul, truediv, floordiv, mod, divmod, pow, lshift, rshift, and, xor, or`）。


例如`a + b`会（默认）调用运算符`a.__add__(b)`，如果`a`没有实现这个方法并且a和b不是同一个类，那么就会调用b的反射（reverse）的运算符`b.__radd__(a)`，如果这个方法也没实现就会抛出错误。

此外还有一些加强（implemented）运算符（`+=, -=, *=, @=, /=, //=, %=, **=, <<=, >>=, &=, ^=, |=`）。

例如`a += b`等价于`a = a.__iadd__(b)`，如果没实现`__iadd__`就会调用`a.__add__(b)`。

### 一元运算符
运算符号与方法名称的对应关系如下：

- `-a` 调用 `a.__neg__()`
- `+a` 调用 `a.__pos__()`
- `abs(a)` 调用 `a.__abs__()`
- `~a` 调用 `a.__invert__()`

### 数值转换

- `float(a)` 调用 `a.__float__()`
- `complex(a)` 调用 `a.__complex__()`
- `int(a)` 调用 `a.__int__()`
- `round(a)` 调用 `a.__round__()`
- `math.trunc(a)` 调用 `a.__trunc__()`
- `math.floor(a)` 调用 `a.__floor__()`
- `math.ceil(a)` 调用 `a.__ceil__()`
- `operator.index(a)` 调用 `a.__index__()`

### 实例属性访问控制
`__getattribute__`和`__getattr__`, `__setattr__`, `__delattr__`, `__dir__`这几个方法可以控制实例属性被访问时的行为。

其中`__getattribute__`和`__getattr__`这两个魔术方法的取名非常迷惑。

- 只要我们尝试访问一个类实例的属性，就会触发`__getattribute__`方法。
    - 特别注意，我们在写类定义的时候`self.xxx`也是会触发`__getattribute__`的，所以需要特别避免递归调用。
- 只有我们尝试一个**不存在的**类实例的属性，才会触发`__getattr__`方法。

例如我们想让这个类被访问到不存在属性的时候返回`None`，就可以：
```python
class A:
    
    def __init__(self, x):
        self.x = x
    
    def __getattribute__(self, name):
        return super().__getattribute__(name)
        
    def __getattr__(self, name):
        return None

a = A(1)
print(a.x) # print 1
print(a.data) # print None
```

当我们给实例的属性赋值时会触发`__setattr__`，例如`a.data = 1`（同样的在定义类的时候, `self.data=1`也是会触发这个方法的，需要注意避免循环调用）

当我们删除实例的属性时会触发`__delattr__`，例如`del a.data`。

`__dir__`方法控制了`dir(object)`的行为，Python要求这个函数必须返回一个序列（例如列表）。

### 迭代器
> 一个典型的例子就是python内置的`range`类

定义了`__next__`的是一个迭代器，定义了`__iter__`的是一个可迭代对象。

实现`__reversed__`这个方法可以让对象支持`reversed()`内置函数，这个方法应当返回一个逆序迭代器。

使用`iter(iterable_object)`可以返回一个迭代器。

使用`for`语句可以遍历一个可迭代对象（实际上会创建一个迭代器），每一次迭代实际上就是通过`.__next__()`获取迭代器中的下一个值。

例如一个整数迭代器：
```python
class Range:
    """Range(n) is a iterator from 1 to n"""
    def __init__(self, n) -> None:
        self.max = n
        self.now = 0
        self.inc = 1 # 增量，顺序为1，逆序为-1
    
    def __next__(self):
        while self.now != self.max:
            self.now += self.inc
            return self.now
        else:
            raise StopIteration

    def __iter__(self):
        # 顺序迭代
        return self
    
    def __reversed__(self):
        # 逆序迭代
        self.inc = -1
        self.max, self.now = self.now+1, self.max+1
        return self

for i in Range(3): 
    # 输出 1 2 3
    print(i)

for j in reversed(Range(3)):
    # 输出 3 2 1
    print(j)
```

### 描述器
实现了`__get__`, `__set__`和`__delete__`三个方法中的任意一个的对象称为描述器。他的主要作用是充当另外一个拥有者类的一个可变属性。

例如：
```python
import os

class DirectorySize:
    """描述器"""
    def __get__(self, obj, objtype=None):
        return len(os.listdir(obj.dirname))

class Directory:
    size = DirectorySize() # Descriptor instance           
    def __init__(self, dirname):
        self.dirname = dirname  # Regular instance attribute
```

这个例子中，`Directory.size`就是一个根据`dirname`来动态变化的属性。

更多描述器的使用指南[参见官网](https://docs.python.org/zh-cn/3/howto/descriptor.html)。
### 容器
> 一个典型的例子就是python内置的字典

- `__len__`定义了`len(object)`的行为，通常我们会返回容器的大小。
- `__length_hint__`，定义了一个长度的估计值，实现这个估计的方法可以提高性能。
- `__getitem__`定义了`[key]`这一取值操作符的行为。
- `__setitem__`则定义了对象在等号左侧时`object[key] = `的赋值行为。
- `__delitem__`定义了`del object[key]`这样删除内容的行为。
- `__missing__`定义了找不到`key`时候的行为。
- `__iter__`和`__reversed__`分别定义了顺序迭代和逆序迭代的行为。
- `__contains__`定义了成员检测操作符`in`的行为。

!!! info "切片的行为"
    实际上切片的行为也是通过`__getitem__`、`__setitem__`和`__delitem__`这三个方法定义的。

    以下形式的调用
    ```python
    a[1:2] = b
    ```
    会被解释器为转写为
    ```python
    a[slice(1, 2, None)] = b
    ```
    只要在这三个魔法方法里实现对`slice`参数对支持就行了。

    特别的，`...`在python中和`Ellipsis`是完全相同的，要在切片中定义这个参数的行为就需要特别判断一下。

!!! example "pandas.DataFrame的花式索引"
    如果你用过pandas那么一定会感叹于各种花式索引的便利。

    你可以使用以下的索引方式：
    ```python
    df[key]

    df.loc[key, ...]

    df.iloc[key, ...]
    ```

    传入的参数也是很多样的。

    读者可以自行思考这些索引的实现方式。

其他形式以此类推。略去的切片项总是以 None 补全。
### 上下文管理器
> 一个典型的例子是python的`open`函数

定义了`__enter__(self)`和`__exit__(self, exc_type, exc_value, traceback)`的类是一个上下文管理器，可以在`with`语句中使用。

```python
with ContextManager() as c:
    # with 语句会首先调用__enter__，把返回值赋值给as后的变量
    pass
# 语句结束后运行__exit__
# 如果没有异常，三个参数都是None
```

### 可调用对象
> 很多python的内置数据类型都实现了这个方法，例如`list`再如`dict`，他们都可以当成一个函数来使用。

`__call__`定义了对象被调用时的行为：`object(args, ...)`。

例如：
```python
class Hello:
    def __init__(self, name) -> None:
        self.name = name

    def __call__(self):
        print(f'Hello {self.name}.')

h = Hello('python')
h() # print Hello python.
```

另外值得一提的是，既然类可以实现`__call__`从而变成`callable`对象，那么它自然可以作为一个装饰器，这就是类装饰器。

例如：
```python
class entryExit(object):
    def __init__(self, f):
        self.f = f
    def __call__(self):
        print("Entering", self.f.__name__)
        self.f()
        print("Exited", self.f.__name__)

@entryExit
def func():
    print("inside func()")

func()
```
这个函数调用会输出：
```
Entering func
inside func()
Exited func
```

具体的原理读者可以回想我们对`@`语法糖的解释。

### 协程行为
> 这部分比较专业，异步编程常用于网络通信工程，我只在写爬虫的时候偶尔能用上。

实现了`__await__`的对象是可等待（awatiable）对象。

> 使用`async def`定义的异步函数必须返回一个可等待对象。

`__aiter__`和`__anext__`定义了异步迭代器的行为。例如：
```python
class Reader:
    async def readline(self):
        ...

    def __aiter__(self):
        return self

    async def __anext__(self):
        val = await self.readline()
        if val == b'':
            raise StopAsyncIteration
        return val
```

`__aenter__`和`__aexit__`定义了异步上下文管理器的行为。例如：
```python
class AsyncContextManager:
    async def __aenter__(self):
        await log('entering context')

    async def __aexit__(self, exc_type, exc, tb):
        await log('exiting context')
```

### 泛型（generic type）
> PEP 484 – Type Hints提出了Python的类型提示。

有这样一种写法你肯的见过：`l: list[int] = [1,2,3]`。

这行代码的type hint用到了`list[int]`，它的实现方式是`__class_getitem__`方法，这个方法应当返回一个 `GenericAlias` 对象。当在类上定义时，`__class_getitem__` 会自动成为类方法。 因此，当它被定义时没有必要使用 `@classmethod` 来装饰。

这个设计的目的就是允许标准库泛型类的运行时形参化以更方便地对这些类应用类型提示。

## 控制类的创建
我们说Python万物皆对象，实际上类是元类的对象。

默认情况下，类是使用元类`type()`来构建的，它的`__class__`是`type`。

例如：
```python
class A:
    pass
```
实际上和
```python
A = type("A", (), {})
```
是等价的。

当一个类定义（`class`语块）被执行时，将发生以下步骤:

1. 调用基类的`__mro_entries__`方法，解析 MRO 条目；
2. 确定适当的元类；
    - 如果没有基类且没有显式指定元类，则使用 `type()`；
    - 如果给出一个显式元类而且 不是 `type()` 的实例，则其会被直接用作元类；
    - 如果给出一个 `type()` 的实例作为显式元类，或是定义了基类，则使用最近派生的元类。
3. 调用元类的`__prepare__`方法，准备类命名空间；
4. 执行类定义的主体（类似于`exec`类定义的所有代码）；
5. 调用元类的`__new__`方法，创建类对象。

### 父类
当一个类继承另一个类时，会在这个父类上调用 `__init_subclass__()`。 这样，就使得编写改变子类行为的类成为可能。

例如：
```python
class Philosopher:
    def __init_subclass__(cls, /, default_name, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.default_name = default_name

class AustralianPhilosopher(Philosopher, default_name="Bruce"):
    pass
```
### 元类
元类可以实现的自定义行为就更多了。

例如我们开头提到的，要求所有的方法命名都必须用小写字母:
```python
class Meta(type):
    def __new__(cls, name, bases, dict):
        flag = all(name==name.lower() for name in dict)
        assert flag, "CapitalName"
        return type.__new__(cls, name, bases, dict)

    def __init__(self, name, bases, dict):
        return type.__init__(self, name, bases, dict)
    
    def __call__(cls, *args, **kwds):
        print("meta_called")
        return type.__call__(cls, *args, **kwds)
```
如果我们这样定义一个类：
```python
class MyClass(metaclass=Meta):
    
    def Apple(self):
        pass
```
就会触发错误：
```python
Traceback (most recent call last):
  File "/Users/yang/Desktop/example.py", line 12, in <module>
    class MyClass(metaclass=Meta):
  File "/Users/yang/Desktop/example.py", line 3, in __new__
    assert all(name==name.lower() for name in dict), "CapitalName"
AssertionError: CapitalName
```

把方法改成小写就可以正常定义了：
```python
class MyClass(metaclass=Meta):
    
    def apple(self):
        pass

    def __call__(cls):
        print("subclass_called")
        pass

obj = MyClass()

obj() 
# print meta_called then print subclass_called
```

指的注意的是，元类的`__call__`是在`MyClass`的对象被调用时才运行（如果子类也有`__call__`那么会先调用元类，在调用子类）。

这个时候`MyClass.__class__`是`<class '__main__.Meta'>`，不再是常见的`<class 'type'>`。

这也佐证了我们对类的叙述：类是元类的对象。


## 写在最后

Python语法的介绍到此为止了。后面会介绍各种库（标准库和第三方库）的使用，以及一些具体的实战案例。

我在本系列教程的第一篇文章说：Python是少儿编程的摇篮，我上二年级的小侄子都可以学会。

好吧，我承认Python的语法如此庞杂，小侄子估计不太能搞定，大概只能入个门。

奉劝各位读者莫要过分纠结这些fancy的语法，记住：你不会的语法全都对你没用，如果你哪天需要用了，自然就学会了。

编程领域不适用"书到用时方恨少"，学得越多忘得越快，天天用的才是真的学到手的。

此致。