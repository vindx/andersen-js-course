/**
 * Реализовать функцию arrayDiff в этом файле, и экспортировать ее.
 *
 * Функция принимает 2 массива.
 * Возвращает новый массив, который состоит только из тех элементов,
 * которые встрелились в одном массиве, но не встретились в другом
 *
 * ([1, 2, 3], [1, 2, 4])) -> 1ца и 2ка есть и там, и там - их выкидываем
 * 3ка есть только в 1ом массиве, 4ка только во 2ом. Возвращаем массив [3, 4]
 *
 * ([1, 3, 3, 4], [1, 3, '4'])) -> возвращаем [4, '4'],
 * так как одно значение - чисто, второе - строка.
 * Значения 1, 3 - есть и в 1ом и во 2ом массиве. Их выбрасываем.
 *
 * console.log(arrayDiff([1, 2, 3], [1, 2, 4])); -> [3, 4]
 * console.log(arrayDiff([1, 3, 3, 4], [1, 3, '4'])); -> [4, '4']
 */

// export function arrayDiff(arr1, arr2) {
//   function sort(arr) {
//     let sortedArr = [];
//
//     nextElement:
//       for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < sortedArr.length; j++) {
//           if (sortedArr[j] === arr[i]) continue nextElement;
//         }
//         sortedArr.push(arr[i]);
//       }
//
//     return sortedArr;
//   }
//
//   arr1 = sort(arr1);
//   arr2 = sort(arr2);
//
//   for (let i = arr1.length - 1; i >= 0; i--) {
//     for (let j = arr2.length - 1; j >= 0; j--) {
//       if (arr1[i] === arr2[j]) {
//         arr1.splice(i, 1);
//         arr2.splice(j, 1);
//       }
//     }
//   }
//
//   return arr1.concat(arr2);
// }


//после решения task4 меня осинило :)
export function arrayDiff(arr1, arr2) {
  return [...arr1.filter(x => !new Set(arr2).has(x)), ...arr2.filter(x => !new Set(arr1).has(x))];
}
