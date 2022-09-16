let validationMethod = 'server';

document.querySelectorAll('[data-validate]').forEach((item) => {
  item.addEventListener('click', (event) => {
    validationMethod = event.target.getAttribute('data-validate');
  });
});

document.querySelector('[data-form]').addEventListener('submit', async(event)=> {
  if (validationMethod === 'client') {
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
  }
});