export default class EventArgs<T>
{
    private _data: T;
    public get data(): T
    {
        return this._data;
    }

    constructor(data: T)
    {
        this._data = data;
    }
}