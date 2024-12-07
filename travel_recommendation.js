const btnSearch = document.getElementById("btnSearch");
const clrBtn = document.getElementById("clrBtn");
function searchCondition() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const country = data.countries.find(
        (item) => item.name.toLowerCase() === input
      );

      if (country) {
        resultDiv.innerHTML += `<h2 class="hero-title">${country.name}</h2>`;
        for (let index = 0; index < country.cities.length; index++) {
          resultDiv.innerHTML += `<p class="hero-title">${country.cities[index].name}</p>`;
          resultDiv.innerHTML += `<p class="hero-description">${country.cities[index].description}</p>`;
          resultDiv.innerHTML += `<img src="${country.cities[index].imageUrl}" alt="hjh">`;
        }
      } else if (input === "temples") {
        for (let index = 0; index < data.temples.length; index++) {
          resultDiv.innerHTML += `<p class="hero-title">${data.temples[index].name}</p>`;
          resultDiv.innerHTML += `<p class="result-description">${data.temples[index].description}</p>`;
          resultDiv.innerHTML += `<img src="${data.temples[index].imageUrl}" alt="hjh">`;
        }
      } else if (input === "beaches") {
        for (let index = 0; index < data.beaches.length; index++) {
          resultDiv.innerHTML += `<p class="hero-title">${data.beaches[index].name}</p>`;
          resultDiv.innerHTML += `<p class="hero-description">${data.beaches[index].description}</p>`;
          resultDiv.innerHTML += `<img src="${data.beaches[index].imageUrl}" alt="hjh">`;
        }
      } else {
        resultDiv.innerHTML = "Condition not found.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
}
clrBtn.addEventListener("click", clearSearch);
btnSearch.addEventListener("click", searchCondition);
