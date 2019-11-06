const highPeaksTable = document.querySelector('table#list-of-high-peaks');

class HighPeak {
  constructor( name, elevation ) {
    this._name = name;
    this._elevation = elevation;
    this._status = {
      isCompleted: false,
      dateCompleted: 'N/A'
    }
  }
}

const highPeaksList = {
  highPeaks: [],

  createHighPeak: ( name, elevation ) => {
    highPeaksList.highPeaks[highPeaksList.highPeaks.length] = new HighPeak( name, elevation );
  },

  sort: {
    byName: ( a, b ) => {
      if ( a._name < b._name ) {
        return -1;
      }
      if ( a._name > b._name ) {
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

const handlers = {
  toggleCompleted: ( highPeakName ) => {
    highPeaksList.highPeaks.forEach( highPeak => {
      if ( highPeak._name === highPeakName ) {
        let dateInput = document.querySelector("input[id=" + highPeak._name.replace(/\s+/g, '-').toLowerCase() + "]");
        highPeak._status.isCompleted = !highPeak._status.isCompleted
        if ( highPeak._status.isCompleted === true ) {
          highPeak._status.dateCompleted = dateInput.value;
        } else {
          highPeak._status.dateCompleted = "N/A";
        }
      };
    })
    view.displayHighPeaks();
  }
}

const view = {
  displayHighPeaks: ( sortOption ) => {
    highPeaksTable.innerHTML = '';
    highPeaksList.highPeaks.sort( highPeaksList.sort[sortOption] ).forEach( (highPeak, i) => {
      let highPeakTr = document.createElement("tr");
      let completeFormTd = document.createElement("td");
      highPeakTr.innerHTML = `<td>${i + 1}</td><td>${highPeak._name}</td><td>${highPeak._elevation}'</td><td>Completed: ${highPeak._status.isCompleted}</td><td>Date: ${highPeak._status.dateCompleted}</td>`;
      completeFormTd.appendChild( view.createDateCompletedInput(highPeak) ); 
      completeFormTd.appendChild( view.createCompleteButton(highPeak) ); 
      highPeakTr.appendChild(completeFormTd); 
      highPeaksTable.appendChild(highPeakTr); 
    });
  },

  createDateCompletedInput: ( highPeak ) => {
    let dateCompletedInput = document.createElement("input");
    dateCompletedInput.type = "text";
    dateCompletedInput.id = highPeak._name.replace(/\s+/g, '-').toLowerCase();
    return dateCompletedInput;
  },

  createCompleteButton: ( highPeak ) => {
    let completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", function() {
      handlers.toggleCompleted( highPeak._name );
    })
    return completeButton;
  },

  setupEventListeners: () => {
    const sortSelect = document.querySelector("select#sort-by-select");
    sortSelect.addEventListener("change", () =>{
      view.displayHighPeaks( sortSelect.value );
    })
  }
}

highPeaksList.createHighPeak('Mount Marcy', 5344);
highPeaksList.createHighPeak('Algonquin Peak', 5114);
highPeaksList.createHighPeak('Mount Haystack', 4960);
highPeaksList.createHighPeak('Mount Skylight', 4926);
highPeaksList.createHighPeak('Whiteface Mountain', 4867);
highPeaksList.createHighPeak('Dix Mountain', 4857);
// highPeaksList.createHighPeak('Gray Peak', 4840);
// highPeaksList.createHighPeak('Iroquois Peak', 4840);
// highPeaksList.createHighPeak('Basin Mountain', 4827);
// highPeaksList.createHighPeak('Gothics Mountain', 4736);
// highPeaksList.createHighPeak('Mount Colden', 4714);
// highPeaksList.createHighPeak('Giant Mountain', 4627);
// highPeaksList.createHighPeak('Nippletop Mountain', 4620);
// highPeaksList.createHighPeak('Santanoni Peak', 4607);
// highPeaksList.createHighPeak('Mount Redfield', 4606);
// highPeaksList.createHighPeak('Wright Peak', 4580);
// highPeaksList.createHighPeak('Saddleback Mountain', 4515);
// highPeaksList.createHighPeak('Panther Peak', 4442);
// highPeaksList.createHighPeak('Tabletop Mountain', 4427);
// highPeaksList.createHighPeak('Rocky Peak Ridge', 4420);

view.displayHighPeaks();
view.setupEventListeners();