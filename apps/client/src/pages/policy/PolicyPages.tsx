import { Box, Container, Divider, Link, Typography } from '@mui/material'
import { FiCreditCard, FiFileText, FiShield } from 'react-icons/fi'
import TermsOfService from '../../components/terms/TermsOfService'
import PageHeading from '../../components/UI/heading/PageHeading'
import { CAMPLAR_BRAND } from '../../utils/brand'
import CompanyDetails from './CompanyDetails'

const PolicyPages = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box display="flex" justifyContent="center">
        <PageHeading
          title="Legal & Policy Information"
          subtitle={`All policies, terms, and privacy information for ${CAMPLAR_BRAND.name}`}
        />
      </Box>

      <Box sx={{ mt: 6 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <FiCreditCard size={28} />
          <Typography variant="h4">Refund & Cancellation Policy</Typography>
        </Box>
        <Typography paragraph>
          - You may cancel your account at any time by emailing us at{' '}
          <Link href={`mailto:${CAMPLAR_BRAND.email}`}>{CAMPLAR_BRAND.email}</Link>.
        </Typography>
        <Typography paragraph>
          - Once your account is cancelled, all of your data and content will be permanently deleted
          from our Service. Since deletion is final and irreversible, please ensure you truly wish
          to cancel your account before proceeding.
        </Typography>
        <Typography paragraph>
          - If you cancel the Service in the middle of a billing cycle, you will receive a final
          invoice via email. Once that invoice has been paid, no further charges will apply.
        </Typography>
        <Typography paragraph>
          - {CAMPLAR_BRAND.name} reserves the right to modify, suspend, or terminate the Service
          for any reason, without prior notice at any time.
        </Typography>
        <Typography paragraph>
          - Fraud Prevention: Without limiting any other remedies, {CAMPLAR_BRAND.name} may suspend
          or terminate your account if we suspect that you have engaged in fraudulent or unlawful
          activity in connection with the Platform.
        </Typography>
        <Typography paragraph>
          - Note: No refunds are provided, even if a subscription or plan is cancelled mid-cycle.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mt: 4 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <FiShield size={28} />
          <Typography variant="h4">Privacy Policy</Typography>
        </Box>
        <Typography paragraph>Last Updated: [Insert Date]</Typography>
        <Typography paragraph>
          {CAMPLAR_BRAND.name} ("we," "our," or "us") operates the services offered via our
          website and related platforms (collectively, the "Platform"). Please read this Privacy
          Policy carefully before accessing or using our Platform, as continued use indicates your
          acceptance of this Policy.
        </Typography>
        <Typography paragraph>
          1. Introduction
          <br />
          This Privacy Policy governs the collection, use, disclosure, and protection of your
          personal information when you use our services. By using the Platform, you consent to the
          terms outlined herein.
        </Typography>
        <Typography paragraph>
          2. Definitions
          <br />
          - "Personal Information": Any information that can identify you, directly or indirectly.
          <br />- "Sensitive Personal Data or Information": Includes passwords, payment details,
          health data, biometric information, and related records, excluding information already in
          the public domain.
        </Typography>
        <Typography paragraph>
          3. Information We Collect
          <br />
          - Contact details: name, email address, phone number, and postal address.
          <br />- Account credentials and profile information.
          <br />- Transactional or usage data including order history and platform activity.
          <br />- Location information via IP address.
          <br />- Sensitive documents you voluntarily provide, such as identity or tax records.
          <br />- Technical details such as browser type, device type, operating system, and usage
          metrics.
        </Typography>
        <Typography paragraph>
          4. Method of Collection
          <br />
          - Directly from you when you fill out forms or communicate with us.
          <br />- Automatically through cookies, log files, and related technologies while using the
          Platform.
        </Typography>
        <Typography paragraph>
          5. Purpose of Use
          <br />
          - Register and manage your account.
          <br />- Deliver services, process orders, and enable billing.
          <br />- Notify you about updates, changes, or new services.
          <br />- Customize and improve the Platform experience.
          <br />- Conduct research, analytics, and business operations.
          <br />- Safeguard against fraud and enforce terms.
          <br />- Comply with laws and regulatory obligations.
        </Typography>
        <Typography paragraph>
          6. Data Sharing & Disclosure
          <br />
          We may share your information with service providers, legal or governmental authorities,
          and parties involved in mergers or asset transfers where the acquiring entity is bound to
          this Policy.
        </Typography>
        <Typography paragraph>
          7. Security Measures
          <br />
          We implement industry-standard technical, physical, and administrative safeguards to
          protect your data. However, no method is infallible, and we cannot guarantee complete
          protection against unauthorized access.
        </Typography>
        <Typography paragraph>
          8. Retention Period
          <br />
          We retain your personal data only as long as necessary to fulfill the purposes described,
          comply with applicable laws, resolve disputes, and enforce our agreements.
        </Typography>
        <Typography paragraph>
          9. Your Privacy Rights
          <br />
          You may review, update, or correct your personal details, or withdraw your consent for
          data use, by contacting us at{' '}
          <Link href={`mailto:${CAMPLAR_BRAND.email}`}>{CAMPLAR_BRAND.email}</Link>.
        </Typography>
        <Typography paragraph>
          10. Third-Party Links
          <br />
          Our Platform may contain links to external sites. We are not responsible for their
          privacy practices, so please review their individual policies separately.
        </Typography>
        <Typography paragraph>
          11. Changes to this Policy
          <br />
          We may update this Privacy Policy occasionally. Significant changes will be notified
          through our Platform or via email. Continued use signifies your acceptance of the revised
          terms.
        </Typography>
        <Typography paragraph>
          12. Grievance Officer
          <br />
          If you have questions, complaints, or wish to exercise your privacy rights, reach out to
          us at <Link href={`mailto:${CAMPLAR_BRAND.email}`}>{CAMPLAR_BRAND.email}</Link>.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mt: 4 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <FiFileText size={28} />
          <Typography variant="h4">Terms of Service</Typography>
        </Box>
        <TermsOfService />
      </Box>

      <Divider sx={{ my: 4 }} />

      <CompanyDetails />
    </Container>
  )
}

export default PolicyPages
