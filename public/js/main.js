alert('hell');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const post = form.title.value;
    const post_body = form.body.value;
    console.log(post);
})

