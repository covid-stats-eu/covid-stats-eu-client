// Tabs / accordion JS
const labels = document.querySelectorAll(".accordion-item__label");
const tabs = document.querySelectorAll(".accordion-tab");

function toggleShow() {
	const target = this;
	const item = target.classList.contains("accordion-tab")
		? target
		: target.parentElement;
	const group = item.dataset.actabGroup;
	const id = item.dataset.actabId;

	tabs.forEach(function(tab) {
		if (tab.dataset.actabGroup === group) {
			if (tab.dataset.actabId === id) {
				tab.classList.add("accordion-active");
			} else {
				tab.classList.remove("accordion-active");
			}
		}
	});

	labels.forEach(function(label) {
		const tabItem = label.parentElement;

		if (tabItem.dataset.actabGroup === group) {
			if (tabItem.dataset.actabId === id) {
				tabItem.classList.add("accordion-active");
			} else {
				tabItem.classList.remove("accordion-active");
			}
		}
	});
}

labels.forEach(function(label) {
	label.addEventListener("click", toggleShow);
});

tabs.forEach(function(tab) {
	tab.addEventListener("click", toggleShow);
});

// ----------
// Actions
// ----------

// Action A
const action_A = (event) => {
  event.preventDefault()
  
  // Get Elements
  const table = document.getElementById("result")
  const form = document.getElementById("formA")
  const fd = new FormData(form);
  
  // Get data
  const countryParam = fd.get("country")
  
  // Construct url parameters
  const params = new URLSearchParams({
    country: countryParam,
  }); 

  // Construct url
  const url = "http://localhost:3000/activity/getAllByCountry?" + params

  // Request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data[0])
      table.innerHTML = `<tr>
            <th>Deaths</th>
            <th>Cases</th>\
            <th>Tests</th>\
          </tr>\
          <tr>\
            <td>${data[0]["deaths"]}</td>\
            <td>${data[0]["cases"]}</td>\
            <td>${data[0]["tests"]}</td>\
          </tr>`
    })
    .catch(err => alert(err))
}

// Action B
const action_B = (event) => {
  event.preventDefault()
  
  // Get Elements
  const table = document.getElementById("result")
  const form = document.getElementById("formB")
  const fd = new FormData(form);
  
  // Construct url parameters
  const params = new URLSearchParams({
    country:  fd.get("country"),
    start:    fd.get("period-start"),
    end:      fd.get("period-end"),
  }); 

  // Construct url
  const url = "http://localhost:3000/activity/getDeathsAndCasesByDate?" + params

  // Request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      table.innerHTML = `<tr>
            <th>Deaths</th>
            <th>Cases</th>\
          </tr>\
          <tr>\
            <td>${data[0]["deaths"]}</td>\
            <td>${data[0]["cases"]}</td>\
          </tr>`
    })
    .catch(err => alert(err))
}
