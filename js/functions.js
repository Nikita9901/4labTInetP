
let products = [];

let xhr = new XMLHttpRequest();
xhr.open('GET', 'products/_products_list.txt', true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let productsData = xhr.responseText.split('\n');

        products = productsData.map(function (productLine) {
            let productDetails = productLine.split('#');
            return {
                code: productDetails[0],
                name: productDetails[1],
                descriptionFile: productDetails[2]
            };
        });
        displayProductList()
        console.log(products);
    }
};

xhr.send();



function displayProductList() {
    let productListElement = document.getElementById('productList');
    productListElement.innerHTML = ''; 
    // Создаем таблицу
    let table = document.createElement('table');
    table.setAttribute('border', '1'); // Устанавливаем границу таблицы

    // Создаем заголовок таблицы
    let caption = document.createElement('caption');
    caption.innerHTML = '<h3>Список телефонов</h3>';
    table.appendChild(caption);

    // Создаем заголовок таблицы
    let headerRow = document.createElement('tr');
    let headers = ['Код', 'Название', 'Файл'];

    headers.forEach(headerText => {
        let headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    table.appendChild(headerRow);

    // Заполняем таблицу данными о товарах
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        
        let row = document.createElement('tr');

        // Добавляем ячейки в строку
        let codeCell = document.createElement('td');
        codeCell.textContent = product.code;
        row.appendChild(codeCell);

        let nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        let fileCell = document.createElement('td');
        let fileLink = document.createElement('a');
        fileLink.href = '#';
        fileLink.textContent = product.descriptionFile;
        fileLink.addEventListener('click', function (event) {
            event.preventDefault();
            showProductDetails(product);
        });
        fileCell.appendChild(fileLink)
        row.appendChild(fileCell);

        // Добавляем строку в таблицу
        table.appendChild(row);
    }

    // Добавляем таблицу в документ
    document.body.appendChild(table);

}

function showProductDetails(product) {
    console.log('errot')
    let productDetailsPage = window.open('', '_blank');
    let details
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `products/${product.descriptionFile}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let detailsData = xhr.responseText.split('\n').filter(str=>str.length >2);
            console.log(detailsData)
            details = detailsData.map(function (detailLine) {
                let productDetails = detailLine.split('#');
                return {
                    price: productDetails[0],
                    color: productDetails[1],
                    country: productDetails[2]
                };
            });
            console.log(details)
            createPage(product.name, details)
        }
    };

    xhr.send();

    function createPage(name, details){
        const goods = details.map(detail=>`
        <p><b>Цена:</b> ${detail.price}
        <b>Цвет:</b> ${detail.color}
        <b>Поставщик:</b> ${detail.country}</p>
        `).join('')
        let content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Подробное описание товара</title>

        </head>
        <body>
            <h1>${name}</h1>
            ${goods}
        </body>
        </html>
    `;

    productDetailsPage.document.open();
    productDetailsPage.document.write(content);
    productDetailsPage.document.close();
    }
}


