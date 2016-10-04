---
layout: post
title:  "POJO to Map Conversion"
date:   2016-05-13 23:33:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
tags: ['pojo','convert','jackson','Introspector']
---
There is sometimes needs to convert POJO to Map and vice-versa. This article talks about the different ways of conversion with common available library to do so.

Example POJO:
<script src="https://gist.github.com/ningthoujam-lokhendro/fbc0ca3cf51333a230b4.js?file=Person.java"></script>

## Apache Common BeanUtils.
Using [Apache Common BeanUtils][Apache Common BeanUtils] is short and sleek.
[Maven dependency library for Apache Common BeanUtils][Maven dependency library for Apache Common BeanUtils]
<script src="https://gist.github.com/ningthoujam-lokhendro/fbc0ca3cf51333a230b4.js?file=ApacheCommonExample.java"></script>

## Introspector.
This is build-in library for java. Another method to merge two Object is also added.
More details for the [Introspector][Introspector]
<script src="https://gist.github.com/ningthoujam-lokhendro/fbc0ca3cf51333a230b4.js?file=IntrospectorExample.java"></script>

## Jackson Databind.
[Jackson][Jackson] is a good library with lots of other features.
<script src="https://gist.github.com/ningthoujam-lokhendro/fbc0ca3cf51333a230b4.js?file=JacksonExample.java"></script>

[Apache Common BeanUtils]: https://commons.apache.org/proper/commons-beanutils/download_beanutils.cgi
[Maven dependency library for Apache Common BeanUtils]: http://mvnrepository.com/artifact/commons-beanutils/commons-beanutils
[Introspector]: https://docs.oracle.com/javase/7/docs/api/java/beans/Introspector.html

[Jackson]: https://github.com/FasterXML/jackson-databind
