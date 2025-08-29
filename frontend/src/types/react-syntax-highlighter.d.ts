declare module "react-syntax-highlighter" {
    import { ComponentType } from "react";

    export const Prism: ComponentType<{
        language?: string;
        style?: CSSProperties;
        PreTag?: string;
        children?: string;
    }>;

    export const Light: ComponentType<{
        language?: string;
        style?: CSSProperties;
        children?: string;
    }>;

    export const registerLanguage: (name: string, language: unknown) => void;
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
    export const oneDark: CSSProperties;
}