const USER_SESSIONSTORAGE_KEY = "cloud_user";

// helper to get user from localstorage
export function getStoredUser() {
  const storedUser = sessionStorage.getItem(USER_SESSIONSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

// export function getJwtUser() {
//   const jwtUser = sessionStorage.getItem("jwt");
//   return jwtUser ? JSON.parse(jwtUser) : null;
// }

export function setStoredUser(user) {
  if (sessionStorage.getItem(USER_SESSIONSTORAGE_KEY)) {
    const originUser = JSON.parse(
      sessionStorage.getItem(USER_SESSIONSTORAGE_KEY)
    );
    sessionStorage.setItem(
      USER_SESSIONSTORAGE_KEY,
      JSON.stringify({ ...originUser, user })
    );
  } else {
    sessionStorage.setItem(USER_SESSIONSTORAGE_KEY, JSON.stringify(user));
  }
}

export function setStoredPoint(Point) {
  sessionStorage.setItem("point", JSON.stringify(Point));
}

export function clearStoredUser() {
  sessionStorage.removeItem(USER_SESSIONSTORAGE_KEY);
}
