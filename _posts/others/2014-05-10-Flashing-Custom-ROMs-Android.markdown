---
layout: post
title:  "Flashing Custom ROMs Android"
date:   2014-05-10 22:22:05 +0530
category:	"Others"
author:	Ningthoujam Lokhendro
tags: ['android','custom rom','ClockworkMod','rooting']
excerpt: Ever bored of using the same feature and user interface of your phone. Is your phone performing slow and battery is draining?  If you own an android device you can taste different flavor of the those by flashing the ROM.
---
Ever bored of using the same feature and user interface of your phone. Is your phone performing slow and battery is draining?  If you own an android device you can taste different flavor of the those by flashing the ROM. There are many ROMs floating in the net. You can choose the best that suite you and flash them. If you are new in this area heads to my previous article of [Anyone can Root Android device][Anyone can Root Android device], where most of the terminology and benefits are defined.

## So what does it takes.
First and foremost your device need to be Rooted. To know more about rooting and how to do, head to my previous article [Anyone can Root Android device][Anyone can Root Android device]. Next after rooting your devices, you need to have a custom recovery installed. A custom recovery is a non-stock recovery, which can install over the stock recovery. The most appropriate reason to install is extra feature and easy to use. To know more about custom recovery and installing head to [Android Custom Recovery][Android Custom Recovery].

After Rooting and installing custom recovery, you are now ready to taste the flavor of different ROM.

## Flashing Custom ROM.
So what is Flashing? `Flashing is erasing and reprogramming of the Read-Only-Memory.` Which means in laymen term, deleting some data and writing on some new data, which in this case in the new android OS.

Here are the Steps:

Step 1 : Root the device

Step 2: Install Custom Recovery

Step 3: Backup

Step 4: Flash Custom ROM

Step 5: Install Google App – GAPP.

Step 1 & 2 has describe before, lets move on to next.

## Backup
First and foremost you should backup your Nandroid so that if anything goes wrong you can get back to the state before you perform flashing. Nandroid backup is nothing but an image of the current state your device. To do this,

1. Reboot and go to your Custom Recovery Mode. Usually a combination of key : Volume key Up + Home key + Power Key. But it might be different for your device.
2. Assuming CWM is used, go to ‘Backup and Restore’ and choose ‘backup’.
You can perform application and data backup at by using `Titanium backup`.

## Flash Custom ROM
Download the firmware of your choice. You can compare from the list here: [Wikipedia][Wikipedia]. `CynogenMod` is what i use and the most tested and used available without any bloatware.

> __Choose the exact firmware for your device model while downloading__

* Download and place at your external card.
* Reboot and go to recovery mode.
* Perform `wipe data/factory reset`. Then `yes-wipe all user data`
* Perform `wipe cache partition`
* Perform `wipe delvik cache` from `advance option.`
* Finally select `install zip`. Then choose `zip from sdcard.`
* Select the `downloaded firmware` and let it perform.
* After completing it will reboot and you will be booted to the new install ROM.

## Install Google App – GAPP
After booting into the new shinny android there won't be any Google apps which include Google Play store to download apps. `Google apps or GAPP` is not included in the firmware because they are not open source and are not license to distribute along with the custom firmwares.

If you are using `CynogenMod`, you can [download from here][download from here]. Choose the one that suits your cynogenmod version. They are all signed bits. If you are using other firmware, the firmware page will list where to find them.

That`s it. Enjoy the new firmware.


[Anyone can Root Android device]: http://ningzeta.com/others/2014/04/05/anyone-can-root-android-device.html
[Android Custom Recovery]: http://ningzeta.com/others/2014/05/04/Android-Custom-Recovery.html
[Wikipedia]: http://en.wikipedia.org/wiki/List_of_custom_Android_firmwares
[download from here]: http://wiki.cyanogenmod.org/w/Google_Apps
