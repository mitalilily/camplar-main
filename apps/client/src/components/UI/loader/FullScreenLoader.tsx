import { Box } from '@mui/material'
import React from 'react'
import './loader.css'
import { CAMPLAR_BRAND } from '../../../utils/brand'

type Props = {
  night?: boolean
}

const FullScreenLoader: React.FC<Props> = ({ night = false }) => {
  return (
    <Box className={`loader-overlay ${night ? 'night' : ''}`}>
      <Box className="loader-content">
        <div className="logo-container">
          <img src={CAMPLAR_BRAND.logoWordmark} alt={`${CAMPLAR_BRAND.name} logo`} className="loader-logo" />
        </div>
        <div style={{ color: '#000B37', fontWeight: 900, letterSpacing: 1.6, fontSize: '0.76rem' }}>
          {CAMPLAR_BRAND.uppercaseName}
        </div>
      </Box>
    </Box>
  )
}

export default FullScreenLoader
