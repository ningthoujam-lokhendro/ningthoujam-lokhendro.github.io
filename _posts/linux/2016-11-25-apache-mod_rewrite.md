---
layout: post
title: "Apache mod_rewrite"
description: ""
category: "Linux"
tags:
-  apache
-  mod_rewrite
-  redirection
-  linux
excerpt: Redirection with the apacahe rewrite rule.
---
1. TOC:
{:toc .class1}

<kbd>mod_rewrite</kbd> is a Apache webserver module for flexible url rewriting. It is part of the standard Apache installation on all platforms. 

## Basic

###	Load & activate mod_rewrite
{% highlight apacheconf %}
LoadModule mod_rewrite.so
RewriteEngine On
{% endhighlight %}

###	Enable mod_rewrite support inside .htaccess files
By default usage of mod_rewrite inside .htaccess files is not allowed. To allow usage add the following lines to the webroot Directory block inside your httpd.conf.
{% highlight apacheconf %}
AllowOverride FileInfo

// will also work
AllowOverride All
{% endhighlight %}

###	Rewrite Condition
mod_rewrite Conditions are constructed as followed:
{% highlight apacheconf %}
RewriteCond <test-string> <condition> [<flags>]
{% endhighlight %}

###	Supported conditions

| operator 	| 			meaning                                                        	|
| ------ | ----------- |
| <        	| less than                                                                	|
| >        	| more than                                                                	|
| =        	| equal                                                                    	|
| -d       	| check if path is an existing directory                                   	|
| -f       	| check if path is an existing file                                        	|
| -s       	| check if path is an existing file larger than 0 bytes                    	|
| -l       	| check if path is an symbolic link                                        	|
| -F       	| check if path is an existing file and user is authorized to access it    	|
| -U       	| checks if test string is a valid url and user is authorized to access it 	|
{: .table .table-bordered .table-condensed .table-striped}

###	Flags

| flag        	| meaning                                                  	|
| ------ | ----------- |
| NC / nocase 	| case-insensitive matching (default: case-sensitive)      	|
| OR / ornext 	| combine conditions via logical or (default: logical and) 	|
{: .table .table-bordered .table-condensed .table-striped}

###	Magical values

| placeholder 	| meaning                                        	|
| ------ | ----------- |
| $1 .. $9    	| buffered values from current rewrite directive 	|
| %1 .. %9    	| buffered values from last rewrite condition.   	|
{: .table .table-bordered .table-condensed .table-striped}

###	Rewrite Rule
{% highlight apacheconf %}
RewriteRule <original-path-regexp> <rewritten-path> [<flags>]
{% endhighlight %}
`<original-path-regexp>` is a perl regular expression (PCRE). PCRE delimiter (e.g. /) are omitted. `<original-path-regexp>` can be negated by prefixing it with !

`<rewritten-path>` can contain matches from `<original-path-regexp>`. Rewrite dependents on context.

###	Rewrite context

| context  | rewrite  	|
| ------ | ----------- |
| main configuration    | whole url is rewritten                                 	|
| inside <Directory> block or .htaccess | only the path from the current directory is rewritten. 	|
{: .table .table-bordered .table-condensed .table-striped}

###	Supported flags
Insinde RewriteRule mod_rewrite supports the following flags:

| operator | meaning |
| ------ | ----------- |
| chain / C | group rewrite rules in a chain. later rules are executed, only if the previous ones are matching |
| cookie=<name>:<value>:<domain>[:<lifetime>[:<path>] / CO= | set a cookie based on the given data. |
| env=<variable>:<value> / E=VAR:VAL | set environment variable variable to value |
| forbidden / F | send HTTP status header FORBIDDEN (403) immediately |
| gone / G | send HTTP status header GONE (410) |
| last / L | stop processing rewrite rules after this one |
| next / N | abort current rewrite directive and restart rewriting |
| nocase / NC | perfom case-insensitive matching |
| noescape / NE | disable automatic url-encoding |
| nosubreq / NS |  |
| redirect / R[=301/302/303] | perform a HTTP redirect to destination and send HTTP status header (default: 302) |
| passthrough / PT | only needed in complexe scenarios where you use multiple url rewrite engines like mod_rewrite and mod_alias together. |
| proxy / P | a requests to the given url is performed by Apache's module mod_proxy |
| qsappend / QSA | append parameters to current query string |
| skip=[1,2,3,..,n] / S=[1,2,3,..,n] | skip the next n rewrite directives |
| type= / T= | specify mime type for request |
{: .table .table-bordered .table-condensed .table-striped}

## Server Variables
Server variables are handy for writing complex `mod_rewrite` rules sets. The following are available inside mod_rewrite.

###	Request
{% highlight apacheconf %}
%{REMOTE_ADDR}
%{REMOTE_HOST}
%{REMOTE_USER}
%{REMOTE_IDENT}
%{REQUEST_METHOD}
%{SCRIPT_FILENAME}
%{PATH_INFO}
%{QUERY_STRING}
%{AUTH_TYPE}
{% endhighlight %}

###	HTTP Headers
{% highlight apacheconf %}
%{DOCUMENT_ROOT}
%{SERVER_ADMIN}
%{SERVER_NAME}
%{SERVER_ADDR}
%{SERVER_PORT}
%{SERVER_PROTOCOL}
%{SERVER_SOFTWARE}
{% endhighlight %}

###	Time
{% highlight apacheconf %}
%{TIME_YEAR}
%{TIME_MON}
%{TIME_DAY}
%{TIME_HOUR}
%{TIME_MIN}
%{TIME_SEC}
%{TIME_WDAY}
%{TIME}
{% endhighlight %}

###	Misc
{% highlight apacheconf %}
%{API_VERSION}
%{THE_REQUEST}
%{REQUEST_URI}
%{REQUEST_FILENAME}
%{IS_SUBREQ}
{% endhighlight %}

## Redirect

###	Files and directory
{% highlight apacheconf %}
// single url
RewriteRule ^moved-file.html$ destination-file.html [R=302,NC]

// whole directory
RewriteRule ^moved-dir(/.*)?$ destination-dir$1 [R=302,NC]

// Redirect to directories with trailing slash
RewriteCond $1 !/$
RewriteCond %{REQUEST_FILENAME}/ -d
RewriteRule (.+) http://www.example.com/$1/ [R=301,L]

// Redirect file extensions
RewriteBase /
// redirect (old) calls to php scripts to html file extension
RewriteRule ^(.*)\.php $1.html [R=301,L]
// interal map html extension to php extension
RewriteRule ^(.*)\.html $1.php [L]
{% endhighlight %}

###	Redirect (sub)domains
{% highlight apacheconf %}
// Permanent redirect (301) to new domain
RewriteEngine on
RewriteCond %{HTTP_HOST} ^www\.olddomain\.com$ [NC]
RewriteRule ^(.*)$ http://www.newdomain.com/$1 [R=301,L]

// Permanent redirect (301) to www.*
RewriteCond %{HTTP_HOST} ^example.com$
RewriteRule ^(.*)$ http://www.example.com/$1 [R=301]

// Permanent redirect (301) to domain without www
RewriteCond %{HTTP_HOST} ^example.com$
RewriteRule (.*) http://www.example.com$1 [R=301]

{% endhighlight %}

##	Url mapping
{% highlight apacheconf %}
// map single url
RewriteRule ^the-best-mod-rewrite-cheatsheet$ cheatsheet.html [L]

// map all urls that consist of alphanumeric to frontcontroller (index.php)
RewriteRule ^([a-z0-9-]+)/? index.php?page=$1 [NC,L]

// Path without file extensions
RewriteCond %{REQUEST_FILENAME}.php -f  
RewriteRule ^/?([a-z0-9]+)$ $1.php [NC,L]  
RewriteCond %{REQUEST_FILENAME}.html -f  
RewriteRule ^/?([a-z0-9]+)$ $1.html [NC,L]

// Map non-existing urls
RewriteCond %{REQUEST_FILENAME} !-f 
RewriteCond %{REQUEST_FILENAME} !-d 
RewriteRule ^(.*)$ index.php?page=$1
{% endhighlight %}

##	Handling query strings 
{% highlight apacheconf %}
// Check if query parameter exists
RewriteCond %{QUERY_STRING} !parameter=
RewriteRule ^/?parameter\.php$ missing.php [QSA,L]

// Delete query string from request
RewriteRule ^test\.php$ test.php?

// also remove from browser's address bar
RewriteRule ^test\.php$ test.php? [R,L]
{% endhighlight %}

## Security

###	Authorization

#### Deny access by IP

In most cases using Allow `<IP>` and Deny `<IP>` is better. However you can also control access by IP via mod_rewrite.
{% highlight apacheconf %}
RewriteCond %{REMOTE_ADDR} ^205\.209\.177\.
RewriteRule .* - [F]
{% endhighlight %}

#### Prevent image hotlinking
{% highlight apacheconf %}
RewriteCond %{HTTP_REFERER} !^$  
RewriteCond %{HTTP_REFERER} !^http://(www\.)?example\.com/ [NC]  
RewriteRule \.(gif|jpg|jpeg|png)$ - [F]
{% endhighlight %}

### Protocols

#### Ensure HTTPS
{% highlight apacheconf %}
// based on protocol
RewriteCond %{REQUEST_URI} ^secure_area/  
RewriteCond %{HTTPS} !on   
RewriteRule ^(.*)$ https://www.example.com/$1 [R=301,L]

// alternative using server port
RewriteCond %{REQUEST_URI} ^secure_area/  
RewriteCond %{SERVER_PORT} !^443$ 
RewriteRule ^(.*)$ https://www.example.com/$1 [R=301,L]
{% endhighlight %}

## Example rule

###	Query String
Check for the specific query string key/value
{% highlight apacheconf %}
RewriteCond %{QUERY_STRING}  (&|^)id=admin(&|$)
{% endhighlight %}

###	Header check

#### HTTP
{% highlight apacheconf %}
RewriteEngine On
RewriteCond %{HTTP:x-custom-header} ^(value1|value2|value3)$
RewriteRule .* http://google.com [L,R]
{% endhighlight %}

#### Using SSL
{% highlight apacheconf %}
LoadModule ssl_module modules/mod_ssl.so
Listen 443
<VirtualHost *:443>
   SSLEngine On
   SSLCertificateFile /etc/httpd/server.pem
   RewriteEngine On
   RewriteCond %{HTTP:x-custom-header} ^(value1|value2|value3)$
   RewriteRule .* http://google.com [L,R]
</VirtualHost>
{% endhighlight %}

### Check the direction.
{% highlight bash %}
[root@localhost conf]# curl -k http://localhost
OK
[root@localhost conf]# curl -k -H 'x-profile:value1' http://localhost
...
<p>The document has moved <a href="http://google.com">here</a>.</p>

[root@localhost conf]# curl -k -H 'x-profile:abcd' http://localhost
{% endhighlight %}
