# Make the system read write or read-only
if [ $1 = true ]; then
    mount -o rw,remount /
    print "System is now read/write"
    elif [ $1 = false ]; then
    mount -o ro,remount /
    print "System is now read-only"
else
    print "System not writeable"
fi