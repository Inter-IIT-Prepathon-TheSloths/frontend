declare module "qrcode" {
    interface QRCodeOptions {
        errorCorrectionLevel?: "L" | "M" | "Q" | "H";
        width?: number;
        margin?: number;
        color?: {
            dark?: string;
            light?: string;
        };
    }

    function toCanvas(
        canvas: HTMLCanvasElement,
        text: string,
        options?: QRCodeOptions,
        callback?: (error: Error | null) => void,
    ): void;
    function toDataURL(
        text: string,
        options?: QRCodeOptions,
        callback?: (error: Error | null, url: string) => void,
    ): void;

    export { toCanvas, toDataURL };
}
