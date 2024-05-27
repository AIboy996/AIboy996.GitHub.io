---
tags:
- PyLib
- pandas
hide:
- tags
---

# pandas

## 简介

!!! cite "official intro"
    pandas is a fast, powerful, flexible and easy to use open source data analysis and manipulation tool, built on top of the Python programming language.

pandas是用于（表格）数据操作、分析的开源Python库，它的关键词是：

- 表格数据：行列有致的数据。pandas并不擅长处理字典类型的数据，例如json数据。
- 快：但也不是快的无可匹敌。根据我的经验，微软的Excel是有一些黑魔法在的。
- 强大：可以把表格玩出花来。可以操作超大规模的表格数据。
- 灵活：写法灵活多样，诸多api殊途同归。
- 易用：代码简洁高效，深得Python真传。

## 两个主要的数据类型
作为一个数据分析库，pandas最核心的部分自然就是它的数据结构。

### pandas.DataFrame
在pandas中一张表格就是一个DataFrame。如果你熟悉R语言，就会知道R语言中也有一个dataframe，实际上他们有很多相似之处。

??? chatgpt-summary "Ask GPT: R语言的dataframe和pandas的dataframe有何异同？"
    R语言的DataFrame和Python中Pandas库的DataFrame都是用于数据处理和分析的强大工具。尽管它们在概念和用途上有许多相似之处，但在具体实现和功能上也有一些显著的不同。以下是它们的主要异同点：

    #### 相似之处

    1. **基本用途**：
        - 都用于存储和操作表格数据，类似于数据库中的表格或Excel中的工作表。
        - 都支持多种数据类型（数值、字符、因子、布尔等）在不同列中。

    2. **操作方法**：
        - 都支持数据的增删改查、数据筛选、分组聚合、合并连接等操作。
        - 都提供了丰富的内置函数和方法用于数据分析和处理。

    3. **索引和切片**：
        - 都支持通过行、列索引进行数据访问和切片操作。
        - 都提供了基于条件的筛选功能。

    #### 不同之处

    1. **创建方式**：
        - **R的DataFrame**：可以通过`data.frame()`函数创建。
            ```R
            df <- data.frame(
            col1 = c(1, 2, 3),
            col2 = c("A", "B", "C")
            )
            ```
        - **Pandas的DataFrame**：可以通过`pandas.DataFrame()`创建。
            ```python
            import pandas as pd
            df = pd.DataFrame({
            'col1': [1, 2, 3],
            'col2': ['A', 'B', 'C']
            })
            ```

    2. **索引机制**：
        - **R的DataFrame**：行名和列名是DataFrame的一部分，可以通过名称或位置访问。
            ```R
            df[1, "col1"]  # 访问第一行的col1列
            ```
        - **Pandas的DataFrame**：有两个索引层次：行索引（可以是默认的整数索引或自定义的索引）和列索引。
            ```python
            df.loc[0, 'col1']  # 访问第一行的col1列
            ```

    3. **列的处理**：
        - **R的DataFrame**：列可以是不同的数据类型，包括因子（factor），这是R中特有的数据类型。
            ```R
            df$col2 <- factor(df$col2)
            ```
        - **Pandas的DataFrame**：所有列都是`pandas.Series`对象，可以是不同的数据类型，但没有因子（factor）的概念。
            ```python
            df['col2'] = df['col2'].astype('category')
            ```

    4. **缺失值处理**：
        - **R的DataFrame**：缺失值用`NA`表示，有专门的函数如`is.na()`来处理缺失值。
            ```R
            df[is.na(df)] <- 0  # 将缺失值替换为0
            ```
        - **Pandas的DataFrame**：缺失值用`NaN`表示，有专门的方法如`isna()`和`fillna()`来处理缺失值。
            ```python
            df.fillna(0, inplace=True)  # 将缺失值替换为0
            ```

    5. **内置函数**：
        - **R的DataFrame**：有许多内置函数用于数据分析和处理，如`summary()`、`aggregate()`等。
            ```R
            summary(df)
            ```
        - **Pandas的DataFrame**：提供了类似的功能，但方法名称和用法不同，如`describe()`、`groupby()`等。
            ```python
            df.describe()
            ```

    6. **速度和效率**：
        - **R的DataFrame**：在处理较大数据集时可能较慢，但可以通过`data.table`包获得更高的性能。
        - **Pandas的DataFrame**：通常比R的DataFrame更高效，特别是使用底层的NumPy库进行数值计算时。

    #### 示例对比

    #### 数据筛选和操作

    **R语言的DataFrame**：
    ```R
    # 筛选 col1 > 1 的行
    df_filtered <- df[df$col1 > 1, ]
    ```

    **Pandas的DataFrame**：
    ```python
    # 筛选 col1 > 1 的行
    df_filtered = df[df['col1'] > 1]
    ```

    #### 分组聚合

    **R语言的DataFrame**：
    ```R
    # 按 col2 分组并求 col1 的平均值
    aggregate(col1 ~ col2, data = df, FUN = mean)
    ```

    **Pandas的DataFrame**：
    ```python
    # 按 col2 分组并求 col1 的平均值
    df.groupby('col2')['col1'].mean()
    ```

    综上所述，尽管R语言的DataFrame和Pandas的DataFrame在概念上非常相似，并且提供了许多相同的数据操作功能，但它们在实现方式、函数命名和用法上存在一些差异。根据具体的需求和熟悉的编程语言选择合适的工具进行数据处理和分析。

AI说的总体没啥问题，但我感觉它列举的不同之处都很牵强，除了处理速度的差异其他基本都是不那么本质的区别，api的设计差异难免存在。按照我的理解，R语言的dataframe和pandas的dataframe几乎是完全相同的，都非常好用！

### pandas.Series
在pandas中表格的每一行都是一个Series，每一列也是一个Series。

## 通用函数

有了好用的数据结构，下面就需要一系列的函数来操作、处理这些数据了。pandas提供了一系列的api，主要有三类：

### 数据操作（Data Manipulation）
> 依赖于numpy，pandas提供了高效的数据操作api。

单个数据表格的展示、分组、重整、排序、增删改查，索引、切片等等。以及多个数据表格的合并、交叉查询等。支持各类表格数据（`.xlsx`、`.csv`、`.xml`等等）的IO。

### 数据规约（Data Reduction）
数据透视表、各种统计量计算等，提供浓缩的信息、便于洞悉数据中的规律。

### 作图（Plotting）
> 依赖于matplotlib，pandas提供了简单易用的作图api。

常见的统计图像都可以很简单地做出来，包括但不限于：

- 直方图
- 饼图
- 折线图
- 散点图
- 盒子图


此外，针对一些有特殊性质特殊的数据，pandas还提供了特殊的支持。例如时间序列、稀疏数据等。