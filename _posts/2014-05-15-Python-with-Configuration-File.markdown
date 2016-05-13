---
layout: post
title:  "Python with Configuration File."
date:   2014-05-15 22:22:05 +0530
category:	"Python"
author:	Ningthoujam Lokhendro
---
<img class="img-responsive img-left" src="{{{baseurl}}/assets/fh5co/images/Configparser.jpg">
Reading configuration or properties file is a basic ingredient that is used in most of the scripting and full feature language. There are in-build library and other 3rd party library to read this type of type with ease. We can even use simple file reader but the ease of using such library makes the properties or configuration file awesome.

In python if you ever encounter to read such key/value type file, ConfigParser is the one that you should use. The `Configparser module` contains most the needs that you would have to use a configuration type files and won`t need to implemente your own parser.

First lets discuss what is what is configuration file type. If you are familiar you can skip this part.

## Configuration File Type
Configuration file are those that have key/value type data. The separator would be either “:” or “=” with key in left side and value at right side. Comments are also allowed in such type with “#” or “;”. Leading white space are remove from the value. It also contain section part with “[this_is_section_header]” to differentiate and scope the keys. The file type can be of anything but mostly used are : cgf, ini, properties etc.

Example:
{% highlight .properties %}
[Oracle]
# This is a comment
Username = ibobi
Password = passwd
Host = localhost
Sid = system
Port = 1521

[mysql] 
Username = tom
Password = yahoo
Host = newHost
{% endhighlight %}

It also support `interpolation` which means you can specify to refer other key(option) using “%option” but this can be parse using Configparser.SafeConfigParser().

{% highlight .properties %}
[installation] 
Home = /opt/app/oracle
Oracle.home = %home/product/db_1
{% endhighlight %}

## Reading Configuration file
First import the require module.
{% highlight Python %}
from ConfigParser import SafeConfigParser, NoSectionError, NoOptionError
{% endhighlight %}

This is import SafeConfigParser to parse the configuration type file and the other two are the exception type that is used frequently.

`NoSectionError :` Exception type raise when there is no section that is specified is found.
`NoOptionError :`  Exception type raise when there is no option that is specified is found.
The following will read the configuration file and return the SafeConfigParser instance that read the file.

{% highlight Python %}
def read_config_file(conf_file):
     if not isfile(conf_file):
           raise MyException("No File with name " + conf_file + " in " + getcwd())
     conf = SafeConfigParser()
     conf.optionxform = str
     conf.read(conf_file)
     return conf
{% endhighlight %}

Now you can define a function that extract the require information. This way you don`t have to read the file multiple time and use the instance.

{% highlight Python %}
#get oracle details
 
def get_install_dir(conf):
 
     try:
         username = conf.get('oracle', 'username')
         print ‘Username is {0}’.format(username)
         return username

     except NoSectionError, msg:
         print "Missing section [" + msg.section + "]"
     except NoOptionError, msg :
         print "Missing option '" + msg.option + "' of section [" + msg.section + "]"
{% endhighlight %}

You can even read all the keys/values in a section via

{% highlight Python %}
for key, value in conf.items('oracle'):
    print ‘key =  ’+ key + ‘ and value = ’+ value ‘\n’
{% endhighlight %}

## Wrting to Configuration File
To write to Configuration file:

{% highlight Python %}
from ConfigParser import SafeConfigParser
 
config = SafeConfigParser()
 
def write_conf(section, option, value):
     config.set(section, option, value)
     my_dict = {'joe':'20', 'jone':'34', 'tom':'25', 'lucy':'26'}
     config.add_section('Details')
 
for key,value in my_dict.iteritems():
     write_conf('Details',key,value)
     with open('hello.cfg','wb') as fp:

config.write(fp)
{% endhighlight %}

## Reading configuration file without Section
Java property file with extension properties or any configuration that does not have section would be problem to read as the ConfigParser API need section to get the key/value.

{% highlight .properties %}
lucy = 26
joe = 20
jone = 34
tom = 25
{% endhighlight %}

The solution is to create a fake section by initializing from a class and read the file. This way ConfigParser will see them with a face section.

{% highlight Python %}
from ConfigParser import SafeConfigParser
 
config = SafeConfigParser()
 
class FakeSecHead(object):
 
     def __init__(self, fp):
     	self.fp = fp
     	self.sechead = '[asection]\n'
 
     def readline(self):
     	if self.sechead:
        	try:
        		return self.sechead
        	finally:
        		self.sechead = None
     	else: 
     		return self.fp.readline()
 
config.readfp(FakeSecHead(open('nosection.properties')))
 
config.items('asection')
{% endhighlight %}