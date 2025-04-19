//go:build darwin

package temp

import (
	"os/exec"
	"strconv"
	"strings"
)

type MacTempReader struct{}

func (MacTempReader) GetCPUTemp() (float64, error) {
	out, err := exec.Command("osx-cpu-temp").Output()
	if err != nil {
		return 0, err
	}

	// Example output: "62.5°C\n"
	parts := strings.Fields(string(out))
	if len(parts) == 0 {
		return 0, err
	}

	tempStr := strings.TrimSuffix(parts[0], "°C")
	return strconv.ParseFloat(tempStr, 64)
}

func detectPlatformTempReader() TempReader {
	return MacTempReader{}
}
