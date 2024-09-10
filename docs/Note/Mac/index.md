---
tags:
- Mac
---

# 人生苦短，我用Mac

这系列的note打算写一写我的Mac软件配置，包括但不限于：

- [终端配置](./zsh/)（iTerm2+zsh）
- [菜单栏配置](./sketchybar/)（sketchybar+yabai）
- [快捷键配置](./hammerspoon/)（hammerspoon）

相关的配置文件保存在我的[dotfiles仓库](https://github.com/AIboy996/dotfiles)。

??? chatgpt-summary "Ask GPT: 什么是dotfiles？"
    Dotfiles 是一种用来配置和定制操作系统环境和各种应用程序的配置文件的统称。这些文件通常是隐藏文件，文件名以点号 (".") 开头，因此被称为 "dotfiles"。这些文件一般位于用户的主目录中，例如 `~/.bashrc`、`~/.vimrc`、`~/.gitconfig` 等。

    以下是一些常见的 dotfiles 及其用途：

    1. **`.bashrc`** 或 **`.bash_profile`**：用于配置 Bash shell 的启动和运行行为。可以在其中设置环境变量、别名、函数等。

    2. **`.vimrc`**：用于配置 Vim 文本编辑器的行为和外观。可以在其中设置键绑定、颜色方案、插件等。

    3. **`.gitconfig`**：用于配置 Git 版本控制系统的全局设置，例如用户名、电子邮件、别名、差异工具等。

    4. **`.zshrc`**：用于配置 Zsh shell 的启动和运行行为，类似于 `.bashrc`，但用于 Zsh。

    5. **`.tmux.conf`**：用于配置 tmux 终端复用器的行为和外观。

    这些 dotfiles 的目的是让用户能够自定义他们的工作环境，使其更加符合个人习惯和需求。许多开发者会将他们的 dotfiles 进行版本控制，通常使用 Git 来管理这些文件，并将其托管在 GitHub 等代码托管平台上。这样可以方便地在不同设备之间同步配置，并与他人分享自己的配置方案。

    在管理 dotfiles 时，通常会使用一些工具和技巧来提高效率，例如：
    - **GNU Stow**：一个符号链接管理器，可以用来简化 dotfiles 的组织和部署。
    - **Bare Git Repositories**：使用裸 Git 仓库直接在主目录中管理 dotfiles。

    通过这些方法，用户可以方便地备份、恢复和分享他们的环境配置。