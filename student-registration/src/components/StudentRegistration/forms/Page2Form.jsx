// forms/Page2Form.jsx

import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import {
  coursesList,
  languagesList,
  relationshipsList,
  marksPercentageRanges,
  academicYears,
} from '../formConfig';

const Page2Form = ({ control, errors }) => {
  return (
    <Grid container spacing={3}>
      {/* Academic Information Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Academic Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="previousSchool"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Previous School/College"
                  error={!!errors.previousSchool}
                  helperText={errors.previousSchool?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="marksPercentage"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.marksPercentage}>
                  <FormLabel>Marks Percentage</FormLabel>
                  <Select {...field} displayEmpty>
                    <MenuItem value="" disabled>Select Percentage Range</MenuItem>
                    {marksPercentageRanges.map((range) => (
                      <MenuItem key={range} value={range}>{range}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.marksPercentage?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="academicYear"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.academicYear}>
                  <FormLabel>Academic Year</FormLabel>
                  <Select {...field} displayEmpty>
                    <MenuItem value="" disabled>Select Academic Year</MenuItem>
                    {academicYears.map((year) => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.academicYear?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="desiredCourse"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.desiredCourse}>
                  <FormLabel>Desired Course/Major</FormLabel>
                  <Select {...field} displayEmpty>
                    <MenuItem value="" disabled>Select Course</MenuItem>
                    {coursesList.map((course) => (
                      <MenuItem key={course} value={course}>{course}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.desiredCourse?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Additional Information Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Additional Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="extracurriculars"
              control={control}
              render={({ field }) => (
                <FormControl 
                  component="fieldset" 
                  error={!!errors.extracurriculars}
                  fullWidth
                >
                  <FormLabel component="legend">Extracurricular Activities</FormLabel>
                  <FormGroup row>
                    {['Sports', 'Music', 'Dance', 'Art', 'Debate', 'Others'].map((activity) => (
                      <FormControlLabel
                        key={activity}
                        control={
                          <Checkbox
                            checked={field.value.includes(activity.toLowerCase())}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...field.value, activity.toLowerCase()]
                                : field.value.filter(v => v !== activity.toLowerCase());
                              field.onChange(newValue);
                            }}
                          />
                        }
                        label={activity}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>{errors.extracurriculars?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.languages}>
                  <FormLabel>Languages Known</FormLabel>
                  <Select
                    {...field}
                    multiple
                    displayEmpty
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {languagesList.map((language) => (
                      <MenuItem key={language} value={language}>
                        <Checkbox checked={field.value.indexOf(language) > -1} />
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.languages?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="hobbies"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Hobbies"
                  multiline
                  rows={3}
                  error={!!errors.hobbies}
                  helperText={errors.hobbies?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Emergency Contact Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Emergency Contact</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="emergencyContactName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Contact Person Name"
                  error={!!errors.emergencyContactName}
                  helperText={errors.emergencyContactName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="emergencyRelation"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.emergencyRelation}>
                  <FormLabel>Relationship</FormLabel>
                  <Select {...field} displayEmpty>
                    <MenuItem value="" disabled>Select Relationship</MenuItem>
                    {relationshipsList.map((relation) => (
                      <MenuItem key={relation} value={relation}>{relation}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.emergencyRelation?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="emergencyPhone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Emergency Phone"
                  error={!!errors.emergencyPhone}
                  helperText={errors.emergencyPhone?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page2Form;