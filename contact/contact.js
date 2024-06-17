// Data
let dataContact = [

];

const emptyData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    region: ""
}

// input contact info
const id = document.querySelector('#id');
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const region = document.querySelector('#region');


// create table element to add data contact
const form = document.querySelector('form');
const buttonUpdate = document.querySelector('#update');
const overlay = document.querySelector('#overlay');
const message = document.getElementById('message');
// bikin elemen table dan masing masing column nya di isi dengan innertext yang sesuai pada data input
// ambil isi input field
// tambah kan isi input field ke dalam array 
// buat table row sesuai dengan input field
function createRow(data) {

    const row = document.createElement('tr');
    row.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');

    const fullName = document.createElement('th');
    fullName.classList.add('px-6', 'py-4', 'font-medium', 'text-gray-900', 'whitespace-nowrap', 'dark:text-white');
    fullName.innerText = data.firstName + ` ${data.lastName}`;
    row.appendChild(fullName);

    const emailAddres = document.createElement('td');
    emailAddres.classList.add('px-6', 'py-4');
    emailAddres.innerText = data.emailAddress;
    row.appendChild(emailAddres);

    const phoneNumber = document.createElement('td');
    phoneNumber.classList.add('px-6', 'py-4');
    phoneNumber.innerText = data.phoneNumber;
    row.appendChild(phoneNumber);

    const country = document.createElement('td');
    country.classList.add('px-6', 'py-4');
    country.innerText = data.region;
    row.appendChild(country);

    const edit = document.createElement('td');
    edit.classList.add('px-6', 'py-4', 'flex', 'flex-col');
    row.appendChild(edit);

    const textEdit = document.createElement('button');
    textEdit.classList.add('font-medium', 'text-blue-600', 'dark:text-blue-500', 'hover:underline', 'edit');
    textEdit.innerText = 'edit';
    textEdit.onclick = editContact;
    edit.appendChild(textEdit);

    const textDelete = document.createElement('button');
    textDelete.classList.add('font-medium', 'text-red-600', 'dark:text-red-500', 'hover:underline', 'edit');
    textDelete.innerText = 'delete';
    textDelete.onclick = deleteContact;
    edit.appendChild(textDelete);
    return row
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))
    // pecah pecah function agar bisa di gunakkan kembali
    dataContact.push(data);
    // sampai sini
    // ambil data nya pakai get element
    // buat row dan tambah an row
    const tbody = document.querySelector('tbody');
    const row = createRow(data)
    tbody.appendChild(row)


    form.classList.add('hidden');
    overlay.classList.add('hidden');
    message.remove();
    console.log(dataContact)
});

buttonUpdate.addEventListener('click', (e) => {
    // ambil data dari form
    // update data contact
    // buat row dan ganti row
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // ubah value dari key nya sesuai input data update
    dataContact[data.id - 1] = data;
    const tbody = document.querySelector('tbody');
    const oldRow = tbody.getElementsByTagName('tr')[data.id - 1];
    const row = createRow(data);
    tbody.replaceChild(row, oldRow);
    form.classList.add('hidden');
    overlay.classList.add('hidden');
    message.remove();
})


// membuat element form
const buttonAdd = document.querySelector('#button-add');

function openForm(data) {
    return function () {
        id.value = data.id;
        firstName.value = data.firstName;
        lastName.value = data.lastName;
        phone.value = data.phoneNumber;
        email.value = data.emailAddress;
        region.value = data.region;

        form.classList.remove('hidden');
        overlay.classList.remove('hidden');
        document.querySelector('#add').classList.add('hidden');

        // close button
        document.getElementById('close-btn').addEventListener('click', () => {
            form.classList.add('hidden');
            overlay.classList.add('hidden');
        });

    }
}

// cara nya adalah dengan membuat form baru ketika event edit
// dan membuat event submit baru ketika form edit di submit
// dapat kan elemen nya dan ganti innertext nya sesuai input
buttonAdd.addEventListener('click', (e) => {
    if (e.target.innerText === 'Add contact') {
        openForm({ ...emptyData, id: dataContact.length + 1 })();
        document.querySelector('#add').classList.remove('hidden');
        document.querySelector('#update').classList.add('hidden');
    }
});

function editContact(e) {
    if (e.target.innerText === 'edit') {
        const rowIndex = e.target.parentElement.parentElement.rowIndex;
        openForm(dataContact[rowIndex - 1])();
        document.querySelector('#add').classList.add('hidden');
        document.querySelector('#update').classList.remove('hidden');
    }
}

function deleteContact (e) {
    const rowIndex = e.target.parentElement.parentElement;
    rowIndex.remove();
}


// search feature

const buttonSearch = document.querySelector('#search');
const searchInput = document.querySelector('#default-search');

buttonSearch.addEventListener('click', (e) => {
    // jika di klik maka hanya akan menampil kan
    // include dari string input
    const tbody = document.querySelector('tbody');
    const children = document.querySelectorAll('tbody tr');
    children.forEach((child, index) => {
        console.log(child.firstChild)
        if (child.firstChild.textContent.includes(searchInput.value)) {
            children[index].classList.remove('hidden');
        } else {
            children[index].classList.add('hidden');
        }
    });

});