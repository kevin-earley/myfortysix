export const UI = (function() {
  const selectors = {
    completeCount: 'span.complete-count',
    incompleteCount: 'span.incomplete-count',
    highPeaksTableBody: '.high-peaks-table-body',
    sortByName: '#th-name',
    sortByElevation: '#th-elevation',
    sortByDateCompleted: '#th-date-completed',
    mainContainer: 'main',
    statusFormContainer: '.status-form',
    statusFormHighPeakName: '.high-peak-name',
    statusFormHighPeakElevation: '.high-peak-elevation',
    statusFormDateInput: '.date',
    statusFormSubmitBtn: '.submit',
    statusFormResetBtn: '.reset',
    statusFormCancelBtn: '.cancel',
    alertMsg: '.alert-msg'
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

        // Set date completed td class to complete or incomplete
        let dateClass = highPeak.status.dateCompleted !== null ? 'complete' : 'incomplete';

        // Format date completed if complete
        let formattedDate = highPeak.status.dateCompleted !== null ?
        `${('0' + (highPeak.status.dateCompleted.getMonth() + 1)).slice(-2)}.${('0' + highPeak.status.dateCompleted.getDate()).slice(-2)}.${highPeak.status.dateCompleted.getFullYear()}`
        : 'incomplete';

        html += `
          <tr>
            <td><i class="${iconClass} status-icon"></i></td>
            <td>${highPeak.name}</td>
            <td>${highPeak.elevation}'</td>
            <td class="${dateClass} date-completed">${formattedDate}</td>
          </tr>
        `;
      });

      // Insert high peaks table rows into table
      document.querySelector(selectors.highPeaksTableBody).innerHTML = html;
    },

    showStatusForm: function(newCurrentHighPeak) {
      document.querySelector(selectors.statusFormContainer).style.display = 'block';
      document.querySelector(selectors.statusFormHighPeakName).textContent = newCurrentHighPeak.name;
      document.querySelector(selectors.statusFormHighPeakElevation).textContent = `${newCurrentHighPeak.elevation}'`;
      document.querySelector(selectors.statusFormDateInput).value = newCurrentHighPeak.status.dateCompleted !== null ?
      newCurrentHighPeak.status.dateCompleted.toISOString().slice(0,10) : null;

      document.querySelector(selectors.statusFormSubmitBtn).textContent = newCurrentHighPeak.status.dateCompleted === null ?
        'Complete' : 'Update';

      document.querySelector(selectors.statusFormResetBtn).style.display = newCurrentHighPeak.status.dateCompleted !== null ?
        'inline-block' : 'none';

      const transparentCover = document.createElement('div');
      transparentCover.className = 'transparent-cover';
      document.querySelector('body').insertBefore(transparentCover, document.querySelector('header'))
    },

    hideStatusForm: function() {
      document.querySelector(selectors.statusFormContainer).style.display = 'none';
      document.querySelector(selectors.statusFormHighPeakName).textContent = '';
      document.querySelector(selectors.statusFormHighPeakElevation).textContent = '';
      document.querySelector(selectors.statusFormDateInput).value = null;

      document.querySelector('div.transparent-cover').remove();
      
      this.clearAlert();
    },

    updateCompleteTotals: function(totalCompleted) {
      document.querySelector(selectors.completeCount).textContent = totalCompleted;
      document.querySelector(selectors.incompleteCount).textContent = 46 - totalCompleted;
    },

    showAlert(message, className) {
      this.clearAlert();

      document.querySelector(selectors.alertMsg).textContent = message
  
      setTimeout(() => {
        this.clearAlert()
      }, 3000)
    },
  
    clearAlert() {
      document.querySelector(selectors.alertMsg).textContent = '';
    },

    getSelectors: function() {
      return selectors;
    }
  }
})();