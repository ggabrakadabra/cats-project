import { userId } from "../App";
import { CatDetailProps } from "../components/CatDetails/CatDetails";

export async function setUser(userId: string) {
  await fetch(`http://localhost:3004/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id: userId })
  })
}

export async function getUser(userId: string) {
  const response = await fetch(`http://localhost:3004/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: 'GET',
  })
  return await response.json();
}

export async function setFavorite(props: CatDetailProps) {
  await fetch(`http://localhost:3004/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ favorites: [props] })
  })
}

