---
layout: post
title:  "Increase the size of linux lvm by adding new disk"
date:   2016-08-01 12:22:05 +0530
category:	"Linux"
tags: ['linux','fdisk']
author:	Ningthoujam Lokhendro
---
The Linux Logical Volume Manager(lvm) can be increase when adding a new disk. This is usually usefull when working in virtual machine to add new disk space.

* TOC
{:toc}

## Initial Disk state
First before adding the new disk, check the disk state.
{% highlight bash %}
[root@localhost ~]# fdisk -l

Disk /dev/sda: 34.4 GB, 34359738368 bytes
64 heads, 32 sectors/track, 32768 cylinders
Units = cylinders of 2048 * 512 = 1048576 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x000e2ebd

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *           2         201      204800   83  Linux
Partition 1 does not end on cylinder boundary.
/dev/sda2             202       32768    33348608   8e  Linux LVM
Partition 2 does not end on cylinder boundary.
{% endhighlight %}

From the above, /dev/sda2 is listed as `Linux LVM` and has ID of 8e. Refer [wikipedia for more info on the partition types.][1]

Now to see the disk size which will be increase after adding the new disk,
{% highlight bash %}
[motive@localhost ~]$ df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/mapper/rootvg-rootvol
                       30G   21G  7.0G  75% /
tmpfs                 3.9G     0  3.9G   0% /dev/shm
/dev/sda1             190M   62M  118M  35% /boot
{% endhighlight %}

From the information above, logical-volume named __/dev/mapper/rootvg-rootvol__ has 30gb and thats what we are going to expand.

## Add new virtual disk.
The process to add will be different for different vendor. Following the instruction to add a new disk to the virtual machine.

## Detect new virtual disk.
Issue the `fdisk -l` again to detect the new disk.
{% highlight bash %}
[root@localhost opt]# fdisk -l

Disk /dev/sda: 34.4 GB, 34359738368 bytes
64 heads, 32 sectors/track, 32768 cylinders
Units = cylinders of 2048 * 512 = 1048576 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x000e2ebd

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *           2         201      204800   83  Linux
Partition 1 does not end on cylinder boundary.
/dev/sda2             202       32768    33348608   8e  Linux LVM
Partition 2 does not end on cylinder boundary.

Disk /dev/sdb: 34.4 GB, 34359738368 bytes
64 heads, 32 sectors/track, 32768 cylinders
Units = cylinders of 2048 * 512 = 1048576 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000
{% endhighlight %}

A new disk is detected with __Disk /dev/sdb: 34.4 GB__

## Partition the new disk
Follow the command below:
{% highlight bash %}
# choose the disk to partition
[root@localhost opt]# fdisk /dev/sdb
# choose n for new partition
Command (m for help): n
# choose p for primary
Command action
   e   extended
   p   primary partition (1-4)
p
# No partition yet so choose 1
Partition number (1-4): 1
# Choose default, enter key
First cylinder (2-32768, default 2): 'enter'
Using default value 2
Last cylinder, +cylinders or +size{K,M,G} (2-32768, default 32768): 'enter'
Using default value 32768
# choose partition type, 8e for Linux LVM
Command (m for help): t
Selected partition 1
Hex code (type L to list codes): 8e
Changed system type of partition 1 to 8e (Linux LVM)
# write the changes
Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
{% endhighlight %}

Issuing `fdisk -l` will list the new partition now.
{% highlight bash %}
   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1               2       32768    33553408   8e  Linux LVM
{% endhighlight %}

## Increasing the Logical Volume
First lets create the physical volume with `pvcreate`
{% highlight bash %}
[root@localhost opt]# pvcreate /dev/sdb1
  Physical volume "/dev/sdb1" successfully created
{% endhighlight %}

Confirm the volume group
{% highlight bash %}
[root@localhost opt]# vgdisplay
  --- Volume group ---
  VG Name               rootvg
  VG Size               31.78 GiB
{% endhighlight %}

Now lets extend the volume rootvg using `vgextend`.
{% highlight bash %}
[root@localhost opt]# vgextend rootvg /dev/sdb1
  Volume group "rootvg" successfully extended
# confirm the physical volume change
[root@localhost opt]# pvscan
  PV /dev/sda2   VG rootvg   lvm2 [31.78 GiB / 0    free]
  PV /dev/sdb1   VG rootvg   lvm2 [31.97 GiB / 31.97 GiB free]
  Total: 2 [63.75 GiB] / in use: 2 [63.75 GiB] / in no VG: 0 [0   ]
{% endhighlight %}

Next lets extend the logical volume
{% highlight bash %}
[root@localhost opt]# lvextend /dev/rootvg/rootvol /dev/sdb1
  Size of logical volume rootvg/rootvol changed from 29.78 GiB (953 extents) to 61.75 GiB (1976 extents).
  Logical volume rootvol successfully resized
# Rerun vgdisplay to confirm the extended space
[root@localhost opt]# vgdisplay
  --- Volume group ---
  VG Name               rootvg
  VG Size               63.75 GiB
{% endhighlight %}

# Resize
Finally to use the new extended volume, run the resize2fs
{% highlight bash %}
[root@localhost opt]# resize2fs /dev/rootvg/rootvol
resize2fs 1.41.12 (17-May-2010)
Filesystem at /dev/rootvg/rootvol is mounted on /; on-line resizing required
old desc_blocks = 2, new_desc_blocks = 4
Performing an on-line resize of /dev/rootvg/rootvol to 16187392 (4k) blocks.
The filesystem on /dev/rootvg/rootvol is now 16187392 blocks long.
{% endhighlight %}

Finally check the diskspace:
{% highlight bash %}
[root@localhost opt]# df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/mapper/rootvg-rootvol
                       61G   21G   37G  36% /
tmpfs                 3.9G     0  3.9G   0% /dev/shm
/dev/sda1             190M   62M  118M  35% /boot
{% endhighlight %}

[1]: https://en.wikipedia.org/wiki/Partition_type
