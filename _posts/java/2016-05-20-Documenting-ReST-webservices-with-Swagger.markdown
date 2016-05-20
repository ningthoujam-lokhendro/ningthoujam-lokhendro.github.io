---
layout: post
title:  "Documenting ReST webservices with Swagger"
date:   2016-05-20 09:33:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
---
Documenting ReST webservice is a must and it is also tidius task. With every minor change in the api, documentating becomes to difficult to track. With [Springfox-swagger][Springfox-swagger], it takes a the documentation to a breeze with dynmic documentaion. Here is a quick look on how to document rest api dynamically.

## <span class="glyphicon glyphicon-pushpin" ></span> Dependencies
The following maven dependencies are to be added.
{% highlight xml %}
<properties>
    <spring-fox.version>2.3.1</spring-fox.version>
</properties>
<!-- Springfox swagger -->
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>${spring-fox.version}</version>
</dependency>
<!-- Webjar UI -->
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>${spring-fox.version}</version>
</dependency>
{% endhighlight %}

## <span class="glyphicon glyphicon-pushpin"></span> Configuration Class
The following configuration class in spring configuration is used to configure the springfox. More for information, refer [springfox documentaion][springfox documentaion]
<script src="https://gist-it.appspot.com/github/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/java/com/ningzeta/deviceOUI/config/SwaggerConfiguration.java?footer=0&slice=22:0"></script>

## <span class="glyphicon glyphicon-pushpin"></span> Add Resource Handler
Spring class to handle resource via configuration to expose the resources of the webjar.
<script src="https://gist-it.appspot.com/github/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/java/com/ningzeta/deviceOUI/config/WebConfiguration.java?footer=0&slice=18:0"></script>

<i class="glyphicon glyphicon-info-sign" /> The access url should be at `http://<server>:<port>/<context-root>/swagger-ui.html`

<i class="glyphicon glyphicon-apple" /> For the full project reference visit [redis-device-oui][redis-device-oui]

[redis-device-oui]: https://github.com/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui
[Springfox-swagger]: http://springfox.github.io/springfox/
[springfox documentaion]: http://springfox.github.io/springfox/docs/current/