***************************************************
Your name 
		Xianzheng Fang
		student number 0847616		
		The class name
		     CIS2750	
		The assignment A2
****************************************************
************
Compilation
************

gcc -Wall -std=c11 -c -g src/LinkedListAPI.c -o bin/llist.o -Iinclude
gcc -Wall -std=c11 -c -g src/VCardParser.c -o bin/cparse.o -Iinclude
ar cr bin/libllist.a bin/llist.o
ar cr bin/libcparse.a bin/cparse.o
***********************
Running the program(s)
***********************


I test the  two file which are given by prof which is fine


No Memeory leak and error in it


*****************
Known Limitations
*****************

The file format should follow the format discription provide
Otherwise it might quit program.