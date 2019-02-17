#!/bin/bash

URL="http://hmf.student.rit.edu:1080/createUser"

if [ -n "$1" ]
then
    for d in $(seq 1 $1); do
        #echo $d" "$(names)
        NAME=$(names)

        FIRST="${NAME% *}"
        LAST="${NAME#* }"
        PASSWORD=$LAST"2019" #Our users value maximum security
        USERNAME=$FIRST$d
        EMAIL="$FIRST""$LAST""@example.com"

        curl -d "username="$USERNAME"&firstName="$FIRST"&lastName="$LAST"&email="$EMAIL"&password="$PASSWORD -X POST http://hmf.student.rit.edu:1080/createUser

       
        if [ -n "$2" ] 
        then 
            echo $FIRST" "$LAST" "$USERNAME" "$PASSWORD" "$EMAIL >> "$2"
        else
            echo $FIRST" "$LAST" "$USERNAME" "$PASSWORD" "$EMAIL
        fi

    done;
fi
