---
tags:
- Alg
- Papers
- 推荐
- 召回
---

# 召回6：Deep Retrieval

来自[字节](https://arxiv.org/abs/2007.07203)，和向量召回不同，Deep Retrieval把物品映射为路径。

![IMAGE_1752407986202](assets/IMAGE_1752407986202.png)

![IMAGE_1752408028754](assets/IMAGE_1752408028754.png)

## 索引

![IMAGE_1752408099768](assets/IMAGE_1752408099768.png)

![IMAGE_1752408145271](assets/IMAGE_1752408145271.png)
一条路径对应多个物品，就作为线上召回的结果。

> 为什么要搞路径？因为这是字节的文章！**抖音的视频推荐**就是一条路径。

## 预估模型

假设路径长度是3

![IMAGE_1752408292047](assets/IMAGE_1752408292047.png)
等式右侧的三个条件概率都用神经网络来计算：

![IMAGE_1752408511742](assets/IMAGE_1752408511742.png)

## 线上召回

![IMAGE_1752408552176](assets/IMAGE_1752408552176.png)

![IMAGE_1752408589443](assets/IMAGE_1752408589443.png)

### beam search size=1

相当于贪心算法，每次都考虑最大的一个节点

![IMAGE_1752408700200](assets/IMAGE_1752408700200.png)

#### beam search size=4

![IMAGE_1752408843519](assets/IMAGE_1752408843519.png)

## 模型训练

![IMAGE_1752410102911](assets/IMAGE_1752410102911.png)

### 神经网络

![IMAGE_1752409010507](assets/IMAGE_1752409010507.png)

![IMAGE_1752409093492](assets/IMAGE_1752409093492.png)

### 物品表征

什么乱七八糟的：

![IMAGE_1752409156098](assets/IMAGE_1752409156098.png)

![IMAGE_1752409792339](assets/IMAGE_1752409792339.png)

![IMAGE_1752409903743](assets/IMAGE_1752409903743.png)
