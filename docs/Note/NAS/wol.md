---
tags:
- NAS
- 折腾
- 计算机网络
---

# Wake on LAN & WAN
> Wake-on-LAN (WoL or WOL) is an Ethernet or Token Ring computer networking standard that allows a computer to be turned on or awakened from sleep mode by a network message.

最近终于解决了宿舍电脑广域网远程开机（Wake on WAN）的问题，特地分享一下。

!!! warning "有问题就会有答案"
    果然，知乎的slogan再次应验。正确的步骤就在[华硕的官网](https://www.asus.com.cn/support/faq/1049115/)躺着，只是我之前没有看到。

    我之前一直少了一步**开启UEFI网络堆栈**的设置：

    - After entering the **Network Stack Configuration**, select [Network Stack]④ and set [Enabled]⑤.

    所以一直无法实现广域网开机，只能在局域网开机。

## 主机设置
> 以下图源[华硕的Note](https://www.asus.com/support/faq/1049115/)。

示例基于**Windows 10/11+华硕主板**。
### Step 1 关闭快速启动
![](/Blog/2024/assets/2024-04-27-13-03-08.png){width=500}
![](/Blog/2024/assets/2024-04-27-13-03-24.png){width=500}
![](/Blog/2024/assets/2024-04-27-13-03-32.png){width=500}
![](/Blog/2024/assets/2024-04-27-13-03-38.png){width=500}

### Step 2 允许网卡设备唤醒电脑
> 注意，这里华硕的示例选择了`Realtek Gaming 2.5GbE Family Controller`作为唤醒的设备，而我们一般选择`Intel(R) xxx`也就是板载网卡作为唤醒设备。

![](/Blog/2024/assets/2024-04-27-13-04-42.png){width=500}

> 注意，这里华硕的教程没有勾选：`Only allow magic packet to wake the computer`。而我们一般都是勾选的（这样我们要远程开机的时候就发送特定结构的magic packet），不然发送任何包都会唤醒电脑了。

![](/Blog/2024/assets/2024-04-27-13-04-48.png){width=500}

### Step 3 在Bios中允许WOL
![](/Blog/2024/assets/2024-04-27-13-05-30.png){width=500}
![](/Blog/2024/assets/2024-04-27-13-05-36.png){width=500}
![](/Blog/2024/assets/2024-04-27-13-05-43.png){width=500}
![](/Blog/2024/assets/2024-04-27-13-05-49.png){width=500}

> 图源知乎，如果你选了PCI-E设备来唤醒（例如板载网卡），那么`Power On By PCI-E`这个选项也需要打开。

![](/Blog/2024/assets/2024-04-27-13-07-26.png){width=500}
![](/Blog/2024/assets/2024-04-27-13-05-55.png){width=500}

## 路由设置
最后如果你想从广域网启动机器，就需要有**公网IP地址**（如果没有的话内网穿透也可以，需要的朋友自己Google一下）。在此基础之上，使用路由器做**端口转发**，把公网的自定义端口转发到机器即可。

例如小米的路由就在这个页面：

![](/Blog/2024/assets/2024-04-27-13-18-33.png){width=500}

WOL走的是UDP协议，一般我们把包发送到想开机那台机器的9端口即可。所以需要添加端口映射：

![](/Blog/2024/assets/2024-04-27-13-38-54.png){width=500}

> 当然，我们先要使用路由器的**DHCP静态分配**固定机器的局域网IP，不然这个转发就没意义了。

## 远程启动
万事俱备我们就可以远程启动了。

首先拿一个小本本把我们要WOL机器的网卡MAC地址抄下来，形如：
```
00:16:EA:AE:3C:40
```

### wakeonlan脚本
在电脑上我推荐使用[wakeonlan脚本](https://github.com/jpoliv/wakeonlan)，这是perl语言写的一个简单小脚本，还挺好用（但是不支持解析域名，必须使用IP来唤醒）。

用法如下，必须要传递的参数就是`hardware_address`，也就是网卡的MAC地址。
```bash
Usage:
    wakeonlan [-h|--help] [-v|--version] [-q|--quiet] [-n|--dry-run]
    [-i|--ip IP_address] [-p|--port port] [-f|--file file_name]
    [[hardware_address] ...]
```

### iOS应用推荐
手机上也有WOL的应用，我感觉这款[开源APP](https://github.com/tr1ckyf0x-studio/wakeonlan-ios)颜值很高：

<figure markdown>
![](/Blog/2024/assets/2024-04-27-13-32-48.png){width=500}
</figure>