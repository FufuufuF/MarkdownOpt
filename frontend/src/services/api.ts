export const API_CONFIG = {
    BASE_URL: "http://localhost:8000",
    TIMEOUT: 100000000000,

    ENDPOINTS: {
        OPTIMIZE: {
            BATCH: "/api/v1/optimize/batch",
            STREAM: "/api/v1/optimize/stream",
        },
        HEALTH: "/api/v1/health/",
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
        // controller.abort();
    }, timeout);

    console.log("[api]: 发起请求");

    try {
        const response = await fetch(url, {
            method,
            headers,
            body,
            signal: controller.signal,
        });

        clearTimeout(timer);

        if (!response.ok) {
            // 提供更详细的错误信息
            throw new Error(`API请求失败: ${response.status} ${response.statusText} - ${endpoint}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
            return (await response.json()) as T;
        } else {
            throw new Error(`不支持的响应类型: ${contentType} - ${endpoint}`);
        }
    } catch (error) {
        clearTimeout(timer);
        
        // 如果是 AbortError，提供更友好的错误信息
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error(`请求超时 (${timeout}ms) - ${endpoint}`);
        }
        
        // 如果是网络错误，提供更好的描述
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error(`网络连接失败 - ${endpoint}`);
        }
        
        // 重新抛出原始错误
        throw error;
    }
}
