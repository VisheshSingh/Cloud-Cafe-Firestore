window.onload = function() {
  document.getElementById("error").style.display = "none";
};
// Cafe List
const cafeList = document.querySelector("#cafe-list");
// Form Data
const form = document.querySelector("#add-cafe-form");

function render(doc) {
  const li = document.createElement("li");
  const name = document.createElement("span");
  const city = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);

  cafeList.appendChild(li);
}
// GETTING DATA
db.collection("cafes")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      render(doc);
    });
  });

// SAVING DATA
form.addEventListener("submit", e => {
  e.preventDefault();
  if (form.name.value !== "" && form.city.value !== "") {
    db.collection("cafes").add({
      name: form.name.value,
      city: form.city.value
    });
    form.name.value = "";
    form.city.value = "";
  } else {
    document.getElementById("error").style.display = "block";
    setTimeout(() => {
      document.getElementById("error").style.display = "none";
    }, 3000);
  }
});
