// formConfig.js

export const defaultValues = {
  // Page 1 - Personal Information
  profilePhoto: null,
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  altPhone: '',
  streetAddress: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  dateOfBirth: '',
  gender: '',

  // Page 2 - Academic Information
  previousSchool: '',
  marksPercentage: '',
  desiredCourse: '',
  academicYear: '',
  extracurriculars: [],
  languages: [],
  hobbies: '',
  emergencyContactName: '',
  emergencyRelation: '',
  emergencyPhone: '',

  // Page 3 - Documents & Preferences
  academicRecords: null,
  idProof: null,
  medicalRecords: null,
  preferredStudyTime: '',
  accommodation: '',
  specialNeeds: false,
  dietaryRestrictions: false,
  transportRequired: false,
  agreementAccepted: false,
  newsletterSubscription: false
};

export const statesList = [
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Delhi',
  // Add more states
];

export const countriesList = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  // Add more countries
];

export const coursesList = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Business Administration',
  // Add more courses
];

export const languagesList = [
  'English',
  'Hindi',
  'Marathi',
  'Telugu',
  'Tamil',
  // Add more languages
];

export const relationshipsList = [
  'Parent',
  'Guardian',
  'Sibling',
  'Relative',
  'Other'
];

export const marksPercentageRanges = [
  '90% - 100%',
  '80% - 89%',
  '70% - 79%',
  '60% - 69%',
  '50% - 59%'
];

export const academicYears = [
  '2024-2025',
  '2025-2026',
  '2026-2027'
];