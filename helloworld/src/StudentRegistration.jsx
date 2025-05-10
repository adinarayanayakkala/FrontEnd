// StudentRegistration.jsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  InputAdornment,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload, Person } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '15px',
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: 'auto',
  marginBottom: theme.spacing(2),
}));

const UploadButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

// Validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  dateOfBirth: yup.date()
    .max(new Date(), "Date of birth can't be in the future")
    .required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string()
    .matches(/^[0-9]{6}$/, 'Postal code must be 6 digits')
    .required('Postal code is required'),
  previousSchool: yup.string().required('Previous school is required'),
  gradeLevel: yup.string().required('Grade level is required'),
  course: yup.string().required('Course is required'),
  emergencyContactName: yup.string().required('Emergency contact name is required'),
  emergencyPhone: yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Emergency phone is required'),
  agreementAccepted: yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

const StudentRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [profileImage, setProfileImage] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      agreementAccepted: false,
      extracurriculars: [],
    }
  });

  const steps = ['Personal Information', 'Academic Details', 'Additional Information'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Registration submitted successfully!');
  };

  return (
    <Container maxWidth="md">
      <ToastContainer position="top-right" />
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Student Registration
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <StyledAvatar src={profileImage}>
                  <Person />
                </StyledAvatar>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <UploadButton
                  variant="contained"
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </UploadButton>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>

              {/* Add more personal information fields */}
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={3}>
              {/* Academic information fields */}
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={3}>
              {/* Additional information fields */}
            </Grid>
          )}

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                color="secondary"
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  color="primary"
                >
                  Next
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </Container>
  );
};

export default StudentRegistration;