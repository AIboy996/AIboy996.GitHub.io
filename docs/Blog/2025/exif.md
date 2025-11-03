---
tags:
- blog
- git
---

# 照片有毒

就在我开心地写下[婚礼日记](./wedding.md)（FYI：并非我的婚礼）之时，我猛然意识到我放在博客里的图片都是直接从相册（此处点名声讨Apple的相册）里粘贴过去的。==不会所有的exif信息都留着吧？？==

??? question "什么是EXIF"
    > Exchangeable image file format

    EXIF是专门为数码相机之照片设定的文件格式，可以记录数码照片的属性信息和拍摄数据。Exif可以附加于JPEG、TIFF、RIFF等文件之中，为其增加有关数码相机拍摄信息的内容和索引图或图像处理软件的版本信息。

    我其实非常爱这个规范，可以记录下照片的拍摄工具、拍摄参数、拍摄地点。在相册里就可以按照这些参数来筛选、检索照片，非常快乐。

    但是这样做有一个严重的弊端就是这些信息有时候是**非常隐私**的，尤其是拍摄地点。有些照片是在我家或者朋友家拍的，这些地点的精确位置泄露可不太妙。网络上也有很多相关的EXIF隐私泄漏新闻😭

    好在各种社交媒体应该都会在用户上传文件的时候隐去EXIF信息（例如微信朋友圈），不过我的博客显然此前没有任何相关的措施，天塌了。

## OMFG

> Oh My Fucking God

我检查了一下这些照片，发现还真是所有信息都留着：

<figure markdown>

![](assets/2025-11-03-17-18-03.png){width=300}

<figurecaption>定位和设备信息比较致命</figurecaption>
</figure>

而且由于我的博客文件都是放在GitHub的，所以历史上我提交过的所有文件都暴露在公网中，随便找一个commit都可以下载到这样包含所有exif信息的图片：

![](assets/2025-11-03-17-02-18.png)

<figure markdown>

![](assets/2025-11-03-17-25-27.png)

</figure>

## 亡羊补牢

### 删掉历史信息

既然发现了泄漏，首先要做的就是尽快把已经泄漏的图片都删掉。**这样的篓子自然是已经有人捅过了，而且很多**。

所以已经有比较成熟的工具来修复这件事情。问了一下GPT他就给出了比较完善的修复方法。只需要用`git-filter-repo`这个工具重写整个仓库的历史commit记录就可以了：

```bash
# 0. 安装filter-repo
brew install git-filter-repo

# 1. 重新克隆你的仓库
git clone <repo-url> my-clean-repo
cd my-clean-repo

# 2. 执行 filter-repo 操作，删除所有图片和视频
git filter-repo \
  --invert-paths \
  --path-glob '*.jpg' --path-glob '*.jpeg' --path-glob '*.png' \
  --path-glob '*.gif' --path-glob '*.tiff' --path-glob '*.heic' \
  --path-glob '*.webp' --path-glob '*.mp4' --path-glob '*.mov'

# 3. 推送重写后的版本
git push origin --force --all
git push origin --force --tags
```

<figure markdown>

[![newren/git-filter-repo - GitHub](https://gh-card.dev/repos/newren/git-filter-repo.svg?fullname=)](https://github.com/newren/git-filter-repo)

</figure>

以上命令会分析整个仓库每个分支的历史commit，删除掉其中相关的文件，然后再重新计算commit的hash tag。如此一来即保持了commit历史不变，又删除了所有相关文件。

### 批量图片匿名

之前删掉的图片还得制作一个匿名化的版本再重新放回去，不然博客就没法看了。同样的，已经有人造好了轮子。使用`exiftool`就可以很方便地查看、编辑exif信息：

<figure markdown>

[![exiftool/exiftool - GitHub](https://gh-card.dev/repos/exiftool/exiftool.svg?fullname=)](https://github.com/exiftool/exiftool)

</figure>

只需要一行命令就可以匿名化所有的图片和视频：

```bash
exiftool -overwrite_original -r -all= -ext jpg -ext png -ext mp4 -ext mov .
```

- `-r`：开启递归搜索
- `-ext`：指定需要处理的文件类型
- `-overwrite_original`：直接把原始文件覆盖
- `-all=`：删除所有EXIF信息

> 当然你也可以只删除比较敏感的信息，例如GPS信息：`-gps:all=`，我就索性全删了，反正正常人也不会看这些信息，除非别有用心之人

!!! note "GitHub Push限额"
    还有一个比较坑的事情，GitHub每次push最大2GB的内容。我这次把所有的图片都修改过之后，变化的内容超过了2GB，所以只能分成多个commit。

    另外自动化build、commit的流程也挂了，原因同上。

### 自动化图片匿名

处理好之前的图片还不够，还得预防一下以后上传的图片再泄漏隐私。好在git有一个机制可以帮我们实现这件事情：hook

只需要在仓库的`.git/hooks/pre-commit`文件里写一段脚本就可以在我们commit的时候自动处理图片了：

```bash
#!/bin/bash
# 清除即将提交的图片文件的 EXIF 信息（支持空格/中文/特殊字符）

echo "🧹 Cleaning EXIF data from staged images..."

# 找出所有即将提交的图片文件（以 NUL 结尾，防止空格问题）
git diff --cached --name-only -z --diff-filter=ACM |
  grep -z -E '\.(jpg|jpeg|png|heic|tiff|webp|JPG|JPEG|MP4|mp4|mkv|mov|gif)$' |
  while IFS= read -r -d '' FILE; do
    if [ -f "$FILE" ]; then
      echo "🧼 Cleaning $FILE"
      exiftool -overwrite_original -all= "$FILE" >/dev/null 2>&1
      git add "$FILE"
    fi
  done

echo "✨ EXIF cleanup complete."
exit 0
```

这样下次coomit的时候如果有图片或者视频就可以自动匿名化了。

## 一起裸奔

虽然在我发现了这个问题之后火速处理了它。但我更多地感受是不处理好像也无所谓了，事情还能更坏吗？

互联网渗透率如此之高的年代，大家基本都是裸奔。有心之人通过你的各种社交账号关联很容易找到你的QQ号、微信号等等，进而找到你的手机号。而你的手机号就相当于你在互联网上的身份证，有了手机号一切信息都会被关联起来。开盒轻而易举。

在各种企业数据库泄漏事件（例如学习通就曾经泄漏了大量学生的信息）中各类社工库不断收集数据，已经形成了恐怖的规模。再加上一些违法的信息买卖（外卖贴纸，快递贴纸）、黑客行为等等，我们的隐私早已无所遁形。

就拿我自己来说，在纸飞机上随便找一个免费的社工库查询就可以精确定位到我家在哪里（**点名批评京东快递，隐私保护非常不到位**），知道我的身份证是多少、我上什么学校、我玩什么游戏，==细思极恐却又无可奈何==。

最后我想说，虽然大家一起裸奔好像也没什么，但如果可以的话我真的不想裸奔啊😭
