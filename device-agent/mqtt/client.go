package mqtt

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"os"

	paho "github.com/eclipse/paho.mqtt.golang"
	"github.com/google/uuid"
)

func writeTempPEM(envContent string, suffix string) (string, error) {
	tmpFile, err := os.CreateTemp("", "*."+suffix)
	if err != nil {
		return "", err
	}
	defer tmpFile.Close()

	_, err = tmpFile.WriteString(envContent)
	if err != nil {
		return "", err
	}

	return tmpFile.Name(), nil
}

func Connect() (paho.Client, error) {
	certFile := os.Getenv("AWS_IOT_CERTIFICATE")
	keyFile := os.Getenv("AWS_IOT_PRIVATE_KEY")
	endpoint := os.Getenv("AWS_ENDPOINT")
	clientID := "device-agent-" + uuid.New().String()

	if endpoint == "" || certFile == "" || keyFile == "" {
		return nil, fmt.Errorf("missing endpoint, cert, or key")
	}

	pool, err := x509.SystemCertPool()
	if err != nil || pool == nil {
		return nil, fmt.Errorf("❌ could not load system certificate pool")
	}

	certPath, err := writeTempPEM(certFile, "crt")
	if err != nil {
		return nil, fmt.Errorf("writing cert temp file failed: %w", err)
	}

	keyPath, err := writeTempPEM(keyFile, "key")
	if err != nil {
		return nil, fmt.Errorf("writing key temp file failed: %w", err)
	}

	cert, err := tls.LoadX509KeyPair(certPath, keyPath)
	if err != nil {
		return nil, fmt.Errorf("failed to load cert and key: %w", err)
	}

	tlsConfig := &tls.Config{
		Certificates: []tls.Certificate{cert},
		RootCAs:      pool,
	}

	conn, err := tls.Dial("tcp", "google.com:443", tlsConfig)
	if err != nil {
		return nil, fmt.Errorf("❌ TLS test failed, probably no RootCAs provided by OS: %w", err)
	} else {
		conn.Close()
	}

	opts := paho.NewClientOptions().
		AddBroker("tcps://" + endpoint + ":8883").
		SetClientID(clientID).
		SetTLSConfig(tlsConfig)

	client := paho.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		return nil, token.Error()
	}

	fmt.Println("✅ Connected to AWS IoT Core as:", clientID)
	return client, nil
}
