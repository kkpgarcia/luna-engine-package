import Services from "../Core/Service/Services";
import VertexBuffer from "./VertexBuffer";
import VertexBufferElement from "./VertexBufferElement";
import VertexBufferLayout from "./VertexBufferLayout";

export default class VertexArray
{
    private _renderer: WebGLVertexArrayObject;

    constructor()
    {
        const gl = Services.RenderingContext.gl;
        this._renderer = gl.createVertexArray();
    }

    public AddBuffer(vertexBuffer: VertexBuffer, layout: VertexBufferLayout): void
    {
        const gl = Services.RenderingContext.gl;
        
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
        const gl = Services.RenderingContext.gl;
        gl.bindVertexArray(this._renderer);
    }

    public Unbind(): void
    {
        const gl = Services.RenderingContext.gl;
        gl.bindVertexArray(null);
    }
}