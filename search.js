const config = {
  url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:",
  parentId: "book-cards",
  searchBtnId: "isbn-search-btn",
  searchInputId: "isbn-search",
}

let searchBtn = document.getElementById(config.searchBtnId);

searchBtn.addEventListener("click", function() {
  let isbn = document.getElementById(config.searchInputId).value;
  let parent = document.getElementById(config.parentId);

  fetch(config.url + isbn).then(response=>response.json()).then(function(data){
    if(Object.keys(data).length === 0 && data.constructor === Object) parent.innerHTML = "<h1>Not Found</h1>";
    else{
      for(let bookKey in data) {
        let currentBook = data[bookKey];
        parent.append(generateBookCard(currentBook));
      }
    }
  });
});

function generateBookCard(data){
  let card = document.createElement("div");
  let htmlString = `
    <div class="card mb-3" style="max-width: 1000px;">
      <div class="row no-gutters">
          <div class="col-md-4">
              <img src="${data.cover.medium}" class="card-img p-3" alt="">
          </div>
          <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title m-0 font-weight-bold">${data.title}</h5>
                <p class="m-0"> </p>
                <p class="card-text pt-2 book-description">${data.by_statement}</p>
              </div>
          </div>
      </div>
      <div class="col-10">
          <table class="table table-striped">
              <tbody>
              <tr>
                  <th scope="row">Page</th>
                  <td>${data.number_of_pages}</td>
              </tr>
              <tr>
                  <th scope="row">Publisher</th>
                  <td>${data.authors[0].name}</td>
              </tr>
              <tr>
                  <th scope="row">Published Date</th>
                  <td>${data.number_of_pages}</td>
              </tr>
              <tr>
                  <th scope="row">Categories</th>
                  <td>${parseDataOL(data.subjects)}</td>
              </tr>
              </tbody>
          </table>
      </div>
    </div>
  `

  card.innerHTML = htmlString;

  return card;
}

function parseDataOL(data){
    let parsed = "";
    for(let i = 0; i < data.length - 1; i++){
        parsed += (data[i].name + ",");
    }
    return parsed + data[data.length-1].name;
}
