import { VertexBufferElement, VertexBuffer, VertexBufferLayout } from "./Buffer";
import RenderingContext from "./RenderingContext";

export default class VertexArray
{
    private _renderer: WebGLVertexArrayObject;

    constructor()
    {
        const gl = RenderingContext.instance.gl;
        this._renderer = gl.createVertexArray();
    }

    public AddBuffer(vertexBuffer: VertexBuffer, layout: VertexBufferLayout): void
    {
        const gl = RenderingContext.instance.gl;
        
        this.Bind();
        vertexBuffer.Bind();

        const elements = layout.elements;
        let offset = 0;

        for (let i = 0; i < elements.length; i++)
        {
            const element = elements[i]
            gl.enableVertexAttribArray(i);
            gl.vertexAttribPointer(i, element.count, element.type, element.normalized, layout.stride, offset);

            offset += element.count * VertexBufferElement.GetSizeOfType(element.type);;
        }

    }

    public Bind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.bindVertexArray(this._renderer);
    }

    public Unbind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.bindVertexArray(null);
    }
}