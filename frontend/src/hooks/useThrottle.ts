import { useCallback, useEffect, useRef } from "react";

export function useThrottleCallback(fn, delay: number) {
    const lastCall = useRef(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastArgs = useRef([]);

    const throttledFn = useCallback((...args) => {
        const now = Date.now();
        lastArgs.current = args;
        
        if (now - lastCall.current >= delay) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            // 立即执行
            lastCall.current = now;
            fn(...lastArgs.current);
        } else if (!timerRef.current) {
            // 设置延迟执行
            timerRef.current = setTimeout(() => {
                lastCall.current = Date.now();
                timerRef.current = null;
                fn(...lastArgs.current);
            }, delay - (now - lastCall.current));
        }
    }, [fn, delay]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = null;
            lastCall.current = 0;
        }
    }, [])

    return throttledFn;
}