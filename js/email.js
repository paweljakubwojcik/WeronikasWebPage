export default {
    init: () => {

        const form = document.querySelector('.contact__form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let name = form.querySelector('#name').value
            let email = form.querySelector('#email').value
            let message = form.querySelector('#message').value
            console.log({ name, email, message })
        })

    }
}