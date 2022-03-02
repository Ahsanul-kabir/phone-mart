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
        <img src="${phone.image}" class="card-img-top w-75" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <a class="btn btn-primary text-center" onclick="loadSinglePhone('${phone.slug}')">Details</a>
        </div>
        `
            displayPhone.appendChild(div)
        })
    }
}

const loadSinglePhone = async (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = (phone) => {
    const singlePhoneDetail = document.getElementById('single-phone-detail')
    singlePhoneDetail.innerHTML = ''
    singlePhoneDetail.style.display = "block"
    const div = document.createElement('div')
    div.className = 'd-flex justify-content-center'

    div.innerHTML = `
    <div class="col-lg-4 col-md-6 col-sm-12">
        <img src="${phone.image}" alt="" class="img-fluid w-75">
        <p>Released ${phone.releaseDate || 'No Release Date found!'}</p>
    </div>
    <div class="col-lg-8 col-md-6 col-sm-12">
        <h4>${phone.name}</h4>
        <h6>${phone.brand}</h6>

        <h2>Features</h2>
        <p>Storage: ${phone.mainFeatures.storage}</p>
        <p>DisplaySize: ${phone.mainFeatures.displaySize}</p>
        <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
        <p>Memory: ${phone.mainFeatures.memory}</p>
        <p>Sensors: ${phone.mainFeatures.sensors}</p>
    </div>
    `
    singlePhoneDetail.appendChild(div)
}
