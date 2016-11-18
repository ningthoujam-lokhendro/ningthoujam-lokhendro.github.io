---
layout: post
title: "Booting Vagrant"
description: "Start Vagrant with initial basic configuration"
category: "Others"
tags:
- vagrant
- virtualization
- linux
excerpt:  Ease the development setup and saving with Vagrant.
---
* TOC:
{:toc}

## What is Vagrant?
Vagrant makes the web development at ease for setting up the different component and share with others. The most take away with using vagrant is the ease of setup(provisioning) and saving the certain shapshot of your work ecosystem.

To use vagrant, virtualization software package is necessary - VirtualBox, VMWare..

## Install Vagrant.
Vagrant shipped with support for VirtualBox,Hyper-V and Docker.
[Download Vagrant][Download Vagrant] and install according to your operating system.

## Configuration of vagrant file
Vagrant should be available in your path.
Now create a vagrant file
{% highlight bash %}
vagrant init hashicorp/precise64
{% endhighlight %}
This will use the default ubuntu box. If you want to use other box search at the [hashicorp][hashicorp]

With the above cmd a vagrant file should be generated with named <kbd>Vagrantfile</kbd>
This file is core of the configuration of the vagrant where the virtual machine configuration is done with the Provisioning - preinstall all required package.
## Networking
Basic Networking of the machine configuration at the Vagrant file are:

### Forwading Port
{% highlight cmd %}
config.vm.network "forwarded_port", guest: 80, host: 8080
{% endhighlight %}

if you want more port to be forwarded include these and optional protocal can also be define
{% highlight cmd %}
config.vm.network "forwarded_port", guest: 1337, host: 11337, protocal: "tcp"
{% endhighlight %}

### Setup your Private Network
This allow host only access to the machine.
{% highlight cmd %}
config.vm.network "private_network", ip: "192.168.33.10"
{% endhighlight %}

For more detail configuration on network refer at [Vagrant Network configuration][Vagrant Network configuration]

## Add Plugin
Install the virtual-box guest addition plugin for syncing the host directory.
{% highlight bash %}
  vagrant plugin install vagrant-vbguest
{% endhighlight %}
## Provisioning
Provisioning is setting up the machine to pre-install software packages and configure automatically.
Different Provisioning are supported such as Shell,Puppet, Chef, Ansible, Salt, and Docker. Shell is default one.
You can either define inline in the vagrantfie or in a separate script.

### Inline shell script
Example of inline shell to update the debian and install Apache can be as :
{% highlight bash %}
config.vm.provision "shell", inline: <<-SHELL
   sudo apt-get update
   sudo apt-get install -y apache2
 SHELL
{% endhighlight %}

### External shell script
To use shell provision witht a external shell script:
{% highlight cmd %}
config.vm.provision "shell", path: "script.sh"
{% endhighlight %}

### Remote shell script
For Remote file:
{% highlight cmd %}
config.vm.provision "shell", path: "https://example.com/provisioner.sh"
{% endhighlight %}

### Upload File
To upload a file to the guest machine from the host:
{% highlight cmd %}
config.vm.provision "file", source: "~/httpd.conf", destination: "httpd.conf"
{% endhighlight %}

### Puppet
Can perform in two types : Puppet Apply and Puppet Agent
#### Puppet Apply
Define the manifest and apply the provisioning.
This will instruct vagrant that provisioning is going to be puppet.
{% highlight cmd %}
Vagrant.configure("2") do |config|
  config.vm.provision "puppet"
end
{% endhighlight %}

And by default will look at the 'manifest' directory at the current directory and use the default.pp as the entry point.
{% highlight bash %}
$ tree
.
|-- Vagrantfile
|-- manifests
|   |-- default.pp
{% endhighlight %}

#### Puppet Agent
This is defined as the puppet agent and you need to set the location of the puppet master.
{% highlight cmd %}
Vagrant.configure("2") do |config|
  config.vm.provision "puppet_server" do |puppet|
    puppet.puppet_server = "puppet.example.com"
  end
end
{% endhighlight %}
And defined the node as:
{% highlight cmd %}
Vagrant.configure("2") do |config|
  config.vm.provision "puppet_server" do |puppet|
    puppet.puppet_node = "node.example.com"
  end
end
{% endhighlight %}
[More provision][More provision].

## Basic commands
The following are some of the basic commands of vagrant that will be used regularly.
### Initilization
{% highlight bash %}
vagrant init
{% endhighlight %}

### Bootup
{% highlight bash %}
vagrant up
{% endhighlight %}

### SSH
This is ssh to the box with the default user/password <kbd>vagrant/vagrant</kbd> at default port `2222`.
Default root password `vagrant`.
{% highlight bash %}
vagrant ssh
{% endhighlight %}

### Suspending
This will save the current running state of the machine and stop it. When you are ready to begin working again, just run `vagrant up`, and it will be resumed from where you left off.
{% highlight bash %}
vagrant suspend
{% endhighlight %}

### Halting
This will gracefully shut down the guest operating system and power down the guest machine. You can use `vagrant up` when you are ready to boot it again.
{% highlight bash %}
vagrant halt
{% endhighlight %}

### Destroy
This will remove all traces of the guest machine from your system. It'll stop the guest machine, power it down, and remove all of the guest hard disks. Again, when you are ready to work again, just issue a `vagrant up`
{% highlight bash %}
vagrant destroy
{% endhighlight %}

### Provisioning
On the first run of `vagrant up`, if provision is defined it will run. If you want to rerun again then use the flag `--provision`.

{% highlight bash %}
vagrant reload --provision
{% endhighlight %}
More on the [vagrant cli][vagrant cli]


[Download Vagrant]: https://www.vagrantup.com/downloads.html
[hashicorp]:  https://atlas.hashicorp.com/boxes/search
[Vagrant Network configuration]:  https://www.vagrantup.com/docs/networking/
[vagrant cli]:  https://www.vagrantup.com/docs/cli/
[More provision]: https://www.vagrantup.com/docs/provisioning
