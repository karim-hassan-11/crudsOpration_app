// get total
//create product
//save localstorge

let tmp;

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood ='Create'

function getTotal()
{
    if(price.value !='')
        {
            let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.innerHTML = res;
            total.style.background = '#040'
        }   
         else
        {
                  total.innerHTML = 'TOTAL';
            total.style.background = '#dd00a9'
        }
}


// create

let datapro;
if(localStorage.product != null )
    {
        datapro = JSON.parse(localStorage.product);
    }else{
         datapro = [];

    }

submit.onclick = function()
{
    let newPro=
    {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
        if(mood === 'Create')
        {
            if(newPro.count > 1)
            {
                for(let i = 0 ; i < newPro.count ; i++)
                {
                    datapro.push(newPro);
                }
            }else{
                datapro.push(newPro);
            } 
        }else{
            datapro[tmp] = newPro;
            mood ='Create';
            submit.innerHTML='Create';
            count.style.display ='block';

        }
           
    
    localStorage.setItem('product' , JSON.stringify(datapro));
    clearData();
    showeData();
}



//clear input 

function clearData()
{
     title.value = '';
     price.value = '';
  taxes.value = '';
      ads.value = '';
      discount.value = '';
      total.innerHTML = '';
    count.value = '';
     category.value = '';
}

//showe data

function showeData()
{
    getTotal();
    let table =``;

for(let i = 0 ; i < datapro.length;i++)
{
    table += `
         <tr>
             <td>${i}</td>
             <td>${datapro[i].title}</td>
             <td>${datapro[i].price}</td>
             <td>${datapro[i].taxes}</td>
             <td>${datapro[i].ads}</td>
             <td>${datapro[i].discount}</td>
             <td>${datapro[i].total}</td>
             <td>${datapro[i].category}</td>
             <td><button id="update" onclick="updating(${i})">update</button></td>
              <td><button id="delete" onclick="deletion(${i})">delete</button></td>
          </tr>
    `;
}

document.getElementById('tbody').innerHTML = table;
let btnDelet = document.getElementById('deleteAll');
if(datapro.length > 0)
{
    btnDelet.innerHTML =`
    <button onclick="deleteAll()">Delete All(${datapro.length})</button>
    `
}else{
    btnDelet.innerHTML ='';
}

}
showeData();


//deletion
function deletion(i)
{
    datapro.splice(i,1);
    localStorage.product= JSON.stringify(datapro);
    showeData();
}

function deleteAll()
{
    localStorage.clear();
    datapro.splice(0);
    showeData();
}

//updating
function updating(i)
{
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Updating';
    mood = 'Update';

    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//search

let  searchMood ='title';

function getSearch(id)
{
    if(id == 'SearchTitle')
    {
        searchMood ='title';
        Search.placeholder = 'search by title';
    }else{
        searchMood ='category';
        Search.placeholder = 'search by category';

    }
    Search.focus();
}

function searchData(value )
{
    let table =``;
    if(searchMood == 'title')
    {
        for(let i = 0; i < datapro.length ; i++)
                {
                    if(datapro[i].title.includes(value))
                    {
                        table += `
                            <tr>
                                <td>${i}</td>
                                <td>${datapro[i].title}</td>
                                <td>${datapro[i].price}</td>
                                <td>${datapro[i].taxes}</td>
                                <td>${datapro[i].ads}</td>
                                <td>${datapro[i].discount}</td>
                                <td>${datapro[i].total}</td>
                                <td>${datapro[i].category}</td>
                                <td><button id="update" onclick="updating(${i})">update</button></td>
                                <td><button id="delete" onclick="deletion(${i})">delete</button></td>
                            </tr>
                        `;
                    }
                }
    }else{
        for(let i = 0; i < datapro.length ; i++)
            {
                if(datapro[i].category.includes(value.toLowerCase()))
                {
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button id="update" onclick="updating(${i})">update</button></td>
                            <td><button id="delete" onclick="deletion(${i})">delete</button></td>
                        </tr>
                    `;
                }
            }
    }

    document.getElementById('tbody').innerHTML = table;

}