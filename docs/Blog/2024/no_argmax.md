---
tags:
- blog
include:
- math
---

# 不要使用argmax

淦！

## 一般情况

众所周知，`pytorch`中可以对`requires_grad==True`的tensor进行梯度追踪：

```python
import torch
t = torch.rand((2,2), requires_grad=True)
s = t.sum()
s.backward()
print(t.grad) # [[1,1], [1,1]]
```

上面的代码可以计算函数
$$
s(t) = t_{11}+t_{12}+t_{21}+t_{22}
$$
的导数是：
$$
\begin{pmatrix}
1&1\\\\
1&1
\end{pmatrix}
$$

## argmax

然而，当我们使用了`argmax`这样的**不可导函数**后，`requires_grad`会被**不加提示地**修改为`False`：

```python
import torch
t = torch.rand((2,2), requires_grad=True)
arg_max = t.argmax()
print(arg_max.requires_grad) # False
```

在这之后，梯度就不再被追踪了。

!!! question "这不应该给个Warning？"
    按我的理解，既然我设置了`requires_grad=True`，就说明我是想要计算梯度的。这时候我调用`tensor.argmax`这样的不可导函数，是一个不合理的行为，完全可以给一个Warning。除非我先不追踪梯度`tensor.detach`，再调用。

如果只是这样还好，毕竟后续调用`backward`就会抛出错误：
```python
import torch
t = torch.rand((2,2), requires_grad=True)
arg_max = t.argmax()
try:
    arg_max.backward()
except Exception as e:
    print(e) 
    # element 0 of tensors 
    # does not require grad and 
    # does not have a grad_fn
```

## 鱼目混珠
关键是，当我们有很多个函数加起来的时候，torch也不会给任何梯度追踪的提示：

```python
import torch
t = torch.rand((2,2), requires_grad=True)
arg_max = t.argmax()
s = t.sum()
total = s + arg_max
total.backward()
print(t.grad) # [[1,1], [1,1]]
```

这段代码可以完全正常运行，这就把我坑惨了。

## 柔软一点
作为替代，我们可以使用`softmax`（全称`softargmax`）。Soft的地方就在于，它是光滑可导的函数。

!!! caution "Misleading"
    softmax不是**max**函数的逼近，而是**argmax**的逼近。
    > FYI：LogSumExp是max函数的一个常用逼近

    这个逼近理解方式是：

    对于
    $$
    x = (1,5,2,7,1)
    $$
    我们有
    $$
    \text{argmax}(x) = (0,0,0,1,0)
    $$
    以及一个光滑逼近
    $$
    \text{softmax}(x)=(0.0022, 0.1180, 0.0059, 0.8718, 0.0022)
    $$