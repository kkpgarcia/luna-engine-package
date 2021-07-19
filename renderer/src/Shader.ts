import { Debug } from "@luna-engine/core";
import RenderingContext from "./RenderingContext";

export default class Shader
{ 
    private _shader: WebGLProgram;
    private _uniformLocationCache: Map<string, WebGLUniformLocation>;

    constructor(source: string)
    {
        const parsed = this.ParseShader(source);

        this._shader = this.CreateProgram(parsed[0], parsed[1]);
        this._uniformLocationCache = new Map<string, WebGLUniformLocation>();
    }

    private CreateProgram(vertexSource: string, fragmentSource: string): WebGLProgram
    {
        const gl = RenderingContext.instance.gl;
        const program = gl.createProgram();

        const vertShader = this.CreateShader(vertexSource, gl.VERTEX_SHADER);
        const fragShader = this.CreateShader(fragmentSource, gl.FRAGMENT_SHADER);

        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);

        return program;
    }

    private CreateShader(source: string, shaderType: number): WebGLShader
    {
        const gl = RenderingContext.instance.gl;
        const shader = gl.createShader(shaderType);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        

        return shader;
    }

    public Bind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.useProgram(this._shader);
    }

    public Unbind(): void
    {
        const gl = RenderingContext.instance.gl;
        gl.useProgram(null);
    }

    public SetUniform1i(name: string, data: number): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform1i(this.GetUniformLocation(name), data);
    }

    public SetUniform2i(name: string, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform2i(this.GetUniformLocation(name), data[0], data[1]);
    }

    public SetUniform3i(name: string, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform3i(this.GetUniformLocation(name), data[0], data[1], data[2]);
    }

    public SetUniform4i(name: string, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform4i(this.GetUniformLocation(name), data[0], data[1], data[2], data[3]);
    }

    public SetUniform1f(name: string, data: number): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform1f(this.GetUniformLocation(name), data)
    }
    public SetUniform2f(name: string, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform2f(this.GetUniformLocation(name), data[0], data[1])
    }
    public SetUniform3f(name: string, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform3f(this.GetUniformLocation(name), data[0], data[1], data[2])
    }
    public SetUniform4f(name: string, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniform4f(this.GetUniformLocation(name), data[0], data[1], data[2], data[3])
    }

    public SetUniformMatrix2fv(name: string, transpose: boolean, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniformMatrix2fv(this.GetUniformLocation(name), transpose, data);
    }

    public SetUniformMatrix3fv(name: string, transpose: boolean, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniformMatrix3fv(this.GetUniformLocation(name), transpose, data);
    }

    public SetUniformMatrix4fv(name: string, transpose: boolean, data: number[]): void
    {
        const gl = RenderingContext.instance.gl;
        gl.uniformMatrix4fv(this.GetUniformLocation(name), transpose, data);
    }

    public GetUniformLocation(name: string): WebGLUniformLocation
    {
        const gl = RenderingContext.instance.gl;

        if (this._uniformLocationCache.has(name))
        {
            return this._uniformLocationCache.get(name);
        }

        const location = gl.getUniformLocation(this._shader, name);
        
        if (!location)
        {
            Debug.Error("Uniform " + name + " doesn't exists");
        }
        
        this._uniformLocationCache.set(name, location);

        return location;
    }

    private ParseShader(src: string): string[]
    {
       const lines = src.match(/[^\r\n]+/g);
       const shaders: string[] = ['', ''];
       let shaderIdx = 0;

       for (let i = 0; i < lines.length; i++)
       {
            const line = lines[i];
            
            if (line === "#vertex" || line === "#fragment")
            {
                shaderIdx++;
            }
            else
            {
                shaders[shaderIdx] += line + '\n';
            }
       }

       return shaders;
    }
}