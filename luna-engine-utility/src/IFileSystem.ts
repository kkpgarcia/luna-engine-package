export default interface IFileSystem
{
    Read(dir: string): Promise<Blob>
    Write<T>(dir: string, data: T, onFinish: Function, onError: Function): void;
}