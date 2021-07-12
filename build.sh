#!/bin/bash
packages='ls ./*/package.json'
for entry in $packages
do
    if [ $entry != ls ]
    then
        jq '.version = "0.0.19"' $entry > $entry.tmp && cp $entry.tmp $entry && rm $entry.tmp
    fi
done


echo "Press 'q' to exit"
count=0
while : ; do
read -n 1 k <&1
if [[ $k = q ]] ; then
printf "\nQuitting from the program\n"
break
else
((count=$count+1))
printf "\nIterate for $count times\n"
echo "Press 'q' to exit"
fi
done