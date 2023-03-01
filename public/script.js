const form = document.querySelector('form');
const userID = document.querySelector('#user-id');
const pin = document.querySelector('#pin');
const article = document.querySelector('#article');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('testt')

  const userIDValue = userID.value;
  const pinValue = pin.value;

  const response = await fetch(`/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: userIDValue,
      PIN: pinValue
    })
  });
  const articleHTML = await response.text();

  article.innerHTML = articleHTML;
});
