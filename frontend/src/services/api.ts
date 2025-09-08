export const API_CONFIG = {
    BASE_URL: "http://localhost:8000",
    TIMEOUT: 10000,
    ENDPOINTS: {
        OPTIMIZE: {
            BATCH: "/api/v1/optimize/batch",
            STREAM: "/api/v1/optimize/stream",
        },
        HEALTH: "/api/v1/health",
    }
} as const;


