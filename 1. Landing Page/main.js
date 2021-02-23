function buildTable(data) {
  console.log(data);
  var table = document.getElementById("employee-list");
  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
    var row = `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].email}</td>
                    <td>
                    <button type="button" onclick= 'updateData(${data[i].id})' class="btn btn-info text-white">Edit</button>
                    <button type="button" onClick= "deleteData(${data[i].id})" class="btn btn-danger">Delete</button>
                    </td> 
                </tr>`;
    table.innerHTML += row;
  }
}

// fetch data from api
function getData() {
  fetch("http://localhost:5000/api/employees")
    .then((response) => response.json())
    .then((data) => {
      buildTable(data);
    })
    .catch((err) => console.log(err));
}

getData();

function fnEdit(value) {
  alert(value);
}

// create new data
function createNewData() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  var form_data = { name: name, email: email };
  console.log(form_data);
  
  
  fetch("http://localhost:5000/api/employees", {
    method: "POST",
    body: JSON.stringify(form_data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
  .then((response) => response.json())
  .then((data) => {
    location.reload();
    buildTable(data);
  });
}

// update data
function updateData(value){
  
  fetch("http://localhost:5000/api/employees/" + value)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").value = data[0].name;
      document.getElementById("email").value = data[0].email;
      console.log(data);
    })

    
    
    fetch("http://localhost:5000/api/employees/"+ value, {
      method: "PUT"
    })
    .then((response) => response.json())
    .then((data) => {
      // location.reload();
      buildTable(data);
    });
  }
  
  
    
  
  // let url = "http://localhost:5000/api/employees/" + value;
  // fetch(url, {
  //   method: "PUT",
  // })
  // .then((response) => response.json())
  // .then((data) => console.log(data))




// delete data
function deleteData(value) {
  let url = "http://localhost:5000/api/employees/" + value;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
      buildTable(data);
    });
}
