---
layout: post
title: "Common Linux Command On Files"
description: ""
category:	"Linux" 
tags:
-  linux
excerpt: Some command used in linux.
---
* TOC:
{:toc}

## Finding files

###	Using `find`
{% highlight bash %}
# find all files under `/` with name starting with `index`
find / -name "index*"

# filter with size
find /home -size +10000k	# more then 10 Mb
find /home -size -10000k	# less then 10 Mb

# filter with access time
find /home -amin -10	# 10 min ago
find /home -atime -10 	# 10 hours ago

# filter with modified time
find /home -mmin -10	# 10 min ago
find /home -mtime -10 	# 10 hours ago

# execute some cmd on the result of the find
$ find / - name 'index*' -exec ls -l {\}\ \;		# ls -l
{% endhighlight %}

###	Using `grep`
Find files containing specific pattern of string.
{% highlight bash %}
grep -Iri "mycooltext" /path

# Only certain file extension
grep --include=\*.{yaml,yml} -irnw '/' -e "redis"

# use `--exclude` when excluding certain file pattern.
grep --exclude=\*.{log,out} -irnw '/' -e "redis"

{% endhighlight %}


##	Listing files size in decending order
{% highlight bash %}
du -k * | sort -nr | cut -f2 | xargs -d '\n' du -sh
{% endhighlight %}