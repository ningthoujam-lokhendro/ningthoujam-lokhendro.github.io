---
layout: post
title:  "Installing Python in Linux or Solaris."
date:   2014-04-03 22:22:05 +0530
category:	"Python"
author:	Ningthoujam Lokhendro
---
<img class="img-responsive" src="{{{baseurl}}/assets/images/PythonAndLinux.png">
Installing Python in Linux or Solaris can be messy as python is link to the most the system programs.

Here i will show how to install Python at Redhat without un-installing the system in-build python. This tutorial will download the source and build so the same procedure can be use in other distros.

`Which version of Python?`
I will install here Python 2.7.1 if you want to install any other version, head to python repository and change the version used in this tutorial.

First Check the version installed.
{% highlight bash %}
[user@localhost]# python
{% endhighlight %}

Most probably it will be version 2.4

Now to install Python Some Pre-installation task need to be perform.

#### 1. Install the necessary Package.
{% highlight bash %}
[user@localhost]# yum -y install gcc gdbm-devel readline-devel ncurses-devel zlib-devel bzip2-develsqlite-devel db4-devel openssl-devel tk-devel bluez-libs-devel make
{% endhighlight %}

#### 2. Now Get the Python 2.7 binary and extract it.
{% highlight bash %}
[user@localhost]# wget http://www.python.org/ftp/python/2.7.1/Python-2.7.1.tgz
[user@localhost]# tar xvfz Python-2.7.1.tgz
{% endhighlight %}

#### 3. Compile and Install the binary.
{% highlight bash %}
[user@localhost]# cd Python-2.7.1
[user@localhost]# ./configure --prefix=/opt/python2.7.1 --with-threads --enable-shared
[user@localhost]# make
[user@localhost]# make install
{% endhighlight %}

#### 4. Export the library
{% highlight bash %}
[user@localhost]# echo "/opt/python2.7.1/lib/" >> /etc/ld.so.conf.d/opt-python2.7.1.conf
[user@localhost]# /sbin/ldconfig
{% endhighlight %}

#### 5. Create Symbolic link so that it can be executed from anywhere.
{% highlight bash %}
[user@localhost]#ln -sf /opt/python2.7.1/bin/python /usr/bin/python2.7
{% endhighlight %}

#### 6. Now typing `python2.7` will give you the python prompt with version 2.7.1

Note: Do not link directly to the “python” to use v2.7 as some system program would use the inbuild python.

[Download the script][Download the script], change the permission and execute it.

[Download the script]: http://
