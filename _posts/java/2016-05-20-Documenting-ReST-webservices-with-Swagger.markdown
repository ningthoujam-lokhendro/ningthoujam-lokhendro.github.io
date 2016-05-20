---
layout: post
title:  "Documenting ReST webservices with Swagger"
date:   2016-05-20 22:22:05 +0530
category: "Java"
author:	Ningthoujam Lokhendro

---

## <i class="glyphicon glyphicon-star" /> Dependency

The springfox swagger dependency to add is 

```xml
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.3.1</version>
</dependency>
```

To have the UI included a webjar is need to add as well.

```xml
<dependency>
      <groupId>io.springfox</groupId>
      <artifactId>springfox-swagger-ui</artifactId>
      <version>2.3.1</version>
</dependency>
```

## <i class="glyphicon glyphicon-star" /> Adding the configuration.

Now to configure the spring-fox swagger

```
<script src="http://gist-it.appspot.com/https://github.com/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/java/com/ningzeta/deviceOUI/config/SwaggerConfiguration.java"></script>
```



