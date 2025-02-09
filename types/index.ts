
export interface WorkExperience {
  id: string;  // Added for unique identification
  name: string;
  city: string;
  country: string;
  description: string;  //rich text content
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorkHere?: boolean;
}
