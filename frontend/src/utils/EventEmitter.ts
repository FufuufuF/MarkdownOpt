export class AIModelEventTypes {
    static MODEL_CREATED = "model_created";
    static MODEL_SELECTED = "model_selected";
    static MODEL_DELETED = "model_deleted";
    static MODEL_UPDATED = "model_updated";
    static MODEL_APPLIED = "model_applied";
}

export class EditorEventTypes {
    static STYLE_UPDATE = "style_update";
    static MARKDOWN_UPDATE = "markdown_update";
    static AI_SET_MODEL_SHOW_UPDATE = "ai_set_model_show_update";
}

export type EventListener<T> = (data: T) => void;

export class EventEmitter<T = unknown> {
    private events: Map<string, EventListener<T>[]> = new Map();

    on(event: string, listener: EventListener<T>) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(listener);
    }

    off(event: string, listener: EventListener<T>) {
        const listeners = this.events.get(event);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    emit(event: string, data: T) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }

    removeAllListeners(event?: string) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
}

export const eventEmitter = new EventEmitter();