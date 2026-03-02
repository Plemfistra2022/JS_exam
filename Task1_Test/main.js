let pairInput = document.getElementById("pairInput");
let addBtn = document.getElementById("addBtn");
let pairList = document.getElementById("pairList");
let sortName = document.getElementById("sortName");
let sortValue = document.getElementById("sortValue");
let deleteBtn = document.getElementById("deleteBtn");

// Add
addBtn.addEventListener("click", function() {
    let pair = pairInput.value.trim();
    if (pair === "") {
        return;
    }
    let parts = pair.split("=");
    if (parts.length !== 2) {
        alert("Invalid format");
        return;
    }
    let name = parts[0].trim();
    let value = parts[1].trim();
    let regex = /^[a-z0-9]+$/i;
    if (!regex.test(name) || !regex.test(value)) {
        alert("Invalid format");
        return;
    }
    let option = document.createElement("option");
    option.textContent = name + "=" + value;
    pairList.appendChild(option);
    pairInput.value = "";
})

// Delete
deleteBtn.addEventListener("click", function() {
    Array.from(pairList.selectedOptions).forEach(option => option.remove());
});

// Sort by Name
sortName.addEventListener("click", function() {
    let options = Array.from(pairList.options);
    options.sort(function(a, b) {
        let [nameA] = a.textContent.split("=");
        let [nameB] = b.textContent.split("=");
        return nameA.localeCompare(nameB);
    });
    pairList.innerHTML = "";
    options.forEach(function(option) {
        pairList.appendChild(option);
    });
});

// Sort by Value
sortValue.addEventListener("click", function() {
    let options = Array.from(pairList.options);
    options.sort(function(a, b) {
        let [, valueA] = a.textContent.split("=");
        let [, valueB] = b.textContent.split("=");

        return valueA.localeCompare(valueB);
    });
    pairList.innerHTML = "";
    options.forEach(function(option) {
        pairList.appendChild(option);
    });
});


