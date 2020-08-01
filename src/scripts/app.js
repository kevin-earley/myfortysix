import "../styles/main.scss";

import { HighPeaksCtrl } from "./high-peaks-ctrl";
import { UI } from "./ui";

const App = (function(HighPeaksCtrl, UI) {
  const selectors = UI.getSelectors();

  const loadEventListeners = function() {
    document.querySelector(selectors.highPeaksTableBody).addEventListener('click', handleStatusIconClick);
    document.querySelector(selectors.statusFormSubmitBtn).addEventListener('click', handleStatusFormSubmit);
    document.querySelector(selectors.statusFormCancelBtn).addEventListener('click', handleStatusFormCancel);
    document.querySelector(selectors.statusFormResetBtn).addEventListener('click', handleStatusReset);
    document.querySelector(selectors.sortByName).addEventListener('click', sortByName);
    document.querySelector(selectors.sortByElevation).addEventListener('click', sortByElevation);
    document.querySelector(selectors.sortByDateCompleted).addEventListener('click', sortByDateCompleted);
  }

  const handleStatusIconClick = function(e) {
    if (e.target.classList.contains('status-icon') && document.querySelector(selectors.statusFormContainer).style.display === 'none') {
      // Get High Peak name of clicked icon / table row
      let clickedHighPeak = e.target.parentElement.parentElement.children[1].textContent;

      // Create variable to store new Current High Peak obj
      let newCurrentHighPeak;

      HighPeaksCtrl.getHighPeaks().forEach(function(highPeak) {
        if (highPeak.name === clickedHighPeak) {
          return newCurrentHighPeak = highPeak;
        }
      })

      // Set Current High Peak state to new Current High Peak obj
      HighPeaksCtrl.updateCurrentHighPeakState(newCurrentHighPeak);

      // Show status form
      UI.showStatusForm(newCurrentHighPeak);
    }
  }

  const handleStatusFormSubmit = function(e) {
    // Get status form date input
    let statusFormDateValue = document.querySelector(selectors.statusFormDateInput).value;

    // Create variable to store current Is Complete date if date is not null
    let currentIsCompleteDate;
    if (HighPeaksCtrl.getCurrentHighPeak().status.dateCompleted !== null) {
      currentIsCompleteDate = HighPeaksCtrl.getCurrentHighPeak().status.dateCompleted.toISOString().slice(0,10);
    }

    if (statusFormDateValue !== '' && statusFormDateValue !== currentIsCompleteDate) {
      // Update Current High Peak status in data structure
      HighPeaksCtrl.updateCurrentHighPeakStatus(statusFormDateValue);

      // Update Total Completed in data structure
      HighPeaksCtrl.updateTotalCompleted();

      // Update high peaks table
      UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());

      // Update UI complete totals
      UI.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());

      // if (currentIsCompleteDate) {
      //   UI.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} succesfully updated!`, 'alert-success');
      // } else {
      //   UI.showAlert(`You summited ${HighPeaksCtrl.getCurrentHighPeak().name}!`, 'alert-success');
      // }

      // Clear Current High Peak State
      HighPeaksCtrl.clearCurrentHighPeakState();

      // Close status form
      handleStatusFormCancel();
    } else if (statusFormDateValue === '') {
      // Show error alert
      UI.showAlert('Please enter a valid date in order to complete.', 'alert-error');
    } else if (statusFormDateValue === currentIsCompleteDate) {
      UI.showAlert('Please enter a new date in order to update.', 'alert-error');
    }

    e.preventDefault();
  }

  const handleStatusFormCancel = function() {
    // Clear Current High Peak State
    HighPeaksCtrl.clearCurrentHighPeakState();

    // Hide status form
    UI.hideStatusForm();
  }

  const handleStatusReset = function(e) {
    // Get status form date input
    let statusFormDateValue = document.querySelector(selectors.statusFormDateInput).value;

    if (statusFormDateValue !== '') {
      // Clear Current High Peak status in data structure
      HighPeaksCtrl.clearCurrentHighPeakStatus();

      // Update Total Completed in data structure
      HighPeaksCtrl.updateTotalCompleted();

      // Update high peaks table
      UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());

      // Update UI complete totals
      UI.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());

      // Show success alert
      // UI.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} has been succesfully reset`, 'alert-success');

      // Clear Current High Peak State
      HighPeaksCtrl.clearCurrentHighPeakState();
      
      // Close status form
      handleStatusFormCancel();
    } else {
      // Show error alert
      UI.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} is already incomplete`, 'alert-error');
    }

    e.preventDefault();
  }

  const sortByName = function() {
    HighPeaksCtrl.sortHighPeaks('byName');
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const sortByElevation = function() {
    HighPeaksCtrl.sortHighPeaks('byElevation');
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const sortByDateCompleted = function() {
    HighPeaksCtrl.sortHighPeaks('byCompleted');
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  // Public Methods
  return {
    init: function() {
      UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
      UI.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());
      loadEventListeners();
    }
  }
})(HighPeaksCtrl, UI);

// Init App
App.init();