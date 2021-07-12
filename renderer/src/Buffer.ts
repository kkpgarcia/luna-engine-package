import RenderingContext from "./RenderingContext";

export class VertexBuffer
{
    private _buffer: WebGLBuffer;

    constructor(data: number[])
    {
        const gl = RenderingContext.instance.gl;
        this._buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    }

    public Bind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    }

    public Unbind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}

export class IndexBuffer
{
    private _buffer: WebGLBuffer;
    private _count: number;

    public get count(): number
    {
        return this._count;
    }

    constructor(data: number[], count: number)
    {
        const gl = RenderingContext.instance.gl;
        this._buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
        this._count = count;
    }

    public Bind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    }

    public Unbind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
}

export class VertexBufferElement
{
    public type: number;
    public count: number;
    public normalized: boolean;

    public static GetSizeOfType(type: number): number
    {
        const gl = RenderingContext.instance.gl;

        switch(type)
        {
            case gl.FLOAT:
                return 4;
            case gl.UNSIGNED_INT:
                return 4;
            case gl.UNSIGNED_BYTE:
                return 1;
            default:
                return 0;
        }
    }
}

export class VertexBufferLayout
{
    private _elements: Array<VertexBufferElement>;
    public get elements(): Array<VertexBufferElement>
    {
        return this._elements;
    }

    private _stride = 0;
    public get stride(): number
    {
        return this._stride;
    }

    constructor()
    {
        this._elements = new Array<VertexBufferElement>();
    }
    
    public Push(count: number, type: number): void
    {
        const normalized = false;
        this._elements.push({type, count, normalized});
        this._stride += VertexBufferElement.GetSizeOfType(type) * count;
    }
}