import MathImpl from "./MathImpl";
import VectorBase from "./VectorBase"

export default class Vector2 extends VectorBase
{
    public static ZERO = new Vector2();
    public static LEFT = new Vector2(-1);
    public static RIGHT = new Vector2(1);
    public static UP = new Vector2(0, 1);
    public static DOWN = new Vector2(0, -1);

    public get x(): number
    {
        return this._val[0];
    }

    public get y(): number
    {
        return this._val[1];
    }

    public set x(value: number)
    {
        this._val[0] = value;
    }

    public set y(value: number)
    {
        this._val[1] = value;
    }

    constructor(x: number = 0, y: number = 0)
    {
        super();
        this._val = [x, y];
    }

    public Add(vec: Vector2): Vector2
    {
        const result = MathImpl.Add(this._val, vec.ToArray());
        return new Vector2(result[0], result[1]);
    }

    public Subtract(vec: Vector2): Vector2
    {
        const result = MathImpl.Subtract(this._val, vec.ToArray());
        return new Vector2(result[0], result[1]);
    }

    public Divide(vec: Vector2): Vector2 {
        const result = MathImpl.Divide(this._val, vec.ToArray());
        return new Vector2(result[0], result[1]);
    }

    public Scale(scale: number): Vector2 {
        const result = MathImpl.Scale(this._val, scale);
        return new Vector2(result[0], result[1]);
    }

    public static Min(vec_a: Vector2, vec_b: Vector2): Vector2 {
        const result = MathImpl.Min(vec_a.ToArray(), vec_b.ToArray());
        return new Vector2(result[0], result[1]);
    }

    public static Max(vec_a: Vector2, vec_b: Vector2): Vector2 {
        const result = MathImpl.Max(vec_a.ToArray(), vec_b.ToArray());
        return new Vector2(result[0], result[1]);
    }

    public static Clamp(vec: Vector2, min: number, max: number): Vector2 {
        const result = MathImpl.Clamp(vec.ToArray(), min, max);
        return new Vector2(result[0], result[1]);
    }

    public Lerp(from: Vector2, to: Vector2, time: number): Vector2 {
        const result = MathImpl.Lerp(from.ToArray(), to.ToArray(), time);
        return new Vector2(result[0], result[1]);
    }
}