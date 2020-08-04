export const UI = (function() {
  // UI selectors
  const selectors = {
    completeCount: 'span.complete-count',
    incompleteCount: 'span.incomplete-count',
    highPeaksTableBody: '.high-peaks-table-body',
    sortByName: '#th-name',
    sortByElevation: '#th-elevation',
    sortByDateCompleted: '#th-date-completed',
    statusFormModal: '.status-form-modal',
    statusFormContainer: '.form-container',
    statusFormHighPeakName: '.high-peak-name',
    statusFormHighPeakElevation: '.high-peak-elevation',
    statusFormDateInput: '.date',
    statusFormSubmitBtn: '.submit',
    statusFormResetBtn: '.reset',
    statusFormCancelBtn: '.cancel',
    alertMsg: '.alert-msg'
  }

  // public methods
  return {
    getSelectors: function() {
      return selectors;
    },

    populateHighPeakList: function(highPeaks) {
      let html = '';

      highPeaks.forEach(function(highPeak) {
        let iconClass;
        let dateClass;
        let formattedDate;

        // set dom classes and format date completed based on if highPeak isCompleted
        if (highPeak.status.isCompleted) {
          iconClass = 'fas fa-check-circle complete';
          dateClass = 'complete';
          formattedDate = `${('0' + (highPeak.status.dateCompleted.getMonth() + 1)).slice(-2)}.${('0' + highPeak.status.dateCompleted.getDate()).slice(-2)}.${highPeak.status.dateCompleted.getFullYear()}`;
        } else {
          iconClass = 'far fa-circle incomplete';
          dateClass = 'incomplete';
          formattedDate = 'incomplete';
        }

        html += `
          <tr>
            <td><i class="${iconClass} status-icon"></i></td>
            <td>${highPeak.name}</td>
            <td>${highPeak.elevation}'</td>
            <td class="${dateClass} date-completed">${formattedDate}</td>
          </tr>
        `;
      });

      // insert table rows into highPeaksTableBody
      document.querySelector(selectors.highPeaksTableBody).innerHTML = html;
    },

    showStatusForm: function(newCurrentHighPeak) {
      document.querySelector(selectors.statusFormModal).style.display = 'block';
      document.querySelector(selectors.statusFormContainer).style.display = 'block';
      document.querySelector(selectors.statusFormHighPeakName).textContent = newCurrentHighPeak.name;
      document.querySelector(selectors.statusFormHighPeakElevation).textContent = `${newCurrentHighPeak.elevation}'`;

      if (newCurrentHighPeak.status.isCompleted) {
        document.querySelector(selectors.statusFormDateInput).value = newCurrentHighPeak.status.dateCompleted.toISOString().slice(0,10);
        document.querySelector(selectors.statusFormSubmitBtn).textContent = 'Update';
        document.querySelector(selectors.statusFormResetBtn).style.display = 'inline-block';
      } else {
        document.querySelector(selectors.statusFormDateInput).value = null;
        document.querySelector(selectors.statusFormSubmitBtn).textContent = 'Complete';
        document.querySelector(selectors.statusFormResetBtn).style.display = 'none';
      }

      // create transparentCover to place on top of dom and beneath statusFormModal
      const transparentCover = document.createElement('div');
      transparentCover.className = 'transparent-cover';
      document.querySelector('body').insertBefore(transparentCover, document.querySelector('header'))
    },

    hideStatusForm: function() {
      document.querySelector(selectors.statusFormModal).style.display = 'none';
      document.querySelector(selectors.statusFormHighPeakName).textContent = '';
      document.querySelector(selectors.statusFormHighPeakElevation).textContent = '';
      document.querySelector(selectors.statusFormDateInput).value = null;

      document.querySelector(selectors.alertMsg).textContent = '';
      document.querySelector(selectors.alertMsg).classList.remove('success', 'error');

      document.querySelector('div.transparent-cover').remove();
    },

    updateCompleteTotals: function(totalCompleted) {
      document.querySelector(selectors.completeCount).textContent = totalCompleted;
      document.querySelector(selectors.incompleteCount).textContent = 46 - totalCompleted;
    },

    showAlert(message, alertType) {
      if (alertType === 'error') {
        document.querySelector(selectors.alertMsg).textContent = message;
        document.querySelector(selectors.alertMsg).classList.add(alertType);
        document.querySelector(selectors.alertMsg).classList.remove('success');

        setTimeout(() => {
          if (document.querySelector(selectors.alertMsg).classList.contains('error')) {
            document.querySelector(selectors.alertMsg).textContent = '';
            document.querySelector(selectors.alertMsg).classList.remove('error');
          }
        }, 3000);
      } else if (alertType === 'success') {
        document.querySelector(selectors.statusFormContainer).style.display = 'none';
        
        document.querySelector(selectors.alertMsg).textContent = message
        document.querySelector(selectors.alertMsg).classList.add(alertType);
        document.querySelector(selectors.alertMsg).classList.remove('error');

        setTimeout(() => {
          this.hideStatusForm()
        }, 3000);
      }
    }
  }
})();