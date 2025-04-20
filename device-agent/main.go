package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

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

func runTask() {
	info, err := collector.CollectAll()
	if err != nil {
		log.Println("❌ Error collecting system info:", err)
		return
	}

	jsonData, _ := json.MarshalIndent(info, "", "  ")
	fmt.Println("📦 Collected data:\n", string(jsonData))

	client, err := mqtt.Connect()
	if err != nil {
		log.Println("❌ MQTT connection error:", err)
		return
	}

	topic := os.Getenv("AWS_IOT_TOPIC")
	if topic == "" {
		topic = "sdk/test/pub_sub"
	}

	err = mqtt.PublishJSON(client, topic, jsonData)
	if err != nil {
		log.Println("❌ MQTT publish error:", err)
		return
	}

	fmt.Println("✅ System info published successfully")
}

func main() {
	for {
		fmt.Println("⏱️ Starting every 30 seconds for a 5-minute collection cycle...")

		for range 10 {
			runTask()
			time.Sleep(30 * time.Second)
		}

		fmt.Println("⏳ Waiting 55 minutes until next cycle...")
		time.Sleep(55 * time.Minute) // wait until full hour
	}
}
