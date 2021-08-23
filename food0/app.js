
// function load() {
//     a = document.getElementsByClassName("loadmore")
//     a[0].style.display = "block"
//     console.log(a)
//     b = document.getElementById("loadbtn")
//     b.style.display = "none"
// }



//   Authentications 

function signupcustomer() {
    var username = document.getElementById("custname").value
    var phone = document.getElementById("custphone").value
    var email = document.getElementById("custemail").value
    var password = document.getElementById("custpassword").value
    var country = document.getElementById("custcountry").value
    var city = document.getElementById("custcity").value
    console.log(email, password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data)
            alert("User Registered Successfully")
            window.location.href = './logincustomer.html'
        })

        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });

    //database
    let obj = {
        username,
        phone,
        email,
        password,
        country,
        city
    }

    console.log(obj)
    key = (Math.random() * 92476829).toFixed()
    firebase.database().ref("customers/" + "id" + key).set(obj)

}






function logincustomer() {
    email = document.getElementById("clemail").value
    password = document.getElementById("clpassword").value
    console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log("user signin")
            console.log(data)
            window.location.href = './customer.html'
            alert("User Login Successfully")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            alert("Incorrect Email or Password")
        });
}




function signuprestaurant() {
    var restaurantname = document.getElementById("resname").value
    var country = document.getElementById("rescountry").value
    var city = document.getElementById("rescity").value
    var email = document.getElementById("resemail").value
    var password = document.getElementById("respassword").value
    console.log(email, password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data)
            alert("User Registered Successfully")
            window.location.href = './loginrestaurant.html'
        })

        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });

    //database
    let obj = {
        restaurantname,
        email,
        password,
        country,
        city
    }

    console.log(obj)
    key = (Math.random() * 92476829).toFixed()
    firebase.database().ref("restaurants/" + "id" + key).set(obj)

}







function loginrestaurant() {
    email = document.getElementById("rlemail").value
    password = document.getElementById("rlpassword").value

    console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log("user signin")
            console.log(data)
            window.location.href = './dashboard.html'
            alert("User Login Successfully")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            alert("Incorrect Email or Password")
        });
}



async function addproduct() {
    let restaurantname = document.getElementById("resname").value
    let productname = document.getElementById("prodname").value
    let productprice = document.getElementById("prodprice").value
    let producttype = document.getElementById("prodtype").value
    let productimage = document.getElementById("prodimage").files[0]
    let imagename = productimage.name

    x = firebase.storage().ref("images").child(imagename)
    await x.put(productimage)
    let url = await x.getDownloadURL()

    //database
    let obj = {
        restaurantname,
        productname,
        productprice,
        producttype,
        url
    }

    console.log(obj)
    var key = (Math.random() * 92476829).toFixed()
    firebase.database().ref("orders/" + "id" + key).set(obj)

    alert("product added successfully")
    window.location.href="./dashboard.html"





}


// function abc() {
//     alert("Thank You for shopping Click OK to return to home page")
//     a=a.productname
// }
function abc() {
    alert("Thank You for shopping Click OK to return to home page")
    console.log("You have ordered")
    console.log(a.productname)
    console.log(a.productprice)
    console.log(a.producttype)

    document.getElementById("order").innerHTML +=`
    You have ordered
    localStorage.getItem(data)
    `
    localStorage.setItem("data",a.productname)
}




function showitems() {
    

    firebase.database().ref("orders").on('child_added', function (data) {
        a = data.val()
        // console.log(a)
       
        document.getElementById("cards").innerHTML +=
            `<div class="card" style="width: 18rem;">
         <img id="img"
             src="${a.url}"
             class="card-img-top" alt="Burger">
         <div class="card-body">
             <h3 id="pname" class="card-text">${a.productname}</h3>
             <h5 id="price" class="card-text">${a.productprice}</h5>
             <h5 id="type" class="card-text">${a.producttype}</h5>
             <button onclick={abc()} class="btn btn-primary">Order</button>
         </div>
     </div>`
     

    })

}

showitems()


function yourproducts() {

    firebase.database().ref("orders").on('child_added', function (data) {
        a = data.val()
        // console.log(a)
        document.getElementById("admincards").innerHTML +=
            `<div class="card" style="width: 18rem;">
         <img id="img"
             src="${a.url}"
             class="card-img-top" alt="Burger">
         <div class="card-body">
             <h3 id="pname" class="card-text">${a.productname}</h3>
             <h5 id="price" class="card-text">${a.productprice}</h5>
             <h5 id="type" class="card-text">${a.producttype}</h5>
         </div>
     </div>`

    })

}

yourproducts()
