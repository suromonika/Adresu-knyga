const addressList = document.querySelector('#address-list');
const inputs = document.querySelectorAll('input');
const saveBtn = document.querySelector('#save');
let addressBookArray = [];

function createElement(tag, props) {
  addressList.replaceChildren();
  const newTag = document.createElement(tag);

  if (props && props.length) {
    props.forEach((singleProp) => {
      newTag[singleProp.name] = singleProp.value;
    });
  }

  return newTag;
}

function render(data) {
  const addressBookContainerId = 'address-book-ouput';

  const addressBookContainer = createElement('div', [
    { name: 'id', value: addressBookContainerId },
  ]);
  const firstNameOutput = createElement('p', [
    { name: 'textContent', value: data.name },
  ]);
  const lastNameOutput = createElement('p', [
    { name: 'textContent', value: data.surname },
  ]);
  const emailOutput = createElement('p', [
    { name: 'textContent', value: data.email },
  ]);
  const addressOutput = createElement('p', [
    { name: 'textContent', value: data.address },
  ]);
  const phoneOutput = createElement('p', [
    { name: 'textContent', value: data.phone },
  ]);

  addressBookContainer.append(
    firstNameOutput,
    lastNameOutput,
    emailOutput,
    addressOutput,
    phoneOutput
  );
  document.querySelector('#app').append(addressBookContainer);
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.localStorage.getItem('addressBookInputs')) {
    const persistedData = JSON.parse(
      window.localStorage.getItem('addressBookInputs')
    );

    render(persistedData);
    document.querySelector("#address-book-inputs [name='name']").value =
      persistedData.name;
    document.querySelector("#address-book-inputs [name='surname']").value =
      persistedData.surname;
    document.querySelector("#address-book-inputs [name='address']").value =
      persistedData.address;
    document.querySelector("#address-book-inputs [name='email']").value =
      persistedData.email;
    document.querySelector("#address-book-inputs [name='phone']").value =
      persistedData.phone;
  }

  document
    .querySelector('#address-book-inputs')
    .addEventListener('submit', (e) => {
      e.preventDefault();

      const addressBookInputs = {
        name: e.target.querySelector("[name='name']").value,
        surname: e.target.querySelector("[name='surname']").value,
        address: e.target.querySelector("[name='address']").value,
        email: e.target.querySelector("[name='email']").value,
        phone: e.target.querySelector("[name='phone']").value,
      };

      addressBookArray.push(addressBookInputs);

      render(addressBookInputs);
      window.localStorage.setItem(
        'addressBookInputs',
        JSON.stringify(addressBookArray)
      );
    });
});
