## 共享内存
key 唯一标识共享内存，可以根据文件系统上的一个文件的 inode 随机生成。共享内存需要指定一个大小 size，共享内存使用完毕通过 shmdt 解除它到虚拟内存的映射。

## 信号量
key 唯一标识这个信号量集合。信号量定义两种操作，P 操作和 V 操作。semaphore_p 调用 semop 函数将信号量的值减一，表示申请占用一个资源，当发现当前没有资源的时候，进入等待。semaphore_v 调用 semop 函数将信号量的值加一，表示释放一个资源，释放之后，就允许等待中的其他进程占用这个资源。

```bash
# ipcs
------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x00016988 32768      root       777        516        0             
------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00016989 32768      root       777        1 
```

![](/images/1649680520126-bc4b6458-6982-48d1-8bdd-421cbd405fa0.png)

## 创建共享内存
+ 通过 kvmalloc 在直接映射区分配一个 struct shmid_kernel 结构
+ 共享内存需要和文件进行关联
+ 通过 ipc_addid 将新创建的 struct shmid_kernel 结构挂到 shm_ids 里面的基数树上，并返回相应的 id，并且将 struct shmid_kernel 挂到当前进程的 sysvshm 队列中

## 将共享内存映射到虚拟地址空间
1. 调用 shmget 创建共享内存。
2. 先通过 ipc_findkey 在基数树中查找 key 对应的共享内存对象 shmid_kernel 是否已经被创建过，如果已经被创建，就会被查询出来，例如 producer 创建过，在 consumer 中就会查询出来。
3. 如果共享内存没有被创建过，则调用 shm_ops 的 newseg 方法，创建一个共享内存对象 shmid_kernel。例如，在 producer 中就会新建。
4. 在 shmem 文件系统里面创建一个文件，共享内存对象 shmid_kernel 指向这个文件，这个文件用 struct file 表示，我们姑且称它为 file1。
5. 调用 shmat，将共享内存映射到虚拟地址空间。
6. shm_obtain_object_check 先从基数树里面找到 shmid_kernel 对象。
7. 创建用于内存映射到文件的 file 和 shm_file_data，这里的 struct file 我们姑且称为 file2。
8. 关联内存区域 vm_area_struct 和用于内存映射到文件的 file，也即 file2，调用 file2 的 mmap 函数。
9. file2 的 mmap 函数 shm_mmap，会调用 file1 的 mmap 函数 shmem_mmap，设置 shm_file_data 和 vm_area_struct 的 vm_ops。
10. 内存映射完毕之后，其实并没有真的分配物理内存，当访问内存的时候，会触发缺页异常 do_page_fault。
11. vm_area_struct 的 vm_ops 的 shm_fault 会调用 shm_file_data 的 vm_ops 的 shmem_fault。
12. 在 page cache 中找一个空闲页，或者创建一个空闲页。

![](/images/1649680927406-f6bbd1a7-41aa-4dde-890d-5ba1c03b23c4.png)

## 信号量的内核机制
1. 调用 semget 创建信号量集合。
2. ipc_findkey 会在基数树中，根据 key 查找信号量集合 sem_array 对象。如果已经被创建，就会被查询出来。例如 producer 被创建过，在 consumer 中就会查询出来。
3. 如果信号量集合没有被创建过，则调用 sem_ops 的 newary 方法，创建一个信号量集合对象 sem_array。例如，在 producer 中就会新建。
4. 调用 semctl(SETALL) 初始化信号量。
5. sem_obtain_object_check 先从基数树里面找到 sem_array 对象。
6. 根据用户指定的信号量数组，初始化信号量集合，也即初始化 sem_array 对象的 struct sem sems[]成员。
7. 调用 semop 操作信号量。
8. 创建信号量操作结构 sem_queue，放入队列。
9. 创建 undo 结构，放入链表。

![](/images/1649681268910-c8f5e087-2b86-4495-96cf-e7e3285d541d.png)

