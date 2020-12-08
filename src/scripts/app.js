import "../styles/main.scss";

import { HighPeaksCtrl } from "./high-peaks-ctrl";
import { UI } from "./ui";

const App = (function(HighPeaksCtrl, UI) {
  const selectors = UI.getSelectors();

  const loadEventListeners = function() {
    document.querySelector(selectors.highPeaksTableBody).addEventListener('click', handleIconClick);
    document.querySelector(selectors.highPeaksTableBody).addEventListener('click', handleNameClick);
    document.querySelector(selectors.statusFormSubmitBtn).addEventListener('click', handleStatusFormSubmit);
    document.querySelector(selectors.statusFormResetBtn).addEventListener('click', handleStatusReset);
    document.querySelector(selectors.statusFormCancelBtn).addEventListener('click', handleStatusFormClose);
    document.querySelector(selectors.sortByName).addEventListener('click', handleSortByName);
    document.querySelector(selectors.sortByElevation).addEventListener('click', handleSortByElevation);
    document.querySelector(selectors.sortByDateCompleted).addEventListener('click', handleSortByDateCompleted);
  }

  const handleIconClick = function(e) {
    if (e.target.classList.contains('status-icon') && UI.isStatusFormHidden() === true) {
      let newCurrentHighPeak;

      HighPeaksCtrl.getHighPeaks().forEach(function(highPeak) {
        if (highPeak.name === e.target.parentElement.parentElement.children[1].textContent) {
          return newCurrentHighPeak = highPeak;
        }
      })

      HighPeaksCtrl.updateCurrentHighPeakState(newCurrentHighPeak);

      UI.showStatusForm(newCurrentHighPeak);
    }
  }

  const handleNameClick = function(e) {
    if (e.target.classList.contains('name') && UI.isStatusFormHidden() === true) {
      let newCurrentHighPeak;

      HighPeaksCtrl.getHighPeaks().forEach(function(highPeak) {
        if (highPeak.name === e.target.textContent) {
          return newCurrentHighPeak = highPeak;
        }
      })

      HighPeaksCtrl.updateCurrentHighPeakState(newCurrentHighPeak);

      UI.showStatusForm(newCurrentHighPeak);
    }
  }

  const handleStatusFormSubmit = function(e) {
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

  const handleStatusReset = function(e) {
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

  const handleStatusFormClose = function() {
    HighPeaksCtrl.clearCurrentHighPeakState();
    UI.hideStatusForm();
  }

  const handleSortByName = function() {
    HighPeaksCtrl.sortHighPeaks('byName');
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const handleSortByElevation = function() {
    HighPeaksCtrl.sortHighPeaks('byElevation');
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  const handleSortByDateCompleted = function() {
    HighPeaksCtrl.sortHighPeaks('byCompleted');
    UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
  }

  return {
    init: function() {
      UI.populateHighPeakList(HighPeaksCtrl.getHighPeaks());
      UI.updateCompleteTotals(HighPeaksCtrl.getTotalCompleted());
      loadEventListeners();
    }
  }
})(HighPeaksCtrl, UI);

App.init();