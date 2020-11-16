package validations

// Validates a uint8 number
func ValidateNumberUint64(value uint64, lowerBound uint64, upperBound uint64) uint64 {

	if value > upperBound {
		return upperBound
	} else if value < lowerBound {
		return lowerBound
	} else {
		return value
	}
}
