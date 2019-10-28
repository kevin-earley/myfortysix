const sortSelect = document.querySelector("select#sort-by-select");
const highPeaksUl = document.querySelector('ul#list-of-high-peaks');
let highPeaksList = [];

class HighPeak {
  constructor(name, elevation) {
    this._name = name;
    this._elevation = elevation;
    this._status = {
      isComplete: false,
      dateOfCompletion: ''
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
createHighPeak('Gray Peak', 4840);
createHighPeak('Iroquois Peak', 4840);
createHighPeak('Basin Mountain', 4827);
createHighPeak('Gothics Mountain', 4736);
createHighPeak('Mount Colden', 4714);
createHighPeak('Giant Mountain', 4627);

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
  }
}

const view = {
  displayHighPeaks: (sortOption) => {
    highPeaksUl.innerHTML = '';
    highPeaksList.sort( handlers.sort[sortOption] );
    highPeaksList.forEach(mtn => {
      let mtnLi = document.createElement("li");
      mtnLi.className = "high-peak"
      mtnLi.textContent = "( ) " + mtn._name + " - " + mtn._elevation + "'";
      highPeaksUl.appendChild(mtnLi);
    })
  },
  createEventListeners: () => {
    sortSelect.addEventListener("change", () =>{
      view.displayHighPeaks(sortSelect.value);
    }),

    document.querySelectorAll("li.high-peak").forEach(highPeakLi => {
      highPeakLi.addEventListener("click", () => {
        console.log(this)
      })
    })

  }
}

view.displayHighPeaks();
view.createEventListeners();