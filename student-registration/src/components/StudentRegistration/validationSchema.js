// validationSchema.js

import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validationSchema = [
  // Page 1 Validation Schema
  yup.object().shape({
    profilePhoto: yup
      .mixed()
      .required('Profile photo is required')
      .test('fileFormat', 'Unsupported file format', (value) => 
        value && SUPPORTED_FORMATS.includes(value.type))
      .test('fileSize', 'File size is too large', (value) => 
        value && value.size <= FILE_SIZE),
    firstName: yup.string().required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .matches(/^[a-zA-Z\s]*$/, 'First name can only contain letters'),
    middleName: yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Middle name can only contain letters'),
    lastName: yup.string().required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .matches(/^[a-zA-Z\s]*$/, 'Last name can only contain letters'),
    email: yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    phone: yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    altPhone: yup.string()
      .matches(/^[0-9]{10}$/, 'Alternative phone number must be 10 digits')
      .nullable(),
    streetAddress: yup.string()
      .required('Street address is required')
      .min(5, 'Street address must be at least 5 characters'),
    city: yup.string()
      .required('City is required')
      .matches(/^[a-zA-Z\s]*$/, 'City can only contain letters'),
    state: yup.string()
      .required('State is required'),
    country: yup.string()
      .required('Country is required'),
    postalCode: yup.string()
      .required('Postal code is required')
      .matches(/^[0-9]{6}$/, 'Postal code must be 6 digits'),
    dateOfBirth: yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future')
      .min(new Date(1950, 0, 1), 'Invalid date of birth'),
    gender: yup.string()
      .required('Gender is required')
      .oneOf(['male', 'female', 'other'], 'Invalid gender selection'),
  }),

  // Page 2 Validation Schema
  yup.object().shape({
    previousSchool: yup.string()
      .required('Previous school name is required')
      .min(3, 'School name must be at least 3 characters'),
    marksPercentage: yup.string()
      .required('Marks percentage is required'),
    desiredCourse: yup.string()
      .required('Desired course is required'),
    academicYear: yup.string()
      .required('Academic year is required'),
    extracurriculars: yup.array()
      .min(1, 'Select at least one extracurricular activity'),
    languages: yup.array()
      .min(1, 'Select at least one language'),
    hobbies: yup.string()
      .required('Hobbies are required')
      .min(3, 'Please describe your hobbies'),
    emergencyContactName: yup.string()
      .required('Emergency contact name is required')
      .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters'),
    emergencyRelation: yup.string()
      .required('Relationship is required'),
    emergencyPhone: yup.string()
      .required('Emergency phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  }),

  // Page 3 Validation Schema
  yup.object().shape({
    academicRecords: yup.mixed()
      .required('Academic records are required')
      .test('fileSize', 'File size is too large', (value) => 
        !value || value.size <= FILE_SIZE),
    idProof: yup.mixed()
      .required('ID proof is required')
      .test('fileSize', 'File size is too large', (value) => 
        !value || value.size <= FILE_SIZE),
    medicalRecords: yup.mixed()
      .test('fileSize', 'File size is too large', (value) => 
        !value || value.size <= FILE_SIZE),
    preferredStudyTime: yup.string()
      .required('Preferred study time is required')
      .oneOf(['morning', 'afternoon', 'evening'], 'Invalid study time selection'),
    accommodation: yup.string()
      .required('Accommodation preference is required')
      .oneOf(['yes', 'no'], 'Invalid accommodation selection'),
    specialNeeds: yup.boolean(),
    dietaryRestrictions: yup.boolean(),
    transportRequired: yup.boolean(),
    agreementAccepted: yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
    newsletterSubscription: yup.boolean(),
  }),
];