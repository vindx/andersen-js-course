/**
 * Реализовать функцию membersOnActiveMeetups в этом файле, и экспортировать ее.
 *
 * Функция принимает массив meetups,
 * и возвращает суммарное количество человек, находящихся на активных митапах
 *
 * Пример вызова с нижним набором данных
 * membersOnActiveMeetups(meetups); // 1500
 */

// Раскомментировать нижнее, при начале реализации

export const meetups = [
  { name: 'JavaScript', isActive: true, members: 100 },
  { name: 'Angular', isActive: true, members: 900 },
  { name: 'Node', isActive: false, members: 600 },
  { name: 'React', isActive: true, members: 500 },
];

export function membersOnActiveMeetups(arr) {
  const [...newArr] = arr; //это не полная копия массива,
  // т.к. вложенные объекты всё равно ссылаются на оригиналы,
  // но если сделать деструктуризацию вложенных объектов [{...obj1},{...obj2},{...obj3},{...obj4}]
  // то не совсем понимаю как с ними работать
  return newArr.reduce((sum, arg) => arg.isActive === true ? sum + arg.members : sum, 0);
}
