export function generateId() {
  const numbers = '0123456789';
  let id = '';

  const timestamp = Date.now().toString();
  id += timestamp;

  for (let i = 0; i < 8 - timestamp.length; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    id += numbers[randomIndex];
  }

  if (id.length > 8) {
    id = id.substring(0, 8);
  }

  return id;
}
