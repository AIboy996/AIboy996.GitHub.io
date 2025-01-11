---
tags:
 - Shell
 - Linux
 - SSH
---

# 传输文件


??? note "ssh_config"
    `scp`和`sftp`都是基于ssh的，所以在`ssh_config`文件（一般是`~/.ssh/config`）中的配置都是可以直接用的。

    例如：
    ```title="~/.ssh/config"
    Host zhangyang_44
        HostName 1.2.2.3
        User zhangyang
        Port 44
    ```

    在这个配置下我们可以用`sftp zhangyang_44`代替`sftp -P 44 zhangyang@1.2.2.3`。

## scp
> OpenSSH secure file copy
> 
> scp uses the **SFTP** protocol **over a ssh(1) connection** for data transfer, and uses the same authentication and provides the same security as a login session.

有的时候我们需要从远程服务器上下载文件，简易的方法是使用`scp source target`。


完整的选项如下：

```text title="scp用法"
scp [-346ABCOpqRrsTv] [-c cipher] [-D sftp_server_path] [-F ssh_config]
         [-i identity_file] [-J destination] [-l limit] [-o ssh_option]
         [-P port] [-S program] [-X sftp_option] source ... target
```

</div>

和SSH类似，我们可以指定一些连接参数：

- `-J destination`：【Jump】设定中转服务器
- `-P port`：【Port】设定目标服务器端口

以及一些`scp`独有的选项：

- `-r`：【recursive】递归传输所有的文件
- `-p`：【preserve】保留文件的修改时间、访问时间等信息

### 下载文件
例如，从`yang@1.2.3.4`服务器上下载`/data5/UKB_heart/readme.md`文件到本地：

<div class='console'>

```console
$ scp yang@1.2.3.4:/data5/UKB_heart/readme.md ./readme.md
readme.md   85%  696MB  28.3MB/s   00:01 ETA

```

</div>

### 上传文件
只需要把`source`和`target`互换即可：
<div class='console'>

```console
$ scp ./readme.md yang@1.2.3.4:/data5/UKB_heart/readme.md
readme.md   85%  696MB  28.3MB/s   00:01 ETA

```

</div>

### 远程服务器对拷

如果我们执行命令的服务器对`source`和`target`都有访问权限，那么远程服务器对对拷非常简单：

```sh
scp source@ip:file_path target@ip:file_path
```

如果，我们对某一个服务器没有访问权限：

- 例如A、B都是远程服务器，但是只有**A暴露在公网**上我们可以访问，但是**B只在A的局域网内**可以访问。
- 再如A、B都是远程服务器，在A机器上有一个**ssh密钥**，可以**无密码访问B机器**。我们有A的访问权限，但是没有B的。

这时候，我们可以直接ssh登陆A机器，执行scp命令。

也可以使用scp的`-R`【Remote】选项：

```sh
scp -R A@ip:file_path B@ip:file_path
```

也可以达到同样的效果！

??? question "-R选项"
    这似乎是一个隐藏选项，我刚开始问GPT他都不知道：
    ```
    -R      Copies between two remote hosts are performed by connecting to the
                origin host and executing scp there.  This requires that scp
                running on the origin host can authenticate to the destination host
                without requiring a password.
    ```

## sftp
> OpenSSH secure file transfer

前面提到，scp命令实际上也是使用SFTP协议来传输文件的。所以我们当然可以直接使用sftp命令来传输文件！

```text title="sftp用法"
sftp [-46AaCfNpqrv] [-B buffer_size] [-b batchfile] [-c cipher]
          [-D sftp_server_command] [-F ssh_config] [-i identity_file]
          [-J destination] [-l limit] [-o ssh_option] [-P port]
          [-R num_requests] [-S program] [-s subsystem | sftp_server]
          [-X sftp_option] destination
```

### 简易模式

如果destination包含路径且它不是目录，那么 sftp 会自动下载文件到当前工作目录。

例如：

<div class='console'>

```console
$ sftp zhangyang_44:readme.md
Connected to zhangyang_44.
Fetching /home/zhangyang/readme.md to readme.md
Connection closed.

```

</div>

### 交互模式

如果没有指定路径，或者路径是一个目录，sftp 将登录到指定的主机并进入交互式命令模式，如果指定了远程目录，则会切换到该目录。可以使用可选的尾部斜杠（/）来强制将路径解释为一个目录。

这时候，我们就可以使用一些命令来操作文件了：

```text
bye                                Quit sftp
cd path                            Change remote directory to 'path'
chgrp [-h] grp path                Change group of file 'path' to 'grp'
chmod [-h] mode path               Change permissions of file 'path' to 'mode'
chown [-h] own path                Change owner of file 'path' to 'own'
copy oldpath newpath               Copy remote file
cp oldpath newpath                 Copy remote file
df [-hi] [path]                    Display statistics for current directory or
                                   filesystem containing 'path'
exit                               Quit sftp
get [-afpR] remote [local]         Download file
help                               Display this help text
lcd path                           Change local directory to 'path'
lls [ls-options [path]]            Display local directory listing
lmkdir path                        Create local directory
ln [-s] oldpath newpath            Link remote file (-s for symlink)
lpwd                               Print local working directory
ls [-1afhlnrSt] [path]             Display remote directory listing
lumask umask                       Set local umask to 'umask'
mkdir path                         Create remote directory
progress                           Toggle display of progress meter
put [-afpR] local [remote]         Upload file
pwd                                Display remote working directory
quit                               Quit sftp
reget [-fpR] remote [local]        Resume download file
rename oldpath newpath             Rename remote file
reput [-fpR] local [remote]        Resume upload file
rm path                            Delete remote file
rmdir path                         Remove remote directory
symlink oldpath newpath            Symlink remote file
version                            Show SFTP version
!command                           Execute 'command' in local shell
!                                  Escape to local shell
?                                  Synonym for help
```

重要的几个命令：

- `bye`或者`exit`或者`quit`：退出交互sftp
- `get [-afpR] remote [local]`：下载，remote参数可以使用`glob`匹配（例如`*.text`匹配所有名称以`.text`结尾的文件）。
- `put [-afpR] local [remote]`：上传，local参数可以使用`glob`匹配。
- `reget`：断点续传
- `reput`：断点续传
- `!command`：在本机执行命令

!!! warning "迷惑"
    实际使用的过程中，我发现有些命令的表现和手册不一致。

    例如`mget`命令并未出现在手册里，实际上是可用的。

    再如小写的`get -r`也可以递归下载文件。

    ```bash
    $ sftp zhangyang_44
    Connected to zhangyang_44.
    sftp> mget *.py
        Fetching /home/zhangyang/a.py to a.py
    sftp> get *.py
        Fetching /home/zhangyang/a.py to a.py
    sftp> get -r ukb
        Fetching /home/zhangyang/ukb/ to ukb
        Retrieving /home/zhangyang/ukb
        extract_ukb.ipynb                               100% 2043    86.4KB/s   00:00
        check_ukb.ipynb                                 100%  152KB   2.4MB/s   00:00
    sftp> get -R ukb
        Fetching /home/zhangyang/ukb/ to ukb
        Retrieving /home/zhangyang/ukb
        extract_ukb.ipynb                               100% 2043    84.1KB/s   00:00
        check_ukb.ipynb                                 100%  152KB   2.4MB/s   00:00
    sftp> bye
    ```

### 脚本

我们可以把交互模式的命令写在脚本内自动化执行：

```bash
#!/bin/bash
sftp zhangyang_44 <<EOF
lmkdir /share
get -r /home/ukb/$1 /share/ukb
bye
EOF
```