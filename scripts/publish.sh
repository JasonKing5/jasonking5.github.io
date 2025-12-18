#!/bin/bash

# 拉取指定git仓库的代码
# git clone https://github.com/JasonKing5/blog.git

# 进入代码目录
echo "cd /home/ubuntu/repo/blog"
cd /home/ubuntu/repo/blog

echo "current pwd:"
pwd

# 更新代码
echo "git pull"
git pull

# 执行 npm install 并等待完成，然后执行 npm run build
echo "pnpm install && pnpm run build"
pnpm install && pnpm run build

# 复制构建后的文件到目标目录并强制替换覆盖
echo "sync build files to /var/www/codefe.cn"
sudo rsync -av --delete /home/ubuntu/repo/blog/build/ /var/www/codefe.cn/

echo "[SUCCESS] deploy"
