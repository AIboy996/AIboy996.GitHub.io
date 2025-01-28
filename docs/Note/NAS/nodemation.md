---
tags:
- NAS
- 折腾
- Docker
---

# 自动化Workflow

使用[n8n](https://n8n.io/)：a powerful workflow automation tool。

目前只是定时执行写好的脚本，更多的功能还在探索中。

每天定时：

- 查宿舍的电费（FDU为什么不能自己给我预警一下！！！！真的很烦宿舍突然停电啊！）
- 爬取哔哩哔哩的开屏封面

![](assets/2024-06-16-01-32-37.png)

!!! info
    现在这些功能全都移到了GitHub workflow每日自动运行。

    - 复旦宿舍查电费：

    <figure markdown>
    
    [![aiboy996/fudan_spider - GitHub](https://gh-card.dev/repos/aiboy996/fudan_spider.svg?fullname=)](https://github.com/aiboy996/fudan_spider)
    
    </figure>
    
    - 哔哩哔哩海报：

    <figure markdown>
    
    [![aiboy996/bilibili_poster - GitHub](https://gh-card.dev/repos/aiboy996/bilibili_poster.svg?fullname=)](https://github.com/aiboy996/bilibili_poster)
    
    </figure>
