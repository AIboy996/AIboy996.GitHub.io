---
tags:
- python第三方库
- pytorch
---

# 张量基础

```python
import torch
import torch.nn.functional as F
# 4个通道上使用同样的全1的卷积核
custom_kernel = torch.ones(size=(4,1,11,50), dtype=torch.long)
raw_tensor = torch.randint(0,9,(16,4,360,50))
# 进行circular padding，在左右两侧各pad 5=(11-1)/2
tensor = F.pad(raw_tensor, (0,0,5,5), mode='circular')
# 滑动平均，每个窗口有550个像素点，out/550 就是滑动平均了
out = F.conv2d(tensor, custom_kernel, groups=4) # out.shape=(16,4,360,1)
# out每张图片的第6个像素就是对应原图的第一个窗口内像素的求和
assert out[0,0,5,0] == raw_tensor[0,0,:11,:].sum()
# out的第1个像素点就是pad完的第一个窗口内像素的求和
assert out[0,0,0,0] == tensor[0,0,:11,:].sum()
```