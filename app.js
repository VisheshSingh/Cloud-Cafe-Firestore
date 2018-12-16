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
  const cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // DELETING DATA
  cross.addEventListener("click", e => {
    let id = e.target.parentElement.getAttribute("data-id");
    if (confirm("Are you sure?")) {
      db.collection("cafes")
        .doc(id)
        .delete();
    }
  });
}
// GETTING DATA
// db.collection("cafes")
//   .orderBy("name")
//   .get()
//   .then(snapshot => {
//     snapshot.docs.forEach(doc => {
//       render(doc);
//     });
//   });

// REAL-TIME DATA LISTENER
db.collection("cafes")
  .orderBy("city")
  .onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === "added") {
        render(change.doc);
      } else if (change.type === "removed") {
        let li = cafeList.querySelector(`[data-id="${change.doc.id}"]`);
        cafeList.removeChild(li);
      }
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
