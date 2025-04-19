//go:build linux

package temp

type LinuxTempReader struct{}

func (LinuxTempReader) GetCPUTemp() (float64, error) {
	return 42.0, nil
}

func detectPlatformTempReader() TempReader {
	return LinuxTempReader{}
}
