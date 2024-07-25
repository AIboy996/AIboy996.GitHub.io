---
tags:
- PyLib
---

# doctest

所谓的doctest是一种简易的代码测试，例如：

```python hl_lines="4-7" title="add.py"
def add(x, y):
    """
    Return addition of input: x and y
    >>> add(1, 2)
    3
    >>> add(-1, 5)
    4
    """
    return x + y
```

上述代码中高亮的四行就是一些测试案例，它指明了函数正确的行为。

这些测试案例不仅仅有助于阅读代码的人更好地理解函数的行为，我们还可以通过`doctest`来检验函数是否被正确实现。**所以请多写注释！**

## `python -m doctest`
运行doctest最简单的方式是，我们可以在`.py`文件的外部通过`python -m doctest add.py`来把doctest作为一个脚本运行。

<div class='console'>

```console
$ python -m doctest -v add.py
Trying:
    add(1, 2)
Expecting:
    3
ok
Trying:
    add(-1, 5)
Expecting:
    4
ok
1 items had no tests:
    add
1 items passed all tests:
   2 tests in add.add
2 tests in 2 items.
2 passed and 0 failed.
Test passed.

```

</div>

## `doctest.testmod()`
我们也可以修改`add.py`的文件内容，使得每次它作为主脚本被运行的时候都进行doctest。

```python title="add.py" hl_lines="11-13"
def add(x, y):
    """
    Return addition of input: x and y
    >>> add(1, 2)
    3
    >>> add(-1, 5)
    4
    """
    return x + y

if __name__ == "__main__":
    import doctest
    doctest.testmod(verbose=True)

```

<div class='console'>

```console
$ python add.py
Trying:
    add(1, 2)
Expecting:
    3
ok
Trying:
    add(-1, 5)
Expecting:
    4
ok
1 items had no tests:
    __main__
1 items passed all tests:
   2 tests in __main__.add
2 tests in 2 items.
2 passed and 0 failed.
Test passed.

```

</div>

## 面向对象编程

当然，我们的doctest也可以在其他的`__doc__`（也就是三引号注释）中使用，包括类的注释、类中方法的注释。

```python title="Operator.py"
class Meta(type):
    def __new__(cls, name, bases, dict):
        dict["implemented_methods"] = [
            name for name in dict if not name.startswith("_")
        ]
        return type.__new__(cls, name, bases, dict)


class Operator(metaclass=Meta):
    """
    >>> Operator.implemented_methods
    ['add', 'sub']
    """

    @staticmethod
    def add(x, y):
        """
        Return addition of input: x and y
        >>> Operator.add(1,2)
        3
        """
        return x + y

    @staticmethod
    def sub(x, y):
        """
        Return subtraction of input: x and y
        >>> Operator.sub(1,2)
        -1
        """
        return x - y

```

<div class='console'>

```console
$ python -m doctest -v Operator.py
Trying:
    Operator.implemented_methods
Expecting:
    ['add', 'sub']
ok
Trying:
    Operator.add(1,2)
Expecting:
    3
ok
Trying:
    Operator.sub(1,2)
Expecting:
    -1
ok
3 items had no tests:
    add
    add.Meta
    add.Meta.__new__
3 items passed all tests:
   1 tests in add.Operator
   1 tests in add.Operator.add
   1 tests in add.Operator.sub
3 tests in 6 items.
3 passed and 0 failed.
Test passed.

```

</div>