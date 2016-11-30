---
layout: post
title: "Generate Self Sign SSL certificate"
description: ""
category: "Others"
tags:
-  ssl
-  apache
excerpt: Generate Self Sign SSL
---
* TOC:
{:toc}

## Tools
OpenSSL need to be installed. The OpenSSL project does not distribute any code in binary form, and does not officially recommend any specific binary distributions. An informal list of third party products can be found on the [wiki][]. 

For linux base, use the repository for the respective distros. For windows, grap the [Windows version of OpenSSL][]

For Centos/RedHat:
{% highlight bash %}
yum -y install openssl
{% endhighlight %}

##	Generate Your Apache Self Signed Certificate
For Centos/RedHat:
{% highlight bash %}
openssl req -nodes -x509 -sha256 -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt

# add -subj '/CN=*.ningzeta.com' to suppress questions about the contents of the certificate

{% endhighlight %}

> * req - PKCS#10 certificate request and certificate generating utility.
* -nodes - if this option is specified then if a private key is created it will not be encrypted.
* -x509	- this option outputs a self signed certificate instead of a certificate request. This is typically used to generate a test certificate or a self signed root CA.
* -sha256 - Hasing algorithm used.
* -days - when the -x509 option is being used this specifies the number of days to certify the certificate for. The default is 30 days.
* -newkey - this option creates a new certificate request and a new private key. The argument takes one of several forms. rsa:nbits, where nbits is the number of bits, generates an RSA key nbits in size.
* -keyout - this gives the filename to write the newly created private key to.
* -out - This specifies the output filename to write to or standard output by default.
{: .bg-info}

You will be prompted to enter your organizational information and a common name. The common name should be the fully qualified domain name for the site you are securing (www.server.com). You can leave the email address, challenge password, and optional company name blank. When the command is finished running, it will create two files: a __privateKey.key__ file and a __certificate.crt__ self signed certificate file valid for 365 days.

> use __*.ningzeta.com__ in __common name__ for generating wildcard certificate
{: .bg-primary}

If you want to combine the key and the certificate in a pem file
{% highlight bash %}
cat certificate.crt privateKey.key > cert.pem
{% endhighlight %}
{: .bg-warning}

##	Add in apache configuration
Edit and add the following the httpd.conf
{% highlight apacheconf %}
Listen 443
<VirtualHost *:443>
   SSLEngine On
   SSLCertificateFile /etc/httpd/server.crt
   SSLCertificateKeyFile /etc/httpd/server.key
</VirtualHost>
{% endhighlight %}

Restart the apache service daemon.

## Install the certificate
###	On Microsoft Windows
1. Open Microsoft Management Console (Start --> Run --> mmc.exe);
2. Choose File --> Add/Remove Snap-in;
3. In the Standalone tab, choose Add;
4. Choose the Certificates snap-in, and click Add;
5. In the wizard, choose the Computer Account, and then choose Local Computer. Press Finish to end the wizard;
6. Close the Add/Remove Snap-in dialog;
7. Navigate to Certificates (Local Computer)
8. Choose a store to import:
	1. If you have the Root CA certificate for the company that issued the certificate, choose Trusted Root Certification Authorities;
	2. If you have the certificate for the server itself, choose Other People
9. Right-click the store and choose All Tasks --> Import
10. Follow the wizard and provide the certificate file you have;

###	On a Linux distribution
1. Place the certificate in the machine.  The following commands will assume that it is located in /root/certificate.cer
2. As root run:
{% highlight bash %}
source /etc/sysconfig/outsystems
$JAVA_HOME/bin/keytool -import -alias <give_it_a_name_here> -keystore $JAVA_HOME/jre/lib/security/cacerts -file /root/certificate.cer
{% endhighlight %}

You will probably be asked for a password. If you haven't changed it, the password is "changeit".
When the tool asks you if you want to trust this certificate, answer "yes".

Refer [OpenSSL][] and [here][] for more info.

[OpenSSL]:	https://www.openssl.org/
[wiki]:	https://wiki.openssl.org/index.php/Binaries
[Windows version of OpenSSL]:	http://slproweb.com/products/Win32OpenSSL.html
[here]: https://jamielinux.com/docs/openssl-certificate-authority/index.html
