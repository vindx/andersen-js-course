const printDataFromUrls = () => {
  const urls = [
    'http://www.json-generator.com/api/json/get/cevhxOsZnS',
    'http://www.json-generator.com/api/json/get/cguaPsRxAi',
    'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
    'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
    'http://www.json-generator.com/api/json/get/ceQMMKpidK',
  ];

  // параллельная загрузка
  Promise.all(urls.map(url => fetch(url).then(response => response.json()))).then(values =>
    console.log(values)
  );

  // последовательная загрузка с последовательным выводом
  // urls.reduce(
  //   (prom, url) =>
  //     prom
  //       .then(() => fetch(url))
  //       .then(response => response.json())
  //       .then(value => console.log(value)),
  //   Promise.resolve()
  // );

  // последовательная загрузка с одновременным выводом
  // const arrayOfPromises = [];
  // urls.reduce(
  //   (prom, url) =>
  //     prom
  //       .then(() => fetch(url))
  //       .then(response => {
  //         arrayOfPromises.push(response.json());
  //         // можно и setTimeout ниже установить,
  //         // но там не ясно сколько времени потребует загрузка всех данных
  //         if (arrayOfPromises.length === urls.length) {
  //           Promise.all(arrayOfPromises).then(value => console.log(value));
  //         }
  //       }),
  //   Promise.resolve()
  // );

  // setTimeout(() => Promise.all(arrayOfPromises).then(array => console.log(array)), 1500);
};

export default printDataFromUrls;
