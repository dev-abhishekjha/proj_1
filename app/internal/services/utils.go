package services

// Helper functions for pointer types
func stringPtr(s string) *string {
	return &s
}

func int32Ptr(i int32) *int32 {
	return &i
}

func int64Ptr(i int64) *int64 {
	return &i
}

func SafeString(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func Int64PointerToValue(i *int64) int64 {
	if i == nil {
		return 0
	}
	return *i
}
