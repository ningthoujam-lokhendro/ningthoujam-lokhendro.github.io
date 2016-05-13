---
layout: post
title:  "WGET some options"
date:   2014-04-02 12:22:05 +0530
category:	"Linux"
author:	Ningthoujam Lokhendro
---
WGET is small and awesome application that comes with all distros as it is under GNU. Anyone who want to get contents from the web server is aware of this. It supports downloading via HTTP, HTTPS and FTP protocol. There are already enough material available about WGET but this article is to get all files in a directory by wget.

{% highlight shell %}
# Downloading a single file content can be as easy as
[user@localhost]$ wget http://example.com/abc.zip

# But to get all files under a directory by wget pass the –no-parent, otherwise directory index on the site will come.
[user@localhost]$ wget -r --no-parent http://mysite.com/xyz/ 

# To avoid downloading the index.html files, use this command:
[user@localhost]$ wget -r --no-parent --reject "index.html*" http://mysite.com/xyz/
{% endhighlight %}
