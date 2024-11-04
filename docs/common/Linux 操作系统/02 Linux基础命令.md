## 用户与密码

```bash
# passwd
Changing password for user root.
New password:
```

```bash
useradd cliu8
```

```bash
[root@deployer ~]# useradd -h
Usage: useradd [options] LOGIN
       useradd -D
       useradd -D [options]


Options:
  -g, --gid GROUP               name or ID of the primary group of the new account
```

```bash

# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
......
cliu8:x:1000:1000::/home/cliu8:/bin/bash


# cat /etc/group
root:x:0:
......
cliu8:x:1000:
```

## 浏览文件

- cd directory_name：切换目录；
- cd . ：切换到当前目录；
- cd ..：切换到上一级目录；
- ls：列出当前目录下的文件。

```bash
# ls -l
drwxr-xr-x 6 root root    4096 Oct 20  2017 apt
-rw-r--r-- 1 root root     211 Oct 20  2017 hosts
```

第一个字段的第一个字符是文件类型，- 表示普通文件，d 表示目录。

剩下的 9 个字符是模式，即权限位（access permission bits），3 个一组，每一组 rwx 表示 读（read） 写（write） 执行（execute）。字母是有权限，横线是没权限。

三组分别表示文件所属的用户权限、组权限及其他用户权限。通过 chmod 711 hosts 改变权限。

第二个字段是硬链接（hard link）数目。

第三个字段是所属用户。

第四个字段是所属组。

第五个字段是文件的大小。

第六个字段是文件被修改的日期。

第七个是文件名。

通过 chown 改变所属用户，chgrp 改变所属组。

## 安装软件

CentOS 下：rpm -i jdk-XXX_linux-x64_bin.rpm

Ubuntu 下：dpkg -i jdk-XXX_linux-x64_bin.deb

rpm -qa/dpkg -l：查看安装的软件列表

rpm -qa | grep jdk/dpkg -l | grep jdk：通过关键词过滤查看安装的软件

rpm -qa | more/rpm -qa | less：分页查看，q 返回命令行

rpm -e/dpkg -r：删除软件

yum search jdk/apt-cache search jdk：使用软件管家搜索可安装的软件

yum install java-11-openjdk.x86_64/apt-get install openjdk-9-jdk：安装指定版本的软件

yum erase java-11-openjdk.x86_64/apt-get purge openjdk-9-jdk：删除软件

软件管家保存软件的统一服务器

```bash
Ubuntu 来讲，配置文件在/etc/apt/sources.list[base]
name=CentOS-$releasever - Base - 163.com
baseurl=http://mirrors.163.com/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7

```

```bash
deb http://mirrors.163.com/ubuntu/ xenial main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-backports main restricted universe multiverse
```

安装软件本质：下载文件，将这些文件放在某个路径下，在相应的配置文件中配置一下。

主执行文件放在 /usr/bin 或 /usr/sbin 下，库文件放在 /var 下，配置文件放在 /etc 下。

Linux 默认支持 tar 格式压缩，若使用 zip 格式需额外安装：

```bash
yum install zip.x86_64 unzip.x86_64
apt-get install zip unzip
```

```bash
tar xvzf jdk-XXX_linux-x64_bin.tar.gz
```

```bash
export JAVA_HOME=/root/jdk-XXX_linux-x64
export PATH=$JAVA_HOME/bin:$PATH
```

永久配置环境变量：/root 或 /home/cliu8 下编辑.bashrc 文件，或通过 source .bashrc 手动执行。

## 运行程序

### 通过 shell 在交互命令行里运行

- 文件有 x 执行权限，到文件所在的目录下，通过 ./filename 运行这个程序。
- 如果 PATH 里设置了，可以在任意位置直接输入文件名运行，Linux 会根据 PATH 找。

### 后台运行

```bash
nohup command >out.file 2>&1 &
```

文件描述符 1，表示标准输出，文件描述符 2，表示标准错误输出，2>&1 表示标准输出和错误输出合并到 out.file 。

```bash
ps -ef |grep keyWord |awk '{print $2}'|xargs kill -9
```

`ps -ef` 可以单独执行，列出所有正在运行的程序，grep 通过关键字找到启动的程序。awk 可以对文本进行处理，`awk '{print $2}'` 指第二列的内容，即运行的程序 ID。通过 xargs 传递给 kill -9 关闭运行的程序。

### 以服务的方式运行

```bash
yum install mariadb-server mariadb
systemctl start mariadb
systemctl enable mariadb
# 在 /usr/lib/systemd/system 目录下创建 XXX.service 的配置文件成为一个服务
```

```bash
apt-get install mysql-server # 安装
systemctl start mysql # 启动
systemctl enable mysql # 设置开机启动
# /lib/systemd/system 目录下创建 XXX.service 的配置文件，定义如何启动、关闭
```

```bash
shutdown -h now # 立刻关机
reboot # 重启
```
