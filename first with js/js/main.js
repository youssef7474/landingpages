
//count
//delete
//clean data 






let title = document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category= document.getElementById("category");
let submit=document.getElementById("submit");
let mood="create";
let tmp;




//get total
function gettotal()
{
    if(price.value !="")
    {
        let result =(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor="#040";
    }
    else
    {
        total.innerHTML='';
        total.style.backgroundColor="#a00d02";
    }
}






//creat product
//save to local storage
let datapro=[];
if(localStorage.product!=null)
{
    datapro=JSON.parse(localStorage.product)
}
else
{
    datapro=[];
}
submit.onclick=function()
{
    let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(mood==="create")
    {
        if(newpro.count>1)
        {
            for(let i=0;i<newpro.count;i++)
            {
                datapro.unshift(newpro);
            }
        }
        else
        {
            datapro.unshift(newpro);
        }
    }
    else{
        datapro[tmp]=newpro
        mood="create";
        submit.innerHTML="create";
        count.style.display="block"
    }


    localStorage.setItem("product",JSON.stringify(datapro));
    clearData();
    showData();
}




//clear inputs
clearData=function()
{
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}





//read 
showData=function()
{
    gettotal()
    let tabel="";
    for(let i=0;i<=datapro.length-1;i++)
    {
        tabel=tabel+`      
    <tr>
        <th>${i+1}</th>
        <th>${datapro[i].title}</th>
        <th>${datapro[i].price}</th>
        <th>${datapro[i].taxes}</th>
        <th>${datapro[i].ads}</th>
        <th>${datapro[i].discount}</th>
        <th>${datapro[i].total}</th>
        <th>${datapro[i].category}</th>
        <th><button id="update" onclick="updateData(${i})">UPDATE</button></th>
        <th><button id="delete" onclick="deleteData(${i})">DELETE</button></th>
    </tr>`
    }
    document.getElementById("tbody").innerHTML=tabel;
    let btndelete=document.getElementById("btndelete")
    if(tabel.length>0)
    {
        btndelete.innerHTML=` <button onclick="deleteall()">DELETE(${datapro.length})</button>`
    }
    else
    {
        btndelete.innerHTML="";
    }
}

showData();


deleteData=function(i)
{
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showData()
}

deleteall=function()
{
    datapro=[];
    localStorage.clear();
    showData();
}

//update
updateData=function(i)
{
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal()
    category.value=datapro[i].category;
    count.style.display="none";
    submit.innerHTML="update";
    mood="update"
    tmp=i;
    scroll({top:0,behavior:"smooth"})
}







//search
let searchmood="title";
getsearchmood=function(id)
{
    let search=document.getElementById("search");
    if(id==="searchtitle")
    {
        searchmood="title";
        search.placeholder="search by title"
    }
    else if(id==="searchcategory")
    {
        searchmood="category";
        search.placeholder="search by category"
    }
    search.focus();
    search.value="";
    showData();
}



searchData=function(value)
{
    let tabel="";
    if(searchmood=="title")
    {
        for(let i= 0;i<datapro.length;i++)
        {
            if(datapro[i].title.includes(value))
            {
                tabel=tabel+`      
                <tr>
                    <th>${i+1}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].discount}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].category}</th>
                    <th><button id="update" onclick="updateData(${i})">UPDATE</button></th>
                    <th><button id="delete" onclick="deleteData(${i})">DELETE</button></th>
                </tr>`
                
            }
        }
    }
    else{
        for(let i= 0;i<datapro.length;i++)
        {
            if(datapro[i].category.includes(value))
            {
                tabel=tabel+`      
                <tr>
                    <th>${i+1}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].discount}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].category}</th>
                    <th><button id="update" onclick="updateData(${i})">UPDATE</button></th>
                    <th><button id="delete" onclick="deleteData(${i})">DELETE</button></th>
                </tr>`
                
            }
        }
    }
    document.getElementById("tbody").innerHTML=tabel;
}