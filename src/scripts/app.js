import "../styles/main.scss";

import { HighPeaksCtrl } from "./high-peaks-ctrl";
import { UICtrl } from "./ui-ctrl";

const App = (function(HighPeaksCtrl, UICtrl) {
  // Get UI Selectors
  const UISelectors = UICtrl.getSelectors();

  const loadEventListeners = function() {
    // Click status icon
    document.querySelector(UISelectors.highPeaksTableBody).addEventListener('click', clickStatusIcon);

    // Click Submit in status form
    document.querySelector(UISelectors.statusFormSubmitBtn).addEventListener('click', submitStatusForm);

    // Click Reset in status form
    document.querySelector(UISelectors.statusFormResetBtn).addEventListener('click', resetStatusForm);

    // Click Close in status form
    document.querySelector(UISelectors.statusFormCancelBtn).addEventListener('click', closeStatusForm);

    // Click Sort By Name
    document.querySelector(UISelectors.sortByName).addEventListener('click', sortByName);

    // Click Sort By Elevation
    document.querySelector(UISelectors.sortByElevation).addEventListener('click', sortByElevation);

    // Click Sort By Date Completed
    document.querySelector(UISelectors.sortByDateCompleted).addEventListener('click', sortByDateCompleted);
  }

  const clickStatusIcon = function(e) {
    if (e.target.classList.contains('status-icon') && document.querySelector(UISelectors.statusFormContainer).style.display === 'none') {
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
      UICtrl.showStatusForm(newCurrentHighPeak);
    }
  }

  const submitStatusForm = function(e) {
    // Get status form date input
    let statusFormDateValue = document.querySelector(UISelectors.statusFormDateInput).value;

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
      UICtrl.populateHighPeakList(HighPeaksCtrl.getHighPeaks());

      // Update UI complete totals
      UICtrl.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());

      if (currentIsCompleteDate) {
        UICtrl.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} succesfully updated!`, 'alert-success');
      } else {
        UICtrl.showAlert(`You summited ${HighPeaksCtrl.getCurrentHighPeak().name}!`, 'alert-success');
      }

      // Clear Current High Peak State
      HighPeaksCtrl.clearCurrentHighPeakState();

      // Close status form
      closeStatusForm();
    } else if (statusFormDateValue === '') {
      // Show error alert
      UICtrl.showAlert('Please enter date', 'alert-error');
    } else if (statusFormDateValue === currentIsCompleteDate) {
      UICtrl.showAlert('Please enter a new date in order to update', 'alert-error');
    }

    e.preventDefault();
  }

  const resetStatusForm = function(e) {
    // Get status form date input
    let statusFormDateValue = document.querySelector(UISelectors.statusFormDateInput).value;

    if (statusFormDateValue !== '') {
      // Reset Current High Peak status in data structure
      HighPeaksCtrl.resetCurrentHighPeakStatus();

      // Update Total Completed in data structure
      HighPeaksCtrl.updateTotalCompleted();

      // Update high peaks table
      UICtrl.populateHighPeakList(HighPeaksCtrl.getHighPeaks());

      // Update UI complete totals
      UICtrl.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());

      // Show success alert
      UICtrl.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} has been succesfully reset`, 'alert-success');

      // Clear Current High Peak State
      HighPeaksCtrl.clearCurrentHighPeakState();
      
      // Close status form
      closeStatusForm();
    } else {
      // Show error alert
      UICtrl.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} is already incomplete`, 'alert-error');
    }
  }

  const closeStatusForm = function() {
    // Clear Current High Peak State
    HighPeaksCtrl.clearCurrentHighPeakState();

    // Hide status form
    UICtrl.hideStatusForm();
  }

  const sortByName = function() {
    HighPeaksCtrl.sortHighPeaks('byName');
    UICtrl.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const sortByElevation = function() {
    HighPeaksCtrl.sortHighPeaks('byElevation');
    UICtrl.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const sortByDateCompleted = function() {
    HighPeaksCtrl.sortHighPeaks('byCompleted');
    UICtrl.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  // Public Methods
  return {
    init: function() {
      UICtrl.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
      UICtrl.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());
      loadEventListeners();
    }
  }
})(HighPeaksCtrl, UICtrl);

// Init App
App.init();