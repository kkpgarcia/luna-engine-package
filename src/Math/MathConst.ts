import Vector3 from "./Vector3";

export default class MathConst
{
    public static EPSILON = 0.00002;
    public static EPSILON_SQ = MathConst.EPSILON * MathConst.EPSILON;
    public static GRAVITY = new Vector3(0, -9.18,  0);
}