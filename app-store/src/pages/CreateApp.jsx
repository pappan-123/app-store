import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Grid,
  InputAdornment
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { BASE_URL } from '../services/config'

export default function CreateApp() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    version: '',
    description: '',
    logo: null
  })
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)

  const categories = ['Testing', 'Automation', 'Development', 'Utility', 'Analytics']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, logo: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.category || !formData.version || !formData.logo) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      setLoading(true)
      const form = new FormData()
      form.append('name', formData.name)
      form.append('category', formData.category)
      form.append('version', formData.version)
      form.append('description', formData.description)
      form.append('logo', formData.logo)

      const token = sessionStorage.getItem('authToken')
      const res = await axios.post(`${BASE_URL}apps/create`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.data.status === 'success') {
        toast.success('App created successfully!')
        setFormData({
          name: '',
          category: '',
          version: '',
          description: '',
          logo: null
        })
        setPreview(null)
      } else {
        toast.error('Failed to create app')
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
        Create a New App
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 900, mx: 'auto' }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="App Name"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                name="category"
                fullWidth
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Version"
                name="version"
                fullWidth
                value={formData.version}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      v
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
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
                Upload App Logo
                <input type="file" accept="image/*" hidden onChange={handleLogoUpload} />
              </Button>
            </Grid>

            {preview && (
              <Grid item xs={12} sm={6}>
                <Box
                  component="img"
                  src={preview}
                  alt="preview"
                  sx={{ width: 100, height: 100, borderRadius: 2, objectFit: 'cover' }}
                />
              </Grid>
            )}

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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create App'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}
