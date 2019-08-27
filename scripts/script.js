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

let highPeaksList = [];
createHighPeak('Mt. Marcy', 5344);
createHighPeak('Algonquin Peak', 5114);
createHighPeak('Mt. Haystack', 4960);
createHighPeak('Mt. Skylight', 4926);
createHighPeak('Whiteface Mountain', 4867);
createHighPeak('Dix Mountain', 4857);

const handlers = {
  sortByName: ( a, b ) => {
    if (a._name < b._name) {
      return -1;
    }
    if (a._name > b._name) {
      return 1;
    }
    return 0;
  },
  sortByElevationHigh: ( a, b ) => {
    return b._elevation - a._elevation;
  },
  sortByElevationLow: ( a, b ) => {
    return a._elevation - b._elevation;
  }
}

const view = {
  displayHighPeaksByName: () => {
    highPeaksList.sort( handlers.sortByName );
    view.displayHighPeaks();
  },
  displayHighPeaksByElevationHigh: () => {
    highPeaksList.sort( handlers.sortByElevationHigh );
    view.displayHighPeaks();
  },
  displayHighPeaksByElevationLow: () => {
    highPeaksList.sort( handlers.sortByElevationLow );
    view.displayHighPeaks();
  },
  displayHighPeaks: () => {
    const highPeaksUl = document.querySelector('ul#list-of-high-peaks');
    highPeaksUl.innerHTML = '';

    highPeaksList.forEach(mtn => {
      let mtnLi = document.createElement("li");
      mtnLi.textContent = "( ) " + mtn._name + " - " + mtn._elevation;
      highPeaksUl.appendChild(mtnLi);
    })
  }
}

view.displayHighPeaks();