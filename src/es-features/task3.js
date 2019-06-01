/**
 * Передаем в функцию массив
 * Нужно вернуть новый массив, в котором первыми значениями будут 1, 2,
 * а остальными значениями будут значения из переданного массива
 *
 * Пример вызова
 * console.log(task3Old(['hello', 'test', 12])); ->  [ 1, 2, 'hello', 'test', 12 ]
 */

export function task3Old(params) {
  return [1, 2].concat(params);
}

// Напишите реализацию функции task3Old на ES6+ ниже этого комментария.
// При желании, можете использовать стрелочную функцию, вместо обычной

export function task3New(args) {
  let arr = [1, 2];
  for (let arg of args) {
    arr.push(arg);
  }
  return arr;
}
