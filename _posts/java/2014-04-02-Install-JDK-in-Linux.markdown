---
layout: post
title:  "Installing JDK at Linux."
date:   2014-04-03 22:22:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
tag:  ['installation']
---
* TOC:
{:toc}

Default java that comes with most distros are openjdk. Oracle JDK is indeed needed for development or deployment, so here is a brief steps to install JDK <version> at your newly installed distros.

## Step 1 : Download the binary.
Head to the [Oracle JDK download page][Oracle JDK download page] for the latest JDK and choose the flavor that suite to your distros and architecture(32 bit or 64-bit) to download. Remember to `Accept` the license agreement before downloading.
If you need any previous specific version of JDK head to the [archive room][archive room].
If your distros fall under rpm category([check here][check here]), then you need to download `jdk-<version>-linux-<i586/x64>-rpm.bin`. Otherwise just download `jdk-<version>-linux-<i586/x64>-bin`.

## Step 2 : Extract the binary
Depending on the binary that was downloaded, executing/installing the jdk would differ. Here are some ways to handle them.

#### `jdk-<version>-linux-<i586/x64>-rpm.bin`
Change the permission and execute it.
{% highlight shell %}
[user@localhost]# chmod  +x  jdk--linux-<i586/x64>-rpm.bin
[user@localhost]# ./jdk--linux-<i586/x64>-rpm.bin
{% endhighlight %}
After the process completes jdk would be installed under `/user/java/jdk<version>` and all the rpm packed would be extracted under the current directory. You can either delete those or save them for future use.

#### `jdk-<version>-linux-<i586/x64>-bin`
Change the permission and execute it.
{% highlight shell %}
[user@localhost]# chmod  +x jdk-version-linux-<i586/x64>-bin
[user@localhost]# ./jdk-version-linux-<i586/x64>-bin
{% endhighlight %}
After the process completes, jdk would be installed under `/user/java/<version>`.

## Step 3 : Defining which java
In order to use installed java instead of the openjdk, execute these commands:
{% highlight shell %}
[user@localhost]# alternatives --install /usr/bin/java  java   /usr/java/jdk/jre/bin/java 5
[user@localhost]# alternatives --install /usr/bin/jar  jar   /usr/java/jdk/jre/bin/jar 5
[user@localhost]# alternatives --install /usr/bin/javac  javac   /usr/java/jdk/jre/bin/javac 5
[user@localhost]# alternatives --install /usr/bin/javaws javaws /usr/java/jdk/jre/bin/javaws 5
[user@localhost]# alternatives --set  java  /usr/java/jdk;/jre/bin/java
[user@localhost]# alternatives --set  javac  /usr/java/jdk/jre/bin/javac
[user@localhost]# alternatives --set  jar  /usr/java/jdk/jre/bin/jar
[user@localhost]# alternatives --set  javaws  /usr/java/jdk/jre/bin/javaws
{% endhighlight %}

## Step 4 : Exporting the environment varaibles
{% highlight shell %}
[user@localhost]$ vim ~/.shell_profile.sh
# Append the following line and save.
JAVA_HOME=/usr/java/jdk;
export JAVA_HOME
PATH=$PATH:$JAVA_HOME/bin
export PATH
# Reload the profile script.
[user@localhost]$. ./bash_profile.sh
# Check the version of java.
java -version
{% endhighlight %}


[Oracle JDK download page]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[archive room]: http://www.oracle.com/technetwork/java/javase/archive-139210.html
[check here]: https://en.wikipedia.org/wiki/Category:RPM-based_Linux_distributions
