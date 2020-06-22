// STORAGE CONTROLLER



// HIGHPEAK CONTROLLER
const HighPeakCtrl = (function() {
  // HighPeak Class
  class HighPeak {
    constructor(name, elevation) {
      this.name = name;
      this.elevation = elevation;
      this.status = {
        isCompleted: false,
        dateCompleted: 'incomplete'
      }
    }
  
    markComplete(date) {
      this.status.isCompleted = true,
      this.status.dateCompleted = date;
    }
    
    markIncomplete() {
      this.status.isCompleted = false,
      this.status.dateCompleted = 'incomplete';
    }
  }

  // Data Structure / State
  const data = {
    highPeaks: [
      new HighPeak('Mount Marcy', 5344),
      new HighPeak('Algonquin Peak', 5114),
      new HighPeak('Mount Haystack', 4960),
      new HighPeak('Mount Skylight', 4926),
      new HighPeak('Whiteface Mountain', 4867),
      new HighPeak('Dix Mountain', 4857),
      new HighPeak('Gray Peak', 4840),
      new HighPeak('Iroquois Peak', 4840),
      new HighPeak('Basin Mountain', 4827),
      new HighPeak('Gothics Mountain', 4736),
      new HighPeak('Mount Colden', 4714),
      new HighPeak('Giant Mountain', 4627),
      new HighPeak('Nippletop Mountain', 4620),
      new HighPeak('Santanoni Peak', 4607),
      new HighPeak('Mount Redfield', 4606),
      new HighPeak('Wright Peak', 4580),
      new HighPeak('Saddleback Mountain', 4515),
      new HighPeak('Panther Peak', 4442),
      new HighPeak('Tabletop Mountain', 4427),
      new HighPeak('Rocky Peak Ridge', 4420),
      new HighPeak('Macomb Mountan', 4405),
      new HighPeak('Armstrong Mountan', 4400),
      new HighPeak('Hough Peak Mountan', 4400),
      new HighPeak('Seward Mountan', 4361),
      new HighPeak('Mount Marshall', 4360),
      new HighPeak('Allen Mountain', 4340),
      new HighPeak('Esther Mountain', 4340),
      new HighPeak('Big Slide Mountain', 4240),
      new HighPeak('Upper Wolfjaw Mountain', 4185),
      new HighPeak('Lower Wolfjaw Mountain', 4175),
      new HighPeak('Street Mountain', 4166),
      new HighPeak('Phelps Mountain', 4161),
      new HighPeak('Mount Donaldson', 4140),
      new HighPeak('Seymour Mountain', 4120),
      new HighPeak('Sawteeth Mountain', 4100),
      new HighPeak('Cascade Mountain', 4098),
      new HighPeak('South Dix Mountain', 4060),
      new HighPeak('Porter Mountain', 4059),
      new HighPeak('Mount Colvin', 4057),
      new HighPeak('Mount Emmons', 4040),
      new HighPeak('Dial Mountain', 4020),
      new HighPeak('Grace Peak Mountain', 4012),
      new HighPeak('Blake Mountain', 3960),
      new HighPeak('Cliff Mountain', 3960),
      new HighPeak('Nye Mountain', 3895),
      new HighPeak('Couchsachraga Peak Mountain', 3820)
    ],
    currentHighPeak: null,
    totalCompleted: 0
  }

  // Public Methods
  return {
    getHighPeaks: function() {
      return data.highPeaks;
    },
    logData: function() {
      return data;
    }
  }
})();



// UI CONTROLLER
const UICtrl = (function() {
  const UISelectors = {
    highPeakList: '#high-peaks-list'
  }

  // Public Methods
  return {
    populateHighPeakList: function(highPeaks) {
      let html = '';
      let listNumber = 0;

      highPeaks.forEach(function(highPeak) {
        listNumber++;

        // Set Icon to Complete or Incomplete
        const completeIcon = 'fas fa-check-circle complete-icon';
        const incompleteIcon = 'far fa-circle incomplete-icon';
        let icon = highPeak.status.isCompleted ? completeIcon : incompleteIcon;

        // Format Completetion Date if Completed
        let formattedDate = highPeak.status.dateCompleted !== 'incomplete' ?
        `${highPeak.status.dateCompleted.getMonth() + 1}.${highPeak.status.dateCompleted.getDate()}.${highPeak.status.dateCompleted.getFullYear()}`
        : highPeak.status.dateCompleted;

        html += `
          <tr>
            <td>${listNumber}</td>
            <td>${highPeak.name}</td>
            <td>${highPeak.elevation}'</td>
            <td>${formattedDate}</td>
            <td><i class=\"${icon}\"></i></td>
          </tr>
        `;
      });

      // Insert list items
      document.querySelector(UISelectors.highPeakList).innerHTML = html;

    }
  }
})();



// APP CONTROLLER
const App = (function(HighPeakCtrl, UICtrl) {

  // Public Methods
  return {
    init: function() {
      // Fetch items from data structure
      const highPeaks = HighPeakCtrl.getHighPeaks();

      // Populate list with items
      UICtrl.populateHighPeakList(highPeaks);
    }
  }

})(HighPeakCtrl, UICtrl);

// Init App
App.init();