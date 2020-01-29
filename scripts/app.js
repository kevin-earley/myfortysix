const completeFormContainer = document.querySelector('#container-complete-form');
const highPeaks = [];
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
    this.status.dateCompleted = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
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
  
      // Insert columns
      row.innerHTML = `
        <td><i class=\"${icon}\"></i></td>
        <td>${highPeak.name}</td>
        <td>${highPeak.elevation}'</td>
        <td>${highPeak.status.dateCompleted}</td>
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
          if (highPeak.status.isCompleted === true) {
            highPeak.markIncomplete();
          } else {
            highPeak.markComplete(dateCompleted);
          }
        }
      })

      // Show success alert
      this.showAlert(`Congratulations! You summited ${currentHighPeak}!`, 'alert-success');

      // Clear currentHighPeak, date input and hide form
      currentHighPeak = '';
      document.querySelector('.date').value = '';
      completeFormContainer.style.display = 'none';
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
        if (highPeak.status.isCompleted === true) {
          highPeak.markIncomplete();
        }
      }
    })
    this.showAlert(`${highPeakRow} set back to incomplete`, 'alert-success')
  }

  updateCompletedCounters() {
    let completedCount = 0;
    let notCompletedCount = 0;
    highPeaks.forEach(function(highPeak) {
      if (highPeak.status.isCompleted === true) {
        completedCount ++
      } else {
        notCompletedCount ++
      }
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
    if (sortOption === 'byName') {
      highPeaks.sort(function(a, b) {
        if ( a.name < b.name ) {
          return (aZ ? -1 : 1);
        }
        if ( a.name > b.name ) {
          return (aZ ? 1 : -1);
        }
        return 0;
      })
    }

    if (sortOption === 'byElevation') {
      highPeaks.sort(function(a, b) {
        return (highLow ? b.elevation - a.elevation : a.elevation - b.elevation);
      })
    }

    if (sortOption === 'byCompleted') {
      highPeaks.sort(function(a, b) {
        return (completeIncomplete ? new Date(b.status.dateCompleted) - new Date(a.status.dateCompleted) : new Date(a.status.dateCompleted) - new Date(b.status.dateCompleted));
      })
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
let aZ = false;
document.querySelector('#th-name').addEventListener('click', function(e) {
  aZ = !aZ;
  ui.sortBy('byName');
  ui.displayHighPeaks();
})

// Sort by Elevation
let highLow = true;
document.querySelector('#th-elevation').addEventListener('click', function(e) {
  highLow = !highLow;
  ui.sortBy('byElevation');
  ui.displayHighPeaks();
})

// Sort by Completed
let completeIncomplete = true;
document.querySelector('#th-date-completed').addEventListener('click', function(e) {
  completeIncomplete = !completeIncomplete;
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