const phoneName = () => {
    const phoneName = document.getElementById('phone-name').value;
    loadPhones(phoneName.toLowerCase());
}

const loadPhones = async (phoneName) => {
    url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`


    const res = await fetch(url)
    const data = await res.json()
    displaySearchPhones(data.data)

}
const displaySearchPhones = (phones) => {
    // console.log(phones)
    const phoneNotFound = document.getElementById('error')
    const displayPhone = document.getElementById('displayPhone')

    if (phones.length == 0) {
        displayPhone.innerHTML = ''
        phoneNotFound.style.display = 'block'
    }

    else {
        phoneNotFound.style.display = 'none'

        phones.forEach(phone => {
            // console.log(phone.phone_name)

            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <a class="btn btn-primary">Details</a>
        </div>
        `
            displayPhone.appendChild(div)
        })
    }
}

