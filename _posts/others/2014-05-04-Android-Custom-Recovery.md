---
layout: post
title:  "Android Custom Recovery"
date:   2014-05-04 22:22:05 +0530
category:	"Others"
author:	Ningthoujam Lokhendro
tags: ['android','custom rom','clockworkMod','rooting']
---
* TOC:
{:toc}

In Android, recovery is a software that is distinct and separate from the ROM installed operation system. It has its own partition and is booted when certain keys are press togerther. Installed operation system is one you interact with the device to make call, install apps, take pic etc. Recovery on the other hand is used in the system update, diagnostic and perform factory reset of the android system. They comes handy when installing new ROM, updating ROM and even fixing when the installed ROM fails to boot the device.

`Stock Recovery` is the recovery system that comes along with the device. They have limited feature and usage is limited. It can delete user date, reset to factory setting and perform system update.

`Custom Recovery` on the other hand offer much more then the stock recovery. It can backup and restore, delete user data and more. It can also install unofficial package. Partition modification can also perform like mounting, deletion etc. There are some custom recovery developed but the most used and feature rich are `ClockworkMod` and `TeamWin Recovery Project`.

> __In order to installed Custom Recovery, you need to Root your device first. To know more about Rooting head to [Anyone can Root Android device][Anyone can Root Android device].__

## ClockworkMod
ClockworkMod is perhaps the most used custom recovery. Its is also known as the CWM. It main feature is backup and restore. It can also be used for data recovery, installation, restoration and for custom official or unofficial ROM images.

ClockworkMod can be install using Odin but that would require you to use a connection with a pc. This will be in the same process as you have rooted using Odin except use the zip package as the ClockworkMod. A more reliable and easy method is using Rom Manager. Install ROM manager from the Google Play – again your device need to be rooted.

More Details at : [ClockworkMod_Recovery][ClockworkMod_Recovery]

## TeamWin Recovery Project
TeamWin Recovery Project a.k.a TWRP is gaining momentum. This can also be install using Odin or through ROM Manager. The main difference is the UI where TWRP shows in big button which is more visible. More Details at: [TeamWin Recovery Project][TeamWin Recovery Project].

## Installing Custom Recovery
Custom recovery can be installed in many ways but the most used and easy method among them are :

1. Odin Method
2. ROM Manager

Both ways are used by many users and its with their suitability and flavor. Its always good to have CHOICE.

### Odin Method
Odin method of installation is same as the Rooting. The only difference here is to use the Custom Recovery zip file. If you are interested in this method head to [Anyone can Root Android device][Anyone can Root Android device].

### ROM Manager for CWM
Using Rom Manager its becomes quite easy in fact. You will not be using PC as in the case of Odin method. More importantly its faster to install and update. It is an app that basically lets you schedule recovery operations while booted into Android, and has an option for installing the latest version of Recovery. You can find Rom Manager from Google Play.

> __Proceed at your own Risk.__

1. Install ROM Manager on your device. Grant Root permission to the app
2. Launch ‘Rom Manager’ on your phone. The first option it gives you should say ‘Recovery Setup’. Just tap on it and follow the instruction.
3. Wait patiently while the system reboots and the latest version of Recovery is installed. Select to reboot the device if it prompts you to.
4. Once the device reboots into Android, verify that you have the latest version of Recovery installed by launching Rom Manager. It should now mention in the first option that you have ClockworkMod Recovery installed along with its version you’re running, and any updates that might be available. If a newer version is available, tap on that option and follow the instructions to update.

## Goo Manager for TWRP
GooManager can also be found in the `Google Play Store`. It allows for downloads of ROMs, Google Apps packages, kernels, apps, and any other file available via the Android file hosting website.

1. Install GooManager on your device.
2. Launch GooManager once it has been installed.
3. Press Menu and select the ‘Install OpenRecoveryScript’ option. Confirm any prompts that you get after that, and provide the app with root access if it requests for it.
4. Wait patiently till the app downloads the latest TWRP recovery for your device, and installs it.
5. Once the recovery has been installed, confirm that it installed successfully by booting into it. You can do that right from GooManager itself by pressing Menu and selecting the ‘Reboot Recovery’ option.

Once you have Install Recovery of your choice, its time to try out different flavor of Custom ROM.

[Anyone can Root Android device]: http://ningzeta.com/others/2014/04/05/anyone-can-root-android-device.html
[ClockworkMod_Recovery]: http://forum.xda-developers.com/wiki/ClockworkMod_Recovery
[TeamWin Recovery Project]: http://teamw.in/project/twrp2
