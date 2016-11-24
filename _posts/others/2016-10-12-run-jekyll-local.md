---
layout: post
title: Run Jekyll local
category:	"Others"
tags:
- jekyll
excerpt:
  Blog with static site with Jekyll.
---
In order to run the github-pages that runs on jekyll on your local machine, follow the following steps:

* TOC:
{:toc}

## Ruby Install in Windows
1.  First download and install ruby for your platform, say at <kbd>C:\Ruby23</kbd>
[For windows get from here.] [1]

2.  Download and extract the ruby [dev-kit] [2] at a certain directory, say at <kbd>C:\Ruby23\dev-kit</kbd> and run the following cmd as eleveated user.

3.  Initialize the dev-kit
{% highlight cmd %}
cd C:\\Ruby23\\dev-kit
ruby dk.rb init
{% endhighlight %}

4. Now install the dev-kit
{% highlight cmd%}
ruby dk.rb install
{% endhighlight %}

## Ruby Install in CentOS
### Install Dependant Library
{% highlight bash%}
yum -y install gcc-c++ patch readline readline-devel zlib zlib-devel
yum -y install libyaml-devel libffi-devel openssl-devel make
yum -y install bzip2 autoconf automake libtool bison iconv-devel sqlite-devel
{% endhighlight %}

### Install RVM
{% highlight bash%}
curl -sSL https://rvm.io/mpapis.asc | gpg --import -
curl -L get.rvm.io | bash -s stable

source /etc/profile.d/rvm.sh
rvm reload

rvm install 2.2.4
{% endhighlight %}

##  Install Jekyll gem.
Now install basic gem to get started. Use the following syntax to install gem.

{% highlight cmd %}
gem install <gem-name> -v <version>
{% endhighlight %}

<div class="well note">
  NOTE: Ignore -v to install the latest version.
</div>

Using the following gem:
1.  bundle

2.  rake

3.  jekyll

<div class="well note">
  NOTE: For the jekyll check the Jekyll version supported by the github and install it.
</div>

## Install jekyll plugin.
If you want to use plugins in jekyll refer [jekyll doc][3].

For standard <kbd>github-pages</kbd>, put these line inside your Gemfile
{% highlight cmd %}
source 'http://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
{% endhighlight %}

Refer [github-pages][4] for more information.

## Rakefile
This rake file to ease the creation of post and page. The usage is :
{% highlight cmd %}
rake post title="Hello World"
or
rake page title="My Page"
{% endhighlight %}

<pre
  class="language-ruby"
  data-jsonp="https://api.github.com/repos/ningthoujam-lokhendro/ningthoujam-lokhendro.github.io/contents/Rakefile">
</pre>

[1]:  http://rubyinstaller.org/downloads/
[2]:  http://rubyinstaller.org/downloads/
[3]:  http://jekyllrb.com/docs/plugins/
[4]:  https://pages.github.com/versions/
