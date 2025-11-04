# yangzhang's Site

- [![Blog](https://img.shields.io/badge/Go-yangzhang.site-blue.svg)](https://yangzhang.site)
- [![Blog](https://img.shields.io/badge/Go-yangz.site-red.svg)](https://yangz.site) in short (and ads free ~).

## 工具🔧

- 文章: [markdown](https://www.markdownguide.org/)
- 构建: [MkDocs](https://www.mkdocs.org)
- 主题: [Material for MKDocs](https://github.com/squidfunk/mkdocs-material)
- 插件: [requirements.txt](./requirements.txt)
- <s>发布1: [GitHub Pages](https://pages.github.com) </s>
- 发布2: [Cloudflare Pages](https://cloudflare.com)

## 网站搭建教程

[Part1 理论](https://yangzhang.site/Note/mkdocs/theory/)

[Part2 实践](https://yangzhang.site/Note/mkdocs/practice/)

## 脚本

- 使用[build.sh](./scripts/build.sh)来构建可供发布的网站
- 使用[serve.sh](./scripts/serve.sh)来快速预览网站
- 使用[clean_exif.sh](./scripts/clean_exif.sh)来匿名化所有的图片和视频
- 使用[sync.sh](./scripts/sync.sh)来把所有文件备份到对象存储
- 使用[cwebp.sh](./scripts/cwebp.sh)为所有的png图片创建一个压缩的webp版本
- 超过50MB的文件GitHub不接受，如果是png图片可以用[compress.sh](./scripts/compress.sh)压缩一下

-----

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
