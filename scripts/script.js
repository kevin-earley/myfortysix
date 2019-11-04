const sortSelect = document.querySelector("select#sort-by-select");
const highPeaksTable = document.querySelector('table#list-of-high-peaks');
let highPeaksList = [];

class HighPeak {
  constructor(name, elevation) {
    this._name = name;
    this._elevation = elevation;
    this._status = {
      isCompleted: false,
      dateCompleted: 'N/A'
    }
  }
}

const createHighPeak = (name, elevation) => {
	highPeaksList[highPeaksList.length] = new HighPeak(name, elevation);
}

createHighPeak('Mount Marcy', 5344);
createHighPeak('Algonquin Peak', 5114);
createHighPeak('Mount Haystack', 4960);
createHighPeak('Mount Skylight', 4926);
createHighPeak('Whiteface Mountain', 4867);
// createHighPeak('Dix Mountain', 4857);
// createHighPeak('Gray Peak', 4840);
// createHighPeak('Iroquois Peak', 4840);
// createHighPeak('Basin Mountain', 4827);
// createHighPeak('Gothics Mountain', 4736);
// createHighPeak('Mount Colden', 4714);
// createHighPeak('Giant Mountain', 4627);

const handlers = {
  sort: {
    byName: ( a, b ) => {
      if (a._name < b._name) {
        return -1;
      }
      if (a._name > b._name) {
        return 1;
      }
      return 0;
    },
    byHigh: ( a, b ) => {
      return b._elevation - a._elevation;
    },
    byLow: ( a, b ) => {
      return a._elevation - b._elevation;
    }
  },

  toggleCompleted: (highPeakName) => {
    highPeaksList.forEach(highPeak => {
      if ( highPeak._name === highPeakName ) {
        highPeak._status.isCompleted = !highPeak._status.isCompleted
      };
    })
    view.displayHighPeaks();
  },

}

const view = {
  displayHighPeaks: (sortOption) => {
    highPeaksTable.innerHTML = '';
    highPeaksList.sort( handlers.sort[sortOption] );

    highPeaksList.forEach(mtn => {
      let mtnTr = document.createElement("tr");
      mtnTr.innerHTML = `<td>${mtn._name}</td><td>${mtn._elevation}'</td><td>Completed: ${mtn._status.isCompleted}</td><td>Date: ${mtn._status.dateCompleted}</td>`;

      let mtnDateCompletedInput = document.createElement("input");
      mtnDateCompletedInput.type = "text";

      let mtnCompleteBtn = document.createElement("button");
      mtnCompleteBtn.textContent = "Complete";
      mtnCompleteBtn.addEventListener("click", function() {
        handlers.toggleCompleted(mtn._name);
      })

      mtnTr.appendChild(mtnDateCompletedInput); 
      mtnTr.appendChild(mtnCompleteBtn); 
      highPeaksTable.appendChild(mtnTr); 
    })

  },

  setupEventListeners: () => {
    sortSelect.addEventListener("change", () =>{
      view.displayHighPeaks(sortSelect.value);
    })
  }

}

view.displayHighPeaks();
view.setupEventListeners();