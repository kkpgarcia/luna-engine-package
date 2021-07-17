import Vector3 from "./Vector3";

export enum Mat4 {
    M00, M01, M02, M03,
    M10, M11, M12, M13,
    M20, M21, M22, M23,
    M30, M31, M32, M33,
}

export default class Mat4x4
{
    public static IDENTITY = new Mat4x4(1,0,0,0,
                                        0,1,0,0,
                                        0,0,1,0,
                                        0,0,0,1);
    private _val: number[];

    constructor(m00: number, m01: number, m02: number, m03: number,
                m10: number, m11: number, m12: number, m13: number,
                m20: number, m21: number, m22: number, m23: number,
                m30: number, m31: number, m32: number, m33: number,)
    {
        this._val = 
        [
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33
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
        return this.GetValue(placement as Mat4);
    }

    public GetValue(placement: Mat4): number
    {
        return this._val[placement];
    }

    public static Translation(value: Vector3): Mat4x4
    {
        return new Mat4x4 
        (
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            value.x, value.y, value.z, 1
        );
    }

    public static Rotation(rotation: Vector3): Mat4x4
    {
        return Mat4x4.RotationX(rotation.x)
                .Multiply_i(Mat4x4.RotationY(rotation.y))
                .Multiply_i(Mat4x4.RotationZ(rotation.z));
    }

    public static Scaling(value: Vector3): Mat4x4
    {
        return new Mat4x4
        (
            value.x, 0, 0, 0,
            0, value.y, 0, 0,
            0, 0, value.z, 0,
            0, 0, 0, 1
        )
    }

    public static Projection(width: number, height: number, depth: number): Mat4x4
    {
        return new Mat4x4
        (
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 2 / depth, 0,
            -1, 1, 0, 1
        )
    }

    private static RotationX(angle: number): Mat4x4
    {
        angle = angle * Math.PI / 180;
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Mat4x4
        (
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        )
    }

    private static RotationY(angle: number): Mat4x4
    {
        angle = angle * Math.PI / 180;
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Mat4x4
        (
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        )
    }

    private static RotationZ(angle: number): Mat4x4
    {
        angle = angle * Math.PI / 180;
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        return new Mat4x4
        (
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
    }

    public static Multiply(a: Mat4x4, b: Mat4x4): Mat4x4
    {

        return new Mat4x4
        (
            b.GetValue(Mat4.M00) * a.GetValue(Mat4.M00) + b.GetValue(Mat4.M01) * a.GetValue(Mat4.M10) + b.GetValue(Mat4.M02) * a.GetValue(Mat4.M20) + b.GetValue(Mat4.M03) * a.GetValue(Mat4.M30),
            b.GetValue(Mat4.M00) * a.GetValue(Mat4.M01) + b.GetValue(Mat4.M01) * a.GetValue(Mat4.M11) + b.GetValue(Mat4.M02) * a.GetValue(Mat4.M21) + b.GetValue(Mat4.M03) * a.GetValue(Mat4.M31),
            b.GetValue(Mat4.M00) * a.GetValue(Mat4.M02) + b.GetValue(Mat4.M01) * a.GetValue(Mat4.M12) + b.GetValue(Mat4.M02) * a.GetValue(Mat4.M22) + b.GetValue(Mat4.M03) * a.GetValue(Mat4.M32),
            b.GetValue(Mat4.M00) * a.GetValue(Mat4.M03) + b.GetValue(Mat4.M01) * a.GetValue(Mat4.M13) + b.GetValue(Mat4.M02) * a.GetValue(Mat4.M23) + b.GetValue(Mat4.M03) * a.GetValue(Mat4.M33),
            b.GetValue(Mat4.M10) * a.GetValue(Mat4.M00) + b.GetValue(Mat4.M11) * a.GetValue(Mat4.M10) + b.GetValue(Mat4.M12) * a.GetValue(Mat4.M20) + b.GetValue(Mat4.M13) * a.GetValue(Mat4.M30),
            b.GetValue(Mat4.M10) * a.GetValue(Mat4.M01) + b.GetValue(Mat4.M11) * a.GetValue(Mat4.M11) + b.GetValue(Mat4.M12) * a.GetValue(Mat4.M21) + b.GetValue(Mat4.M13) * a.GetValue(Mat4.M31),
            b.GetValue(Mat4.M10) * a.GetValue(Mat4.M02) + b.GetValue(Mat4.M11) * a.GetValue(Mat4.M12) + b.GetValue(Mat4.M12) * a.GetValue(Mat4.M22) + b.GetValue(Mat4.M13) * a.GetValue(Mat4.M32),
            b.GetValue(Mat4.M10) * a.GetValue(Mat4.M03) + b.GetValue(Mat4.M11) * a.GetValue(Mat4.M13) + b.GetValue(Mat4.M12) * a.GetValue(Mat4.M23) + b.GetValue(Mat4.M13) * a.GetValue(Mat4.M33),
            b.GetValue(Mat4.M20) * a.GetValue(Mat4.M00) + b.GetValue(Mat4.M21) * a.GetValue(Mat4.M10) + b.GetValue(Mat4.M22) * a.GetValue(Mat4.M20) + b.GetValue(Mat4.M23) * a.GetValue(Mat4.M30),
            b.GetValue(Mat4.M20) * a.GetValue(Mat4.M01) + b.GetValue(Mat4.M21) * a.GetValue(Mat4.M11) + b.GetValue(Mat4.M22) * a.GetValue(Mat4.M21) + b.GetValue(Mat4.M23) * a.GetValue(Mat4.M31),
            b.GetValue(Mat4.M20) * a.GetValue(Mat4.M02) + b.GetValue(Mat4.M21) * a.GetValue(Mat4.M12) + b.GetValue(Mat4.M22) * a.GetValue(Mat4.M22) + b.GetValue(Mat4.M23) * a.GetValue(Mat4.M32),
            b.GetValue(Mat4.M20) * a.GetValue(Mat4.M03) + b.GetValue(Mat4.M21) * a.GetValue(Mat4.M13) + b.GetValue(Mat4.M22) * a.GetValue(Mat4.M23) + b.GetValue(Mat4.M23) * a.GetValue(Mat4.M33),
            b.GetValue(Mat4.M30) * a.GetValue(Mat4.M00) + b.GetValue(Mat4.M31) * a.GetValue(Mat4.M10) + b.GetValue(Mat4.M32) * a.GetValue(Mat4.M20) + b.GetValue(Mat4.M33) * a.GetValue(Mat4.M30),
            b.GetValue(Mat4.M30) * a.GetValue(Mat4.M01) + b.GetValue(Mat4.M31) * a.GetValue(Mat4.M11) + b.GetValue(Mat4.M32) * a.GetValue(Mat4.M21) + b.GetValue(Mat4.M33) * a.GetValue(Mat4.M31),
            b.GetValue(Mat4.M30) * a.GetValue(Mat4.M02) + b.GetValue(Mat4.M31) * a.GetValue(Mat4.M12) + b.GetValue(Mat4.M32) * a.GetValue(Mat4.M22) + b.GetValue(Mat4.M33) * a.GetValue(Mat4.M32),
            b.GetValue(Mat4.M30) * a.GetValue(Mat4.M03) + b.GetValue(Mat4.M31) * a.GetValue(Mat4.M13) + b.GetValue(Mat4.M32) * a.GetValue(Mat4.M23) + b.GetValue(Mat4.M33) * a.GetValue(Mat4.M33)
        );
    }

    public Multiply_i(b: Mat4x4): Mat4x4
    {
        return Mat4x4.Multiply(this, b);
    }

    public ToArray(): number[]
    {
        return this._val;
    }
}