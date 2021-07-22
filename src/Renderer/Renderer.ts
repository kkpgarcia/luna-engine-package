import Services from "../Core/Service/Services";
import IndexBuffer from "./IndexBuffer";
import Shader from "./Shader";
import VertexArray from "./VertexArray";

//TODO: decide if it's a centralized renderer or
//      or derivable 
export default class Renderer
{
    constructor()
    {

    }

    public Draw(vertexArray: VertexArray, indexBuffer: IndexBuffer, shader: Shader): void
    {
        const gl = Services.RenderingContext.gl;

        shader.Bind();        
        vertexArray.Bind();
        indexBuffer.Bind();

        gl.drawElements(gl.TRIANGLES, indexBuffer.count, gl.UNSIGNED_SHORT, 0);
    }

    public Clear(): void
    {
        const gl = Services.RenderingContext.gl;
        gl.clearColor(1, 1, 1, 1);
    }
}