---
tags:
- python进阶
---

# 面向对象编程
虽然函数式编程也很好玩，但是我认为python最丰富、可玩性最高的还是OOP（面向对象编程，Object Oriented Programming）。
## 属性
> 属性就是类命名空间中的变量

我们首先定义这样一个类：
```python
>>> class Example:
...     class_attribute = '类属性'
...     __private = '私有属性'
...     _private = '惯用私有属性'
...     def __init__(self):
...         self.class_attribute_in_method = '方法内赋值的类属性'
...     @property
...     def property_attribute(self):
...         return 'property装饰的类属性'
```
先看看里面都有啥：
```python
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
  'class_attribute_in_method', 'property_attribute']
>>> e.__dict__
{'class_attribute_in_method': '方法内赋值的类属性'}
```
可以发现，`e.__dir__()`可以查到所有的属性：

- `_Example__private`：（私有变量会被重命名）
- `_private`
- `class_attribute`
- `class_attribute_in_method`
- `property_attribute`

但是`e.__dict__`只能查到通过`self.`赋值的变量。
```python
>>> e.class_attribute
'类属性'
>>> try:
...     print(e.__private)
... except AttributeError as error:
...     print(error)
'Example' object has no attribute '__private'
>>> e.class_attribute_in_method
'方法内赋值的类属性'
>>> e.property_attribute
'property装饰的类属性'
>>> e._Example__private
'私有属性'
>>> e._private
'惯用私有属性'
```
## 方法
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
### 多态
多态也就是同一个接口在不同的类上表现出的行为不同。例如：
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
## 装饰器

## 描述器
