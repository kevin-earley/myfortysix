const highPeaksList = [
  {
    name: "Mt. Marcy",
    elevation: 5344,
    completed: false
  },
  {
    name: "Algonquin Peak",
    elevation: 5114,
    completed: false
  },
  {
    name: "Mt. Haystack",
    elevation: 4960,
    completed: false
  },
  {
    name: "Mt. Skylight",
    elevation: 4926,
    completed: false
  },
  {
    name: "Whiteface Mountain",
    elevation: 4867,
    completed: false
  },
  {
    name: "Dix Mountain",
    elevation: 4857,
    completed: false
  },
  {
    name: "Gray Peak",
    elevation: 4840,
    completed: false
  }
];

const handlers = {
  sortByName: ( a, b ) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  },
  sortByElevationHigh: ( a, b ) => {
    return b.elevation - a.elevation;
  },
  sortByElevationLow: ( a, b ) => {
    return a.elevation - b.elevation;
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
      mtnLi.textContent = "( ) " + mtn.name + " - " + mtn.elevation;
      highPeaksUl.appendChild(mtnLi);
    })
  }
}

view.displayHighPeaks();