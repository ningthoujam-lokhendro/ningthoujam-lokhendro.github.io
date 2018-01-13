---
layout: post
title: "Generate Self Sign SSL Certificate"
category: "Linux"
tags:
-  openssl
-  ssl
author:	Ningthoujam Lokhendro
---
The following is a simplified way to generate to self-signed certificate use for development and testing.
Assumption is made that <kbd>openssl toolkit</kbd> is installed in the system. Openssl toolkit has many options and the following steps use some of those features.
* TOC:
{:toc}

## Step 1: Generate the Private Key.
First step is to generate the <kbd>RSA</kbd> private key. Let's use 2048 bit length.

{% highlight bash %}
openssl genrsa -out ningzeta.com.key 2048
{% endhighlight %}

This will generate a file - <kbd>ningzeta.com.key</kbd> which contains the private key. You can protect the key by encrypting it with `Triple-DES`.

{% highlight bash %}
openssl genrsa -des3 -out ningzeta.com.key 2048
{% endhighlight %}

> When apache webserver is restarted, it will ask passphase for key if you have specified to protect the key. Make sure you don't forget the passphrase if you have specified it.
{: .quote-card .red-card }

## Step 2: Generate a CSR (Certificate Signing Request)
On having the private key, the __CSR__ can be generated. For use in real world, the generated CSR is sent to a __CA__(Certification Authority) who verify the identity of the requestor and issue a signed certificate.

During the generation of __CSR__, openssl will prompt for several information. These are __X.509__ attributes for the certificate. One important attribute is the __Common Name__ - `This is the FQDN of the server to be protected by the SSL. In my case its ningzeta.com. If you want to create wildcard certificate then *.ningzeta.com`.

{% highlight bash %}
openssl req -new -key ningzeta.com.key -out ningzeta.com.csr
{% endhighlight %}

At this stage, you will have a CSR file - <kbd>ningzeta.com.csr</kbd>.

## Step 3: Generate a Self-Signed Certificate
As this is for the temporary use for development and testing and not signed by proper CA, browser will generate an error as unknown and not trusted.

To generate a temporary self-signed certicate for 365 days.

{% highlight bash %}
openssl x509 -req -days 365 -in ningzeta.com.csr -signkey ningzeta.com.key -out ningzeta.com.crt
{% endhighlight %}

The above will use sha1 which is broken now and not supported in the most modern browser. To use __sha2__(sha224, sha256, sha384, sha512 etc), add `-sha256`.

{% highlight bash %}
openssl x509 -sha256 -req -days 365 -in ningzeta.com.csr -signkey ningzeta.com.key -out ningzeta.com.crt
{% endhighlight %}

At this stage, you will have a self-signed certifiacted file - <kbd>ningzeta.com.crt</kbd>.

You can also combine and store the private key and certificated in one file

{% highlight bash %}
cat ningzeta.com.crt ningzeta.com.key > ningzeta.com.pem
{% endhighlight %}

## Configuring Apache.
The following steps are use to configure apache to use the above generated certificate and key.

### Storing the Private Key and Certificate.
The location can be anywhere in the local filesystem but most common place to store is inside the apache directory. If you are using the pem file, store the pem file in the same location.

{% highlight bash %}
cp ningzeta.com.crt /etc/httpd/conf/ssl/ningzeta.com.crt
cp ningzeta.com.key /etc/httpd/conf/ssl/ningzeta.com.key

# for pem file
cp ningzeta.com.pem /etc/httpd/conf/ssl/ningzeta.com.pem
{% endhighlight %}

### Defining in the Virtual Host.
Defined the certificate and private key inside the virtual host configuration.

{% highlight bash %}
<VirtualHost *:443>
	SSLEngine on
	SSLCertificateFile 	/etc/httpd/conf/ssl/ningzeta.com.crt
	SSLCertificateKeyFile	/etc/httpd/conf/ssl/ningzeta.com.key

	# other definitions
</VirtualHost>
{% endhighlight %}

`Restart apache` to load the new configuration.
