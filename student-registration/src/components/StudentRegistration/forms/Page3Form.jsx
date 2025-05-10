// forms/Page3Form.jsx

import React from 'react';
import {
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  Button,
  Checkbox,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CloudUpload } from '@mui/icons-material';

const Page3Form = ({ control, errors, setValue }) => {
  const handleFileUpload = (fieldName) => (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue(fieldName, file);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Documents Upload Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Documents Upload</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl error={!!errors.academicRecords} fullWidth>
              <FormLabel>Previous Academic Records</FormLabel>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload Academic Records
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload('academicRecords')}
                />
              </Button>
              <FormHelperText>{errors.academicRecords?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl error={!!errors.idProof} fullWidth>
              <FormLabel>ID Proof</FormLabel>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload ID Proof
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload('idProof')}
                />
              </Button>
              <FormHelperText>{errors.idProof?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl error={!!errors.medicalRecords} fullWidth>
              <FormLabel>Medical Records (Optional)</FormLabel>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload Medical Records
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload('medicalRecords')}
                />
              </Button>
              <FormHelperText>{errors.medicalRecords?.message}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Preferences Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Preferences</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="preferredStudyTime"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.preferredStudyTime} fullWidth>
                  <FormLabel>Preferred Study Time</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel value="morning" control={<Radio />} label="Morning" />
                    <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon" />
                    <FormControlLabel value="evening" control={<Radio />} label="Evening" />
                  </RadioGroup>
                  <FormHelperText>{errors.preferredStudyTime?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="accommodation"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.accommodation} fullWidth>
                  <FormLabel>Accommodation Required</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                  <FormHelperText>{errors.accommodation?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Additional Requirements Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Additional Requirements</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="specialNeeds"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Special Needs"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="dietaryRestrictions"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Dietary Restrictions"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="transportRequired"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Transport Required"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Terms & Conditions Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Terms & Conditions</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="agreementAccepted"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.agreementAccepted}>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="I agree to the terms and conditions"
                  />
                  <FormHelperText>{errors.agreementAccepted?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="newsletterSubscription"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Subscribe to newsletter"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page3Form;