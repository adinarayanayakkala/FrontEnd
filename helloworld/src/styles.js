// styles.js
import { styled } from '@mui/material/styles';

export const FormSection = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SectionTitle = styled('h4')(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

export const FileUploadContainer = styled('div')(({ theme }) => ({
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));