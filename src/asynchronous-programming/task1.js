function foo(x, cb) {
  if (x > 10) {
    console.log(`x > 10`);
    cb();
  } else {
    console.log(`x <= 10`);
  }
}

function createCb(str) {
  return () => console.log(str);
}

export { foo, createCb };
