import { useEffect } from "react";
import { eventEmitter } from "../utils/EventEmitter";
import { EventListener } from "../utils/EventEmitter";

export function useEventListener<T = unknown>(event: string, listener: EventListener<T>) {
    useEffect(() => {
        eventEmitter.on(event, listener);
        return () => {
            eventEmitter.off(event, listener);
        };
    }, [event, listener]);
}
