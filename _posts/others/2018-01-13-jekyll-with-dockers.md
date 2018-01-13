---
layout: post
title: "Jekyll with dockers"
category: "Others"
tags:
-  jekyll
-  dockers
excerpt:
  Running Jekyll with minimal setup with Dockers.
---
To run jekyll generated static site with minimal setup and fuss, dockers comes to the rescue. This article is about to setup jekyll in the most easy way so that modification for your blog or site is easy.

[Read how to setup jekyll from scratch][Read how to setup jekyll from scratch].

* TOC:
{:toc}

## Bootstrap Dockers.
Install [Dockers][Dockers] and [dockers-compose][dockers-compose]. The setup are straight forward.

## Running Jekyll dockers
Go the directory where your site is and create file name `docker-compose.yaml` with the following content.

```yaml
version: '3'

services:
  jekyll:
    container_name: jekyll
    image: jekyll/jekyll
    ports:
      - "4000:4000"
    volumes:
            - ".:/srv/jekyll"
    command: jekyll serve --incremental --force_polling
```

### Description.
* <kbd>container_name</kbd> : The name of the container. You can name anything you like relevant but this name will be use if you want to actually log-in to the docker container.
* <kbd>image</kbd> : The name of the image that need to pull from the dockers hub. This should not change.
* <kbd>ports</kbd> : The port where you want to expose the host to reach your site. Say http://localhost:4000/
* <kbd>volumes</kbd> : This tell to the containe to mount your current directory to the /srv/jekyll so that `jekyll serve can find your site.`
* <kbd>command</kbd> : The entrypoint comment to run jekyll.

To run the jekyll container.
{% highlight bash %}
docker-compose up
{% endhighlight %}
If you want to run in background
{% highlight bash %}
docker-compose up -d
{% endhighlight %}

The site should be reachable at `http://localhost:4000/`

Should you require to log-in to the container
{% highlight bash %}
docker exec -it jekyll bash
{% endhighlight %}

[Read how to setup jekyll from scratch]: http://ningzeta.com/others/2016/10/12/run-jekyll-local.html
[Dockers]: https://www.docker.com/
[dockers-compose]: https://docs.docker.com/compose/install/
