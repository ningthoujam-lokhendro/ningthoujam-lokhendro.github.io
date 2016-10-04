---
layout: post
title:  "Python Errors and Exceptions"
date:   2014-05-14 12:22:05 +0530
category:	"Python"
author:	Ningthoujam Lokhendro
tags:
- python
- Error
- Exceptions
excerpt: Python error and exceptions are discuss and how they are handle. Handling error and exceptions can be done in various ways.
---

Before writing an application its important to understand and implement Error/Exception for any programming language. I will try to modestly describe the Python errors and exceptions on this article. There are already many documentation that describe and even whole section of books in this but lets see briefly and to the point. That’s all about python programming.

## Errors
In python, `errors are actually syntax errors`. That means they are cause by the wrong syntax while writing the code. The python interactive shell will give

1. A good stack trace about the syntax error
2. Line number where the syntax error occur
3. An ‘arrow’ pointing just before it happen or at least where it is.

## Exceptions
In python, exceptions occur during program run-time. That means if you have a syntactically correct code, during program execution if errors occurs then they generate exceptions. Example would be if code can not find a file referred or divide-by-zero etc. Python give out a good stack trace as well for the exception as in the Syntax Errors.

1. A good stack trace about the syntax error
2. Line number where the syntax error occur
3. An ‘arrow’ pointing just before it happen or at least where it is.
4. The type of Exception.

All the [build-in Exception][build-in Exception] are define and listed in the python resource.

Exception can be handle inside the program and proceed according to your use-case.

## Handling Exceptions
Exceptions are handle in python using:
{% highlight Python %}
try:
	Danger Statement
except:
	Handle statement
{% endhighlight %}

Want to know more about try statement.

The previous `except` catch all exceptions but if you want to handle specificly certain exception you can define the exception type:
{% highlight Python %}
except ZeroDivisionError:
{% endhighlight %}

Multiple level of exception can be caught and define how to handle them or multiple exception type handle with same nature.
{% highlight Python %}
except ZeroDivisionError:
	#handle Statement
except IOError:
	#handle Statement
except KeyError:
	#handle Statement
{% endhighlight %}

or
{% highlight Python %}
except (KeyError IOError ZeroDivisionError) :
	#handle for all exception defined above
{% endhighlight %}

If non of the exception type is matched, it would

1. See if “except” is defined to catch any exception
2. If “except” is not defined it is propagated as unhandled exception and displayed as exception during runtime.

## More About Exceptions
As you continue to write and handle exception, you will want to show more details about the exception that has occur. To diplay more details about the exception set a parameter of that exception type:
{% highlight Python %}
except NoSectionError, msg:
	print "Missing section [" + msg.section + "]
{% endhighlight %}
or
{% highlight Python %}
except IOError, (errno, strerror):
	print "I/O error (%s) : %s" % (errno, strerror)
{% endhighlight %}

And if you want the argument for the general exceptions
{% highlight Python %}
except Exception as exp:
    print exp.arg                      # argument of the exception
    print exp                          # defined in __str__()
    print type(exp)                    # type of exception
{% endhighlight %}

## Raising Exception
If you want exception to occur intentionly then `raise` keyword is used. Why would you want exception to generate intentionally, well there are cases where you will need this more then catching the exception.

Say you are reading a file and the file is not there, do you want the exception generate during runtime handle using `except` or check the file it exist and raise the exception.

{% highlight Python %}
from os.path import isfile

if not isfile(some_file):
    raise IOError("No File with name " + some_file + " in " + getcwd())
{% endhighlight %}

Raising exception can be fun and handling them quit flexible when using with your custom exception exception or user define exception.

## User-defined Exception
User-defined exception are those exception which you can define the type by declaring a class. These user-defined exception should be derieve directly or indirectly from the `Exception`.

{% highlight Python %}
#custom exception
class MyException(Exception):

def __init__(self, value):
   self.parameter = value

def __str__(self):
   return repr(self.parameter)
{% endhighlight %}

Both the function __init__() and __str__() are overridden from the main “Exception”.

`__init__() :` initialize the exception parameters.<br/>
`__str__() :` Define how the exception will be printed out.

Taking this as an example using the previous check to raise the exception would be:
{% highlight Python %}
from os.path import isfile

if not isfile(some_file):
	raise MyException("No File with name " + some_file + " in " + getcwd())
{% endhighlight %}

## Cleaning up
Its always good practice to clean up the resources of the system if an exception as occur or job has been completed and release them.

To do clean up use `finally`, this block of statement under finally will always run weather exception has occur or not.
{% highlight Python %}
try:
    Statement
except:
    Handle statement
finally:
    Always execute statement
{% endhighlight %}

## Build-in Clean up
Rather then using finally and making the code lengthy you can use `with` keyword on certain cases to free up the resources automatically.
{% highlight Python %}
with open(“myfile.txt”) as f:
    dosomething
{% endhighlight %}

What does with does here?

It `open` the file and return the whatever value to the `as` defined: here `f`. Upon completion of dosomething statement, it free up the resource. As a bonus while exiting it look for any exception, suppress it or act on it. In summary: Open a file, process its content and make sure to close the file.

[build-in Exception]: https://docs.python.org/2/library/exceptions.html#bltin-exceptions
