import WebFileSystem from "./WebFileSystem";
import IFileSystem from "./IFileSystem";

export default class Resource
{
    private static _instance: Resource;
    public static get instance(): Resource
    {
        if (!this._instance)
        {
            this._instance = new Resource();
        }

        return this._instance;
    }

    private _fileSystem: IFileSystem;

    constructor()
    {
        this.Init();
    }

    private Init(): void
    {
        this._fileSystem = new WebFileSystem();
    }

    public GetText(dir: string, fileName: string, onLoad: Function, onError?: Function): void
    {
        const reader = new FileReader();

        reader.onload = () => {
            onLoad ? onLoad(reader.result) : () => {};
        }

        this._fileSystem.Read(dir + fileName)
            .then((blob: Blob) => {
                reader.readAsText(blob);
            })
            .catch((reason: any) => {
                onError ? onError(reason) : () => {};
            });
    }

    public GetImage(dir: string, fileName: string, onLoad: Function, onError?: Function): void
    {
        let image = new Image();

        image.onload = () => {
            onLoad ? onLoad(image) : () => {};
        }

        image.src = dir + fileName;
    }
}