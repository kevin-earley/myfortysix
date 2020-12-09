export class HighPeak {
  constructor(name, elevation) {
    this.name = name;
    this.elevation = elevation;
    this.status = {
      isCompleted: false,
      dateCompleted: null
    }
  }

  markComplete(date) {
    this.status.isCompleted = true;
    this.status.dateCompleted = date;
  }
  
  markIncomplete() {
    this.status.isCompleted = false;
    this.status.dateCompleted = null;
  }
}

export const HighPeaksCtrl = (function() {
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

  const sortOptions = {
    aToZ: false,
    highToLow: false,
    newToOld: false
  }

  return {
    getData: function() {
      return data;
    },
    
    getHighPeaks: function() {
      return data.highPeaks;
    },

    getCurrentHighPeak: function() {
      return data.currentHighPeak;
    },

    updateCurrentHighPeakState: function(newCurrentHighPeak) {
      data.currentHighPeak = newCurrentHighPeak;
    },

    clearCurrentHighPeakState: function() {
      data.currentHighPeak = null;
    },

    updateCurrentHighPeakStatus: function(date) {
      data.highPeaks.forEach(function(highPeak) {
        if (highPeak.name === data.currentHighPeak.name) {
          let dateString = `${date} 00:00:00`;
          highPeak.markComplete( new Date(dateString.replace(/-/g, '/')) );
        }
      })
    },

    clearCurrentHighPeakStatus: function() {
      data.highPeaks.forEach(function(highPeak) {
        if (highPeak.name === data.currentHighPeak.name) {
          highPeak.markIncomplete();
        }
      })
    },

    getTotalCompleted: function() {
      return data.totalCompleted;
    },

    updateTotalCompleted: function() {
      let completedCount = 0;

      data.highPeaks.forEach(function(highPeak) {
        if (highPeak.status.isCompleted) {
          completedCount++
        }
      })

      data.totalCompleted = completedCount;
    },

    sortHighPeaks: function(sortBy) {
      switch(sortBy) {
        case 'byName':
          sortOptions.aToZ = !sortOptions.aToZ;

          // set newToOld boolean to false so byCompleted will always start new to old
          sortOptions.newToOld = false;

          data.highPeaks.sort(function(a, b) {
            if ( a.name < b.name ) {
              return (sortOptions.aToZ ? -1 : 1);
            } else if ( a.name > b.name ) {
              return (sortOptions.aToZ ? 1 : -1);
            } else {
              return 0;
            }
          })
          break;
  
        case 'byElevation':
          sortOptions.highToLow = !sortOptions.highToLow;

          // set newToOld boolean to false so byCompleted will always start new to old
          sortOptions.newToOld = false;

          data.highPeaks.sort(function(a, b) {
            return (sortOptions.highToLow ? a.elevation - b.elevation : b.elevation - a.elevation);
          })
          break;
  
        case 'byCompleted':
          sortOptions.newToOld = !sortOptions.newToOld;
          const highPeaksComplete = data.highPeaks.filter(highPeak => highPeak.status.dateCompleted !== null);
          const highPeaksIncomplete = data.highPeaks.filter(highPeak => highPeak.status.dateCompleted === null);
    
          // do not change newToOld boolean if highPeaksComplete is empty
          if (highPeaksComplete.length === 0) {
            return sortOptions.newToOld = false;
          }
    
          highPeaksComplete.sort(function(a, b) {
            return (sortOptions.newToOld ? b.status.dateCompleted - a.status.dateCompleted : a.status.dateCompleted - b.status.dateCompleted);
          })
    
          data.highPeaks = highPeaksComplete.concat(highPeaksIncomplete);
          break;
  
        default:
          break;
      }
    }
  }
})();