---
layout: post
title:  "Spring ReST Exception handling"
date:   2015-05-20 16:40:05 +0530
category:	"Java"
author:	Ningthoujam Lokhendro
tags:
- spring
- error
- exception
---

Handling excpetion in Spring web application and returing them to the client meaningfully is important part of the application design.

* TOC
{:toc}

First lets see how the error controller in springboot can be customize.

## Error Controller
Whenever an error happen, spring directs to <kbd>/error</kbd>. The default configuration is vanila. To spice thing a bit, <kbd>implements</kbd> the `org.springframework.boot.autoconfigure.web.ErrorController`. Now instead of returing valina error message, more detail message is recieved by the client.

<pre
  class="language-java"
  data-jsonp="https://api.github.com/gists/5e700af14326ff08ee9bb30c6640f344">
</pre>

## Spring ControllerAdvice
Spring ControllerAdvice takes a level more and makes the error handling more easy. From the application exception are throws up at any particular point. ControllerAdvice is the single point of entry to handle all exception and let you define how to hanndle for each or group of exception.

### Define an exception class extending the <kbd>RuntimeException</kbd>
{% highlight java %}
public class InvalidOUIException extends RuntimeException {

    String oui;

    @Override
    public String getMessage() {
            return "OUI " + this.oui + " id invalid";
    }

    public InvalidOUIException(String oui) {
            this.oui = oui;
    }

    //getter and setter
}
{% endhighlight %}

### Create an ErrorMessage Object.
{% highlight java %}
public class ErrorMessage {
	String timestamp;
	private int status;
	private String error;
	private String exception;
	private String message;
	private String path;

	public ErrorMessage(HttpStatus error, String exception, String message, String path) {
		this.timestamp = DateTime.now().toString(DateTimeFormat.forPattern("EEE MMM dd HH:mm:ss yyyy"));
		this.status = error.value();
		this.error = error.getReasonPhrase();
		this.exception = exception;
		this.message = message;
		this.path = path;
	}

	//getter and setter
}
{% endhighlight %}

### Handle all the exception via ControllerAdvice.
<pre
  class="language-java"
  data-jsonp="https://api.github.com/repos/ningthoujam-lokhendro/DeviceDetail/contents/redis-device-oui/src/main/java/com/ningzeta/deviceOUI/controller/ExceptionProcessor.java">
</pre>

### Throw the exception from where relevant and ControllerAdvice will handle it.

{% highlight java %}

@RestController
class MyController {
	public void doSomething() {
		if(valueNull()) {
			throw new InvalidOUIException("AA-BB-CC");
		}
	}
}
{% endhighlight %}

<i class="glyphicon glyphicon-apple" /> For the full project reference visit [redis-device-oui][redis-device-oui]

[redis-device-oui]: https://github.com/ningthoujam-lokhendro/DeviceDetail/blob/master/
