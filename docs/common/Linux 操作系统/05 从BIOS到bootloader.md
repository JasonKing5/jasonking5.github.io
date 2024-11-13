## BIOS

在主板上有一个 ROM（Read Only Memory，只读存储器），上面固化了一些初始化的程序，即 BIOS（Basic Input and Output System，基本输入输出系统）。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1649166785457-ec8bc172-7f6d-459c-ad25-3ad11f442ab1.png)

x86 系统中将 1M 空间最上面的 0xF0000 到 0xFFFFF 这 64K 映射给 ROM，即到这部分地址访问的是 ROM。

电脑刚加电时会做一些重置工作，将 CS 设置为 0xFFFF，将 IP 设置为 0x0000，所以第一条指令会指向 0xFFFF0，正是在 ROM 的范围内。这里有一个 JMP 命令会跳到 ROM 中做初始化工作的代码，BIOS 开始进行初始化。

首先 BIOS 要检查一下系统的硬件是否都完好，然后提供服务程序和中断程序，并能够根据操作给出结果。

## bootloader

BIOS 设置启动盘启动系统，启动盘约定一般在第一个扇区，占 512 字节，而且以 0xAA55 结束。可以通过 grub2-mkconfig -o /boot/grub2/grub.cfg 来配置系统启动选项。

使用 grub2-install /dev/sda 将启动程序安装到相应的位置。grub2 首先安装 boot.img，它由 boot.S 编译而成，一共 512 字节，正式安装到启动盘的第一个扇区。这个扇区通常称为 MBR（Master Boot Record，主引导记录 / 扇区）。BIOS 完成任务后，会将 boot.img 从硬盘加载到内存中的 0x7c00 来运行，boot.img 会加载 grub2 的另一个镜像 core.img。

core.img 由 lzma_decompress.img、diskboot.img、kernel.img 和一系列的模块组成。

![](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1649167647640-878ca74a-4684-4c79-9ef0-6fae22892034.png)

boot.img 将控制权交给 diskboot.img 后，diskboot.img 将 core.img 的其他部分加载进来，先是解压缩程序 lzma_decompress.img，然后是 kernel.img（grub 的内核），最后是各个模块 module 对应的映像。

## 从实模式切换到保护模式

1. 启用分段：在内存里建立段描述符表，将寄存器里面的段寄存器变成段选择子，指向某个段描述符。
2. 启动分页：将内存分成相等大小的块。
3. 打开 Gate A20：第 21 根地址线的控制线。

解压缩 kernel.img，然后跳转到 kernel.img 开始运行，显示选择操作系统的列表。

先读取 Linux 内核镜像头部的一些数据结构，放到内存中进行检查。检查通过后读取整个 Linux 内核镜像到内存。

配置文件里若有 initrd 命令，用于为即将启动的内核传递 init ramdisk 路径，则通过 grub_cmd_initrd() 函数将 initramfs 加载到内存中。
