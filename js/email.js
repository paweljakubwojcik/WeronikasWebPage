import { cmsBaseURL } from './config'

let form, button, name, email, message;

export default {
    init: () => {
        form = document.querySelector('.contact__form')
        button = form.querySelector('button')
        name = form.querySelector('#name')
        email = form.querySelector('#email')
        message = form.querySelector('#message')

        form.addEventListener('submit', (e) => {
            e.preventDefault()


            let data = { name: name.value, email: email.value, message: message.value }
            console.log({ data })

            button.classList.add('loading')
            button.innerHTML = 'Wysyłanie'
            if (name.value.length === 0)
                button.innerHTML = 'Proszę podac mi swojie imię'
            if (email.value.length === 0)
                button.innerHTML = 'Email jest potrzebny'
            if (message.value.length === 0)
                button.innerHTML = 'Nie wyśle pustej wiadomości'
            if (button.innerHTML === 'Wysyłanie')
                fetch(`${cmsBaseURL}/emails`, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(data => {
                        onFetchEnd(data.succes)

                    })
                    .catch((error) => {
                        onFetchEnd(false)
                        console.error('Error:', error);
                    });

        })

        message.addEventListener('input', () => {
            if (message.value.length !== 0)
                button.innerHTML = 'Wyślij'
        })

    }
}

const onFetchEnd = (succes) => {
    button.classList.remove('loading')
    button.blur()
    if (succes) {
        button.innerHTML = 'Wysłano'
        name.value = ''
        email.value = ''
        message.value = ''
    }
    else
        button.innerHTML = 'Coś poszło nie tak'
}