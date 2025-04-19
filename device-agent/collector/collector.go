package collector

import (
	"device-agent/collector/cpu"
	"device-agent/collector/temp"
)

type SystemInfo struct {
	// Hostname    string
	CPU string `json:"cpu"`
	// CPUPercent  float64
	// MemoryMB    uint64
	// MemoryUsed  float64
	// DiskTotalGB uint64
	// DiskFreeGB  uint64
	// Battery     string
	// IPs         []string
	// Location    *utils.GeoLocation
	CPUTemp float64 `json:"cpu_temp"`
}

func CollectAll() (*SystemInfo, error) {
	// host, _ := GetHost()
	cpu, _, _ := cpu.GetCPU()
	// memTotal, memUsed, _ := GetMemory()
	// diskTotal, diskFree, _ := GetDisk()
	// battery, _ := GetBattery()
	// ips, _ := GetNetwork()
	// loc, _ := utils.GetGeoInfo()

	cpuTemp, err := temp.GetCPUTemp()

	if err != nil {
		// Optional: you can handle or log the error differently if you want
		return nil, err
	}

	return &SystemInfo{
		// Hostname:    host,
		CPU: cpu,
		// CPUPercent:  usage,
		// MemoryMB:    memTotal,
		// MemoryUsed:  memUsed,
		// DiskTotalGB: diskTotal,
		// DiskFreeGB:  diskFree,
		// Battery:     battery,
		// IPs:         ips,
		// Location:    loc,
		CPUTemp: cpuTemp,
	}, nil
}

func GetCPUTemp() (float64, error) {
	return temp.GetCPUTemp()
}
