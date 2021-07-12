export default class ArrayEx {
    static RemoveElement(array, element) {
        return array.filter(function (value, index, arr) {
            return value !== element;
        });
    }
}
