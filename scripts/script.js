const sortSelect = document.querySelector("select#sort-by-select");
const highPeaksTable = document.querySelector('table#list-of-high-peaks');

class HighPeak {
  constructor(name, elevation) {
    this._name = name;
    this._nameFormatted = name.replace(/\s+/g, '-').toLowerCase();
    this._elevation = elevation;
    this._status = {
      isCompleted: false,
      dateCompleted: 'N/A'
    }
  }
}

const highPeaksList = {
  highPeaks: [],

  createHighPeak: function(name, elevation) {
    this.highPeaks[this.highPeaks.length] = new HighPeak( name, elevation );
  },

  sort: {
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
    }
  }
}

const handlers = {
  toggleCompleted: function(highPeakName) {
    highPeaksList.highPeaks.forEach(highPeak => {
      if (highPeak._name === highPeakName) {
        highPeak._status.isCompleted = !highPeak._status.isCompleted
        this.addDateCompleted(highPeak);
      };
    })
    view.displayHighPeaks();
  },

  addDateCompleted: function(highPeak) {
    let dateInput = document.querySelector(`tr[id=${highPeak._nameFormatted}] td[class=completed-form] input`);
    if (highPeak._status.isCompleted === true) {
      return highPeak._status.dateCompleted = dateInput.value;
    } else {
      return highPeak._status.dateCompleted = "N/A";
    };
  }
}

const view = {
  displayHighPeaks: function(sortOption) {
    highPeaksTable.innerHTML = '';
    highPeaksList.highPeaks.sort(highPeaksList.sort[sortOption]).forEach((highPeak, i) => {
      this.createHighPeakTr(highPeak, i);
    });
  },

  createHighPeakTr: function(highPeak, i) {
    let highPeakTr = document.createElement("tr");
    highPeakTr.id = highPeak._nameFormatted;
    highPeakTr.innerHTML = `<td class='index'>${i + 1}</td><td class='high-peak-name'>${highPeak._name}</td><td class='high-peak-elevation'>${highPeak._elevation}'</td><td class='is-completed'>Completed: ${highPeak._status.isCompleted}</td><td class='date-completed'>Date: ${highPeak._status.dateCompleted}</td>`;

    let completeFormTd = document.createElement("td");
    completeFormTd.className = "completed-form";
    completeFormTd.appendChild(this.createDateCompletedInput(highPeak)); 
    completeFormTd.appendChild(this.createCompleteButton(highPeak));
    highPeakTr.appendChild(completeFormTd);
    highPeaksTable.appendChild(highPeakTr);
  },

  createDateCompletedInput: function(highPeak) {
    let dateCompletedInput = document.createElement("input");
    dateCompletedInput.type = "text";
    return dateCompletedInput;
  },

  createCompleteButton: function(highPeak) {
    let completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", function() {
      handlers.toggleCompleted(highPeak._name);
    });
    return completeButton;
  },

  setupEventListeners: function() {
    sortSelect.addEventListener("change", () => {
      this.displayHighPeaks(sortSelect.value);
    })
  }
}

highPeaksList.createHighPeak('Mount Marcy', 5344);
highPeaksList.createHighPeak('Algonquin Peak', 5114);
highPeaksList.createHighPeak('Mount Haystack', 4960);
highPeaksList.createHighPeak('Mount Skylight', 4926);
highPeaksList.createHighPeak('Whiteface Mountain', 4867);
highPeaksList.createHighPeak('Dix Mountain', 4857);
highPeaksList.createHighPeak('Gray Peak', 4840);
highPeaksList.createHighPeak('Iroquois Peak', 4840);
highPeaksList.createHighPeak('Basin Mountain', 4827);
highPeaksList.createHighPeak('Gothics Mountain', 4736);
highPeaksList.createHighPeak('Mount Colden', 4714);
highPeaksList.createHighPeak('Giant Mountain', 4627);
highPeaksList.createHighPeak('Nippletop Mountain', 4620);
highPeaksList.createHighPeak('Santanoni Peak', 4607);
highPeaksList.createHighPeak('Mount Redfield', 4606);
highPeaksList.createHighPeak('Wright Peak', 4580);
highPeaksList.createHighPeak('Saddleback Mountain', 4515);
highPeaksList.createHighPeak('Panther Peak', 4442);
highPeaksList.createHighPeak('Tabletop Mountain', 4427);
highPeaksList.createHighPeak('Rocky Peak Ridge', 4420);
highPeaksList.createHighPeak('Macomb Mountan', 4405);
highPeaksList.createHighPeak('Armstrong Mountan', 4400);
highPeaksList.createHighPeak('Hough Peak Mountan', 4400);
highPeaksList.createHighPeak('Seward Mountan', 4361);
highPeaksList.createHighPeak('Mount Marshall', 4360);
highPeaksList.createHighPeak('Allen Mountain', 4340);
highPeaksList.createHighPeak('Big Slide Mountain', 4240);
highPeaksList.createHighPeak('Esther Mountain', 4340);
highPeaksList.createHighPeak('Upper Wolfjaw Mountain', 4185);
highPeaksList.createHighPeak('Lower Wolfjaw Mountain', 4175);
highPeaksList.createHighPeak('Street Mountain', 4166);
highPeaksList.createHighPeak('Phelps Mountain', 4161);
highPeaksList.createHighPeak('Mount Donaldson', 4140);
highPeaksList.createHighPeak('Seymour Mountain', 4120);
highPeaksList.createHighPeak('Sawteeth Mountain', 4100);
highPeaksList.createHighPeak('Cascade Mountain', 4098);
highPeaksList.createHighPeak('South Dix Mountain', 4060);
highPeaksList.createHighPeak('Porter Mountain', 4059);
highPeaksList.createHighPeak('Mount Colvin', 4057);
highPeaksList.createHighPeak('Mount Emmons', 4040);
highPeaksList.createHighPeak('Dial Mountain', 4020);
highPeaksList.createHighPeak('Grace Peak Mountain', 4012);
highPeaksList.createHighPeak('Blake Mountain', 3960);
highPeaksList.createHighPeak('Cliff Mountain', 3960);
highPeaksList.createHighPeak('Nye Mountain', 3895);
highPeaksList.createHighPeak('Couchsachraga Peak Mountain', 3820);

view.displayHighPeaks();
view.setupEventListeners();