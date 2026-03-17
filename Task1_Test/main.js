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

    let existingOptions = Array.from(pairList.options);
    let isDuplicate = existingOptions.some(opt => {
        let existingName = opt.textContent.split("=")[0].trim();
        return existingName.toLowerCase() === name.toLowerCase();
    });

    if (isDuplicate) {
        alert("This key already exists!");
        return;
    }

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

// Sort
function sortPairs(isByName) {
    let options = Array.from(pairList.options);

    options.sort(function(a, b) {
        let partsA = a.textContent.split("=");
        let partsB = b.textContent.split("=");

        let valA = isByName ? partsA[0] : partsA[1];
        let valB = isByName ? partsB[0] : partsB[1];

        if (!isByName) {
            let numA = Number(valA);
            let numB = Number(valB);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        }

        return valA.localeCompare(valB);
    });

    pairList.innerHTML = "";
    options.forEach(opt => pairList.appendChild(opt));
}

sortName.addEventListener("click", () => sortPairs(true));
sortValue.addEventListener("click", () => sortPairs(false));

