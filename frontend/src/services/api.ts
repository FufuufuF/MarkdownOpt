
export const API_CONFIG = {
    BASE_URL: "http://localhost:8000",
    TIMEOUT: 10000,

    ENDPOINTS: {
        OPTIMIZE: {
            BATCH: "/api/v1/optimize/batch",
            STREAM: "/api/v1/optimize/stream",
        },
        HEALTH: "/api/v1/health",
    },

    HEADERS: {
        DEFAULT: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        STREAM: {
            "Content-Type": "application/json",
            "Accept": "text/event-stream",
        }
    },

    METHODS: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE",
    },

    STATUS_CODES: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    }
} as const;

export interface RequestConfig {
    timeout?: number;
    headers?: Record<string, string>;
    method?: string;
    body?: string;
}

export async function apiRequest<T>(
    endpoint: string,
    config: RequestConfig = {}
): Promise<T> {
    const {
        timeout = API_CONFIG.TIMEOUT,
        headers = API_CONFIG.HEADERS.DEFAULT,
        method = API_CONFIG.METHODS.GET,
        body,
    } = config;

    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const controller = new AbortController();
    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        const response = await fetch(url, {
            method,
            headers,
            body,
            signal: controller.signal,
        });

        clearTimeout(timer);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return (await response.json()) as T;
        } else {
            throw new Error("Unsupported response type");
        }
    } catch (error) {
        clearTimeout(timer);
        throw error;
    }
}
