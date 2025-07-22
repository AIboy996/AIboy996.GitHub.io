---
tags:
- pytorch
- Papers
- DL
include:
- math
---

# 模型初始化

> [torch.nn.init](https://docs.pytorch.org/docs/stable/nn.init.html)

[神经网络模型的初始化](https://en.wikipedia.org/wiki/Weight_initialization)是一个很容易被忽视的过程。因为大多数时候pytorch自动处理了这部分内容。

我们知道，神经网络模型的参数都是一个个的tensor，它们的初始值会对模型的收敛情况有比较大的影响。合理的初始化能加速收敛、避免梯度消失或爆炸等问题。

## 常数初始化

- `nn.init.constant_`
- `nn.init.ones_`
- `nn.init.zeros_`

这几个方法可以把tensor用常数来初始化。例如初始化为全0:

```python
w = torch.empty(3, 5)
nn.init.zeros_(w)
```

!!! warning "全0初始化"
    一种简单粗暴的初始化方法是把所有的参数全都置零（或者某个常数）。

    这样做会带来比较严重的对称性问题。例如一个简单的MLP模型：
    $$
    y = \sigma(h), \quad h = Wx+b
    $$
    我们知道每一个隐藏层单元$h_i = W_ix + b = b$，其中$W_i$的更新完全取决于梯度$x$。不难发现，这样以来所有的$W_i$都会从0开始以同样的方式来更新，完全丧失了非对称性。

    换言之，$W$退化为了秩1的矩阵，模型会一直保持这样的病态。因此，为了避免这种情况通常我们会进行**随机初始化**。

    当然，对于权重参数$b$，全0初始化倒是可以。它的梯度本身就和$x$无关，主要取决于激活函数的性质。后续我们详细介绍它的初始化方法。

## 简单随机初始化

> 如果随机初始化之后的参数过小，可能出现梯度消失的情况。参数过大可能出现梯度爆炸的情况。

- `nn.init.uniform_`：均匀分布初始化，默认为$\mathcal{U}(0,1)$
- `nn.init.normal_`：正态分布初始化，默认为$\mathcal{N}(0,1)$
- `nn.init.trunc_normal_`：截断一下，否则有概率出现极端值

!!! warning "梯度还是爆炸"
    简单随机初始化固然简单，但是在梯度下降的过程中还是可能出现梯度消失/爆炸的问题。

    为此xavier初始化和kaiming初始化提出了一些解决方案。

## 特殊初始化

- `nn.init.eye_`：初始化一个2d tensor为单位阵
    - 主要用于Linear层
- `nn.init.dirac_`：Dirac delta函数初始化（中心为1，其余地方为0）
    - 输入tensor尺寸为{3,4,5}d
    - 主要用于Conv层的初始化，相当于卷积层的单位初始化
- `nn.init.sparse_`：初始化一个2d tensor为稀疏矩阵
    - 来自[Deep learning via Hessian-free optimization](http://www.cs.toronto.edu/~asamir/cifar/HFO_James.pdf) - Martens, J. (2010).
- `nn.init.orthogonal_`：初始化一个矩阵为（半）正交阵
    - 如果矩阵超过2d，会被flatten为2d再初始化
    - 来自[Exact solutions to the nonlinear dynamics of learning in deep linear neural networks](https://arxiv.org/abs/1312.6120) - Saxe, A. et al. (2013).

## xavier初始化

> 来自[Understanding the difficulty of training deep feedforward neural networks](http://proceedings.mlr.press/v9/glorot10a) - Glorot, X. & Bengio, Y. (2010).

### `nn.init.xavier_uniform_`

初始化为
$$
\mathcal{U}(-a,a)
$$
其中
$$
a = \mathrm{gain} \times \sqrt{\frac{6}{\mathrm{in}+\mathrm{out}}}
$$

这里面，gain和激活函数相关，xavier计算出的各类激活函数的gain如下：

- `linear/identity`: 1
- `conv{1,2,3}D`: 1
- `sigmoid`: 1
- `tanh`: 5/3
- `relu`: $\sqrt{2}$
- `leaky relu`: $\sqrt{2/(1+\mathrm{slope}^2)}$
- `selu`: 3/4

in和out则是输入输出的维度。使用这些参数主要是为了保持各个层的激活值、梯度的方差保持一致。减弱梯度消失和梯度爆炸的风险。

### `nn.init.xavier_normal_`
初始化为
$$
\mathcal{N}(0,\sigma^2)
$$
其中
$$
\sigma = \mathrm{gain} \times \sqrt{\frac{2}{\mathrm{in}+\mathrm{out}}}
$$

!!! warning "ReLU"
    xavier初始化主要用在sigmoid、tanh激活的神经网络，对使用relu激活的神经网络效果不佳，会大量出现神经元死亡的情况。

    因此kaiming提出了改进方法。

## kaiming初始化

> 来自[Delving deep into rectifiers: Surpassing human-level performance on ImageNet classification](http://openaccess.thecvf.com/content_iccv_2015/html/He_Delving_Deep_into_ICCV_2015_paper.html) - He, K. et al. (2015).


### `nn.init.kaiming_uniform_`

初始化为
$$
\mathcal{U}(-a,a)
$$
其中
$$
a = \mathrm{gain} \times \sqrt{\frac{3}{\mathrm{mode}}}
$$

这里的`mode`要么是输入维度，要么是输出维度。默认是输入维度，旨在保持前向传播的过程中权重的方差保持一致。

### `nn.init.kaiming_normal_`

初始化为
$$
\mathcal{N}(0,\sigma^2)
$$
其中
$$
\sigma = \mathrm{gain} \times \sqrt{\frac{1}{\mathrm{mode}}}
$$

