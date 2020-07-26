export const UICtrl = (function() {
  const UISelectors = {
    mainContainer: 'main',
    statusFormContainer: '.status-form',
    statusFormHighPeakName: '#high-peak-name',
    statusFormDateInput: '.date',
    statusFormSubmitBtn: '.submit',
    statusFormResetBtn: '.reset',
    statusFormCancelBtn: '.cancel',
    completeCount: 'span.complete-count',
    incompleteCount: 'span.incomplete-count',
    sortByName: '#th-name',
    sortByElevation: '#th-elevation',
    sortByDateCompleted: '#th-date-completed',
    highPeaksTableBody: '#high-peaks-table-body',
    alertDiv: '.alert'
  }

  // Public Methods
  return {
    populateHighPeakList: function(highPeaks) {
      let html = '';
      const completeIconClass = 'fas fa-check-circle complete',
            incompleteIconClass = 'far fa-circle incomplete';

      highPeaks.forEach(function(highPeak) {
        // Set icon class to complete or incomplete
        let iconClass = highPeak.status.isCompleted ? completeIconClass : incompleteIconClass;

        // Format date completed if complete
        let formattedDate = highPeak.status.dateCompleted !== null ?
        `${highPeak.status.dateCompleted.getMonth() + 1}.${highPeak.status.dateCompleted.getDate()}.${highPeak.status.dateCompleted.getFullYear()}`
        : 'incomplete';

        html += `
          <tr>
            <td><i class="${iconClass} status-icon"></i></td>
            <td>${highPeak.name}</td>
            <td>${highPeak.elevation}'</td>
            <td>${formattedDate}</td>
          </tr>
        `;
      });

      // Insert high peaks table rows into table
      document.querySelector(UISelectors.highPeaksTableBody).innerHTML = html;
    },

    showStatusForm: function(newCurrentHighPeak) {
      document.querySelector(UISelectors.statusFormContainer).style.display = 'block';
      document.querySelector(UISelectors.statusFormHighPeakName).textContent = newCurrentHighPeak.name;
      document.querySelector(UISelectors.statusFormDateInput).value = newCurrentHighPeak.status.dateCompleted !== null ?
      newCurrentHighPeak.status.dateCompleted.toISOString().slice(0,10) : null;

      document.querySelector(UISelectors.statusFormSubmitBtn).value = newCurrentHighPeak.status.dateCompleted === null ?
        'Complete' : 'Update';

      document.querySelector(UISelectors.statusFormResetBtn).style.display = newCurrentHighPeak.status.dateCompleted !== null ?
        'inline' : 'none';
    },

    hideStatusForm: function() {
      document.querySelector(UISelectors.statusFormContainer).style.display = 'none';
      document.querySelector(UISelectors.statusFormHighPeakName).textContent = '';
      document.querySelector(UISelectors.statusFormDateInput).value = null;
    },

    updateCompleteTotals: function(totalCompleted) {
      document.querySelector(UISelectors.completeCount).textContent = totalCompleted;
      document.querySelector(UISelectors.incompleteCount).textContent = 46 - totalCompleted;
    },

    showAlert(message, className) {
      this.clearAlert();

      // Create alert div
      const div = document.createElement('div');
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(message));
  
      // Insert alert div into DOM
      const main = document.querySelector('main');
      const highPeakList = document.querySelector('.high-peaks-list');
      main.insertBefore(div, highPeakList);
  
      setTimeout(() => {
        this.clearAlert()
      }, 3000)
    },
  
    clearAlert() {
      const currentAlert = document.querySelector(UISelectors.alertDiv);
  
      if (currentAlert) {
        currentAlert.remove();
      }
    },

    getSelectors: function() {
      return UISelectors;
    }
  }
})();