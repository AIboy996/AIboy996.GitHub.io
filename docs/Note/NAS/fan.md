---
tags:
- NAS
- 折腾
- 飞牛
---

# 风扇速度调节

我的[铁威马F2-220](./index.md#40)性能很羸弱，却带了一个雷霆大风扇。而且默认情况下的转速非常高，很吵。所以我一直想找个办法调整一下。

恰好今天晚上失眠了，睡在卧室一直听到客厅的风扇在呜呜呜，非常烦躁。于是凌晨三四点爬起来捣鼓了一下。

## 添加风扇

直接和GPT几轮对话就搞定了：<https://chatgpt.com/share/6ac664c3-b294-83ed-a484-cfe47f31ff34>

核心的代码是：

```bash
sudo sensors-detect
# 发现了一个风扇
# Found `ITE IT8772E Super IO Sensors'
# Success!
# (address 0xa30, driver `it87')
```

然后就可以加载这个设备了：

```bash
sudo modprobe it87
```

## 风扇转速曲线

飞牛没有内嵌这个功能，不过社区有人写好了。用下面这个小插件就可以了：

<figure markdown>

[![guan-ry/FanControlServerApp - GitHub](https://gh-card.dev/repos/guan-ry/FanControlServerApp.svg?fullname=)](https://github.com/guan-ry/FanControlServerApp)

</figure>

可以按照CPU温度或者硬盘温度来设定风扇的转速曲线，很不错！
