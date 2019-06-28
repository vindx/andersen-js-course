const asyncBar = async () => 'Some string';

const foo = async () => {
  const message = await asyncBar();
  console.log(message);
};

export default foo;
