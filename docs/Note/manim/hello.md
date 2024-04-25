---
tags:
- manim
---

# 初见manim

## 配置环境
TBD:manim 环境配置
## hello world!

```python
from manimlib import *

class SquareToCircle(Scene):
    def construct(self):
        circle = Circle()
        circle.set_fill(BLUE, opacity=0.5)
        circle.set_stroke(BLUE_E, width=4)
        square = Square()

        self.play(ShowCreation(square))
        self.wait()
        self.play(ReplacementTransform(square, circle))
        self.wait()
```

渲染结果：

![type:video](./assets/SquareToCircle.mp4)