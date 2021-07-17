import Vector2 from "./Vector2";

export enum Mat3 {
    M00, M01, M02,
    M10, M11, M12,
    M20, M21, M22
}

export default class Mat3x3
{
    public static IDENTITY = new Mat3x3(1,0,0,0,1,0,0,0,1);
    private _val: number[];

    constructor(m00: number, m01: number, m02: number, 
                m10: number, m11: number, m12: number,
                m20: number, m21: number, m22: number)
    {
        this._val = 
        [
            m00, m01, m02,
            m10, m11, m12,
            m20, m21, m22
        ]
    }

    public SetValues(values: number[]): void
    {
        for (let i = 0; i < values.length; i++)
        {
            this._val[i] = values[i];
        }
    }

    public Get(placement: number): number
    {
        return this.GetValue(placement as Mat3);
    }

    public GetValue(placement: Mat3): number
    {
        return this._val[placement];
    }

    public static Translation(value: Vector2): Mat3x3
    {
        return new Mat3x3 
        (
            1, 0, 0,
            0, 1, 0,
            value.x, value.y, 1
        );
    }

    public static Rotation(angle: number): Mat3x3
    {
        angle = angle * Math.PI / 180;
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Mat3x3
        (
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        )
    }

    public static Scaling(value: Vector2): Mat3x3
    {
        return new Mat3x3
        (
            value.x, 0, 0,
            0, value.y, 0,
            0, 0, 1
        )
    }

    public static Projection(width: number, height: number): Mat3x3
    {
        return new Mat3x3
        (
            2 / width, 0, 0,
            0, -2 / height, 0,
            -1, 1, 1
        )
    }

    public static Multiply(a: Mat3x3, b: Mat3x3): Mat3x3
    {
        return new Mat3x3
        (
            b.GetValue(Mat3.M00) * a.GetValue(Mat3.M00) + b.GetValue(Mat3.M01) * a.GetValue(Mat3.M10) + b.GetValue(Mat3.M02) * a.GetValue(Mat3.M20),
            b.GetValue(Mat3.M00) * a.GetValue(Mat3.M01) + b.GetValue(Mat3.M01) * a.GetValue(Mat3.M11) + b.GetValue(Mat3.M02) * a.GetValue(Mat3.M21),
            b.GetValue(Mat3.M00) * a.GetValue(Mat3.M02) + b.GetValue(Mat3.M01) * a.GetValue(Mat3.M12) + b.GetValue(Mat3.M02) * a.GetValue(Mat3.M22),
            b.GetValue(Mat3.M10) * a.GetValue(Mat3.M00) + b.GetValue(Mat3.M11) * a.GetValue(Mat3.M10) + b.GetValue(Mat3.M12) * a.GetValue(Mat3.M20),
            b.GetValue(Mat3.M10) * a.GetValue(Mat3.M01) + b.GetValue(Mat3.M11) * a.GetValue(Mat3.M11) + b.GetValue(Mat3.M12) * a.GetValue(Mat3.M21),
            b.GetValue(Mat3.M10) * a.GetValue(Mat3.M02) + b.GetValue(Mat3.M11) * a.GetValue(Mat3.M12) + b.GetValue(Mat3.M12) * a.GetValue(Mat3.M22),
            b.GetValue(Mat3.M20) * a.GetValue(Mat3.M00) + b.GetValue(Mat3.M21) * a.GetValue(Mat3.M10) + b.GetValue(Mat3.M22) * a.GetValue(Mat3.M20),
            b.GetValue(Mat3.M20) * a.GetValue(Mat3.M01) + b.GetValue(Mat3.M21) * a.GetValue(Mat3.M11) + b.GetValue(Mat3.M22) * a.GetValue(Mat3.M21),
            b.GetValue(Mat3.M20) * a.GetValue(Mat3.M02) + b.GetValue(Mat3.M21) * a.GetValue(Mat3.M12) + b.GetValue(Mat3.M22) * a.GetValue(Mat3.M22)
        );
    }

    public Multiply_i(b: Mat3x3): Mat3x3
    {
        return Mat3x3.Multiply(this, b);
    }

    public ToArray(): number[]
    {
        return this._val;
    }
}