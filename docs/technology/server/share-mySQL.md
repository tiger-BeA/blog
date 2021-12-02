---
title: MySQL 学习
---

# MySQL 学习

### 为什么数据库的索引是用 B+ 树而不是红黑树？

从时间复杂性和空间局部性考虑

- B+ 树叶子节点是有序的，大部分情况下不必遍历 IO

### 消息队列有 push 和 pull 两种模型，优劣是什么？

[https://cloud.tencent.com/document/product/406/4791](https://cloud.tencent.com/document/product/406/4791)

- Server 端用 push，则感受不到消费者的压力大小（可扩展性不高）
  - 对 Server 压力也很大，例如多来了几个 consumerGroup，不管 group 里的 consumer 数量有多少，都要开对应数量的线程对应提供 push 通道


### 为什么 KFK 更快？

- 减少  I/O —— 网络 IO 和磁盘 IO

### 金额数据存储使用整型或 DECIMAL 型存储，尽可能使用整型，禁止使用 FLOAT 或者 DOUBLE

产生浮点数计算精度不准确的原因： 在计算机角度，计算机算的是二进制，而不是十进制。二进制后变成了无线不循环的数，而计算机可支持浮点数的小数部分可支持到52位，所有两者相加，在转换成十进制，得到的数就不准确了，加减乘除运算原理一样。

```
十进制     二进制 
0.1      0.0001 1001 1001 1001 ... 
0.2      0.0011 0011 0011 0011 ... 
0.3      0.0100 1100 1100 1100 ... 
0.4      0.0110 0110 0110 0110 ... 
0.5      0.1 
0.6      0.1001 1001 1001 1001 ... 
```

故而0.1 + 0.2 后得到这么一串 **0.0100110011001100110011001100110011001100110011001100** 因浮点数小数位的限制而截断的二进制数字，这时候，我们再把它转换为十进制，就成了 **0.30000000000000004**。

解决方案：高精度小数的采用 decimal（js 中也可以用 decimal.js）