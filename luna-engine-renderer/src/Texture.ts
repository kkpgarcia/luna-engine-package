import RenderingContext from "./RenderingContext";

export default class Texture
{
    private _texture: WebGLTexture;
    private _filePath: string;
    private _width: number;
    private _height: number;
    private _bbp: number;
    //Teture Data
    private _localBuffer: ArrayBufferView;

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    //Mobile has 8 Texture Slots
    constructor(path: string)
    {
        this._filePath = path;
        this._width = 0;
        this._height = 0;
        this._bbp = 0;

        //TODO: Load image here
        //Flip the image since OpenGL starts 0 from lower left

        const gl = RenderingContext.instance.gl;

        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, this._width, this._height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._localBuffer);
        gl.bindTexture(gl.TEXTURE_2D, null);

        if(this._localBuffer)
        {
            //TODO: free this local buffer if you need. see if you need this to persist
        }
    }

    public Bind(slot = 0): void
    {
        const gl = RenderingContext.instance.gl;
        gl.activeTexture(gl.TEXTURE0 + slot);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    public Unbind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    /**
     * It is important to use this function when you want
     * to deallocate this object
     */
    public Destroy(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.deleteTexture(this._texture);
    }
}