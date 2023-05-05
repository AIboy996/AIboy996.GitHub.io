---
tags:
- python进阶
---

# 面向对象编程
虽然函数式编程也很好玩，但是我认为python的正统还是OOP（面向对象编程，Object Oriented Programming）。
## 多态
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
## 属性

## 方法

## 装饰器

## 描述器
