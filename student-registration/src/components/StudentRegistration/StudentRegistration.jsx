// StudentRegistration.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import our custom components (will be created next)
import { validationSchema } from './validationSchema';
import Page1Form from './forms/Page1Form';
import Page2Form from './forms/Page2Form';
import Page3Form from './forms/Page3Form';
import { defaultValues } from './formConfig';

const steps = ['Personal Information', 'Academic Details', 'Documents & Preferences'];

const StudentRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(defaultValues);

  const { control, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema[activeStep]),
    defaultValues: formData,
    mode: 'onTouched'
  });

  const handleNext = async () => {
    const fields = Object.keys(validationSchema[activeStep].fields);
    const isValid = await trigger(fields);
    
    if (isValid) {
      const currentData = watch();
      setFormData({ ...formData, ...currentData });
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      toast.error('Please fill all required fields correctly');
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    toast.success('Registration submitted successfully!');
    // Here you would typically send the data to your backend
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Page1Form control={control} errors={errors} setValue={setValue} watch={watch} />;
      case 1:
        return <Page2Form control={control} errors={errors} watch={watch} />;
      case 2:
        return <Page3Form control={control} errors={errors} setValue={setValue} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer position="top-right" />
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
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
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ px: 4 }}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 4 }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ px: 4 }}
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default StudentRegistration;