---
tags:
- Statistics
---

# 统计推断
> 21Fall MANA130353，统计推断，刚博文

真正意义上的统计入门第一课。

## 主要内容

- 正态分布和三大抽样分布
- 次序统计量
- 指数族
- 充分统计量
- 完全统计量
- 点估计
    - 矩估计
    - MLE
    - UMVUE
    - Cramer-Rao不等式
- 参数假设检验
    - 正态总体参数的假设检验
    - 假设检验和区间估计
    - 似然比检验
    - Neyman-Pearson引理
    - UMPT
- 贝叶斯统计
    - 先验，共轭先验
    - 贝叶斯估计

## 参考书
韦来生的《数理统计》和George Casella的Stalistical Inference, 2nd ed.

中文书和英文书大部分内容基本完全相同（感觉就是对着翻译的），不过中文书把Bayes的内容收集起来单独做了一章，英文书则散落在各个章节。

## 体会
毫无疑问是一门重要的课，真正意义上的统计入门第一课。CR不等式、Neyman-Pearson引理都是很漂亮的结论。MLE、似然比检验也都是很通用的方法。贝叶斯估计更是思路清奇，可惜讲的不多。还依稀记得几个漂亮的结论：

- L2损失下的贝叶斯估计就是后验期望
- L1损失下的贝叶斯估计就是后验中位数