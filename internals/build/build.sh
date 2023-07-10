#!/usr/bin/env bash

if [[ $1 == 'page' ]]
then
    time sh internals/build/page/build.sh
else
    time sh internals/build/widget/build.sh $1 $2 $3
fi

