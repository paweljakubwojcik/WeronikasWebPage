import { cmsBaseURL } from './config'



export default {

    init: () => {

        const experience = document.querySelector('.experience')
        const education = document.querySelector('.education')
        const assets = document.querySelector('.assets')

        fetch(`${cmsBaseURL}/hero-description`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.hero-description').innerHTML = data.description
            })
            .catch(err => console.log(err));

        fetch(`${cmsBaseURL}/hero-image`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.hero-image').src = cmsBaseURL + data.image.url
            })
            .catch(err => console.log(err));

        fetch(`${cmsBaseURL}/entries?_sort=start:DESC`)
            .then(response => response.json())
            .then(data => {
                let template = experience.querySelector('.about')
                data.forEach(element => {
                    let section = template.cloneNode(true)
                    section.querySelector('header').innerHTML = element.Tittle
                    section.querySelector('.content').innerHTML = element.contents
                    section.querySelector('.period').innerHTML =
                        `${element.start}  -  ${element.end ? element.end : 'obecnie'}`

                    experience.appendChild(section)

                });
                template.style.display = 'none'

            })
            .catch(err => console.log(err));

        fetch(`${cmsBaseURL}/educations?_sort=start:DESC`)
            .then(response => response.json())
            .then(data => {
                let template = education.querySelector('.about')
                data.forEach(element => {
                    let section = template.cloneNode(true)
                    section.querySelector('header').innerHTML = element.Tittle
                    section.querySelector('.content').innerHTML = element.Contents
                    section.querySelector('.period').innerHTML =
                        `${element.start}  -  ${element.end ? element.end : 'obecnie'}`

                    education.appendChild(section)

                });
                template.style.display = 'none'

            })
            .catch(err => console.log(err));

        fetch(`${cmsBaseURL}/assets?_sort=Kropeczki:DESC`)
            .then(response => response.json())
            .then(data => {
                let template = assets.querySelector('.about')
                data.forEach(element => {
                    let section = template.cloneNode(true)
                    let asset = section.querySelector('.asset')
                    asset.innerHTML = element.asset
                    let kropeczki = document.createElement('div')
                    kropeczki.classList.add('dots')
                    asset.appendChild(kropeczki)
                    for (let i = 0; i < element.Kropeczki; i++) {
                        kropeczki.appendChild(document.createElement('span'))
                    }

                    assets.appendChild(section)

                });
                template.style.display = 'none'

            })
            .catch(err => console.log(err));


    }
}