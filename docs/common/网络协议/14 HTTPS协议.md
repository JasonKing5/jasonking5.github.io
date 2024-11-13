## 对称加密

对称加密算法中，加密和解密使用的密钥是相同的，即加密和解密使用的是同一个密钥。因此对称加密算法要保证安全性的话，密钥要做好保密。只能让使用的人知道，不能对外公开。

## 非对称加密

非对称加密算法中，加密使用的密钥和解密使用的密钥是不相同的。一把是作为公开的公钥，另一把是作为谁都不能给的私钥。公钥加密的信息，只有私钥才能解密。私钥加密的信息，只有公钥才能解密。

## 数字证书

创建私钥：`openssl genrsa -out demositeprivate.key 1024`

创建公钥：`openssl rsa -in demositeprivate.key -pubout -outdemositepublic.pem`

由权威部门颁发的称为证书（Certificate），包含公钥，证书的所有者，证书的发布机构和证书的有效期。

生成证书需要发起一个证书请求给权威机构认证，这个权威机构称为 CA（ Certificate Authority）。

发请求：`openssl req -key demositeprivate.key -new -out demositecertificate.req`

权威机构给证书签名：`openssl x509 -req -in demositecertificate.req -CA cacertificate.pem -CAkey caprivate.key -out demositecertificate.pem`

查看证书内容：`openssl x509 -in demositecertificate.pem -noout -text`

## HTTPS 的工作模式

![HTTPS 协议的总体思路](https://blog-1252173264.cos.ap-shanghai.myqcloud.com/1650194762300-7c6f502f-e6a9-43c2-a62b-2011b8c226cb.png)
