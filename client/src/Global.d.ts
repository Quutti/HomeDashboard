declare module '*.css' {
    export { };
}

interface WebpackRequire {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

interface NodeRequire extends WebpackRequire { }

declare var require: NodeRequire;