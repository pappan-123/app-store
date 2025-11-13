import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DescriptionIcon from '@mui/icons-material/Description'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { BASE_URL } from '../services/config'

export default function Upload() {
  const [formData, setFormData] = useState({
    version: '',
    changelog: '',
    file: null
  })
  const [loading, setLoading] = useState(false)
  const [previewFileName, setPreviewFileName] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase()
      if (ext !== 'apk' && ext !== 'aab') {
        toast.error('Only .apk or .aab files are allowed')
        return
      }
      setFormData({ ...formData, file })
      setPreviewFileName(file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.file || !formData.version) {
      toast.error('Please select a file and enter version number')
      return
    }

    try {
      setLoading(true)
      const form = new FormData()
      form.append('version', formData.version)
      form.append('changelog', formData.changelog)
      form.append('file', formData.file)

      const token = sessionStorage.getItem('authToken')
      const res = await axios.post(`${BASE_URL}apps/upload/version`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.status === 'success') {
        toast.success('Version uploaded successfully!')
        setFormData({ version: '', changelog: '', file: null })
        setPreviewFileName('')
      } else {
        toast.error('Failed to upload version')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: '#0e4b48', mb: 4 }}>
        Upload New App Version
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 800, mx: 'auto' }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Version"
                name="version"
                fullWidth
                value={formData.version}
                onChange={handleChange}
                placeholder="e.g. 2.4.0"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Changelog / Notes"
                name="changelog"
                fullWidth
                multiline
                rows={4}
                value={formData.changelog}
                onChange={handleChange}
                placeholder="Describe what's new in this version..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{
                  py: 1.5,
                  borderColor: '#0e4b48',
                  color: '#0e4b48',
                  '&:hover': { backgroundColor: '#0e4b4820' }
                }}
              >
                Upload .apk / .aab File
                <input
                  type="file"
                  accept=".apk,.aab"
                  hidden
                  onChange={handleFileUpload}
                />
              </Button>
              {previewFileName && (
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: 'text.secondary', display: 'flex', alignItems: 'center' }}
                >
                  <DescriptionIcon sx={{ mr: 1, color: '#0a9ea8' }} />
                  {previewFileName}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(90deg,#0e4b48,#0a9ea8)',
                  color: '#fff',
                  fontWeight: 600
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload Version'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}
