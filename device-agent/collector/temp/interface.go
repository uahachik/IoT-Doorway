package temp

type TempReader interface {
	GetCPUTemp() (float64, error)
}

var reader TempReader

func init() {
	reader = detectPlatformTempReader()
}

func GetCPUTemp() (float64, error) {
	return reader.GetCPUTemp()
}
