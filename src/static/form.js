document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      telefon: form.telefon.value,
      message: form.message.value,
      website: form.website.value,
    };

    const res = await fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.success || result.error);
  });
});
