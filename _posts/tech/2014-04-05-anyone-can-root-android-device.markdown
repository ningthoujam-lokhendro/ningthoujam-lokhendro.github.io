---
layout: post
title:  "Anyone can Root Android device"
date:   2014-04-05 22:22:05 +0530
category:	"Everyday Tech"
author:	Ningthoujam Lokhendro
tags: ['android','rooting']
excerpt:  Rooting means taking control of your device. When the manufacturer sell you the device, the operation of device is run in an environment and limit define by the manufacturer. The full potential of device is not explore. When you root the device, you are the super user, you now actually own a property that you can do whatever limit you want the hardware can take.
---

<img class="img-responsive" style="float: left;max-width: 30%" src="{{baseurl}}/assets/images/Root.png">

* TOC
{:toc}

##  Who can root android devices?
The answer is anyone with basic working knowledge of computer, smartphone can – Anyone can root Android Device.This step by step tutorial will guide you to root your android device. But before that, understanding of what rooting means is needed to know what you will be getting out of it and what you will not

## What is Rooting Android device?
Rooting means taking control of your device. When the manufacturer sell you the device, the operation of device is run in an environment and limit define by the manufacturer. The full potential of device is not explore. When you root the device, you are the super user, you now actually own a property that you can do whatever limit you want the hardware can take. You are not bound by rules define by anyone.

## What is so Good about it?
When you bought a android device, the manufacture install lots of software. These software are really good if you are average user and don't mind to stay in the dictation of the manufacturer. But also contains bloatware which makes the device slower; can install apps that only does not exploit the true potentials of you device; battery consumption more….

In Summary the benefits would be improve battery life, root apps, trying custom ROMs, overclocking, no bloatware, increase in performance and trying out or updating new android version even though the manufacturer does not have not release the updates. If you are shy from these, rooting is not for you.

## Downside?
You warranty will be void – there are ways to regain it. Expose to the wilderness with protection of your own.

## Terms frequently used.
`Root:` Android rooting is the process of allowing users of smartphones, tablets, and other devices running the Android mobile operating system to attain privileged control (known as “root access”) within Android’s sub-system.

`ROM:` They are software bundle that sit on the hardware. If you are familiar with linux, its similar to that. It is composed of a Linux kernel and various add-ons to achieve specific functionality. Its an operating system. You can install as many time with different flavor. Hence many ROM are floating in the internet.

`Flash:` Technically and to say it easily, erasing the present data and writing new data. This is putting new flavor of ROM.

`Brick:` Make the device non-function or operable.

`Bootloader:` Booting is the initial set of operations that a computer system performs after electrical power to the CPU is switched on or reset. Bootloader is a piece of software that handle this loading.

## Not Dummy Question.
`Will rooting, unlock my phone?`<br/>
No. Rooting your phone with not unlock it. Those are two different thing. Rooting give you privilege to perform operation in your phone while unlocking means freeing your phone from certain carrier. But rooting is the first step to unlock your phone. You should root your phone before unlocking them.

`Will it void the warranty?`<br/>
Yes, rooting your device will void the warranty. But there is a way for certain devices. Whenever you perform an action on the ROM, a counter is incremented. Resetting this counter will do the job.

`Will I get OTA(Over-The-Air) Update?`<br/>
Yes, you can continue to get OTA update unless you flash with a custom ROM. If an update is made and it will be automatically un-root your phone.

`Will it brick my phone?`<br/>
Possibly but not likely. If you perform the root properly, its very unlikely.

`Is it illegal?`<br/>
A more description is define here [wikipedia][wikipedia]

Now that you understand what rooting means, time to hack.

## What you will be needing?
1. PC/Laptop running windows.
2. USB cable connector.
3. Odin – Download [Odin307][Odin307]
4. Rooting software. [Download from here][Download from here]. Select for your device.

## Before Rooting
Take backup using Titanium backup or any other of your choice.

## Start Rooting.
The steps can be different for different manufacturer if you have other than Samsung head to XDA forum for more information.

Before proceding, make your phone is USB debuging mode. Setting -> Developer -> USB Debug

**Step 1:** Download and install the [Samsung USB driver][Samsung USB driver].

**Step 2:** Boot in Odin Mode.

* Press Volume Down+Home+Power Key until you see a disclaimer on the screen.
* Volume up to accept the disclaimer.
* Green andriod bot will be visible. This means the phone is in download mode(odin mode)

**Step 3:** Connect the usb to your pc and start Odin

* Plug your GT-I9300 into the computer, wait for the drivers to install and then wait for the ID:COM section to turn blue.
* Check only ‘Auto Reboot’ and ‘F. Reset Time’ in the options.
* Click on the PDA button: Browse and select the Root zip file your have download.
* Click Start and it will do the reboot when completed. Don't shutdown or Disconnect the cable untill ‘Pass’ Appears in the Odin.

Download `SuperSU` from play store and check if your device is rooted.

There are also some one click root available like [Kingo][Kingo].

If you have any issue head to [xda-developers][xda-developers], where all expert roam around.

[wikipedia]: https://en.wikipedia.org/wiki/Rooting_(Android_OS)#Legality
[Odin307]: http://forum.xda-developers.com/attachment.php?attachmentid=1168421
[Download from here]: https://autoroot.chainfire.eu/
[Samsung USB driver]: http://downloadcenter.samsung.com/content/SW/201211/20121110030255344/Samsung_USB_Driver_for_Mobile_Phones_v1.5.14.0.exe
[Kingo]:http://www.kingoapp.com/android-root.htm
[xda-developers]: http://forum.xda-developers.com/
