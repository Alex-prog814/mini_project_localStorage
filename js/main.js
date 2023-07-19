let imgInp = document.querySelector('#product-url-inp');
let titleInp = document.querySelector('#product-title-inp');
let priceInp = document.querySelector('#product-price-inp');
let addProductBtn = document.querySelector('.add-product-btn');
let saveProductBtn = document.querySelector('.save-product-btn');
let btnClose = document.querySelector('.btn-close');
let container = document.querySelector('.container');
// console.log(imgInp, titleInp, priceInp, addProductBtn, saveProductBtn);

function initStorage() {
    if(!localStorage.getItem('products-data')) {
        localStorage.setItem('products-data', '[]');
    };
};
initStorage();

function setProductsToStorage(products) {
    localStorage.setItem('products-data', JSON.stringify(products));
};

function getProductsFromStorage() {
    let products = JSON.parse(localStorage.getItem('products-data'));
    return products;
};

// create
function createProduct() {

    let productObj = {
        id: Date.now(),
        url: imgInp.value,
        title: titleInp.value,
        price: priceInp.value
    };

    let products = getProductsFromStorage();
    products.push(productObj);
    setProductsToStorage(products);

    imgInp.value = '';
    titleInp.value = '';
    priceInp.value = '';

    btnClose.click();

    render();
};

// read
function render() {
    container.innerHTML = '';
    let data = getProductsFromStorage();
    data.forEach(item => {
        container.innerHTML += `
            <div class="card w-25 m-2" style="width: 18rem;" id="${item.id}">
                <img src="${item.url}" class="card-img-top" alt="error:(" height="250">
                <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.price}$</p>
                <a href="#" class="btn btn-danger delete-product-btn">Delete</a>
                <a href="#" class="btn btn-secondary update-product-btn">Update</a>
                </div>
            </div>
        `;
    });

    if(data.length === 0) return;
    addDeleteEvent();
};
render();

addProductBtn.addEventListener('click', createProduct);

// delete
function deleteProduct(e) {
    console.log('WORK');
};

function addDeleteEvent() {
    let delBtns = document.querySelectorAll('.delete-product-btn');
    delBtns.forEach(item => item.addEventListener('click', deleteProduct));
};
