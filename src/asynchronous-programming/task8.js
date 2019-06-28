async function foo(url) {
  try {
    const getUsers = await fetch(url);
    const [user] = await getUsers.json();
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

export default foo;
