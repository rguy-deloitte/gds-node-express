document.querySelector('[data-form]').addEventListener('submit', async(event)=> {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData.entries());

  await fetch('/form-cs', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formValues),
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      response.json().then(data => {
        console.log(data.errors);
      });
    }
  });
});