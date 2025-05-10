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
  InputLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import {
  coursesList,
  languagesList,
  relationshipsList,
  marksPercentageRanges,
  academicYears,
} from '../formConfig';

const Page2Form = ({ control, errors, watch }) => {
  const selectedRelation = watch('emergencyRelation');

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
            <FormControl fullWidth error={!!errors.marksPercentage}>
              <InputLabel id="marks-percentage-label">Marks Percentage</InputLabel>
              <Controller
                name="marksPercentage"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="marks-percentage-label"
                    label="Marks Percentage"
                  >
                    {marksPercentageRanges.map((range) => (
                      <MenuItem key={range} value={range}>{range}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.marksPercentage?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.academicYear}>
              <InputLabel id="academic-year-label">Academic Year</InputLabel>
              <Controller
                name="academicYear"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="academic-year-label"
                    label="Academic Year"
                  >
                    {academicYears.map((year) => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.academicYear?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.desiredCourse}>
              <InputLabel id="desired-course-label">Desired Course/Major</InputLabel>
              <Controller
                name="desiredCourse"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="desired-course-label"
                    label="Desired Course/Major"
                  >
                    {coursesList.map((course) => (
                      <MenuItem key={course} value={course}>{course}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.desiredCourse?.message}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* Additional Information Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Additional Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl 
              component="fieldset" 
              error={!!errors.extracurriculars}
              fullWidth
            >
              <FormLabel component="legend">Extracurricular Activities</FormLabel>
              <FormGroup row>
                <Controller
                  name="extracurriculars"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
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
                    </>
                  )}
                />
              </FormGroup>
              <FormHelperText>{errors.extracurriculars?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.languages}>
              <InputLabel id="languages-label">Languages Known</InputLabel>
              <Controller
                name="languages"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="languages-label"
                    multiple
                    label="Languages Known"
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {languagesList.map((language) => (
                      <MenuItem key={language} value={language}>
                        <Checkbox checked={field.value.indexOf(language) > -1} />
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.languages?.message}</FormHelperText>
            </FormControl>
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
            <FormControl fullWidth error={!!errors.emergencyRelation}>
              <InputLabel id="emergency-relation-label">Relationship</InputLabel>
              <Controller
                name="emergencyRelation"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="emergency-relation-label"
                    label="Relationship"
                  >
                    {relationshipsList.map((relation) => (
                      <MenuItem key={relation} value={relation}>{relation}</MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors.emergencyRelation?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {selectedRelation === 'Other' && (
            <Grid item xs={12}>
              <Controller
                name="otherRelation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Specify Relationship"
                    error={!!errors.otherRelation}
                    helperText={errors.otherRelation?.message}
                  />
                )}
              />
            </Grid>
          )}

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