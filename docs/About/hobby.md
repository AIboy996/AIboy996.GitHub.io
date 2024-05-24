---
tags:
- About
---


# 兴趣

本人熟悉Python的使用，包括但不限于用它来搞：

- GUI软件（pyqt，threading，pygame）
- Web服务器（Django，Fastapi）
- 网络爬虫（requests，parsel，asyncio）
- 数据库操作（pyodbc，pymysql，pymongo）
- 深度学习（pytorch）
- 统计分析（pandas，sklearn，matplotlib，scipy，statsmodel）
- 数值分析（numpy，scipy）
- 自动化办公（pyautogui，pywin32，docx）

掌握以下语言的Hello World，但都不如Python熟悉：

- SAS统计软件
- R语言
- Matlab
- Julia
- C语言
- Go语言
- Rust
- Java
- JavaScript（node.js）
- Swift

此外我对Docker技术以及云服务器有些兴趣，熟悉Linux服务器的运维。

最后，我艾尔登法环不看攻略66小时全Boss击破，望周知。

> 间歇性感兴趣

<style type="text/css">
  .row {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 0px;
    width: 96%;
  }

  .column {
    flex: 16%;
    padding: 5px 10px;
  }

  .column img {
    margin-top: 10px;
    vertical-align: middle;
  }
</style>

<div id="container" class="row">
</div>

<script type="text/javascript">
  const names = [
    ['3b1b', 'typescript', 'ubuntu', 'vscode', 'vue', 'steam'],
    ['anaconda', 'android', 'css', 'django', 'docker', 'epic'],
    ['git', 'github', 'hadoop', 'java', 'javascript', 'xbox'],
    ['jupyter', 'latex', 'markdown', 'matlab', 'mysql', 'ns'],
    ['pytorch', 'qbittorrent', 'Rlogo', 'sas', 'sklearn','apple'],
    ['c++','node', 'numpy', 'pandas', 'plex', 'python'],
  ]

  const urls = [
    [
      'https://github.com/3b1b/manim', 
      'https://www.typescriptlang.org/', 
      'https://ubuntu.com/', 
      'https://code.visualstudio.com/', 
      'https://cn.vuejs.org/',
      'https://store.steampowered.com/'
    ],
    [
      'https://www.anaconda.com/', 
      'https://www.android.com/', 
      'https://en.wikipedia.org/wiki/CSS', 
      'https://www.djangoproject.com/', 
      'https://www.docker.com/', 
      'https://store.epicgames.com/'],
    [
      'https://git-scm.com/',
      'https://github.com/', 
      'https://hadoop.apache.org/', 
      'https://www.java.com/', 
      'https://www.javascript.com/',
      'https://www.xbox.com/'
    ],
    [
      'https://jupyter.org/',
      'https://www.latex-project.org/', 
      'https://www.markdownguide.org/', 
      'https://www.mathworks.com/products/matlab.html', 
      'https://www.mysql.com/', 
      'https://www.nintendo.com'
    ],
    [
      'https://pytorch.org/',
      'https://www.qbittorrent.org/', 
      'https://www.r-project.org/', 
      'https://www.sas.com/', 
      'https://scikit-learn.org/',
      'https://www.apple.com/'
    ],
    [
      'https://cplusplus.com/',
      'https://nodejs.org/', 
      'https://numpy.org/', 
      'https://pandas.pydata.org/', 
      'https://www.plex.tv/', 
      'https://www.python.org/'
    ]
  ]
  for (var i = names.length - 1; i >= 0; i--) {
    // 每一列都是一个div
    var div_column = document.createElement('div');
    div_column.classList.add('column')
    for (var j = names[i].length - 1; j >= 0; j--) {
      // 里面包裹着若干个链接
      // 每个链接包着一个svg图片
      var url_tmp = document.createElement('a');
      var img_tmp = document.createElement('img');
      url_tmp.href = urls[i][j];
      url_tmp.alt = names[i][j];
      url_tmp.target = "_blank";
      img_tmp.src = "/About/assets/" + names[i][j] + ".svg";
      url_tmp.appendChild(img_tmp);
      div_column.appendChild(url_tmp);
    }
    document.getElementById('container').appendChild(div_column);
  }
</script>