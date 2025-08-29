import { EditorEventTypes, eventEmitter } from "../utils/EventEmitter";

export class AppVM{
    private style: string;
    private markdown: string;
    private isAISetModelShow: boolean;

    constructor() {
        this.style = "";
        this.markdown = "";
        this.isAISetModelShow = false;
    }

    getStyle() {
        return this.style;
    }       

    getMarkdown() {
        return this.markdown;
    }

    getIsAISetModelShow() {
        return this.isAISetModelShow;
    }

    setStyle(style: string) {
        this.style = style;
        eventEmitter.emit(EditorEventTypes.STYLE_UPDATE, style);
    }

    setMarkdown(markdown: string) {
        this.markdown = markdown;
        eventEmitter.emit(EditorEventTypes.MARKDOWN_UPDATE, markdown);
    }

    setIsAISetModelShow(isShow: boolean) {
        this.isAISetModelShow = isShow;
        eventEmitter.emit(EditorEventTypes.AI_SET_MODEL_SHOW_UPDATE, isShow);
    }
}

export const appVM = new AppVM();