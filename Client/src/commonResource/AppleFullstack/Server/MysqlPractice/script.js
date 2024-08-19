function displayForm(show, hideOne, hideTwo, hideThree) {
  document.getElementsByClassName(show)[0].style.display = "block";
  document.getElementsByClassName(hideOne)[0].style.display = "none";
  document.getElementsByClassName(hideTwo)[0].style.display = "none";
  document.getElementsByClassName(hideThree)[0].style.display = "none";
}

function editName(e) {
  e.preventDefault();
  fetch("http://localhost:4567/update", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: document.querySelector("#myForm input[name=id]").value,
      newName: document.querySelector("input[name=updatedName]").value,
    }),
  })
    .then((response) => response.json())
    .then(() => alert("Name Updated!"));

  document.getElementById("myForm").reset();
}

document.getElementById("myForm").addEventListener("submit", editName);

function deleteUser(e) {
  e.preventDefault();

  let deletebox = document.querySelector("#delete-user input[name=id]");
  let deleteID = deletebox.value;
  if (isNaN(deleteID) || deleteID.length == 0) {
    alert("please enter number values only");
    deletebox.style.backgroundColor = "pink";
    deletebox.style.border = "red 2px soild";
  } else {
    deletebox.style.backgroundColor = "";
    deletebox.style.border = "";

    fetch("http://localhost:4567/remove-user", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: deleteID,
      }),
    }).then((response) => response.json());
    alert("User Deleted!");
    document.getElementById("delete-user").reset();
  }
}

document.getElementById("delete-user").addEventListener("submit", deleteUser);

function listCustomers() {
  const usersDiv = document.getElementById("data");
  usersDiv.innerHTML = "";
  fetch("http://localhost:4567/customers-detail-info")
    .then((res) => res.json())
    .then((data) => {
      data.map((customer, i) => {
        usersDiv.innerHTML += `
				<div class="row">
					<p class="col-2">${customer.product_id}</p>
					<p class="col-4">${customer.product_url}</p>
					<p class="col-4">${customer.product_name}</p>
                    
				</div>
				<hr>`;
      });
    });
}
document.getElementById("list").addEventListener("click", listCustomers);
