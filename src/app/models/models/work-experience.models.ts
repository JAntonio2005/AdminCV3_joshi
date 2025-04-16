export class WorkExperience {
  id?: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  accomplishment: string;

  constructor() {
    this.position = '';
    this.company = '';
    this.location = '';
    this.startDate = '';
    this.endDate = '';
    this.accomplishment = '';
  }
}
