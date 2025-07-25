---
tags:
- Alg
- Papers
- 推荐
- 召回
---

# 召回5：双塔模型

双塔模型基本就是矩阵补充模型的升级版。

用户塔：

![IMAGE_1752403829170](assets/IMAGE_1752403829170.png)
物品塔和用户是类似的。

使用这两个塔来做召回就是双塔模型：

![IMAGE_1752403875022](assets/IMAGE_1752403875022.png)

## 模型训练方法

![IMAGE_1752403944695](assets/IMAGE_1752403944695.png)
其中正样本的选取比较简单，负样本的选取比较讲究，[论文](https://research.google/pubs/sampling-bias-corrected-neural-modeling-for-large-corpus-item-recommendations/)中详细介绍了。小红书的选取方法基本参考了YouTube的做法。

### pointwise训练

![IMAGE_1752404119172](assets/IMAGE_1752404119172.png)
样本量的比例是业内经验。那么到底是为什么呢？

### pairwise训练

![IMAGE_1752404201640](assets/IMAGE_1752404201640.png)
其中两个物品塔共享参数。

![IMAGE_1752404257812](assets/IMAGE_1752404257812.png)
其中的m是一个超参数，当然也可以用连续的损失函数：

![IMAGE_1752404305312](assets/IMAGE_1752404305312.png)

### listwise训练

对比学习？[MOCO](https://arxiv.org/abs/1911.05722)！

![IMAGE_1752404373084](assets/IMAGE_1752404373084.png)
> notation有小错误，问题不大。

![IMAGE_1752404453049](assets/IMAGE_1752404453049.png)

## 正负样本的选取

### 正样本

正样本的选取比较简单，不过要解决一下**二八定律**：

![IMAGE_1752404802867](assets/IMAGE_1752404802867.png)

### 负样本

在推荐系统的全链路中会有很多种负样本产生：

![IMAGE_1752404884162](assets/IMAGE_1752404884162.png)
一般训练过程中的负样本策略：

![IMAGE_1752405363265](assets/IMAGE_1752405363265.png)

#### 简单负样本

![IMAGE_1752404946401](assets/IMAGE_1752404946401.png)

![IMAGE_1752404993054](assets/IMAGE_1752404993054.png)

#### batch内负样本

甲之蜜糖乙之砒霜：

![IMAGE_1752405085826](assets/IMAGE_1752405085826.png)
存在的问题：

![IMAGE_1752405152834](assets/IMAGE_1752405152834.png)
如果这样做的话会把热门物品打压太狠（负样本的概率过大了）。文献里YouTube的算法很有效，在训练的时候修正一下就行了：

![IMAGE_1752405208856](assets/IMAGE_1752405208856.png)

#### 困难负样本

被召回了但是在排序中被淘汰。

![IMAGE_1752405313525](assets/IMAGE_1752405313525.png)

## 反面案例

### 错误的负样本策略

曝光但是没有点击的样本不能作为召回模型的负样本。

![IMAGE_1752405461132](assets/IMAGE_1752405461132.png)
给用户展示的所有笔记都是结果层层排序的，理论上已经非常接近用户的兴趣了。

**但是用户不可能每个点击，没有点击并非不感兴趣、而是对其他的物品更感兴趣，**这就是不能把曝光但是每点击的样本作为召回模型负样本的原因。

召回模型的重点在于**区分不感兴趣和感兴趣**，而不是**区分比较感兴趣和非常感兴趣**，后者是排序模型应该做的。

![IMAGE_1752405718574](assets/IMAGE_1752405718574.png)
> 当然，我们这里说的曝光未点击都是**推荐系统产出的物品**。如果是人为推送的物品（例如广告？）作为负样本可能就是比较有效的。

### 不适合召回的模型

![IMAGE_1752404598066](assets/IMAGE_1752404598066.png)
这里最大的问题就是把物品和用户的特征进行了concatenate，**前期就融合了特征**肯定就没法做召回了。反而这个模型更适合做排序。

## 线上召回

1、把所有物品经过物品塔**离线计算**的特征保存到**向量数据库**，建立索引

![IMAGE_1752405947091](assets/IMAGE_1752405947091.png)
2、用户发起推荐请求的时候，**线上计算**用户特征进行召回

![IMAGE_1752405988263](assets/IMAGE_1752405988263.png)
我们为什么不存储用户向量？

![IMAGE_1752406194527](assets/IMAGE_1752406194527.png)

## 模型更新

![IMAGE_1752406519213](assets/IMAGE_1752406519213.png)

### 全量更新
>
> 离线学习

![IMAGE_1752406294991](assets/IMAGE_1752406294991.png)

### 增量更新
>
> 在线学习

![IMAGE_1752406312280](assets/IMAGE_1752406312280.png)

### 全量+增量

主要是shuffle的问题：

![IMAGE_1752406621283](assets/IMAGE_1752406621283.png)

## 自监督学习

自监督学习是为了进一步提高**物品塔**的效果。算法来自[Google](https://arxiv.org/abs/2007.12865)，比较靠谱，很容易落地拿到收益：

![IMAGE_1752406881576](assets/IMAGE_1752406881576.png)

### 基本思想

![IMAGE_1752407801464](assets/IMAGE_1752407801464.png)
自监督consistency loss：

![IMAGE_1752407215016](assets/IMAGE_1752407215016.png)

### 数据增强

- random mask
- dropout
- complementary
- mask一组关联的特征【实现比较复杂】

![IMAGE_1752407272628](assets/IMAGE_1752407272628.png)

![IMAGE_1752407295483](assets/IMAGE_1752407295483.png)

![IMAGE_1752407363019](assets/IMAGE_1752407363019.png)

![IMAGE_1752407419261](assets/IMAGE_1752407419261.png)
用互信息作为特征之间的相似性度量：

![IMAGE_1752407479101](assets/IMAGE_1752407479101.png)

![IMAGE_1752407537446](assets/IMAGE_1752407537446.png)

![IMAGE_1752407551105](assets/IMAGE_1752407551105.png)

### 训练方法

![IMAGE_1752407602109](assets/IMAGE_1752407602109.png)

![IMAGE_1752407703799](assets/IMAGE_1752407703799.png)

![IMAGE_1752407886678](assets/IMAGE_1752407886678.png)
