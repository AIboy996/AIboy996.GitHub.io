---
tags:
- blog
- 折腾
- Docker
---

# 自己架设Overleaf服务器

最近在更新之前写的[高中数学讲义](../../Project/high_school_math)，气人的是讲义的页数多起来之后Overleaf就一直编译超时。

<figure markdown>
![](/Blog/2024/assets/2024-04-27-22-47-52.png){width=500}
<figurecaption>
学生也要9$一个月，太贵啦！
</figurecaption>
</figure>

囊中羞涩但又不想放弃overleaf，无奈只能自己假设一个overleaf服务器。

感谢Overleaf开源的代码！！

<figure markdown>
[![Overleaf - GitHub](https://gh-card.dev/repos/overleaf/toolkit.svg?fullname=)](https://github.com/overleaf/toolkit/)
</figure>

## 部署

**感谢伟大的Docker**，我们想要在自己的服务器部署Overleaf是非常简单的。

### Step 1 下载源码
```bash
git clone https://github.com/overleaf/toolkit.git ./overleaf-toolkit && cd overleaf-toolkit
```
!!! info "overleaf-toolkit提供的脚本"
    下载完源码之后，我们就可以使用overleaf-toolkit提供的脚本来管理容器了。

    在`./bin`文件夹下，有以下这些脚本可以使用：
    ```
    backup-config
    docker-compose
    doctor
    error-logs
    images
    init
    logs
    mongo
    rename-env-vars-5-0
    rename-rc-vars
    shell
    start
    stop
    up
    upgrade
    ```
### Step 2 初始化配置

```bash
bin/init
```

这条命令会在`./config`目录生成三个文件：
```
overleaf.rc     variables.env     version
```
你可以根据自己的需要修改。

### Step3 启动服务器
```bash
bin/up
```
这个指令是`docker compose up`的封装，相当于构建+启动容器集群。

### Step4 开始使用
然后就完了，**就完了**！！实在是不能更简单了。

<figure markdown>
![](/Blog/2024/assets/2024-04-27-22-53-57.png)
</figure>

## 自定义配置
如果你想要在局域网或者广域网访问该服务（默认只能本机访问），需要做一些修改。

### 修改监听IP和端口
在`./config/overleaf.rc`中，需要修改以下字段：
```
OVERLEAF_LISTEN_IP=0.0.0.0 # 监听所有的IP
OVERLEAF_PORT=9999 # 默认是80端口
```

### 自定义网站名称、管理员邮箱
在`./config/variables.env`文件中，修改：
```
OVERLEAF_APP_NAME="yang's Overleaf Instance"
OVERLEAF_SITE_URL=???
OVERLEAF_NAV_TITLE="yang's Overleaf Instance"
OVERLEAF_ADMIN_EMAIL=mail@yangzhang.site
```

!!! info "如何应用修改？"
    修改完配置文件之后，需要重新build才可以应用配置。

    ```bash
    bin/down && bin/up
    ```

### 你可能还需要配置STMP服务器
但我懒得弄了。

在管理员新建用户的时候，（大概）可以自动给该邮箱发送注册信息：
<figure markdown>
![](/Blog/2024/assets/2024-04-27-23-16-39.png)
</figure>
## 下载tex宏包
默认情况下，overleaf使用texlive，并且宏包是不全的。如果想要安装宏包需要以下步骤：

### Step1 进入Docker容器
```bash
bin/shell
```

### Step2 安装宏包
下面的代码来自[xlz.pub](https://xlz.pub/2023/01/10/Ubuntu%E4%BD%BF%E7%94%A8Docker%E6%90%AD%E5%BB%BASharelatex-Overleaf%E5%BC%80%E6%BA%90%E7%89%88%E6%9C%AC-%E5%B9%B6%E9%85%8D%E7%BD%AENginx%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86/)
```bash
# 下载并运行升级脚本
wget http://mirror.ctan.org/systems/texlive/tlnet/update-tlmgr-latest.sh
sh update-tlmgr-latest.sh -- --upgrade

# 更换texlive的下载源
tlmgr option repository https://mirrors.sustech.edu.cn/CTAN/systems/texlive/tlnet/

# 升级tlmgr
tlmgr update --self --all

# 安装完整版texlive（时间比较长，不要让shell断开）
tlmgr install scheme-full

# 你也可以安装一些其他的宏包
tlmgr install tikzlings tikzmarmots tikzducks
```

### Step3 commit镜像
```bash
docker commit sharelatex sharelatex/sharelatex:with-texlive-full
```

### Step4 重新构建容器
在`./config`目录下新建一个`docker-compose.override.yml`文件：
```bash
---
version: '2.2'
services:
    sharelatex:
        image: sharelatex/sharelatex:with-texlive-full
```
然后使用以下命令：
```bash
bin/stop && bin/docker-compose rm -f sharelatex && bin/up
```
重新构建容器。

!!! warning "Upgrade"
    Note that you will need to remove this committed container and repeat these steps when you upgrade overleaf.

此致。