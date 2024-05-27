---
tags:
- PyLib
- numpy
hide:
- tags
---

# numpy

## 简介
!!! cite "official intro"
    The fundamental package for scientific computing with Python

如其所言，NumPy（**Num**erical **Py**thon）是Python科学计算的基石。一个直观的例证是GitHub上有数以万计的包依赖numpy，有数以百万计的项目依赖numpy：

<figure markdown>

![](assets/2024-05-27-20-31-04.png){width=300}

</figure>

而numpy中最核心的数据结构就是`ndarray`数组，它有两个特点：

- Homogeneous：数组中所有的元素都必须是同种数据类型（例如`numpy.int32`）
- N-dimensional：numpy的数组本质上是多维的。

此外numpy还包含由此派生的`masked array`、`matrices`等数据结构。并且提供了高效操作这些数据结构的一系列通用函数。

如果你熟悉Python的标准库，就会知道Python也有一个`array`库提供了对数组的支持。它们有一些相似之处，但也有很多不同之处。以下是它们的主要异同点：

??? chatgpt-summary "Ask GPT: array 和 numpy.ndarray的异同"

    #### 相似之处

    1. **基本用途**：
        - 都用于存储数值类型的数据。
        - 都支持多维数组。

    2. **索引和切片**：
        - 都支持类似的索引和切片操作。

    #### 不同之处

    1. **功能和性能**：
        - `numpy`的`ndarray`提供了更多的功能和更高的性能。它支持广播、矢量化操作、多种数学函数、高效的线性代数运算、傅里叶变换等。
        - Python的`array`模块功能较为有限，主要用于存储一维数组，并且仅支持基本的数组操作。

    2. **数据类型**：
        - `numpy`的`ndarray`支持多种数据类型，包括整数、浮点数、复数、布尔值、字符串等，并且可以定义自定义的数据类型（结构化数组）。
        - Python的`array`模块仅支持基本的数值类型，如整型和浮点型。

    3. **多维支持**：
        - `numpy`的`ndarray`本质上是多维的，可以创建任意维度的数组。
        - Python的`array`模块主要支持一维数组，多维数组需要通过嵌套实现。

    4. **内存布局和效率**：
        - `numpy`的`ndarray`使用连续的内存块存储数据，效率高，适合大规模数据的操作。
        - Python的`array`模块在性能和内存效率上不如`numpy`，尤其是处理大规模数据时。

    5. **内置函数和操作**：
        - `numpy`提供了大量内置函数和方法来进行各种数组操作，例如求和、平均、矩阵运算、排序等。
        - Python的`array`模块提供的内置函数较少，功能较为单一。

    #### 示例对比

    #### 创建数组

    ```python
    import array
    import numpy as np

    # 使用 array 模块创建数组
    arr1 = array.array('i', [1, 2, 3, 4, 5])

    # 使用 numpy 模块创建数组
    arr2 = np.array([1, 2, 3, 4, 5])
    ```

    #### 基本操作

    ```python
    # array 模块
    arr1.append(6)
    print(arr1)  # array('i', [1, 2, 3, 4, 5, 6])

    # numpy 模块
    arr2 = np.append(arr2, 6)
    print(arr2)  # [1 2 3 4 5 6]
    ```

    #### 多维数组

    ```python
    # array 模块
    # 不直接支持，需要嵌套
    arr3 = array.array('i', [1, 2, 3])
    arr4 = array.array('i', [4, 5, 6])
    multi_dim_arr = [arr3, arr4]

    # numpy 模块
    multi_dim_arr_np = np.array([[1, 2, 3], [4, 5, 6]])
    ```

    综上所述，`numpy`的`ndarray`在功能、性能和灵活性方面都优于Python的`array`模块，因此在科学计算、数据分析和机器学习等领域得到了广泛应用。如果你的应用场景涉及到复杂的数组操作，建议使用`numpy`的`ndarray`。


## 天下武功，唯快不破

作为基石，numpy的强大之处在于它非常快。而快的秘诀在于：

- 向量化操作由预编译的C代码执行（这一点很好理解，C可以说是最快的代码了）
- 无处不在的广播机制（这一点我们后续会深入探讨）

