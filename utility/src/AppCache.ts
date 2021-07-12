export enum CacheType
{
    TEXTURE,
    SHADER
}

export default class AppCache
{
    private static _instance: AppCache;
    public static get instance(): AppCache
    {
        if (!this._instance)
        {
            this._instance = new AppCache();
        }

        return this._instance;
    }

    private _textureCache: Map<string, any>;
    private _shaderCache: Map<string, string>;

    constructor()
    {
        this._textureCache = new Map<string, any>();
        this._shaderCache = new Map<string, any>();
    }

    public GetCount(type: CacheType)
    {
        switch(type)
        {
            case CacheType.TEXTURE:
                return this._textureCache.size;
            case CacheType.SHADER:
                return this._shaderCache.size;
            default:
                return -1;
        }
    }

    public AddTexture(key: string, image: any, override?: false): void
    {
        if (this.KeyCheck(this._textureCache, key) && !override)
        {
            return;
        }

        //TODO: Image sanity check herer

        this._textureCache.set(key, image);
    }

    public AddShader(key: string, source: string, override?: false): void
    {
        if (this.KeyCheck(this._shaderCache, key) && !override)
        {
            return;
        }

        this._shaderCache.set(key, source);
    }

    public GetTexture(key: string): any
    {
        return this._textureCache.get(key);
    }

    public GetShader(key: string): string
    {
        return this._shaderCache.get(key);
    }

    public DisposeKey(type: CacheType, key: string): void
    {
        switch(type)
        {
            case CacheType.TEXTURE:
                this._textureCache.delete(key);
                break;
            case CacheType.SHADER:
                this._shaderCache.delete(key);
                break;
        }
    }

    public DisposeCache(type: CacheType)
    {
        switch(type)
        {
            case CacheType.TEXTURE:
                this._textureCache.clear();
                break;
            case CacheType.SHADER:
                this._shaderCache.clear();
                break;
        }
    }

    public DisposeAll(): void
    {
        this._textureCache.clear();
        this._shaderCache.clear();
    }

    public CheckContains(type: CacheType, keys: string[]): boolean
    {
        let retVal = true;
        for (let i = 0; i < keys.length; i++)
        {
            const key = keys[i];

            switch(type)
            {
                case CacheType.TEXTURE:
                    if (!this._textureCache.has(key))
                    {
                        retVal = false;
                    }
                    break;
                case CacheType.SHADER:
                    if (!this._shaderCache.has(key))
                    {
                        retVal = false;
                    }
                    break;
            }

            if (!retVal)
            {
                break;
            }
        }

        return retVal;
    }

    public CheckCache()
    {
        console.log(this._shaderCache);
        console.log(this._textureCache);
    }

    private KeyCheck<K, V>(map: Map<K, V>, key: K): boolean
    {
        if (map.has(key))
        {
            console.warn("Already contains a cache for the key: " + key)
            return true;
        }
        else
        {
            return false;
        }
    }
}

