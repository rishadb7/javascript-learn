

const ids = localStorage.getItem("ids") || ""

document.addEventListener("DOMContentLoaded",function(){

         getDataFromApi(ids)

})

//Issue is fixed

function getDataFromApi(id){

      console.log("Database ids",ids)
      const newId = ids==="" ? id : ids
      const itemTabel = document.querySelector('#item-table tbody')
      fetch(`https://api.restful-api.dev/objects?id=${newId}`)
      .then((response)=> response.json())
      .then((data)=>{
            console.log("apidata",data)  
            const itemArray = [...data]
            itemTabel.innerHTML = "";
            for(var i=0;i<itemArray.length;i++) {

                  const row = document.createElement("tr")
                  row.innerHTML = `<td>${itemArray[i]?.id}</td>
                  <td>${itemArray[i]?.name}</td>
                  <td>${itemArray[i]?.data?.color}</td>
                  <td>${itemArray[i]?.data?.capacity}</td>
                  <td><button onclick='updateData("${itemArray[i]?.id}","${itemArray[i]?.name}","${itemArray[i]?.data?.color}","${itemArray[i]?.data?.capacity}")'>Update Date</button>
                  <button onclick='deleteData("${itemArray[i]?.id}")'>Deleted</button>
                  </td>
                  `
                  
                  itemTabel.appendChild(row)
            }

      })


}

function deleteData(id){

    fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: "DELETE",
    }).then(response => response.json())
        .then(result => {
            console.log("Success:", result);
            if (result.id !== "") {
                getDataFromApi("")
                localStorage.setItem("ids","")
                alert(JSON.stringify(result))
            }

        })
        .catch(error => {
            console.error("Error:", error);
        });

}


function updateData(id,name,color,capacity){
      document.getElementById("id").value = id
      document.getElementById("name-update").value = name
      document.getElementById("color-update").value = color
      document.getElementById("capacity-update").value = capacity
}


function updateDataToApi(event){
     
     event.preventDefault();
     const id = document.getElementById("id").value
     const name = document.getElementById("name-update").value  
     const color = document.getElementById("color-update").value
     const capacity = document.getElementById("capacity-update").value

     if(name===""){
        alert("Name is requred")
     }else if(color===""){
        alert("color is required")
     }else if(capacity===""){
        alert("Capacity is required")
     }else{

         fetch(`https://api.restful-api.dev/objects/${id}`, {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                 "name": name,
                 "data": {
                     "color": color,
                     "capacity": capacity
                 }
             })
         }).then(response => response.json())
             .then(result => {
                 console.log("Success:", result);
                 if (result.id !== "") {
                     getDataFromApi(result.id)
                     alert("Sucess fully Updated")
                     document.getElementById("update-data-form").reset()
                 }

             })
             .catch(error => {
                 console.error("Error:", error);
             });

         
     } 




}

function addDataToApi(event){

     event.preventDefault();
     const name = document.getElementById("name").value  
     const color = document.getElementById("color").value
     const capacity = document.getElementById("capacity").value

     if(name===""){
           alert("Name Required")
     }else if(color===""){
           alert("Color Required")
     }else if(capacity===""){
           alert("Capacity Required")
     }else{
          
         fetch('https://api.restful-api.dev/objects', {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                 "name": name,
                 "data": {
                     "color": color,
                     "capacity": capacity
                 }
             })
         })
             .then(response => response.json())
             .then(result => {
                 console.log("Success:", result);
                 localStorage.setItem("ids",result.id)
                 if(result.id!==""){
                    getDataFromApi(result.id)
                    alert("Sucess fully added")
                    document.getElementById("add-data-form").reset()
                 }

                 
                 
             })
             .catch(error => {
                 console.error("Error:", error);
             });




     }
    
}