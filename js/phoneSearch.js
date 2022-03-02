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
    const phone20 = phones.slice(0, 20)

    const phoneNotFound = document.getElementById('error')
    const displayPhone = document.getElementById('displayPhone')

    const singlePhoneDetail = document.getElementById('single-phone-detail')
    const otherInfo = document.getElementById('others-info')
    // single phone detail

    if (phone20.length == 0) {
        displayPhone.innerHTML = ''
        singlePhoneDetail.textContent = ''
        otherInfo.textContent = ''
        phoneNotFound.style.display = 'block'
        // for not found
    }

    else {
        phoneNotFound.style.display = 'none'
        const gifImg = document.getElementById('gif-img');
        gifImg.style.display = "none"
        phone20.forEach(phone => {
            // console.log(phone.phone_name)
            const div = document.createElement('div')
            div.classList.add('col');
            div.className = 'shadow-sm bg-body rounded'
            div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-75 d-flex justify-content-center" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <div class="d-grid gap-2">
                <button class="btn btn-info text-center" onclick="loadSinglePhone('${phone.slug}')">Details</button>
            </div>
        </div>
        `
            displayPhone.appendChild(div)
        })
    }
    // show phones
}

const loadSinglePhone = async (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = (phone) => {
    const singlePhoneDetail = document.getElementById('single-phone-detail');
    const otherInfo = document.getElementById('others-info');
    singlePhoneDetail.innerHTML = '';
    singlePhoneDetail.style.display = "block"
    const div = document.createElement('div')
    div.className = 'd-flex justify-content-center'

    div.innerHTML = `
    <div class="col-lg-4 col-md-6 col-sm-12">
        <img src="${phone.image}" alt="" class="img-fluid w-75 mx-auto">
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
    // console.log(phone.others);
    if (phone.others == undefined) {
        console.log("no");
        otherInfo.innerHTML = ''
    } else {
        otherInfo.innerHTML = ''

        const ul = document.createElement('ul');
        // ul.classList.add('list-group');
        const h4 = document.createElement('h4');
        h4.innerText = 'Other Info:';
        h4.classList.add('text-danger');
        ul.appendChild(h4)
        for (const [key, value] of Object.entries(phone.others)) {
            const li = document.createElement('li');
            // li.classList.add('list-group-item');
            li.innerText = `${key}: ${value}`;
            // console.log(`${key}: ${value}`);
            ul.appendChild(li);
        }
        otherInfo.appendChild(ul);
    }
    // others info

    singlePhoneDetail.appendChild(div)
    // single phone details show
}
