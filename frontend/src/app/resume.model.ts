

export interface Address {
    houseNo: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }
  

export interface Experience {
    companyName: string;
    position: string;
  
    dateOfJoining: string; 
    dateOfResign: string;
   
  }
  export interface Resume {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    languages: string[]; 
    address: Address;
    experiences: Experience[];
  }  