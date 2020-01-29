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
  displayHighPeaks() {
    const highPeaksList = document.querySelector('#high-peaks-list');
    highPeaksList.innerHTML = '';

    highPeaks.forEach(function(highPeak) {
      // Create tr element
      const row = document.createElement('tr');

      // Set icon to complete or incomplete
      const icon = highPeak.status.isCompleted ? 'fas fa-check-circle complete-icon' : 'far fa-circle complete-icon'
  
      // Insert columns
      row.innerHTML = `
        <td><i class=\"${icon}\"></i></td>
        <td>${highPeak.name}</td>
        <td>${highPeak.elevation}'</td>
        <td>${highPeak.status.dateCompleted}</td>
      `;

      highPeaksList.appendChild(row);
    })
  }

  submitCompleteForm() {
    const dateCompleted = new Date(document.querySelector('.date').value);

    highPeaks.forEach(function(highPeak) {
      if (highPeak.name === currentHighPeak) {
        if (highPeak.status.isCompleted === true) {
          highPeak.markIncomplete();
        } else {
          highPeak.markComplete(dateCompleted);
        }
      }
    })

    // Clear date input and hide form
    document.querySelector('.date').value = '';
    completeFormContainer.style.display = 'none';
  }

  cancelCompleteForm() {
    currentHighPeak = '';
    completeFormContainer.style.display = 'none';
  }

  clickCompleteIcon(highPeakRow) {
    currentHighPeak = highPeakRow;
    completeFormContainer.style.display = 'block';
  }
}

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

// Click complete icon event listener
document.querySelector('#high-peaks-list').addEventListener('click', function(e){
  if (e.target.classList.contains('complete-icon') && completeFormContainer.style.display === 'none') {
    const highPeakRow = e.target.parentElement.parentElement.children[1].textContent;
    ui.clickCompleteIcon(highPeakRow);
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
createHighPeak('Big Slide Mountain', 4240);
createHighPeak('Esther Mountain', 4340);
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

ui.displayHighPeaks();