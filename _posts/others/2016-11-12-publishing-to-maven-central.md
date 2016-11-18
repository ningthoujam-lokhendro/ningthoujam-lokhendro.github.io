---
layout: post
title: "Publishing to Maven Central"
description: ""
category: "Others"
tags:
-  java
-  maven
excerpt: Publishing open source to maven Central procedure.
---
This is a brief procedure to publish artifacts to the maven Central.

* TOC:
{:toc}

## Initial Setup at Sonatype Jira
- [Create an Jira account][Create an Jira account]
- [Create a New Project ticket for Community Support - Open Source Project Repository Hosting][Create a New Project ticket for Community Support - Open Source Project Repository Hosting]

The important and mandatory during jira ticket creation are:
  - Group Id
  - Project URL
  - SCM url

## Working with PGP Signatures

### Installing GnuPG
If `gpg` is not installed, get it from here [http://www.gnupg.org/download/][http://www.gnupg.org/download/]

### Generating a Key Pair
Generate the keys, provide the information as prompted.
{% highlight bash %}
$ gpg --gen-key
{% endhighlight %}

### Listing Keys
{% highlight bash %}
$ gpg --list-keys
/home/lokhendro/.gnupg/pubring.gpg
----------------------------------
pub   2048R/9D9D7541 2016-11-10
uid                  Lokhendro Ning <lokhendro@email.com>
sub   2048R/3EFB9D5A 2016-11-10
{% endhighlight %}
The key-id is the `9D9D7541`.

### Distributing Your Public Key
Send the public key to public key server
{% highlight bash %}
$ gpg2 --keyserver hkp://pool.sks-keyservers.net --send-keys 9D9D7541
{% endhighlight %}

To import your public key from the key server to their local machines:
{% highlight bash %}
$ gpg2 --keyserver hkp://pool.sks-keyservers.net --recv-keys 9D9D7541
{% endhighlight %}

### Bonus: Add Key in github.
If you have github account, you can add this gpg key for syncing with the github.

## Requirement at the Project Object Model file
The folloing are the mandatory Requirement to define in the POM file.

### Correct Coordinates
Should be valid and unique GAV(Group-Artifact-Version) definition.
{% highlight xml %}
<groupId>com.ningzeta</groupId>
<artifactId>avatar</artifactId>
<version>1.0.0-SNAPSHOT</version>
{% endhighlight %}

### Project Name, Description and URL
{% highlight xml %}
<name>${project.groupId}:${project.artifactId}</name>
<description>My Awesome Project.</description>
{% endhighlight %}

### License Information
Define the type of License.
{% highlight xml %}
<licenses>
    <license>
        <name>Apache License, Version 2.0</name>
        <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
    </license>
</licenses>
{% endhighlight %}

### Developer Information
{% highlight xml %}
<developers>
    <developer>
        <name>Ningthoujam Lokhendro</name>
        <email>myemail@domain.com</email>
        <roles>
            <role>Lead Developer</role>
        </roles>
    </developer>
</developers>
{% endhighlight %}

### SCM Information
{% highlight xml %}
<scm>
    <connection>scm:git:git://github.com/ningthoujam-lokhendro/avatar.git</connection>
    <developerConnection>scm:git:ssh://github.com:ningthoujam-lokhendro/avatar.git</developerConnection>
    <url>http://github.com/ningthoujam-lokhendro/avatar/tree/master</url>
</scm>
{% endhighlight %}

### Distribution Management.
{% highlight xml %}
<distributionManagement>
    <snapshotRepository>
        <id>ossrh</id>
        <url>https://oss.sonatype.org/content/repositories/snapshots</url>
    </snapshotRepository>
    <repository>
        <id>ossrh</id>
        <url>https://oss.sonatype.org/service/local/staging/deploy/maven2/</url>
    </repository>
</distributionManagement>
<build>
  <plugins>
    <plugin>
      <groupId>org.sonatype.plugins</groupId>
      <artifactId>nexus-staging-maven-plugin</artifactId>
      <version>1.6.7</version>
      <extensions>true</extensions>
      <configuration>
        <serverId>ossrh</serverId>
        <nexusUrl>https://oss.sonatype.org/</nexusUrl>
        <autoReleaseAfterClose>true</autoReleaseAfterClose>
      </configuration>
    </plugin>
  </plugins>
</build>
{% endhighlight %}

### Authentication at ossrh
Define the authentication for the ossrh at the maven settting.xml as
{% highlight xml %}
<settings>
  <servers>
    <server>
      <id>ossrh</id>
      <username>your-jira-id</username>
      <password>your-jira-pwd</password>
    </server>
  </servers>
</settings>
{% endhighlight %}

And define the GPG credential as well:
{% highlight xml %}
<settings>
  <profiles>
    <profile>
      <id>ossrh</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <properties>
        <gpg.executable>gpg</gpg.executable>
        <gpg.passphrase>the_pass_phrase</gpg.passphrase>
      </properties>
    </profile>
  </profiles>
</settings>
{% endhighlight %}

### Supply Javadoc and Sources
{% highlight xml %}
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
    <version>2.2.1</version>
    <executions>
        <execution>
            <id>attach-sources</id>
            <goals>
                <goal>jar-no-fork</goal>
            </goals>
        </execution>
    </executions>
</plugin>
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-javadoc-plugin</artifactId>
    <version>2.9.1</version>
    <executions>
        <execution>
            <id>attach-javadocs</id>
            <goals>
                <goal>jar</goal>
            </goals>
        </execution>
    </executions>
</plugin>
{% endhighlight %}

### Sign Files with GPG/PGP
{% highlight xml %}
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-gpg-plugin</artifactId>
    <version>1.5</version>
    <executions>
        <execution>
            <id>sign-artifacts</id>
            <phase>verify</phase>
            <goals>
                <goal>sign</goal>
            </goals>
        </execution>
    </executions>
</plugin>
{% endhighlight %}

For more example on the [POM structure][POM structure].

## Deployment
To deploy the artifact at the maven central.

### Snapshots
{% highlight bash %}
$ mvn clean deploy
{% endhighlight %}

If all is fine should be available under : [https://oss.sonatype.org/content/repositories/snapshots/][https://oss.sonatype.org/content/repositories/snapshots/]

### Release
Set the proper version without snapshots and activate the release profile.
{% highlight bash %}
$ mvn versions:set -DnewVersion=1.2.3

$ mvn clean deploy -P release
{% endhighlight %}
If all is fine should be available under : [https://oss.sonatype.org/content/repositories/releases/][https://oss.sonatype.org/content/repositories/releases/]

For more information on the [apache maven][apache maven].

[Create an Jira account]: https://issues.sonatype.org/secure/Signup!default.jspa
[Create a New Project ticket for Community Support - Open Source Project Repository Hosting]: https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134
[http://www.gnupg.org/download/]: http://www.gnupg.org/download/
[POM structure]:  https://github.com/ningthoujam-lokhendro/avatar/blob/master/pom.xml
[apache maven]: http://central.sonatype.org/pages/apache-maven.html
[https://oss.sonatype.org/content/repositories/snapshots/]: https://oss.sonatype.org/content/repositories/snapshots/
[https://oss.sonatype.org/content/repositories/releases/]:  https://oss.sonatype.org/content/repositories/releases/
