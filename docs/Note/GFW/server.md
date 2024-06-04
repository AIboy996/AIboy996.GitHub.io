---
tags: 
  - VPN
  - 折腾
  - 计算机网络
---

# 搭建一个代理服务器

!!! cite "Trojan-Go Official"
    Trojan-Go是使用Go语言实现的完整的Trojan代理，和Trojan协议以及原版的配置文件格式兼容。支持并且兼容Trojan-GFW版本的绝大多数功能，并扩展了更多的实用功能。

    Trojan-Go的的首要目标是保障传输安全性和隐蔽性。在此前提下，尽可能提升传输性能和易用性。

由于Shadowsocks比较旧了，还很容易被监测到。VMess又比较复杂。我这里就搞一个[trojan-go](https://p4gefau1t.github.io/trojan-go/)服务器。

并且，**违法乱纪的事情咱不干**。这个服务器就搭建在我宿舍的电脑上，用处是方便我在外面访问宿舍的局域网设备。折腾的过程纯粹是为了加深对计算机网络的理解。

## 安装trojan-go

TBC: trojan-go