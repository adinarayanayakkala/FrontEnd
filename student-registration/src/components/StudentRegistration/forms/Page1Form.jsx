// forms/Page1Form.jsx

import React, { useEffect, useState } from 'react';
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
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { getCountries, getStates, getCities } from '../api';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: 'auto',
  marginBottom: theme.spacing(2),
}));

const Page1Form = ({ control, errors, setValue, watch }) => {
  // Dynamic address data states
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  // Watch for country changes
  const country = watch('country');
  useEffect(() => {
    if (!country) {
      setStates([]);
      setCities([]);
      return;
    }
    setLoadingState(true);
    getStates(country).then((data) => {
      setStates(data);
      setLoadingState(false);
      setValue('state', '');
      setValue('city', '');
      setValue('postalCode', '');
    });
  }, [country, setValue]);

  // Watch for state changes
  const state = watch('state');
  useEffect(() => {
    if (!state) {
      setCities([]);
      return;
    }
    setLoadingCity(true);
    getCities(state).then((data) => {
      setCities(data);
      setLoadingCity(false);
      setValue('city', '');
      setValue('postalCode', '');
    });
  }, [state, setValue]);

  // Watch for city changes to update postal code
  const city = watch('city');
  useEffect(() => {
    if (!city) return;
    const selected = cities.find((c) => c.name === city);
    if (selected) setValue('postalCode', selected.postalCode);
  }, [city, cities, setValue]);

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
          <StyledAvatar 
            src={watch('profilePhoto') && URL.createObjectURL(watch('profilePhoto'))} 
          />
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

      {/* Personal Details Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Personal Details</Typography>
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

      {/* Contact Details Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Contact Details</Typography>
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
                  error={!!errors.altPhone}
                  helperText={errors.altPhone?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Address Information Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Address Information</Typography>
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
            <FormControl fullWidth error={!!errors.country}>
              <InputLabel id="country-label">Country</InputLabel>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="country-label"
                    label="Country"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.country?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            {loadingState ? (
              <CircularProgress size={24} />
            ) : (
              <FormControl fullWidth error={!!errors.state}>
                <InputLabel id="state-label">State/Province</InputLabel>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="state-label"
                      label="State/Province"
                      disabled={!states.length}
                    >
                      {states.map((state) => (
                        <MenuItem key={state.code} value={state.code}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.state?.message}</FormHelperText>
              </FormControl>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {loadingCity ? (
              <CircularProgress size={24} />
            ) : (
              <FormControl fullWidth error={!!errors.city}>
                <InputLabel id="city-label">City</InputLabel>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="city-label"
                      label="City"
                      disabled={!cities.length}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.name} value={city.name}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.city?.message}</FormHelperText>
              </FormControl>
            )}
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
                  InputProps={{ readOnly: true }}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Basic Details Section */}
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
            <FormControl error={!!errors.gender}>
              <FormLabel>Gender</FormLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                )}
              />
              {errors.gender && (
                <FormHelperText error>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page1Form;