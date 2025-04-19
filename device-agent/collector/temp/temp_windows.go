//go:build windows

package temp

type WindowsTempReader struct{}

func (WindowsTempReader) GetCPUTemp() (float64, error) {
	// WindowsOS-specific logic here
	return 38.0, nil
}

func detectPlatformTempReader() TempReader {
	return WindowsTempReader{}
}
