const USER_API = "https://api.github.com/users/";

async function getUser(user) {
  const resp = await fetch(USER_API + user);
  const respData = await resp.json();

  createUserCard(respData);
}

function createUserCard(user) {}
