---
layout: post
title:  "Logback Configuration"
date:   2015-05-20 14:43:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
tags: ['Logging','Logback']
---
* TOC:
{:toc}

Logback is intended as a successor to the popular log4j project, [picking up where log4j leaves off][1].
Configuring the logback to bootstrap in the project is describe here. For more information, see the [reference manual][2].

## Dependencies
{% highlight xml %}
<!-- Logging -->
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>jcl-over-slf4j</artifactId>
  <version>1.7.13</version>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.3</version>
</dependency>
{% endhighlight %}

## Configuring logback
Create a xml file with named <kbd>logback.xml</kbd> under <kbd>resource</kbd> directory of the web application.

<script src="https://gist-it.appspot.com/github/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/resources/logback.xml?footer=minimal"></script>

## Logging
Now to log out,
{% highlight java %}
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class MyApp {
	private static final Logger log = LoggerFactory.getLogger(Myapp.class);

	public void doSomething() {
		log.debug("**** Recieved request ****");
	}
}
{% endhighlight %}

[1]: http://logback.qos.ch/reasonsToSwitch.html
[2]: http://logback.qos.ch/manual/index.html
