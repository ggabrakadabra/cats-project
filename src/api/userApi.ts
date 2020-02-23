import { CatDetailsProps } from "../components/CatDetails/CatDetails";
import { userId } from "../App";

export async function setUser(userId: string) {
  await fetch(`http://localhost:3004/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id: userId })
  })
}

export async function getFavorites(userId: string) {
  await fetch(`http://localhost:3004/${userId}/favorties`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
}

export async function setFavorite(props: CatDetailsProps) {
  await fetch(`http://localhost:3004/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ favorites: props })
  })
}

