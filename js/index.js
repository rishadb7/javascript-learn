function insertToDataBase(event) {

    event.preventDefault();

    const contactForm = document.getElementById("contact-form")

    document.getElementById("error1").textContent = ''
    document.getElementById("error2").textContent = ''
    document.getElementById("error3").textContent = ''
    document.getElementById("error4").textContent = ''


    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById('lastName').value
    var email = document.getElementById("email").value
    var companyName = document.getElementById("companyName").value
    var phone = document.getElementById("phone").value
    var description = document.getElementById("description").value

    let isValid = true

    if (firstName === '') {

        // alert('First name required')
        document.getElementById("error1").textContent = 'First Name Required'
        isValid = false
    }

    if (email === '' && !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("error2").textContent = 'Email Required'
        isValid = false
    }

    if (phone === '') {
        document.getElementById("error3").textContent = 'Phone Required'
        isValid = false
    }

    if (description === "") {
        document.getElementById("error4").textContent = 'Description Required'
        isValid = false
    }

    if (isValid) {

        const obj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            companyName: companyName,
            phone: phone,
            description: description
        }

        console.log(obj)
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(obj)
        }).then(() => {
            console.log("Sucessfully Save")
            contactForm.reset()
        }).catch(() => {
            console.log('Error in post data')
        })



    }








}


function getPostsData() {

    const postData = document.querySelector('#post-table tbody')
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',

    })
        .then((response) => response.json())
        .then((posts) => {

            console.log("Post data", posts)

            const postArray = [...posts]  // 100 post array 
   
            for(var i=0;i<postArray.length;i++){

                  const row = document.createElement('tr')
                  row.innerHTML = `<td>${postArray[i].userId}</td> <td>${postArray[i].id}</td><td>${postArray[i].title}</td> <td>${postArray[i].body}</td>`
                  postData.appendChild(row)
            }
            // postArray.forEach((post) => {
            //     const row = document.createElement('tr')
            //     row.innerHTML = `<td>${post.userId}</td> <td>${post.id}</td><td>${post.title}</td> <td>${post.body}</td>`
            //     postData.appendChild(row)
            // })



        }).catch(() => {
            console.log('Error in post data')
        })


}





