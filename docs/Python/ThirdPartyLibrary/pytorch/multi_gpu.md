---
tags:
- pytorch
---

# 多卡训练

> [torch.distributed](https://docs.pytorch.org/docs/stable/distributed.html)

It is recommended to use DistributedDataParallel, instead of DataParallel to do multi-GPU training, even if there is only a single node.

The difference between DistributedDataParallel and DataParallel is: DistributedDataParallel uses **multiprocessing** where a process is created for each GPU, while DataParallel uses **multithreading**. By using multiprocessing, each GPU has its dedicated process, this avoids the performance overhead caused by GIL of Python interpreter.

TBD:pytorch 多卡训练