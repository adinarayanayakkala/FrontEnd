// forms/Page1Form.jsx

import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  Avatar,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { statesList, countriesList } from '../formConfig';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: 'auto',
  marginBottom: theme.spacing(2),
}));

const Page1Form = ({ control, errors, setValue, watch }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue('profilePhoto', file);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Profile Photo Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Profile Photo</Typography>
        <Grid container justifyContent="center">
          <StyledAvatar src={watch('profilePhoto') && URL.createObjectURL(watch('profilePhoto'))} />
        </Grid>
        <Grid container justifyContent="center">
          <Button
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
          </Button>
        </Grid>
        {errors.profilePhoto && (
          <FormHelperText error>{errors.profilePhoto.message}</FormHelperText>
        )}
      </Grid>

      {/* Contact Details - Name Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Contact Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <Controller
              name="middleName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Middle Name (optional)"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
        </Grid>
      </Grid>

      {/* Contact Details - Contact Information */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>Contact Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone Number"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="altPhone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Alternative Phone (optional)"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Address Information */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>Address Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="streetAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Street Address"
                  multiline
                  rows={2}
                  error={!!errors.streetAddress}
                  helperText={errors.streetAddress?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="State/Province"
                  error={!!errors.state}
                  helperText={errors.state?.message}
                >
                  {statesList.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Country"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {countriesList.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Postal Code"
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Basic Details */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Basic Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  {errors.gender && (
                    <FormHelperText error>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page1Form;