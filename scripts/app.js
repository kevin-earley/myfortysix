const completeFormContainer = document.querySelector('#container-complete-form');
let highPeaks = [];
let currentHighPeak;

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

class UI {
  displayHighPeaks(sortBy) {
    const highPeaksList = document.querySelector('#high-peaks-list');
    highPeaksList.innerHTML = '';

    highPeaks.forEach(function(highPeak) {
      // Create tr element
      const row = document.createElement('tr');

      // Set icon to complete or incomplete
      const completeIcon = 'fas fa-check-circle complete-icon';
      const incompleteIcon = 'far fa-circle incomplete-icon';
      const icon = highPeak.status.isCompleted ? completeIcon : incompleteIcon;

      // Format date display for UI
      let formattedDate = highPeak.status.dateCompleted !== 'incomplete' ?
      `${highPeak.status.dateCompleted.getMonth() + 1}.${highPeak.status.dateCompleted.getDate()}.${highPeak.status.dateCompleted.getFullYear()}` :
      highPeak.status.dateCompleted;
  
      // Insert columns
      row.innerHTML = `
        <td><i class=\"${icon}\"></i></td>
        <td>${highPeak.name}</td>
        <td>${highPeak.elevation}'</td>
        <td>${formattedDate}</td>
      `;

      // Append row to table body
      highPeaksList.appendChild(row);
    })

    // Update complete counters
    this.updateCompletedCounters();
  }

  submitCompleteForm() {
    const dateInput = document.querySelector('.date').value
    const dateCompleted = new Date(dateInput);

    // Update high peak status if date input value is not empty
    if (dateInput !== '') {
      highPeaks.forEach(function(highPeak) {
        if (highPeak.name === currentHighPeak) {
          highPeak.markComplete(dateCompleted);
  
          // Show success alert
          ui.showAlert(`Congratulations! You summited ${currentHighPeak}!`, 'alert-success');

          // Clear currentHighPeak, date input and hide form
          currentHighPeak = '';
          document.querySelector('.date').value = '';
          completeFormContainer.style.display = 'none';
        }
      })
    } else {
      // Show error alert if date input value is empty
      this.showAlert('Please enter date', 'alert-error');
    }
  }

  cancelCompleteForm() {
    currentHighPeak = '';
    completeFormContainer.style.display = 'none';
  }

  clickCompleteIcon(highPeakRow) {
    const UIhighPeakName = document.querySelector("#high-peak-name");

    currentHighPeak = highPeakRow;
    UIhighPeakName.textContent = currentHighPeak;
    completeFormContainer.style.display = 'block';
  }

  removeCompleteStatus(highPeakRow) {
    highPeaks.forEach(function(highPeak) {
      if (highPeak.name === highPeakRow) {
        highPeak.markIncomplete();
      }
    })
    this.showAlert(`${highPeakRow} set back to incomplete`, 'alert-success')
  }

  updateCompletedCounters() {
    let completedCount = 0;
    let notCompletedCount = 0;
    highPeaks.forEach(function(highPeak) {
      highPeak.status.isCompleted ? completedCount ++ : notCompletedCount ++;
    })
    document.querySelector("span.complete-count").textContent = completedCount;
    document.querySelector("span.incomplete-count").textContent = notCompletedCount;
  }

  showAlert(message, className) {
    // Create alert div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    // Insert alert div into DOM
    const container = document.querySelector('.container');
    const form = document.querySelector('#container-complete-form');
    container.insertBefore(div, form);

    // Timeout alert div
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  sortBy(sortOption) {
    switch(sortOption) {
      case 'byName':
        highPeaks.sort(function(a, b) {
          if ( a.name < b.name ) {
            return (aToZ ? -1 : 1);
          } else if ( a.name > b.name ) {
            return (aToZ ? 1 : -1);
          } else {
            return 0;
          }
        })
        break;

      case 'byElevation':
        highPeaks.sort(function(a, b) {
          return (highToLow ? a.elevation - b.elevation : b.elevation - a.elevation);
        })
        break;

      case 'byCompleted':
        const highPeaksComplete = highPeaks.filter(highPeak => highPeak.status.dateCompleted !== 'incomplete');
        const highPeaksIncomplete = highPeaks.filter(highPeak => highPeak.status.dateCompleted === 'incomplete');
  
        // Do not change latestToOldest boolean if highPeaksComplete is empty
        if (highPeaksComplete.length === 0) {
          return latestToOldest = false;
        }
  
        highPeaksComplete.sort(function(a, b) {
          return (latestToOldest ? b.status.dateCompleted - a.status.dateCompleted : a.status.dateCompleted - b.status.dateCompleted);
        })
  
        highPeaks = highPeaksComplete.concat(highPeaksIncomplete);
        break;

      default:
        break;
    }
  }
}

// UI Event Listeners
const ui = new UI;

// Click submit event listener
document.querySelector('.submit').addEventListener('click', function(e) {
  ui.submitCompleteForm();
  ui.displayHighPeaks();
  e.preventDefault();
})

// Click cancel event listener
document.querySelector('.cancel').addEventListener('click', function(e) {
  ui.cancelCompleteForm();
  e.preventDefault();
})

// Sort by Name
let aToZ = false;
document.querySelector('#th-name').addEventListener('click', function(e) {
  aToZ = !aToZ;
  ui.sortBy('byName');
  ui.displayHighPeaks();
})

// Sort by Elevation
let highToLow = false;
document.querySelector('#th-elevation').addEventListener('click', function(e) {
  highToLow = !highToLow;
  ui.sortBy('byElevation');
  ui.displayHighPeaks();
})

// Sort by Completed
let latestToOldest = false;
document.querySelector('#th-date-completed').addEventListener('click', function(e) {
  latestToOldest = !latestToOldest;
  ui.sortBy('byCompleted');
  ui.displayHighPeaks();
})

document.querySelector('#high-peaks-list').addEventListener('click', function(e){
  const highPeakRow = e.target.parentElement.parentElement.children[1].textContent;

  // Click to complete icon event listener
  if (e.target.classList.contains('incomplete-icon') && completeFormContainer.style.display === 'none') {
    ui.clickCompleteIcon(highPeakRow);
  }

  // Click to incomplete icon event listener
  if (e.target.classList.contains('complete-icon') && completeFormContainer.style.display === 'none') {
    ui.removeCompleteStatus(highPeakRow);
    ui.displayHighPeaks();
  }
});

// Create HighPeak objs
function createHighPeak(name, elevation) {
  highPeaks.push(new HighPeak(name, elevation));
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
createHighPeak('Esther Mountain', 4340);
createHighPeak('Big Slide Mountain', 4240);
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

ui.sortBy('byElevation');
ui.displayHighPeaks();

// Storgage Controller

// Item Controller

// UI Controller

// App Controller