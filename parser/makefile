CC = gcc
CCFLAGS += -std=c11 -shared
all:

	$(CC) $(CCFLAGS) -o lib.so -g -fPIC src/LinkedListAPI.c src/VCardParser.c -Iinclude

clean:
	rm -f bin/*.o bin/*.a
	rm -f *.o
