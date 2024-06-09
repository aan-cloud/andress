// Data
const dataContact = {
    datas: [
        {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailAddress: "",
            region: ''
        }
    ]
};

// input contact info
const firsName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const region = document.querySelector('#region');


// create table element to add data contact
const form = document.querySelector('form');
const overlay = document.querySelector('#overlay');
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tbody = document.querySelector('tbody');
    const row = document.createElement('tr');
    row.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');
    tbody.appendChild(row);

    const fullName = document.createElement('th');
    fullName.classList.add('px-6', 'py-4', 'font-medium', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
    row.appendChild(fullName);

    const emailAddres = document.createElement('td');
    emailAddres.classList.add('px-6','py-4');
    row.appendChild(emailAddres);

    const phoneNumber = document.createElement('td');
    phoneNumber.classList.add('px-6','py-4');
    row.appendChild(phoneNumber);

    const country = document.createElement('td');
    country.classList.add('px-6','py-4');
    row.appendChild(country);

    const edit = document.createElement('td');
    edit.classList.add('px-6','py-4');
    row.appendChild(edit);

    const textEdit = document.createElement('a');
    textEdit.classList.add('font-medium', 'text-blue-600', 'dark:text-blue-500', 'hover:underline');
    textEdit.innerText = 'edit';
    edit.appendChild(textEdit);


    dataContact.datas.forEach((data) => {
        data.firstName = firsName.value;
        data.lastName = lastName.value;
        data.phoneNumber = phone.value;
        data.emailAddress = email.value;
        data.region = region.value;
        fullName.innerText = data.firstName + ` ${data.lastName}`;
        emailAddres.innerText = data.emailAddress;
        phoneNumber.innerText = data.phoneNumber;
        country.innerText = data.region;
    });



    form.classList.add('hidden');
    overlay.classList.add('hidden');
    message.remove();
});


// membuat element form
const buttonAdd = document.querySelector('#button-add');

buttonAdd.addEventListener('click', function createDataForm (data) {
    firsName.value = "";
    lastName.value = "";
    phone.value = "";
    email.value = "";
    region.value = "";
    
    form.classList.remove('hidden');
    overlay.classList.remove('hidden');

    // close button
    document.getElementById('close-btn').addEventListener('click', () => {
        form.classList.add('hidden');
        overlay.classList.add('hidden');
    });
});