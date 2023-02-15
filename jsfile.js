let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementsByClassName("total")[0];
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementsByClassName("create")[0];
let tableH = document.getElementsByTagName("table")[0];
let searchbox = document.getElementById("search");
//function getTotal
function getTotle() {
    if (price.value != "") {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = "green";
    }
    else {
        total.innerHTML = "";
        total.style.background = "red";
    }
}
// main array and local storage
let listpro;
if (localStorage.product) {
    listpro = JSON.parse(localStorage.product); 
}
else {
    listpro = [];
}
let mood = "create";
let tmp;
// create method
create.onclick = function () {
    if(title.value!="" && price.value>0 && category.value!=""&& count.value<100){
        if(mood=='create'){ let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count:count.value,
        total:total.innerHTML,
        category: category.value,
    }
    if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++){
            listpro.push(newpro);
        }
    }
    else {
        listpro.push(newpro);
        }
    } else {
        count.style.display = "block";
        create.innerHTML = "create";
        listpro[tmp].title = title.value;
        listpro[tmp].price = price.value;
        listpro[tmp].taxes = taxes.value;
        listpro[tmp].ads = ads.value;
        listpro[tmp].discount=discount.value
        listpro[tmp].total = total.innerHTML;
        listpro[tmp].category = category.value;
        }
        cleardata();
    }
    
    localStorage.setItem("product", JSON.stringify(listpro));
    getTotle();
    showdata();
}
showdata();
//clear data function
function cleardata() {
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value = '';
    count.value='';
    total.innerHTML="";
    category.value="";
}
// show data
function showdata() {
    let table='';
    for (let i = 0; i < listpro.length;i++) {
        table += `
    <tr>
                    <td>${i+1}</td>
                    <td>${listpro[i].title}</td>
                    <td>${listpro[i].price}</td>
                    <td>${listpro[i].taxes}</td>
                    <td>${listpro[i].ads}</td>
                    <td>${listpro[i].discount}</td>
                    <td>${listpro[i].total}</td>
                    <td>${listpro[i].category}</td>
                    <td><button onclick='update(${i}); getTotle()'>update</button></td>
                    <td><button onclick='deleteitem(${i})'>delete</button></td>
                </tr>
    `;
    }
    
    document.getElementById("tbody").innerHTML = table;
    if (!document.getElementsByClassName("deleteALL").length>=1) {
    if (listpro.length > 0) {
        let newbtn = document.createElement("button");
    newbtn.innerHTML = `Delete all (${listpro.length})` ;
    newbtn.classList.add("deleteALL");
    newbtn.style.cssText="grid-column:1/3"
        tableH.before(newbtn);
    } 
}
}
// delete an item 
function deleteitem (id){
    listpro.splice(id, 1);
    localStorage.setItem("product", JSON.stringify(listpro));
    if (listpro.length == 0) {
        tableH.previousElementSibling.remove();
    }
    showdata();
}
document.onclick = function (e) {
    if (e.target == document.getElementsByClassName("deleteALL")[0]) {
        document.getElementById("tbody").innerHTML = '';
        listpro.splice(0);
        localStorage.clear();
        document.getElementsByClassName("deleteALL")[0].remove();
}
}
//update an item
function update(id) {
    title.value = listpro[id].title;
    price.value = listpro[id].price;
    taxes.value = listpro[id].taxes;
    discount.value = listpro[id].discount;
    category.value = listpro[id].category;
    ads.value = listpro[id].ads;
    count.style.display = "none";
    create.innerHTML = "update";
    tmp = id;
    mood = "update";
}
// search methods 
let moodsearch = "title";
function search(id) {
    if (id != "s1") {
        moodsearch = "category";
    } else {
        moodsearch = "title";
    }
    searchbox.value = '';
    showdata();
}
function searchdata(sval) {
    let table = '';
    if (moodsearch == "title") {
        for (let i = 0; i < listpro.length; i++){
            if (listpro[i].title.toLowerCase().includes(sval.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${listpro[i].title}</td>
                    <td>${listpro[i].price}</td>
                    <td>${listpro[i].taxes}</td>
                    <td>${listpro[i].ads}</td>
                    <td>${listpro[i].discount}</td>
                    <td>${listpro[i].total}</td>
                    <td>${listpro[i].category}</td>
                    <td><button onclick='update(${i}); getTotle()'>update</button></td>
                    <td><button onclick='deleteitem(${i})'>delete</button></td>
                </tr>
    `;
            }
        }
    } else {
        for (let i = 0; i < listpro.length; i++){
            if (listpro[i].category.toLowerCase().includes(sval.toLowerCase())) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${listpro[i].title}</td>
                    <td>${listpro[i].price}</td>
                    <td>${listpro[i].taxes}</td>
                    <td>${listpro[i].ads}</td>
                    <td>${listpro[i].discount}</td>
                    <td>${listpro[i].total}</td>
                    <td>${listpro[i].category}</td>
                    <td><button onclick='update(${i}); getTotle()'>update</button></td>
                    <td><button onclick='deleteitem(${i})'>delete</button></td>
                </tr>
    `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
//finshing project ✌️✌️✌️