## 开发环境配置

### 一、安装 Ruby

###  window下环境变量配置
1，先配置nodejs path
变量名： NODE_PATH
变量值： D:\Program Files\nodejs\node_global\node_modules

2,再配置SSL连接变量

变量名： SSL_CERT_FILE
变量值： D:\Ruby23-x64\cacert.pem

注意点: 直接指向当前文件

#### 1、下载并[安装Ruby](http://www.ruby-lang.org/zh_cn/downloads/)

#### 2、安装完成后执行以下命令更换Ruby包管理器源：

	gem source -l
	gem source -r https://rubygems.org/
	gem source -a https://ruby.taobao.org/

> Windows系统中gem注册淘宝源失败[参考](http://www.cnblogs.com/sunada2005/p/3357201.html)

#### 3、安装Compass

	gem install compass

#### 4、安装Compass依赖插件

	gem install susy
	gem install breakpoint
	gem install compass-normalize

### 二、安装 Node

#### 1、下载并[安装Node v4.x LTS](https://nodejs.org/en/) 版本

#### 2、安装完成后执行以下命令更换Node包管理器源：

	npm config set registry https://registry.npm.taobao.org

#### 3、进入项目根目录安装依赖：

	npm install

>  注：Windows系统需要.Net Framework 3.5支持，打开控制面板-->程序-->打开或关闭Windows功能-->勾选上.Net Framework 3.5相关的所有子选项，应用确定即可。

#### 4、安装Gulp全局命令：

	npm install -g gulp

##### 5、启动开发环境：

	gulp



**The end, enjoy!**