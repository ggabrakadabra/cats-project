import { userId, CatFacts } from "../App";

export async function setUser(userId: string) {
  await fetch(`http://localhost:3004/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id: userId })
  });
}

export async function setFavorite(props: CatFacts) {
  const body = {
    ...props,
    userId
  }
  await fetch(`http://localhost:3004/favorites`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  });
}

export async function getUserFavorites(userId: string) {
  const response = await fetch(`http://localhost:3004/users/${userId}/favorites`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  });
  return await response.json();
}
