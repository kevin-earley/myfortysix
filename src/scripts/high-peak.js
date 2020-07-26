export class HighPeak {
  constructor(name, elevation) {
    this.name = name;
    this.elevation = elevation;
    this.status = {
      isCompleted: false,
      dateCompleted: null
    }
  }

  markComplete(date) {
    this.status.isCompleted = true;
    this.status.dateCompleted = date;
  }
  
  markIncomplete() {
    this.status.isCompleted = false;
    this.status.dateCompleted = null;
  }
}