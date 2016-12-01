---
layout: post
title: "Common OpenSSL commands"
description: ""
category: "Others" 
tags:
-  ssl
-  apache
excerpt: SSL tools openssl - some of the general usage commands.
---
* TOC:
{:toc}

## General OpenSSL commands

* Generate a new private key and Certificate Signing Request
{% highlight bash %}
openssl req -out CSR.csr -new -newkey rsa:2048 -nodes -keyout privateKey.key
{% endhighlight %}

* Generate a self-signed certificate
{% highlight bash %}
openssl req -nodes -x509 -sha256 -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt
{% endhighlight %}

* Generate a certificate signing request (CSR) for an existing private key
{% highlight bash %}
openssl req -out CSR.csr -key privateKey.key -new
{% endhighlight %}

* Generate a certificate signing request based on an existing certificate
{% highlight bash %}
openssl x509 -x509toreq -in certificate.crt -out CSR.csr -signkey privateKey.key
{% endhighlight %}

* Remove a passphrase from a private key	
{% highlight bash %}
openssl rsa -in privateKey.pem -out newPrivateKey.pem
{% endhighlight %}

##	Checking Using OpenSSL

* Check a Certificate Signing Request (CSR)
{% highlight bash %}
openssl req -text -noout -verify -in CSR.csr
{% endhighlight %}

* Check a private key
{% highlight bash %}
openssl rsa -in privateKey.key -check
{% endhighlight %}

* Check a certificate
{% highlight bash %}
openssl x509 -in certificate.crt -text -noout
{% endhighlight %}

* Check a PKCS#12 file (.pfx or .p12)
{% highlight bash %}
openssl pkcs12 -info -in keyStore.p12
{% endhighlight %}

##	Debugging Using OpenSSL

* Check an MD5 hash of the public key to ensure that it matches with what is in a CSR or private key
{% highlight bash %}
openssl x509 -noout -modulus -in certificate.crt | openssl md5
openssl rsa -noout -modulus -in privateKey.key | openssl md5
openssl req -noout -modulus -in CSR.csr | openssl md5
{% endhighlight %}

* Check an SSL connection. All the certificates (including Intermediates) should be displayed
{% highlight bash %}
openssl s_client -connect www.paypal.com:443
{% endhighlight %}

##	Converting Using OpenSSL

* Convert a DER file (.crt .cer .der) to PEM
{% highlight bash %}
openssl x509 -inform der -in certificate.cer -out certificate.pem
{% endhighlight %}

* Convert a PEM file to DER
{% highlight bash %}
openssl x509 -outform der -in certificate.pem -out certificate.der
{% endhighlight %}

* Convert a PKCS#12 file (.pfx .p12) containing a private key and certificates to PEM
{% highlight bash %}
openssl pkcs12 -in keyStore.pfx -out keyStore.pem -nodes
{% endhighlight %}

* Convert a PEM certificate file and a private key to PKCS#12 (.pfx .p12)
{% highlight bash %}
openssl pkcs12 -export -out certificate.pfx -inkey privateKey.key -in certificate.crt -certfile CACert.crt
{% endhighlight %}

Reference [sslshoppers][]


[sslshoppers]: https://www.sslshopper.com/article-most-common-openssl-commands.html