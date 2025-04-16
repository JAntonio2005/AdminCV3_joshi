export class Header {
    id?: string;
    name: string;
    goalLife: string;
    photoUrl: string;
    email: string;
    phoneNumber: string;
    location: string;
    socialNetwork: string;
  
    constructor() {
      this.name = '';
      this.goalLife = '';
      this.photoUrl = '';
      this.email = '';
      this.phoneNumber = '';
      this.location = '';
      this.socialNetwork = '';
    }
  }