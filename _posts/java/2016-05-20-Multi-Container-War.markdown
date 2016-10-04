---
layout: post
title:  "Multi Container War"
date:   2015-05-22 15:40:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
tags: ['war','tomcat','weblogic','Jboss','web.xml']
---
To package a web application to be deployable in multiple container, deployment descriptor is needed for each of the specific container. The deployment descriptor `web.xml` is the standard descriptor for the servlet container.

* TOC
{:toc}

Lets take example for a war to be deployable at __Tomcat__, __Weblogic__, __Jboss__

## Deployment Desscriptor.
Java web applications use a deployment descriptor file to determine how URLs map to servlets, which URLs require authentication, and other information. This file is named `web.xml`, and resides in the app's WAR under the `WEB-INF/` directory
For more information, refer [google cloud platform web.xml][1] and [Metawerx web.xml reference wiki][2]
<div class="alert alert-info">
<kbd>Servlet container</kbd> uses this deployment descriptor to determine the deployment of the web application.
</div>

Example `web.xml`: Here servlets are declared and the corresponding servlet mapping. The security is manage why the container.
<script src="https://gist-it.appspot.com/github/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/webapp/WEB-INF/web.xml?footer=minimal"></script>

## Weblogic
For the weblogic deployment, weblogic has its own weblogic specific deployment descriptor. This is used only when deployed in the weblogic container and named as 'weblogic.xml'. It resides at the same location as the `web.xml`.
<div class="alert alert-danger">
If `weblogic.xml` deployment descriptor is absent, WebLogic Server automatically selects the default values of the deployment descriptor elements.
</div>
For more information, refer [weblogic deployment descriptor][3].

Here is an example `weblogic.xml`: The `prefer-application-packages` here direct weblogic to load the classes that are in the war rather then the in-build/included in the weblogic library. The roles of the security is defined as well.
<script src="https://gist-it.appspot.com/github/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/webapp/WEB-INF/weblogic.xml?footer=minimal"></script>

## Jboss
Jboss also has its own deployment descriptor that get used when deployed in jboss servlet container only and its named as `jboss-web.xml`, its also used to overrite setting in the `web.xml`. It resides at the same location as the `web.xml`.

For more information, refer [JBoss Web Application Deployment Descriptor.][4]
Refer here for the [complete list of deployment descriptor of Jboss.][5]

Example `jboss-web.xml` to declare the context root only and get all inherite the description from `web.xml`. The security roles are inherited from the `web.xml`.
<script src="https://gist-it.appspot.com/github/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/webapp/WEB-INF/jboss-web.xml?footer=minimal"></script>

### jboss-deployment-structure.xml
This file is used to control the class loading for the deployment. Here the logging classes are excluded as its already present in the war.

<script src="https://gist-it.appspot.com/github/ningthoujam-lokhendro/DeviceDetail/blob/master/redis-device-oui/src/main/webapp/WEB-INF/jboss-deployment-structure.xml?footer=minimal"></script>

<i class="glyphicon glyphicon-apple" /> For the full project reference visit [redis-device-oui][redis-device-oui]

[redis-device-oui]: https://github.com/ningthoujam-lokhendro/DeviceDetail/blob/master/
[1]: https://cloud.google.com/appengine/docs/java/config/webxml#About_Deployment_Descriptors
[2]: http://wiki.metawerx.net/wiki/Web.xml
[3]: https://docs.oracle.com/cd/E24329_01/web.1211/e21049/weblogic_xml.htm#WBAPP571
[4]: https://docs.jboss.org/jbossweb/7.0.x/appdev/jbossweb.html
[5]: https://docs.jboss.org/author/display/AS71/Deployment+Descriptors+used+In+AS7.1?_sscc=t
