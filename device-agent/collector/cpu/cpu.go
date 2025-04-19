package cpu

import (
	"fmt"
	"log"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
)

func GetCPU() (string, float64, error) {
	info, _ := cpu.Info()
	percent, _ := cpu.Percent(0, false)
	log.SetPrefix("Percent: ")
	log.Print(percent)

	physicalCnt, _ := cpu.Counts(false)
	logicalCnt, _ := cpu.Counts(true)
	fmt.Printf("physical count:%d logical count:%d\n", physicalCnt, logicalCnt)

	totalPercent, _ := cpu.Percent(3*time.Second, false)
	perPercents, _ := cpu.Percent(3*time.Second, true)
	fmt.Printf("total percent:%v per percents:%v", totalPercent, perPercents)
	return info[0].ModelName, percent[0], nil
}
