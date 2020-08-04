import "../styles/main.scss";

import { HighPeaksCtrl } from "./high-peaks-ctrl";
import { UI } from "./ui";

const App = (function(HighPeaksCtrl, UI) {
  const selectors = UI.getSelectors();

  const loadEventListeners = function() {
    document.querySelector(selectors.highPeaksTableBody).addEventListener('click', clickStatusIcon);
    document.querySelector(selectors.statusFormSubmitBtn).addEventListener('click', submitStatusForm);
    document.querySelector(selectors.statusFormResetBtn).addEventListener('click', resetStatus);
    document.querySelector(selectors.statusFormCancelBtn).addEventListener('click', closeStatusForm);
    document.querySelector(selectors.sortByName).addEventListener('click', sortByName);
    document.querySelector(selectors.sortByElevation).addEventListener('click', sortByElevation);
    document.querySelector(selectors.sortByDateCompleted).addEventListener('click', sortByDateCompleted);
  }

  const clickStatusIcon = function(e) {
    if (e.target.classList.contains('status-icon') && document.querySelector(selectors.statusFormModal).style.display === 'none') {
      // create variable to store newCurrentHighPeak obj
      let newCurrentHighPeak;

      HighPeaksCtrl.getHighPeaks().forEach(function(highPeak) {
        if (highPeak.name === e.target.parentElement.parentElement.children[1].textContent) {
          return newCurrentHighPeak = highPeak;
        }
      })

      // set currentHighPeak state to newCurrentHighPeak obj
      HighPeaksCtrl.updateCurrentHighPeakState(newCurrentHighPeak);

      UI.showStatusForm(newCurrentHighPeak);
    }
  }

  const submitStatusForm = function(e) {
    let statusFormDateValue = document.querySelector(selectors.statusFormDateInput).value;

    // create variable to store currentIsCompletedDate if currentHighPeak isCompleted
    let currentIsCompletedDate;

    if (HighPeaksCtrl.getCurrentHighPeak().status.isCompleted) {
      currentIsCompletedDate = HighPeaksCtrl.getCurrentHighPeak().status.dateCompleted.toISOString().slice(0,10);
    }

    // if updating currentHighPeak dateCompleted from 'incomplete' / null
    if (statusFormDateValue !== '' && statusFormDateValue !== currentIsCompletedDate) {
      // update currentHighPeak value in data structure
      HighPeaksCtrl.updateCurrentHighPeakStatus(statusFormDateValue);

      // update totalCompleted value in data structure
      HighPeaksCtrl.updateTotalCompleted();

      // update highPeaksTable in ui
      UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());

      // update totalCompleted in ui
      UI.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());

      // if there was a currentIsCompletedDate value prior to submit, display 'updated' alert message
      if (currentIsCompletedDate) {
        UI.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} succesfully updated!`, 'success');
        // if there was not a currentIsCompletedDate value prior to submit, displaying 'initial summit' alert message
      } else {
        UI.showAlert(`Congratulations! You summited ${HighPeaksCtrl.getCurrentHighPeak().name}!`, 'success');
      }

      // clear currentHighPeak value in data structure
      HighPeaksCtrl.clearCurrentHighPeakState();

    // show alert if statusFormDateValue has no value
    } else if (statusFormDateValue === '') {
      UI.showAlert('Please enter a valid date in order to complete.', 'error');
      
    // show alert if statusFormDateValue is equal to currentIsCompletedDate, therefore nothing to update
    } else if (statusFormDateValue === currentIsCompletedDate) {
      UI.showAlert('Please enter a new date in order to update.', 'error');
    }

    e.preventDefault();
  }

  const resetStatus = function(e) {
    let statusFormDateValue = document.querySelector(selectors.statusFormDateInput).value;

    if (statusFormDateValue !== '') {
      // clear currentHighPeak value in data structure
      HighPeaksCtrl.clearCurrentHighPeakStatus();

      // update totalCompleted value in data structure
      HighPeaksCtrl.updateTotalCompleted();

      // update highPeaksTable in ui
      UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());

      // update totalCompleted in ui
      UI.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());

      // show 'succesfully reset' alert message
      UI.showAlert(`${HighPeaksCtrl.getCurrentHighPeak().name} has been succesfully reset.`, 'success');

      // clear currentHighPeak value in data structure
      HighPeaksCtrl.clearCurrentHighPeakState();
    }

    e.preventDefault();
  }

  const closeStatusForm = function() {
    // clear currentHighPeak value in data structure
    HighPeaksCtrl.clearCurrentHighPeakState();

    UI.hideStatusForm();
  }

  const sortByName = function() {
    HighPeaksCtrl.sortHighPeaks('byName');

    // update highPeaksTable in ui after sort
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const sortByElevation = function() {
    HighPeaksCtrl.sortHighPeaks('byElevation');

    // update highPeaksTable in ui after sort
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const sortByDateCompleted = function() {
    HighPeaksCtrl.sortHighPeaks('byCompleted');

    // update highPeaksTable in ui after sort
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  // public methods
  return {
    init: function() {
      UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
      UI.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());
      loadEventListeners();
    }
  }
})(HighPeaksCtrl, UI);

// init App
App.init();