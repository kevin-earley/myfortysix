const sortSelect = document.querySelector("select#sort-by-select");
const highPeaksUl = document.querySelector('ul#list-of-high-peaks');
let highPeaksList = [];

class HighPeak {
  constructor(name, elevation) {
    this._name = name;
    this._elevation = elevation;
    this._status = {
      completed: false
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
createHighPeak('Dix Mountain', 4857);
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
  toggleCompleted: (highPeakId) => {
    highPeaksList.forEach((highPeak) => {
      if ( highPeak._name.toLowerCase().replace(/ /g,"-") === highPeakId ) {
        return highPeak._status.completed = !highPeak._status.completed
      };
    })
    view.displayHighPeaks();
    view.setupEventListeners();
  }
}

const view = {
  displayHighPeaks: (sortOption) => {
    highPeaksUl.innerHTML = '';
    highPeaksList.sort( handlers.sort[sortOption] );
    highPeaksList.forEach(mtn => {
      let mtnLi = document.createElement("li");
      mtnLi.id = mtn._name.toLowerCase().replace(/ /g,"-");
      mtnLi.textContent = mtn._name + " - " + mtn._elevation + "' - Completed: " + mtn._status.completed;
      mtnLi.textContent = mtn._name + " - " + mtn._elevation + "' - Completed: " + mtn._status.completed;
      highPeaksUl.appendChild(mtnLi);
    })
  },
  setupEventListeners: () => {
    sortSelect.addEventListener("change", () =>{
      view.displayHighPeaks(sortSelect.value);
      view.setupEventListeners();
    }),
    document.querySelectorAll("li").forEach(highPeakLi => {
      highPeakLi.addEventListener("click", (e) => {
        handlers.toggleCompleted(e.target.id);
      })
    })
  }
}

view.displayHighPeaks();
view.setupEventListeners();