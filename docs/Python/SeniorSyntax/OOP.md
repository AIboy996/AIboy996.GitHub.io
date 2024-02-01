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

下面我们来逐一介绍。

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
`__repr__`, `__str__`, `__format__`, `__hash__`, `__bool__`和`__bytes__`。

依次控制`repr(object)`, `str(object)`, `hash(object)`, `format(object)`, `bool(object)`和`bytes(object)`的行为。

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

### 重载运算符
运算符号与方法名称的对应关系如下：

- `x<y` 调用 `x.__lt__(y)`
- `x<=y` 调用 `x.__le__(y)`
- `x==y` 调用 `x.__eq__(y)`
- `x!=y` 调用 `x.__ne__(y)`
- `x>y` 调用 `x.__gt__(y)`
- `x>=y` 调用 `x.__ge__(y)`

这些运算符一般需要返回`True` or `False`。

### 数字类型
`__add__`

### 访问控制
`__getattr__`

### 模式匹配
`__match_args__`

### 迭代器
`__iter__`和`__next__`

### 描述器
`__get__`, `__set__`和`__delete__`

### 容器
`__getitem__`

### 上下文管理器
`__enter__`和`__exit__`

### 协程行为
`__await__`

`__aiter__`

`__anext__`

`__aenter__`

`__aexit__`

### 类方法装饰器
`@staticmethod`

`@classmethod`

`@abstractmethod`
## 元类
我们说Python万物皆对象，自然类本身也是一个对象。默认情况下，类是使用`type()`来构建的，它的`__class__`是`type`。

当一个类定义（`class`语块）被执行时，将发生以下步骤:

- 解析 MRO 条目；
- 确定适当的元类；
- 准备类命名空间；
- 执行类主体；
- 创建类对象。



TBC:Python OOP