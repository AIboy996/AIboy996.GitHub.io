---
tags:
- NAS
- 折腾
---

# NAS
> Network Attached Storage

我的NAS实际上就是我淘汰下来的Windows笔记本，续航血崩但是性能还行。刷一个Linux系统，外接俩机械硬盘，当NAS绰绰有余！之前玩过群晖的220j，那个ARM芯片真的性能捉急-_-

我是用的系统是Ubuntu，主面板是[CasaOS](https://casaos.io/)：

![](assets/2024-06-16-01-37-47.png)

起了几个Docker服务：

- ddns：做动态域名-ip映射
- overleaf：写latex用的
- n8n：自动化
- plex：媒体服务器
- qbitorrent：下载器
- transmission：下载器
- portrainer：Docker WebUI
- nastools：NAS小助手
- mongodb：数据库

