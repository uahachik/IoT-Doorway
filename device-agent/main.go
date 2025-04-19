package main

import (
	"encoding/json"
	"fmt"
	"log"

	"device-agent/collector"
)

func main() {
	info, err := collector.CollectAll()
	if err != nil {
		log.Fatal("Error collecting system info:", err)
	}

	jsonData, _ := json.MarshalIndent(info, "", "  ")
	fmt.Println(string(jsonData))
}
