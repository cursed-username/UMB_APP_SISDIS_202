BINARY_PATH=bin
SERVER_PATH=server/main.go
BINARY_SERVER_NAME=$(BINARY_PATH)/server

server-run:
	go build -o $(BINARY_SERVER_NAME) -race $(SERVER_PATH)
	./$(BINARY_SERVER_NAME)

clean:
	go clean $(SERVER_PATH)
	rm -f $(BINARY_PATH)/*