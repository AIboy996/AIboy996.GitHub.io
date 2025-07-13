---
tags:
- Alg
- Papers
- 推荐
- 召回
---

# 召回2：Swing

ItemCF对于小圈子的用户群体可能存在误判相似度的问题:

![IMAGE_1752400768480](assets/IMAGE_1752400768480.png)
Swing模型通过用户加权的方法解决这个问题：

![IMAGE_1752400840478](assets/IMAGE_1752400840478.png)

## 召回方法

通过上述的权重，降低同一个圈子的人的权重。然后采用和ItemCF类似的相似度算法：

![IMAGE_1752400865660](assets/IMAGE_1752400865660.png)

## Swing和ItemCF的异同

![IMAGE_1752400973493](assets/IMAGE_1752400973493.png)
