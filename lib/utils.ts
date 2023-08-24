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

export function generateRandomString() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  const randomLetter1 = letters[Math.floor(Math.random() * letters.length)];
  const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];
  const randomNumber1 = numbers[Math.floor(Math.random() * numbers.length)];
  const randomNumber2 = numbers[Math.floor(Math.random() * numbers.length)];
  const randomNumber3 = numbers[Math.floor(Math.random() * numbers.length)];

  const randomString = `${randomLetter1}${randomLetter2}${randomNumber1}${randomNumber2}${randomNumber3}`;
  return randomString;
}
