---
layout: post
title:  "Spring ReST Webservice with MySQL"
date:   2014-04-27 22:22:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
tags: ['Spring','MySQL','rest']
---
The following tutorial is for creating simple Spring ReST webservice with MySQL. We are going to use Spring framwork to create this simple rest webservice that get data from the database.

## What is the Goal?
* Understand the Spring framwork.
* Understand the Spring web-framwork.
* Understand the Spring JDBC-framwork.

After this tutorial, the working principle of Spring MVC web framwork with JDBC web-framwork
couple togerther to produce a ReST web service will be understanable..

## Application Use-Case
Expose a ReST Web-Service that can get Device details with MAC address.

#### Get Device By MAC address

`http://localhost:port/DeviceDetail/REST/getDeviceByMAC/{macaddress}`
Expose a ReST Web-Service that can get Device with mac address.

#### Get Device By Manufacturer
`http://localhost:port/DeviceDetail/REST/getDeviceByManufacturer/{manufacturer}` Expose a Expose a ReST Web-Service that can get List of Device with Manufacturer.

## Create maven project
{% highlight shell %}
mvn archetype:generate -DgroupId=ningzeta.com
                       -DartifactId=DeviceDetail
                       -DarchetypeArtifactId=maven-archetype-webapp
                       -DinteractiveMode=false
{% endhighlight %}
Directory structure that is created
{% highlight shell %}
DeviceDetails
│   pom.xml
│
└───src
└───main
├───resources
└───webapp
│   index.jsp
│
└───WEB-INF
web.xml
{% endhighlight %}

[Maven Standard Directory][Maven Standard Directory]

## Convert the maven project to Eclipse WTP project.
To convert to Eclipse IDE compatiable web project, issue the following cmd.
{% highlight shell %}
mvn eclipse:eclipse    -Dwtpversion=2.0
{% endhighlight %}

Import the project in eclipse.

1. Open eclipse
2. File > import > Existing Maven Project > Next
3. Specify the Root Directory via browse and selecting the “DeviceDetail” directory.

## Adding Dependencies.
Open the pom.xml in text editor.Add the following properties.
{% highlight xml %}
<properties>
    <spring.version>4.0.0.RELEASE</spring.version>
    <junit.version>4.11</junit.version>
    <jdk.version>1.6</jdk.version>
</properties>
{% endhighlight %}
Add the following dependencies.
<script src="http://gist-it.appspot.com/https://github.com/ningthoujam-lokhendro/DeviceDetail/blob/master/pom.xml?slice=19:59&footer=0"></script>
{% highlight xml %}
<!-- Spring Dependencies -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>${spring.version}</version>
</dependency>
<!-- mysql Dependencies -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.31</version>
</dependency>
<!-- Jackson Dependencies -->
<dependency>
    <groupId>org.codehaus.jackson</groupId>
    <artifactId>jackson-mapper-asl</artifactId>
    <version>1.9.13</version>
</dependency>
<!-- Test Dependencies -->
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>${junit.version}</version>
  <scope>test</scope>
</dependency>
{% endhighlight %}
Add the maven compiler plugin
{% highlight xml %}
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.0</version>
    <configuration>
        <source>${jdk.version}</source>
        <target>${jdk.version}</target>
    </configuration>
</plugin>
{% endhighlight %}

Now that the development setup is completed, head to the next part that discuss about the development.
In this part, we will be discussing about how we could formulate the Spring ReST webservice with database using Spring framework.

## Create the Device DTO(Data Transaction Object).
Data transfer object is an object that carries data between processes. The difference between data transfer objects and business objects or Data Access Objects is that a DTO does not have any behavior except for storage and retrieval of its own data (accessors and mutators). DTOs are simple objects that should not contain any business logic.

With that in mind, lets create a DTO for the Device as stated below code.
{% highlight java %}
package com.ningzeta.devicedetail.model.dto;
public class DeviceDTO {

    private String mac;
    private String manufacturer;

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }
}
{% endhighlight %}

## Create the DAO (Data Access Object) interface
Data Access Object (DAO) is an object that provides an abstract interface to some type of database or other persistence mechanism. By mapping application calls to the persistence layer, DAO provide some specific data operations without exposing details of the database. It separates what data accesses the application needs, in terms of domain-specific objects and data types.

So lets create an interface that would suffix for out application.
{% highlight java %}
package com.ningzeta.devicedetail.dao;

import java.util.List;

import javax.sql.DataSource;

import com.ningzeta.devicedetail.model.dto.DeviceDTO;

public interface DeviceDAO {

    /**
     * This is the method to be use to initialize database
     * resources.
     * @param dataSource
     */
    public void setDataSource(DataSource dataSource) ;

    /**
     * Get Device details for a given MAC.
     * @param mac.
     * @return Device.
     */
    public DeviceDTO getDeviceByMAC(String mac);

    /**
     * Get list of Devices for a given Manufacturer
     * @param mac
     * @return List of Devices.
     */
    public List<DeviceDTO> getDeviceByManufacturer(String manufacturer);
}
{% endhighlight %}

## Impletement the DAO.
Now lets implement our DAO. Here in this class, we are defining the behavior how the data are set and get as an Object. We will be using the `dataSource` that is defined in the spring bean. This is describe in the next section.
{% highlight java %}
package com.ningzeta.devicedetail.dao.impl;

import java.util.List;
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import com.ningzeta.devicedetail.dao.DeviceDAO;
import com.ningzeta.devicedetail.model.DeviceMapper;
import com.ningzeta.devicedetail.model.dto.DeviceDTO;

public class DeviceDAOImpl implements DeviceDAO{

    private DataSource dataSource;
    private JdbcTemplate jdbcTemplateObj;

    @Override
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
        this.jdbcTemplateObj = new JdbcTemplate(dataSource);
    }

    @Override
    public DeviceDTO getDeviceByMAC(String mac) {
        String SQL = "select * from DeviceDetails where mac = ?";
        DeviceDTO device = jdbcTemplateObj.queryForObject(SQL,
                                                       new Object[]{mac},
                                                       new DeviceMapper()
                                                      );
        return device;
    }

    @Override
    public List<DeviceDTO> getDeviceByManufacturer(String manufacturer) {
        String SQL = "select * from DeviceDetails where manufacturer = ?";
        List<DeviceDTO> devices = jdbcTemplateObj.query(SQL,
                                                    new Object[]{manufacturer},
                                                    new DeviceMapper()
                                                    );
        return devices;
    }

}
{% endhighlight %}

## Create the JDBC Object Mapper
 The JDBC Object mapper class define how the data retrieved from the database is going to mapped to the Object defined in the DTO.
{% highlight java %}
package com.ningzeta.devicedetail.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.ningzeta.devicedetail.model.dto.DeviceDTO;

public class DeviceMapper implements RowMapper<DeviceDTO>{

    @Override
    public DeviceDTO mapRow(ResultSet resultSet, int arg1) throws SQLException {
        DeviceDTO device = new DeviceDTO();
        device.setMac(resultSet.getString("mac"));
        device.setManufacturer(resultSet.getString("manufacturer"));

        return device;
    }
}
{% endhighlight %}

## Define the spring bean
There are two beans defined for the DeviceDetail application. In general the `bean id` defined the unique identity of the bean. The `class` attribute defined Dependency Injection(DI) and the `property` attribute defined the properties that would be used in the DI.

Here in this case, the bean `dataSource` defined the database connection parameters. The `deviceDAO` is the bean that is used to DI in the class defined that use the dataSource bean defined above.
{% highlight xml %}
<!-- Initialization for datasource -->
<bean id="dataSource"
   class="org.springframework.jdbc.datasource.DriverManagerDataSource">
   <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
   <property name="url" value="jdbc:mysql://localhost:3306/DEVICES"/>
   <property name="username" value="root"/>
   <property name="password" value="system"/>
</bean>

<!-- Definition for deviceJDBCTemplate bean -->
<bean id="deviceDAO"
   class="com.ningzeta.devicedetail.dao.impl.DeviceDAOImpl">
   <property name="dataSource"  ref="dataSource" />   
</bean>
{% endhighlight %}

## Define the DispatcherServlet
DispatcherServlet is the central dispatcher for HTTP request handlers/controllers. DispatcherServlet looks for Handler Mappings. Spring MVC supports three different ways of mapping request URI’s to controllers : annotation, name conventions and explicit mappings. Handler Mappings section defined in the application context file, tells DispatcherServlet which strategy to use to find controllers based on the incoming request.

More at [Spring Dispatcher][Spring Dispatcher].

This is defined in the web.xml
{% highlight xml %}
<servlet>
      <servlet-name>rest</servlet-name>
      <servlet-class>
       org.springframework.web.servlet.DispatcherServlet
      </servlet-class>
      <load-on-startup>1</load-on-startup>
</servlet>

 <servlet-mapping>
      <servlet-name>rest</servlet-name>
      <url-pattern>/*</url-pattern>
 </servlet-mapping>
{% endhighlight %}

## Define the Spring rest-servlet
Now lets create the ‘rest-servlet.xml’ that defined how the framework would work. With `ComponentScan` tag, Spring auto scans all elements in the provided base package and all its child packages for Controller servlet. And the  `<mvc:annotation-driven>` tag instead of ViewResolver, with which we can directly send response data from the controller.

{% highlight xml %}
<!-- Component are scan in the following package.
        This is where the Controller will reside. -->
<context:component-scan base-package="com.ningzeta.devicedetail.controller" />

<!-- This is annotation driven -->
<mvc:annotation-driven />
{% endhighlight %}

## Finally Create the service Controller
Now lets create the Service Controller where the Dispatcher Sevlet scan and let it control the Request/Response dispatcher. But before that lets go through some important annotation that is used.

`@RequestMapping` annotation is used for defining incoming request urls for class and method levels. In this case two uri’s in the format `<root-url>/REST/getdevicebymac/{mac}/` and `<root-url>/REST/getdevicebymanufacturer/{manufacturer}` will be routed to this Controller respective method annotated . With `@RequestMapping` annotation, we can only define generic uri mappings. For dynamic uri mappings in case of passing variables along with the uri, `@PathVariable` is used. Here in this case, we pass a variable `mac` along with the uri such as, `<root-url>/REST/getdevicebymac/123456/`. Here the last parameter (123456) in the uri is retrieved using `@PathVariable`.

Using `<mvc:annotation-config>` tag instead of view resolver, we use `@ResponseBody` annotation to return response data directly from controller. But in the above code, we have not used `@ResponseBody`. This is because, in Spring MVC 4.0,  @RestController is introduced such that we need not use `@ResponseBody` tag in each and every method. `@RestController` will handle all of that at the type level. This annotation simplifies the controller and it has `@Controller` and `@ResponseBody` annotated within itself.

More at
[Spring @RestController][Spring @RestController]
[Spring @RequestMapping][Spring @RequestMapping]
[Spring @PathVariable][Spring @PathVariable]

{% highlight java %}
package com.ningzeta.devicedetail.controller;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ningzeta.devicedetail.dao.impl.DeviceDAOImpl;
import com.ningzeta.devicedetail.model.dto.DeviceDTO;

@RestController
public class ServiceController {

    ApplicationContext appContext = new ClassPathXmlApplicationContext("SpringBeans.xml");

    DeviceDAOImpl ddImpl = (DeviceDAOImpl) appContext.getBean("deviceDAO");

    @RequestMapping(value = "/REST/getdevicebymac/{mac}",
                    method = RequestMethod.GET)
    public DeviceDTO getDeviceByMAC(@PathVariable String mac){

        DeviceDTO device = ddImpl.getDeviceByMAC(mac);
        return device;
    }

    @RequestMapping(value = "/REST/getdevicebymanufacturer/{manufacturer}",
                    method = RequestMethod.GET)
    public List<DeviceDTO> getDeviceByManufacturer(@PathVariable String manufacturer) {

        List<DeviceDTO> deviceList = ddImpl.getDeviceByManufacturer(manufacturer);
        return deviceList;
    }

}
{% endhighlight %}

Build it with `mvn clean install` and deploy the war to the tomcat container.


[Maven Standard Directory]: https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html
[Spring Dispatcher]: http://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/servlet/DispatcherServlet.html
[Spring @RestController]: http://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/RestController.html
[Spring @RequestMapping]: http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html
[Spring @PathVariable]: http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/PathVariable.html
