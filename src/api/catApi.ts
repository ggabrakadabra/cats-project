export async function getCatImages() {
  const response = await fetch('https://api.thecatapi.com/api/images/get?format=json&results_per_page=25', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return await response.json();
}

export async function getCatFacts() {
  const response = await fetch('https://catfact.ninja/facts?limit=25.', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return await response.json();
}