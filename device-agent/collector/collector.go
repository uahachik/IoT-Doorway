package collector

import (
	"device-agent/collector/cpu"
	"device-agent/collector/temp"
)

type SystemInfo struct {
	// Hostname    string
	CPUModel        string  `json:"cpu_model"`
	CPUUsagePercent float64 `json:"cpu_usage_percent"`
	// MemoryMB    uint64
	// MemoryUsed  float64
	// DiskTotalGB uint64
	// DiskFreeGB  uint64
	// Battery     string
	// IPs         []string
	// Location    *utils.GeoLocation
	CPUTemp float64 `json:"cpu_temperature"`
}

func CollectAll() (*SystemInfo, error) {
	// host, _ := GetHost()
	cpu, percent, err := cpu.GetCPU()
	// memTotal, memUsed, _ := GetMemory()
	// diskTotal, diskFree, _ := GetDisk()
	// battery, _ := GetBattery()
	// ips, _ := GetNetwork()
	// loc, _ := utils.GetGeoInfo()

	cpuTemp, err := temp.GetCPUTemp()

	if err != nil {
		return nil, err
	}

	return &SystemInfo{
		// Hostname:    host,
		CPUModel:        cpu,
		CPUUsagePercent: percent,
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
