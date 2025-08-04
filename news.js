 

function getNewsData() {
  
    const movieName = document.getElementById("movie-name")
    const movieRating = document.getElementById("movie-rating")
    const movieDescription = document.getElementById("movie-description")
    const movieImage = document.getElementById("movie-image")
    const movieReview = document.getElementById("movie-review")
    const actorsTable = document.querySelector("#actors-table tbody")

    fetch("https://imdb.iamidiotareyoutoo.com/search?tt=tt2250912")
       .then(Response=>Response.json())
       .then(abc=>{
              
           // console.log("print data",abc.short)
            movieName.innerText = abc.short.name
            movieRating.innerText = abc.short.aggregateRating.ratingValue
            movieDescription.innerText = abc.short.description 
            movieImage.src = abc.short.image
            movieReview.innerHTML = 
            `Name : ${abc.short.review.name} <br>
             Review: ${abc.short.review.reviewBody}
            `  
            
            const actorsArray = abc.short.actor
          //  console.log(actorsArray)
            for(var i=0;i<actorsArray.length;i++){

                   const actor = actorsArray[i]
                   const row = document.createElement("tr")
                   row.innerHTML = `<td>${actor.name}</td>
                   <td><a href='${actor.url}'>${actor.url}</a></td>
                  `
                  actorsTable.appendChild(row)
            }

       
        })
    .catch(() => {
      console.error('Error fetching news data');
        });
}