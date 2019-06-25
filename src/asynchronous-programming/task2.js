function parseJson(jsonStr, success, failure) {
  try {
    const result = JSON.parse(jsonStr);
    success(result);
  } catch (err) {
    failure(err);
  }
}

function successCb(result) {
  console.log(`Success parse!`);
  console.log(result);
}

function failureCd(error) {
  console.log(`Failure parse!`);
  console.log(error);
}

export { parseJson, successCb, failureCd };
