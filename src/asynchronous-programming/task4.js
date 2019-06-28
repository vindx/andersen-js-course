const doubleRequest = () => {
  fetch('http://www.json-generator.com/api/json/get/cfQCylRjuG')
    .then(response => response.json())
    .then(object => object.getUsersData)
    .then(value => {
      if (value) {
        fetch('http://www.json-generator.com/api/json/get/cfVGucaXPC')
          .then(response => response.json())
          .then(array => console.log(array));
      }
    });
};

export default doubleRequest;
