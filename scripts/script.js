const sortSelect = document.querySelector("select#sort-by-select");
const highPeaksTable = document.querySelector('table#high-peaks-table');
const highPeaks = [];

class HighPeak {
  constructor(name, elevation) {
    this._name = name;
    this._nameFormatted = name.replace(/\s+/g, '-').toLowerCase();
    this._elevation = elevation;
    this._status = {
      isCompleted: false,
      dateCompleted: 'incomplete'
    }
  }
}

// Function to create High Peak objs and add to highPeaks Arr
function createHighPeak(name, elevation) {
  highPeaks[highPeaks.length] = new HighPeak(name, elevation);
}

// Create High Peak objs
createHighPeak('Mount Marcy', 5344);
createHighPeak('Algonquin Peak', 5114);
createHighPeak('Mount Haystack', 4960);
createHighPeak('Mount Skylight', 4926);
createHighPeak('Whiteface Mountain', 4867);
createHighPeak('Dix Mountain', 4857);
createHighPeak('Gray Peak', 4840);
createHighPeak('Iroquois Peak', 4840);
createHighPeak('Basin Mountain', 4827);
createHighPeak('Gothics Mountain', 4736);
createHighPeak('Mount Colden', 4714);
createHighPeak('Giant Mountain', 4627);
createHighPeak('Nippletop Mountain', 4620);
createHighPeak('Santanoni Peak', 4607);
createHighPeak('Mount Redfield', 4606);
createHighPeak('Wright Peak', 4580);
createHighPeak('Saddleback Mountain', 4515);
createHighPeak('Panther Peak', 4442);
createHighPeak('Tabletop Mountain', 4427);
createHighPeak('Rocky Peak Ridge', 4420);
createHighPeak('Macomb Mountan', 4405);
createHighPeak('Armstrong Mountan', 4400);
createHighPeak('Hough Peak Mountan', 4400);
createHighPeak('Seward Mountan', 4361);
createHighPeak('Mount Marshall', 4360);
createHighPeak('Allen Mountain', 4340);
createHighPeak('Big Slide Mountain', 4240);
createHighPeak('Esther Mountain', 4340);
createHighPeak('Upper Wolfjaw Mountain', 4185);
createHighPeak('Lower Wolfjaw Mountain', 4175);
createHighPeak('Street Mountain', 4166);
createHighPeak('Phelps Mountain', 4161);
createHighPeak('Mount Donaldson', 4140);
createHighPeak('Seymour Mountain', 4120);
createHighPeak('Sawteeth Mountain', 4100);
createHighPeak('Cascade Mountain', 4098);
createHighPeak('South Dix Mountain', 4060);
createHighPeak('Porter Mountain', 4059);
createHighPeak('Mount Colvin', 4057);
createHighPeak('Mount Emmons', 4040);
createHighPeak('Dial Mountain', 4020);
createHighPeak('Grace Peak Mountain', 4012);
createHighPeak('Blake Mountain', 3960);
createHighPeak('Cliff Mountain', 3960);
createHighPeak('Nye Mountain', 3895);
createHighPeak('Couchsachraga Peak Mountain', 3820);

// Sort select change event
sortSelect.addEventListener("change", () => {
  view.displayHighPeaks(sortSelect.value);
})

// Obj of table sort functions
const sort = {
  byName: function(a, b) {
    if ( a._name < b._name ) {
      return -1;
    }
    if ( a._name > b._name ) {
      return 1;
    }
    return 0;
  },
  byHigh: function(a, b) {
    return b._elevation - a._elevation;
  },
  byLow: function(a, b) {
    return a._elevation - b._elevation;
  },
  byCompleted: function(a, b) {
    return b._status.isCompleted - a._status.isCompleted;
  }
}

// Handle complete icon click
function clickComplete(highPeakName) {
  highPeaks.forEach(highPeak => {
    if (highPeak._name === highPeakName) {
      let dateInput = document.querySelector(`tr[id=${highPeak._nameFormatted}] td[class=completed-form] input`);
      if (highPeak._status.isCompleted === false && dateInput.value === '') {
        return dateInput.parentElement.style.display = 'none';
      } else {
        let dateOfCompletetion = new Date(dateInput.value)
        highPeak._status.isCompleted = true;
        highPeak._status.dateCompleted = `${dateOfCompletetion.getMonth() + 1}.${dateOfCompletetion.getDate()}.${dateOfCompletetion.getFullYear()}`;
        view.displayHighPeaks();
      }
    };
  })
}

// Update completed counters
function updateCompletedCounters() {
  let completedCount = 0;
  let notCompletedCount = 0;
  highPeaks.forEach(highPeak => {
    if (highPeak._status.isCompleted === true) {
      completedCount ++
    } else {
      notCompletedCount ++
    }
  })
  document.querySelector("span.complete-count").innerHTML = completedCount;
  document.querySelector("span.incomplete-count").innerHTML = notCompletedCount;
}

// UI view functions
const view = {
  displayHighPeaks: function(sortOption) {
    highPeaksTable.innerHTML = '';
    let highPeaksTableHead = document.createElement("tr");
    highPeaksTableHead.innerHTML = "<th>#</th><th>Name</th><th>Elevation</th><th>Date Completed</th><th>Complete</th><th></th>"
    highPeaksTable.appendChild(highPeaksTableHead);
    if (sortOption === "byCompleted") {
      highPeaks.sort(sort.byName);
    }
    highPeaks.sort(sort[sortOption]).forEach((highPeak, i) => {
      this.createHighPeakTr(highPeak, i);
    });

    updateCompletedCounters();
  },

  createHighPeakTr: function(highPeak, i) {
    let highPeakTr = document.createElement("tr");
    highPeakTr.id = highPeak._nameFormatted;
    highPeakTr.innerHTML = `<td class='number'>${i + 1}</td><td class='name'>${highPeak._name}</td><td class='elevation'>${highPeak._elevation}'</td><td class='date-completed'>${highPeak._status.dateCompleted}</td><td class='is-completed'></td><td class='completed-form'><div></div></td>`;
    highPeaksTable.appendChild(highPeakTr);

    let completedIconTd = document.querySelector(`tr[id=${highPeak._nameFormatted}] td[class=is-completed]`);
    let completedFormTd = document.querySelector(`tr[id=${highPeak._nameFormatted}] td[class=completed-form] div`);
    completedIconTd.appendChild(this.createCompletedIcon(highPeak, completedFormTd));
    completedFormTd.appendChild(this.createCompletedForm(highPeak)[0]); 
    completedFormTd.appendChild(this.createCompletedForm(highPeak)[1]); 
    completedFormTd.style.display = 'none';
  },

  createCompletedIcon: function(highPeak, completedFormTd) {
    let completedIcon = document.createElement("p");
    completedIcon.innerHTML = highPeak._status.isCompleted ? '<i class="fas fa-check-circle check-green"></i>' : '<i class="far fa-circle check-red"></i>'
    completedIcon.addEventListener("click", () => {
      if (highPeak._status.isCompleted === false) {
        completedFormTd.style.display = completedFormTd.style.display === 'none' ? 'block' : 'none';

        let allTr = document.querySelectorAll("tr");
        for (i = 1; i < allTr.length; i++) {
          if (allTr[i].id != highPeak._nameFormatted) {
            document.querySelector(`tr[id=${allTr[i].id}] td[class=completed-form] div`).style.display = 'none';
          }
        }

      } else if (highPeak._status.isCompleted === true) {
        highPeak._status.isCompleted = false
        highPeak._status.dateCompleted = 'incomplete'
        view.displayHighPeaks();
      }
    })
    return completedIcon;
  },

  createCompletedForm: function(highPeak) {
    let dateCompletedInput = document.createElement("input");
    dateCompletedInput.type = "date";

    let completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", function() {
      clickComplete(highPeak._name);
    });

    return [dateCompletedInput, completeButton]
  }
}

view.displayHighPeaks();