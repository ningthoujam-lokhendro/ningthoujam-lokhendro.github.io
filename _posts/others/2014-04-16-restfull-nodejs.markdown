---
layout: post
title:  "Restful Webservice with NodeJs in 5 Min"
date:   2014-04-16 22:22:05 +0530
category:	"Others"
tags:	['web','nodejs','rest']
---
Its quite easy to create a restful web service for testing and during rapid development. Creating a quick prototype or having a contract that certain data format and type are going to expose help application developer and UI developer to work independently.

Here I am going to describe of creating RestFul webservice with NodeJS in 5 min.

Before we go forward, we need some bits.

### Pre-Requestic:
* [NodeJs][NodeJs]
* [Express][Express]

This process can be perform in any platform. I will be using in Linux(Red Hat).

## First get NodeJs binary and extract to a location.
{% highlight bash %}
wget http://nodejs.org/dist/v0.10.26/node-v0.10.26-linux-x86.tar.gz
{% endhighlight %}

If you want for other platform and OS head to [NodeJsdownload][NodeJsdownload]
Export the path to include the node binary location.

`Export PATH=$PATH:node/bin`

Create a project directory where you want to create the webservice.

## INSTALL EXPRESS.
{% highlight bash %}
npm install express@3.4.8
{% endhighlight %}
I am using older version of express and if you want to use latest version, some syntax might need to tweak as it is in development.

## ACTUAL DEAL
Now create a file `myservice.js` and copy the following code: or [get from github](https://github.com/ningthoujam-lokhendro/dump/blob/master/NodeJs/Web%20service%20example/myservice.js)
{% highlight javascript %}
var express = require('express');
var app = express();

app.configure(function(){
	app.use(express.bodyParser());
});

app.get('/movie/getMovie/:name', function(req, res) {
	res.type('application/json');
	var name = req.params.name;
	console.log("Parameter: " + name);

	movie = new Object();
	movie.name = name;
	movie.genre = "Action";
	movie.rating = "9/10";
	movie.length = "120 min";

	cast = new Object();
	cast.Actor = "Gokul";
	cast.Actress = "Surbala";

	movie.cast = cast;

	res.json(movie);
});

app.post('/movie/postMovie', function(req, res) {
	var movie = req.body;
	console.log("Got request: " + JSON.stringify(movie));
	res.send(movie);
});

app.listen(process.env.PORT || 1337);
{% endhighlight %}

The type and content of response can be change according to your need. You can read from a file, propertyfile, db – (go crazy to get from any source)

The url and port can also be change to whatever your need.

Now save the file and startup your web server.

`node myservice.js`

To Test for GET, you can either use curl or browser to get the result.

>`http://localhost:1337/movie/getMovie/MrAwesome`

[NodeJs]: https://nodejs.org
[NodeJsdownload]: https://nodejs.org/en/download/
[Express]: http://expressjs.com/
