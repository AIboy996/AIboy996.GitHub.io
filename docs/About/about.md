---
title: 关于本站和我的一切
tags: 
- About
icon: material/emoticon-wink-outline
---

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" defer></script>

## 本站的来龙去脉

??? info "为了折叠"

    1. 首先，本站的搭建纯属**心血来潮**！  
        某天，我在阿里云上折腾我的云服务器，突然看到了卖域名的服务，我心念一动就去买了一个，也就是[yangzhang.site](https://yangzhang.site)。域名到手了，怎么建站呢？

        搞一个带后端的有些麻烦，也有点杀鸡焉用牛刀，所以只做纯静态的网页。

        如果把静态网页托管在国内服务器或者OSS上，则需要备案，比较麻烦（我认为也没什么必要，还可能因为某些内容被封掉）。

        到这里，静态网页+国外服务器，我已经得到了最优方案————GitPages！

    2. 其次，**建站之后放什么东西呢？**   
        恰好我之前无聊搞了个公众号，发了一些自认为有趣的东西。我就打算先把之前的一些内容重新整理一下，放到这个网站（因为微信推文实在不是一个好的载体，尤其是一些代码内容，谁会拿着手机写代码呢？）

        今后也会同步更新一些内容！<s>实际并没有</s>

    3. 最后，**本站面向哪些人？**  
        既然要写内容，就得搞清楚自己的定位。

        我写的统计、数学相关的文章水平怕是捉襟见肘，更多的还是偏娱乐、科普向的。很适合其他专业的本科生和中学生来看。 

        我写的IT相关的东西大概也不如网络上已有的优质文章，更多是给我自己作为备忘录（所以会碎碎念，写得很详细，也会搞一些方便自己复制粘贴的案例），或者IT小白看看。

        写的日志，权当是发私域微博，图一乐。

    4.  建站的技术  
        本站属于较为简单的纯静态站点。构建主要用到了五个组件：

        1. **markdown**：我写文章用的文本组织形式，是一种简单、易上手的标记语言。
        2. **mkdocs**：用来把写好的`.md`文件转换成`HTML`网页文件的工具。
        3. **mkdocs-material**：mkdocs的一个主题，控制本站的样式和一些功能(`CSS & JS`)。
        4. **GitPages***：GitHub提供的静态网页托管服务，服务器在国外，不用备案。
        5. **阿里云域名+阿里云DNS***：便宜域名，用了自带的免费解析服务，实现自定义域名访问。

    !!! info "2023.7 更新"
        页面托管和DNS解析都换成了Cloudflare家的产品，原因是在大陆的网络环境中它们更快。

    详细的建站教程参见文章[用mkdocs搭建个人网站](../Note/mkdocs/practice.md)

## 我是谁？

<figure markdown>

![](assets/me.png){width=200px}

</figure>

我认为自述是非常困难的，面对不同的人、在不同的场合、不同的人生阶段我大概都会给出不同的答案。索性我就放弃写这么一段话了，在下面列举了一些我的**关键词**算作替代。

### Keywords

- [**张杨**](../Blog/2023/name.md)：本体。敝人的姓名。取自我父母的姓氏，遇到过若干的同名朋友，还经常被叫成*张扬*🤣
- [**泗阳**](https://zh.wikipedia.org/wiki/%E6%B3%97%E9%98%B3%E5%8E%BF)：我来自[运河](https://zh.wikipedia.org/zh-hans/%E4%BA%AC%E6%9D%AD%E5%A4%A7%E8%BF%90%E6%B2%B3)边上的小城，是一只住在[洪泽湖](https://zh.wikipedia.org/wiki/%E6%B4%AA%E6%B3%BD%E6%B9%96)边的旱鸭子。
- [**AIboy996**](https://github.com/AIboy996)：GitHub分身。取这个名字是因为Github这样程序员聚居的网站让我不禁联想到[996.icu](https://996.icu)。<s>前缀AIboy则来自于AIgirl，知名游戏</s>。现在看来，也可以解读为：我的专业是AI方向，所以我是AIboy。
- [**豆汁泡纳豆**](https://space.bilibili.com/85735334)：哔哩哔哩分身，另外一个我很喜欢的名字，名字的由来不记得了，大概是我怀着对这两种食物的敬意一拍脑袋想出来的，目前为止没见过重名的，可以作为全网唯一标识符（确信）
- [**悖论14**](../assets/images/qrcode.jpg)：个人微信订阅号分身，大约是当时刚看完东野圭吾的**悖论13**，感慨万千，同时又闲得无聊搞起了公众号。所以起了这么个名字（叫14不叫13是因为13被别人占用了，无奈只能叫14）

    > <s>说了这么多ID已经大概可以被完全开盒了，不过谁又不是在互联网上裸奔呢？</s>

<hr>

- [**复旦大学**](../Note/Fudan/index.md)：邯郸路某大学，在学校里混的一般，朋友够用，成绩将就。
- [**统计学/机器学习**](../Statistics/index.md)：敝人的专业，我感觉有点高不成低不就。不如本科专攻`计算机`或者`数学`，研究生深入了解统计方向。

    > 破案了，我就是统计学的研究生（其实在做机器学习，纯纯炼丹学，和统计学基本不沾边）

- [**Python**](../Python/index.md)：我接触的第一门编程语言，体会到了coding的乐趣。很可惜没早一点认识它，然后转专业。现在只能当半吊子码农。

    > 最近又续费了三年研究生，接着混

- [**Pure Math**](../SomeMath/index.md)：又菜又爱，可能是没有接触过毒打，对数学有很强的向往。

<hr>

- **League of Legends**：快十年的联盟老玩家了，但也当了十年真金白银，属于不思进取混吃等死型玩家，目前已经<s>转战日服</s>

    > 最近又回到了国服，并且大乱斗养老

- **炉石传说**：炉石虽然凉了，但是👴的青春永远不凉。

    > 最新消息，国服又回归了，是死者復生！

- **主机玩家（任豚+索狗）、[魂游糕手](../Note/Gaming/bloodborne.md)**：很喜欢古巨基的一首歌，《任天堂流泪》，尤其是一句：“我亦沦落到 游戏都玩不起”。
- **周杰伦/许嵩**：不狂热的粉丝，因为周董和许嵩的的歌都听不清歌词（*这竟然是优点？？*）适合写作业的时候听，听多了就爱上了。
- **[NAS](../Note/NAS/index.md)，Private Tracker**：懂得都懂，算是一个小小的爱好。目前主要混迹在北洋园。
- **君和日本語が本当に上手だね**：非资深二次元，只看感兴趣的少量番剧，掌握零星的日语，期待去日本毕业旅行。

    > 圆梦了，日本很好、下次还去！
    >
    > 二编：冬天北海道也很值得😭

- **INFJ-T**：如果你感兴趣，我刚才去测了一下。但我始终认为此类性格测试很难说明问题，人太多变了，我的性格随着时间、境遇、场合而剧烈变化（或许这本身也是一种特点？）。

- [**otaku**](./hobby.md)：综上所述我是一个阿宅，[动漫也还在看](https://bangumi.tv/anime/list/759154/do)，但是已然没有追番的热情了，galgame也是很少打开了。偶尔看几部经典老番聊以慰藉。正在脱宅的路上挣扎。

如果你觉得我就像**世**界上**另**外一个**你**，因而对我产生了些许兴趣，或者你有对本站任何的问题。不妨来联系我：

- 评论区⬇️
- 📫 邮箱：[mail@yangzhang.site](mailto:mail@yangzhang.site)
- 💬 本人微信号的`md5`码：`2868c4b14f63153fc45995d6f54c4750`
    - （如果你成功破解了请务必告诉我！我会很开心~赏咖啡一杯）

<!-- hint：我的微信号是纯小写英文字母构成的哦 -->

??? warning "直接给我发消息"
    <div align="center">
        <form action="https://bark.yangz.site" method="get" target="_blank">
            <input type="text" name="title" placeholder="标题" style="border: 1px solid #ccc; padding: 5px; margin: 5px; display: block; width: 300px;">
            <input type="text" name="body" placeholder="正文（可留空）" style="border: 1px solid #ccc; padding: 5px; margin: 5px; display: block; width: 300px;">
            <div class="cf-turnstile" data-sitekey="0x4AAAAAAA420QdUWVuMyAvd"></div>
            <button type="submit" class="md-button md-button--primary">发送</button>
        </form>
    </div>

    > 本消息即时送达，请勿轰炸，不要逼我求你😭
    
    <figure markdown>
     ![](assets/2025-01-08-18-00-57.png){width=300}
    </figure>
    