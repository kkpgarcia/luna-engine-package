export default class RenderingContext
{
    private static _instance: RenderingContext;
    public static get instance(): RenderingContext
    {
        if (!this._instance)
        {
            this._instance = new RenderingContext();
        }

        return this._instance;
    }

    private _gl: WebGL2RenderingContext;
    public get gl(): WebGL2RenderingContext
    {
        return this._gl;
    }

    private _isInitalized = false;
    public get isInitalizd(): boolean
    {
        return this._isInitalized;
    }

    public Init(canvas: HTMLCanvasElement): void
    {
        this._gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
        this._isInitalized = true;
    }
}