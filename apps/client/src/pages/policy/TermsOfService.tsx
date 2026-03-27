import { Box } from '@mui/material'
import TermsOfServiceContent from '../../components/terms/TermsOfService'
import PageHeading from '../../components/UI/heading/PageHeading'
import { CAMPLAR_BRAND } from '../../utils/brand'

const TermsOfService = () => {
  return (
    <Box sx={{ py: 2 }}>
      <PageHeading
        title="Terms of Service"
        subtitle={`The operating terms, support details, and service conditions for ${CAMPLAR_BRAND.name}.`}
      />
      <TermsOfServiceContent />
    </Box>
  )
}

export default TermsOfService
