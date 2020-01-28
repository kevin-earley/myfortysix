const highPeaks = [];

class HighPeak {
  constructor(name, elevation) {
    this.name = name;
    this.elevation = elevation;
    this.status = {
      isCompleted: false,
      dateCompleted: 'incomplete'
    }
  }

  markComplete(completionDate) {
    this.status.isCompleted = true,
    this.status.dateCompleted = `${completionDate.getMonth() + 1}.${completionDate.getDate()}.${completionDate.getFullYear()}`;;
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
  
      // Insert columns and completion form
      row.innerHTML = `
        <td>${highPeak.name}</td>
        <td>${highPeak.elevation}</td>
        <td>${highPeak.status.dateCompleted}</td>
        <td><i class=\"${icon}\"></i></td>
        <td>
          <form style="display:none">
            <input type="date"></input>
            <input type="submit" value="Submit" class="submit">
          </form>
        </td>
      `;

      highPeaksList.appendChild(row);
    })
  }

  toggleCompletionForm(completionForm) {
    // Toggle form display
    if (completionForm.style.display === 'none') {
      completionForm.style.display = 'block';
    } else {
      completionForm.style.display = 'none';
    }

    // Hide previous form before displaying new form
    const allForms = document.querySelectorAll("form");
    allForms.forEach(function(form) {
      form.style.display = 'none';
    });
  }

  handleCompletionSubmit(target, completionDate) {
    const highPeakRow = target.parentElement.parentElement.parentElement.children[0].textContent;

    highPeaks.forEach(function(highPeak) {
      if (highPeak.name === highPeakRow) {
        if (highPeak.status.isCompleted === true) {
          highPeak.markIncomplete();
        } else {
          highPeak.markComplete(completionDate);
        }
      }
    })
  }
}

// Event listeners
document.getElementById('high-peaks-list').addEventListener('click', function(e){
  const ui = new UI;

  if (e.target.className === 'submit') {
    const completionDate = new Date(e.target.parentElement.children[0].value);
    ui.handleCompletionSubmit(e.target, completionDate);
    ui.displayHighPeaks();
    e.preventDefault();
  }

  if (e.target.classList.contains('complete-icon')) {
    const completionForm = e.target.parentElement.parentElement.children[4].children[0];
    ui.toggleCompletionForm(completionForm);
  }
});

// Create HighPeak objs and call displayHighPeaks
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

const ui = new UI;
ui.displayHighPeaks();