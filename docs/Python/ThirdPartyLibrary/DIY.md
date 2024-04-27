---
tags:
- PyLib
---

# 自己写一个包
[![PyPI - Version](https://img.shields.io/pypi/v/npnn)](https://pypi.org/project/npnn/)
![PyPI - Python Version](https://img.shields.io/pypi/pyversions/npnn)

> 本文基于我写的包：`npnn`，参考[Packaging-Projects](https://packaging.python.org/en/latest/tutorials/packaging-projects/)

<figure markdown>
[![AIboy996/npnn - GitHub](https://gh-card.dev/repos/AIboy996/npnn.svg?fullname=)](https://github.com/AIboy996/npnn)
</figure>

## 包的代码结构
`npnn`在GitHub上的项目结构是：
```
npnn
├── LICENSE
├── dataset.py
├── model.py
├── pyproject.toml
├── readme.md
├── requirements.txt
├── search.py
├── search_result.csv
├── src
│   └── npnn
│       ├── __init__.py
│       ├── autograd.py
│       ├── base.py
│       ├── functional.py
│       ├── nn.py
│       └── optim.py
├── test.py
├── tests
│   └── test_autograd.py
├── train.py
├── utils.py
└── viz.py
```
这里面有一些无关的脚本，主要的结构是下面这些：
```
npnn
├── LICENSE                 # 许可文件
├── pyproject.toml          # Python项目配置文件
├── readme.md               # readme
├── src                     # Python项目源代码
│   └── npnn                # module
│       ├── __init__.py     # module初始化方法
│       ├── autograd.py     # 反向传播算法
│       ├── base.py         # 基类
│       ├── functional.py   # 函数操作
│       ├── nn.py           # 神经网络
│       └── optim.py        # 优化器
├── tests                   # pytest测试
│   └── test_autograd.py    # 测试具体内容
```
这也是官方推荐的结构。
## pyproject.toml
这个文件是Python项目的核心文件，描述了Python项目的核心信息。

主要包括以下板块：

### 构建系统
我选择了`setuptools`
```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"
```

### 项目核心信息
包括：

- 名称：name
- 版本号：version，我的习惯是`va.b.c`，a是大版本，b是小版本，c是小更新。
- 依赖：dependencies
- Python要求
- 作者信息：authors
- 项目描述：description
- 说明文档：readme
- 许可：license
- 关键词：keywords
- 分类：classifiers

```toml
[project]
name = "npnn"
version = "0.1.1"
dependencies = [
  "numpy"
]
requires-python = ">=3.9"
authors = [
  { name="Yang Zhang", email="mail@yangzhang.site" },
]
description = "NumPy Neural Network"
readme = "readme.md"
license = {file = "LICENSE"}
keywords = ["numpy", "neural network", "machine learning", "autograd"]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Developers",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
]
```
### 可选依赖
```toml
[project.optional-dependencies]
cuda11x = ["cupy-cuda11x"]
cuda12x = ["cupy-cuda12x"]
```
这块内容是安装时候的可选内容，例如：
```bash
python -m pip install npnn[cuda12x]
```
就会额外安装`cupy-cuda12x`。
### 项目主页
```toml
[project.urls]
Homepage = "https://github.com/AIboy996/npnn"
```
## 测试
使用`pytest`进行测试：

```bash
python -m pip install -U pytest
```

<div class="console">

```console
$ python -m pytest
---> 100%

===== test session starts ==============================
platform darwin -- Python 3.11.8, pytest-8.1.1, pluggy-1.4.0
rootdir: /Users/yang/Desktop/Project/npnn
configfile: pyproject.toml
plugins: anyio-3.7.1
collected 6 items

tests/test_autograd.py ......                                            [100%]

==== 6 passed in 0.58s ===============================
```

</div>


## 构建

使用`build`来构建Python项目：
```bash
python -m pip install -U build
python -m build
```
完成之后会在`./dist`生成构建好的软件包：
```
dist
├── npnn-0.1.1-py3-none-any.whl
└── npnn-0.1.1.tar.gz
```
这就是可以发布的wheel文件了。

## 发布
> 需要提前在PyPI注册账号、获取token

使用`twine`来发布Python项目：
```bash
python -m pip install -U twine
python -m twine upload -u __token__ -p PYPI_API_TOKEN --skip-existing dist/*
```

## 自动化workflow
使用GitHub提供的actions功能可以实现**测试、构建、发布的自动化**。
```yml title=".github/workflows/pythoh-package-publish.yml" hl_lines="59 43"
# test and publish Python Package to pypi
name: pytest

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        python-version: ["3.9", "3.10", "3.11", "3.12"]
    steps:
    - uses: actions/checkout@v4
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v5
      with:
        python-version: ${{ matrix.python-version }}
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        python -m pip install flake8 pytest
        python -m pip install -e .
        python -m pip install torch --index-url https://download.pytorch.org/whl/cpu
        if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
    - name: Lint with flake8
      run: |
        # stop the test if there are Python syntax errors or undefined names
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
        # exit-zero treats all errors as warnings. The GitHub editor is 127 chars wide
        flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
    - name: Test with pytest
      run: |
        pytest

  publish:
    needs: test
    runs-on: ubuntu-latest
    environment: pypi_publish
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install build twine
      - name: Build package
        run: python -m build
      - name: Publish package
        run: python -m twine upload -u __token__ -p ${{ secrets.PYPI_API_TOKEN }} --skip-existing dist/*
```

这个workflow文件分为两个jobs：

- test：分别在`Python 3.9 3.10 3.11 3.12`上安装依赖、运行测试。并且进行flake8的语法检查。
- publish：使用build构建，然后使用twine发布

并且publish是依赖于test的，如果后者没有正常运行结束，publish就不会运行。

值得一提的是高亮的两行配置，这里使用了GitHub的[environments功能](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)，用环境变量的方式存储了PyPI的token。