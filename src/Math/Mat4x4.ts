import MathImpl from "./MathImpl";
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

    private static RotationX(angle: number): Mat4x4
    {
        angle = MathImpl.DegreeToRad(angle);
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
        angle = MathImpl.DegreeToRad(angle);
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
        angle = MathImpl.DegreeToRad(angle);
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

    public static Orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4x4
    {
        return new Mat4x4(
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, 2 / (near - far), 0,
       
            (left + right) / (left - right),
            (bottom + top) / (bottom - top),
            (near + far) / (near - far),
            1,
        );
    }

    public static Projection(width: number, height: number, depth: number): Mat4x4
    {
        return new Mat4x4(
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 2 / depth, 0,
           -1, 1, 0, 1,
        );
    }

    public static Perspective(fieldOfView, aspect, near, far): Mat4x4
    {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * (MathImpl.DegreeToRad(fieldOfView)));
        var rangeInv = 1.0 / (near - far);

        return new Mat4x4(
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0
        );
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

    public static Inverse(m: Mat4x4): Mat4x4
    {
        var tmp_0  = m.GetValue(Mat4.M22) * m.GetValue(Mat4.M33);
        var tmp_1  = m.GetValue(Mat4.M32) * m.GetValue(Mat4.M23);
        var tmp_2  = m.GetValue(Mat4.M12) * m.GetValue(Mat4.M33);
        var tmp_3  = m.GetValue(Mat4.M32) * m.GetValue(Mat4.M13);
        var tmp_4  = m.GetValue(Mat4.M12) * m.GetValue(Mat4.M23);
        var tmp_5  = m.GetValue(Mat4.M22) * m.GetValue(Mat4.M13);
        var tmp_6  = m.GetValue(Mat4.M02) * m.GetValue(Mat4.M33);
        var tmp_7  = m.GetValue(Mat4.M32) * m.GetValue(Mat4.M03);
        var tmp_8  = m.GetValue(Mat4.M02) * m.GetValue(Mat4.M23);
        var tmp_9  = m.GetValue(Mat4.M22) * m.GetValue(Mat4.M03);
        var tmp_10 = m.GetValue(Mat4.M02) * m.GetValue(Mat4.M13);
        var tmp_11 = m.GetValue(Mat4.M12) * m.GetValue(Mat4.M03);
        var tmp_12 = m.GetValue(Mat4.M20) * m.GetValue(Mat4.M31);
        var tmp_13 = m.GetValue(Mat4.M30) * m.GetValue(Mat4.M21);
        var tmp_14 = m.GetValue(Mat4.M10) * m.GetValue(Mat4.M31);
        var tmp_15 = m.GetValue(Mat4.M30) * m.GetValue(Mat4.M11);
        var tmp_16 = m.GetValue(Mat4.M10) * m.GetValue(Mat4.M21);
        var tmp_17 = m.GetValue(Mat4.M20) * m.GetValue(Mat4.M11);
        var tmp_18 = m.GetValue(Mat4.M00) * m.GetValue(Mat4.M31);
        var tmp_19 = m.GetValue(Mat4.M30) * m.GetValue(Mat4.M01);
        var tmp_20 = m.GetValue(Mat4.M00) * m.GetValue(Mat4.M21);
        var tmp_21 = m.GetValue(Mat4.M20) * m.GetValue(Mat4.M01);
        var tmp_22 = m.GetValue(Mat4.M00) * m.GetValue(Mat4.M11);
        var tmp_23 = m.GetValue(Mat4.M10) * m.GetValue(Mat4.M01);

        var t0 = (tmp_0 *m.GetValue(Mat4.M11) + tmp_3 *m.GetValue(Mat4.M21) + tmp_4 *m.GetValue(Mat4.M31)) -
                (tmp_1 *m.GetValue(Mat4.M11) + tmp_2 *m.GetValue(Mat4.M21) + tmp_5 *m.GetValue(Mat4.M31));
        var t1 = (tmp_1 *m.GetValue(Mat4.M01) + tmp_6 *m.GetValue(Mat4.M21) + tmp_9 *m.GetValue(Mat4.M31)) -
                (tmp_0 *m.GetValue(Mat4.M01) + tmp_7 *m.GetValue(Mat4.M21) + tmp_8 *m.GetValue(Mat4.M31));
        var t2 = (tmp_2 *m.GetValue(Mat4.M01) + tmp_7 *m.GetValue(Mat4.M11) + tmp_10 *m.GetValue(Mat4.M31)) -
                (tmp_3 *m.GetValue(Mat4.M01) + tmp_6 *m.GetValue(Mat4.M11) + tmp_11 *m.GetValue(Mat4.M31));
        var t3 = (tmp_5 *m.GetValue(Mat4.M01) + tmp_8 *m.GetValue(Mat4.M11) + tmp_11 *m.GetValue(Mat4.M21)) -
                (tmp_4 *m.GetValue(Mat4.M01) + tmp_9 *m.GetValue(Mat4.M11) + tmp_10 *m.GetValue(Mat4.M21));

        var d = 1.0 / (m.GetValue(Mat4.M00) * t0 +m.GetValue(Mat4.M10) * t1 +m.GetValue(Mat4.M20) * t2 +m.GetValue(Mat4.M30) * t3);

        return new Mat4x4(
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * ((tmp_1  * m.GetValue(Mat4.M10) + tmp_2  * m.GetValue(Mat4.M20) + tmp_5  * m.GetValue(Mat4.M30)) -
                (tmp_0   * m.GetValue(Mat4.M10) + tmp_3  * m.GetValue(Mat4.M20) + tmp_4  * m.GetValue(Mat4.M30))),
            d * ((tmp_0  * m.GetValue(Mat4.M00) + tmp_7  * m.GetValue(Mat4.M20) + tmp_8  * m.GetValue(Mat4.M30)) -
                (tmp_1   * m.GetValue(Mat4.M00) + tmp_6  * m.GetValue(Mat4.M20) + tmp_9  * m.GetValue(Mat4.M30))),
            d * ((tmp_3  * m.GetValue(Mat4.M00) + tmp_6  * m.GetValue(Mat4.M10) + tmp_11 * m.GetValue(Mat4.M30)) -
                (tmp_2   * m.GetValue(Mat4.M00) + tmp_7  * m.GetValue(Mat4.M10) + tmp_10 * m.GetValue(Mat4.M30))),
            d * ((tmp_4  * m.GetValue(Mat4.M00) + tmp_9  * m.GetValue(Mat4.M10) + tmp_10 * m.GetValue(Mat4.M20)) -
                (tmp_5   * m.GetValue(Mat4.M00) + tmp_8  * m.GetValue(Mat4.M10) + tmp_11 * m.GetValue(Mat4.M20))),
            d * ((tmp_12 * m.GetValue(Mat4.M13) + tmp_15 * m.GetValue(Mat4.M23) + tmp_16 * m.GetValue(Mat4.M33)) -
                (tmp_13  * m.GetValue(Mat4.M13) + tmp_14 * m.GetValue(Mat4.M23) + tmp_17 * m.GetValue(Mat4.M33))),
            d * ((tmp_13 * m.GetValue(Mat4.M03) + tmp_18 * m.GetValue(Mat4.M23) + tmp_21 * m.GetValue(Mat4.M33)) -
                (tmp_12  * m.GetValue(Mat4.M03) + tmp_19 * m.GetValue(Mat4.M23) + tmp_20 * m.GetValue(Mat4.M33))),
            d * ((tmp_14 * m.GetValue(Mat4.M03) + tmp_19 * m.GetValue(Mat4.M13) + tmp_22 * m.GetValue(Mat4.M33)) -
                (tmp_15  * m.GetValue(Mat4.M03) + tmp_18 * m.GetValue(Mat4.M13) + tmp_23 * m.GetValue(Mat4.M33))),
            d * ((tmp_17 * m.GetValue(Mat4.M03) + tmp_20 * m.GetValue(Mat4.M13) + tmp_23 * m.GetValue(Mat4.M23)) -
                (tmp_16  * m.GetValue(Mat4.M03) + tmp_21 * m.GetValue(Mat4.M13) + tmp_22 * m.GetValue(Mat4.M23))),
            d * ((tmp_14 * m.GetValue(Mat4.M22) + tmp_17 * m.GetValue(Mat4.M32) + tmp_13 * m.GetValue(Mat4.M12)) -
                (tmp_16  * m.GetValue(Mat4.M32) + tmp_12 * m.GetValue(Mat4.M12) + tmp_15 * m.GetValue(Mat4.M22))),
            d * ((tmp_20 * m.GetValue(Mat4.M32) + tmp_12 * m.GetValue(Mat4.M02) + tmp_19 * m.GetValue(Mat4.M22)) -
                (tmp_18  * m.GetValue(Mat4.M22) + tmp_21 * m.GetValue(Mat4.M32) + tmp_13 * m.GetValue(Mat4.M02))),
            d * ((tmp_18 * m.GetValue(Mat4.M12) + tmp_23 * m.GetValue(Mat4.M32) + tmp_15 * m.GetValue(Mat4.M02)) -
                (tmp_22  * m.GetValue(Mat4.M32) + tmp_14 * m.GetValue(Mat4.M02) + tmp_19 * m.GetValue(Mat4.M12))),
            d * ((tmp_22 * m.GetValue(Mat4.M22) + tmp_16 * m.GetValue(Mat4.M02) + tmp_21 * m.GetValue(Mat4.M12)) -
                (tmp_20  * m.GetValue(Mat4.M12) + tmp_23 * m.GetValue(Mat4.M22) + tmp_17 * m.GetValue(Mat4.M02)))
        );
    }

    public static LookAt(cameraPos: Vector3, target: Vector3, up: Vector3): Mat4x4
    {
        const z = cameraPos.Subtract(target).Normalize();
        const x = Vector3.Cross(up, z).Normalize();
        const y = Vector3.Cross(z, x).Normalize();

        return new Mat4x4(
            x[0], x[1], x[2], 0,
            y[0], y[1], y[2], 0,
            z[0], z[1], z[2], 0,
            cameraPos[0], cameraPos[1], cameraPos[2], 1
        );
    }

    public static Transpose(m: Mat4x4): Mat4x4
    {
        return new Mat4x4 (
            m.Get(0), m.Get(4), m.Get(8), m.Get(12),
            m.Get(1), m.Get(5), m.Get(9), m.Get(13),
            m.Get(2), m.Get(6), m.Get(10), m.Get(14),
            m.Get(3), m.Get(7), m.Get(11), m.Get(15),
        );
    }

    public static Copy(m: Mat4x4): Mat4x4
    {
        const newMat = Mat4x4.IDENTITY;
        newMat.SetValues(m.ToArray());
        return newMat;
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