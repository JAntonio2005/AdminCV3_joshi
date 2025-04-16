export class Education {
  id?: string;
  educativeInstitute: string;
  date: string;
  grade: string;

  constructor() {
    this.educativeInstitute = '';
    this.date = '';
    this.grade = '';
  }
}
