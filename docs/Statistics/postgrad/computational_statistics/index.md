---
tags:
- Statistics
---

# 统计计算
> 24Fall DATA630014，统计计算概论，周渊

这门课虽然叫统计计算，但实际上的内容主要是统计视角下的传统机器学习方法（Machine Learning: A Probabilistic Perspective）。和本科时候我选修的[统计计算](../../elective/Computational_Statistics)有很大区别，那门课主要聚焦在计算，涉及了较多的最优化、数值计算内容。

课程主要从两个方面展开：

其一是建模方法，针对不同类别的数据（图片、文本、时间序列、图等），我们需要建立不同的模型（线性模型、HMM、状态空间模型、MRF、Boltzmann机等）。

其二是模型推断方法，因为很多时候我们的模型过于复杂，往往无法直接给出MLE等优良的估计，需要使用近似算法（EM、MCMC、Variational Inference）。

## 主要内容

- Bayesian Statistics
    - Prior
    - LGS
    - Exp family
    - Model Selection
    - BIC
    - Bayesian Linear Regression
    - Bayesian Logistic Regression
- Graph Theroy
    - Directed Graphical Models
        - d-separation
        - Mixture Models
        - EM Algorithm
    - Undirected Graphical Models
        - MRF
        - MRF Learning
- Gaussian Process
    - Kernels
    - Conditional of a Gaussian
    - Gaussian Process
- Markov Process
    - Markov Models
    - Hidden Markov Models
    - HMM Learning
- State Space Models
    - Kalman Filtering
    - Kalman Smoothing
- [Varitional Inference](./varitional_inference)
    - Mean-field Method
    - Expectation Propagation
- Sampling
    - Sampling From Gaussian
    - Rejection Sampling
    - Importance Sampling
    - [MCMC](./mcmc)
        - Gibbs Sampling
        - Collapsed Gibbs Sampling
        - Metropolis Hastings Algorithm
        - Haliltonian Dynamics
        - Thompson Sampling
        - Bayesian Optimization

## 参考书

MLAPP(*Machine Learning: A Probabilistic Perspective*) by Kevin P. Murphy

## 体会
内容全面，听起来很爽的课。难度较大，推导需要一些的数学技巧。

如果周老师讲话能更有力量一点就好了，他的low voice真的有些催眠😭