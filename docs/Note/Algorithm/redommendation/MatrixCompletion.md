---
tags:
- Alg
- Papers
- 推荐
- 召回
---

# 召回4：矩阵补充

## 离散特征处理

对于下面这些离散变量，我们需要把他们转换为数值向量方便后续的计算：

![IMAGE_1752402094986](assets/IMAGE_1752402094986.png)
这其实就是NLP中的embedding过程，步骤如下：

![IMAGE_1752402152558](assets/IMAGE_1752402152558.png)

### OneHot编码

例如性别：0,0 = 未知 0,1 = 男 1,0 = 女

显然OneHot会造成维度灾难，对于类别数量很大的变量不适合做OneHot编码。

### Embedding

例如国籍的Embedding：

![IMAGE_1752402327253](assets/IMAGE_1752402327253.png)
Embedding需要的参数量是：

![IMAGE_1752402388683](assets/IMAGE_1752402388683.png)
超大规模的模型参数基本都集中在这里，比如物品ID的embedding，维度非常高。

Embedding需要满足一些特征。比较直观的就是相似的物品之间的距离比较接近：

![IMAGE_1752402455481](assets/IMAGE_1752402455481.png)

## 矩阵补充模型

基于Embedding我们可以计算用户兴趣的估计：

![IMAGE_1752402640842](assets/IMAGE_1752402640842.png)
其实就是两个Embedding的内积。上面的过程就叫矩阵补充。

### 模型的训练

嵌入模型的参数就是俩大矩阵：

![IMAGE_1752402735097](assets/IMAGE_1752402735097.png)
训练的目标就是让我们的**Embedding内积接近用户对物品的真实兴趣**。

数据集可以取自系统的日志：

![IMAGE_1752402857663](assets/IMAGE_1752402857663.png)
损失函数就是数据集上的预测兴趣分数和真实兴趣分数的差距：

![IMAGE_1752402956573](assets/IMAGE_1752402956573.png)

### 矩阵补充的含义

![IMAGE_1752403011392](assets/IMAGE_1752403011392.png)

### 矩阵补充的问题

![IMAGE_1752403161463](assets/IMAGE_1752403161463.png)

![IMAGE_1752403168613](assets/IMAGE_1752403168613.png)

![IMAGE_1752403175662](assets/IMAGE_1752403175662.png)
正负样本选取的问题后续会专门讨论。

### 模型部署

![IMAGE_1752403266871](assets/IMAGE_1752403266871.png)

![IMAGE_1752403316629](assets/IMAGE_1752403316629.png)
加速KNN的方法（[向量数据库](https://en.wikipedia.org/wiki/Vector_database)？）：

![IMAGE_1752403387919](assets/IMAGE_1752403387919.png)
我们提前把数据库中的物品进行聚类，给每个分区一个索引（对于余弦相似度，分区就是扇形的；对于L2距离，分区就是正方形的？）。

那么在寻找a的近邻时，只需要在分区内查找就行了。

![IMAGE_1752403464415](assets/IMAGE_1752403464415.png)
