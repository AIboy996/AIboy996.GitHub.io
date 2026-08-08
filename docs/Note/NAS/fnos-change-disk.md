---
tags:
- NAS
- 折腾
- Docker
- 飞牛
---

# 飞牛升级硬盘

[我目前的NAS](./index.md)有两个盘位，如果算上系统盘（USB外挂了一个1TB的尿袋）勉强算是三个。

此前，我只买了一块4TB的机械硬盘作为主力存储设备，另外一个盘位置插了一个500GB的硬盘凑数，专门用来放相机拍的底片。但是最近疯狂出门旅游，导致拍摄的照片数量激增，500GB很快就不够用了。

于是便有了本文。

## 数据拷贝

为了最小化替换硬盘对已有数据的影响，我需要把旧硬盘上的数据完全拷贝到新硬盘上。

巧了，Linux哲学告诉我们一切对象都是文件，硬盘实际上就是`/dev`目录下的一个文件罢了。因此想要把硬盘的数据进行对拷，只要一行拷贝命令即可：

``` bash
sudo dd if=/dev/sda of=/dev/sdb bs=4M status=progress conv=noerror,sync
```

然后只需要耐心等待即可，所有的数据和分区都会被拷贝到目标硬盘。

## 存储池扩容

飞牛os的存储池管理不提供这方面的功能，只能通过命令行来操作。具体请看：[飞牛ext4和btrfs存储空间扩容实操保姆级教程](https://club.fnnas.com/forum.php?mod=viewthread&tid=59223)

首先需要通过`lsblk`命令查看如下信息：

```text
sdb                                                 8:16   0   2.7T  0 disk
└─sdb1                                              8:17   0   2.7T  0 part
  └─md1                                             9:1    0   2.7T  0 raid1
    └─trim_4318b03f_3cf7_4da0_b4b3_4fddc459c779-0 253:2    0   2.7T  0 lvm   /vol2
```

其中需要记住：

- 硬盘id：`sdb`
- 分区：`sdb1`
- 阵列：`md1`
- LVM：`trim_4318b03f_3cf7_4da0_b4b3_4fddc459c779-0`，也就是`<PV>-<LV>`

然后操作过程中使用到的命令我也粘贴在这里方便查看：

### 修复警告

```bash
# 把小硬盘上的数据复刻到大硬盘上通常会触发GPT分区的一个警告：GPT PMBR size mismatch (104857599 != 115343359) will be corrected by write.
sudo bash -c "echo 'Fix' | parted ---pretend-input-tty /dev/sdb print"
```

### 扩展分区

```bash
sudo parted /dev/sdb resizepart 1 100%
```

### 扩展MD阵列

```bash
sudo mdadm --grow /dev/md1 --size=max
```

### 扩展LVM物理卷（PV）

```bash
sudo pvresize /dev/md1
```

### 扩展LVM逻辑卷（LV）

```bash
sudo lvextend -l +100%FREE /dev/<VG名称>/<LV名称>
```

### 扩展文件系统

```bash
# ext4 文件系统
sudo resize2fs /dev/mapper/<VG名称>-<LV名称>
# btrfs 文件系统
sudo btrfs filesystem resize max <挂载点>
```

完结撒花~
