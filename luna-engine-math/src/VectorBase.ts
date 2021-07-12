import MathImpl from "./MathImpl";

export default class VectorBase
{
    protected _val: number[];

    public Add_i(vec: VectorBase): VectorBase
    {
        this._val = MathImpl.Add(this._val, vec.AsArray());
        return this as VectorBase;
    }

    public Subtract_i(vec: VectorBase): VectorBase
    {
        this._val = MathImpl.Subtract(this._val, vec.AsArray());
        return this;
    }
    
    public Divide_i(vec: VectorBase): VectorBase {
        this._val = MathImpl.Divide(this._val, vec.AsArray());
        return this;
    }

    public Scale_i(scale: number): VectorBase {
        this._val = MathImpl.Scale(this._val, scale);
        return this;
    }

    public Magnitude(): number {
        return MathImpl.Magnitude(this._val);
    }

    public static Dot(vec_a: VectorBase, vec_b: VectorBase): number {
        return MathImpl.Dot(vec_a.AsArray(), vec_b.AsArray());
    }

    public static Distance(from: VectorBase, to: VectorBase): number {
        return MathImpl.Distance(from.AsArray(), to.AsArray());
    }

    public Lerp_i(from: VectorBase, to: VectorBase, time: number): VectorBase {
        this._val = MathImpl.Lerp(from.AsArray(), to.AsArray(), time);
        return this;
    }

    public AsArray(): number[]
    {
        return this._val;
    }
}