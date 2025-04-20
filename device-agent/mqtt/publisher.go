package mqtt

import (
	"fmt"

	paho "github.com/eclipse/paho.mqtt.golang"
)

func PublishJSON(client paho.Client, topic string, payload []byte) error {
	token := client.Publish(topic, 1, false, payload)
	token.Wait()

	if token.Error() != nil {
		return fmt.Errorf("publish error: %w", token.Error())
	}
	fmt.Println("🟢 Published system info to topic:", topic)
	return nil
}
