package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"device-agent/collector"
	"device-agent/mqtt"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Println("⚠️ Warning: .env file not found")
	}
}

func main() {
	info, err := collector.CollectAll()
	if err != nil {
		log.Fatal("Error collecting system info:", err)
	}

	jsonData, _ := json.MarshalIndent(info, "", "  ")

	fmt.Println("📦 Collected data:\n", string(jsonData))

	client, err := mqtt.Connect()
	if err != nil {
		log.Fatal("❌ MQTT connection error:", err)
	}

	topic := os.Getenv("AWS_IOT_TOPIC")
	if topic == "" {
		topic = "sdk/test/pub_sub"
	}

	err = mqtt.PublishJSON(client, topic, jsonData)
	if err != nil {
		log.Fatal("❌ MQTT publish error:", err)
	}

	fmt.Println("✅ System info published successfully")
}
