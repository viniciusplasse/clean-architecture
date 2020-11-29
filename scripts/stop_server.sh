#!/bin/bash

pid=`pgrep node`
if [ -n  "$pid" ]
then
	kill $pid
fi
