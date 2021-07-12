import IFileSystem from "./IFileSystem";

export default class WebFileSystem implements IFileSystem
{
    public async Read(dir: string): Promise<Blob>
    {
        return await fetch(dir).then((response: Response) => response.blob());
    }

    public Write<T>(path: string, data: T, onFinish: Function, onError: Function): void
    {
        throw new Error ("Method not implemented");
    }
}