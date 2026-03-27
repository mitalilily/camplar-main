import { Container, Link, Typography } from '@mui/material'
import { CAMPLAR_BRAND } from '../../utils/brand'

const TermsOfService = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" mt={3}>
        Account Terms
      </Typography>
      <ul>
        <li>You must be 18 years or older to use this Service.</li>
        <li>
          You must provide your full legal name, current address, a valid email address, and any
          other information needed in order to complete the signup process.
        </li>
        <li>
          You are responsible for keeping your password secure. {CAMPLAR_BRAND.name} cannot and
          will not be liable for any loss or damage from your failure to maintain the security of
          your account and password.
        </li>
        <li>
          You may not use the {CAMPLAR_BRAND.name} service for any illegal or unauthorized purpose,
          nor may you violate any laws in your jurisdiction, including copyright laws and the laws
          of India.
        </li>
        <li>
          You are responsible for all activity and content uploaded under your {CAMPLAR_BRAND.name}
          account.
        </li>
        <li>You must not transmit any worms, viruses, or other destructive code.</li>
        <li>A breach or violation of any account terms may result in immediate termination.</li>
      </ul>

      <Typography variant="h5" mt={3}>
        General Conditions
      </Typography>
      <ul>
        <li>
          You must read, agree with, and accept all terms contained in this User Agreement and the
          Privacy Policy before becoming a member of {CAMPLAR_BRAND.name}.
        </li>
        <li>We reserve the right to modify or terminate the Service for any reason at any time.</li>
        <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
        <li>
          Your use of the Service is at your sole risk. The Service is provided on an "as is" and
          "as available" basis without any warranty or condition.
        </li>
        <li>
          {CAMPLAR_BRAND.name} does not warrant that the service will be uninterrupted, timely,
          secure, or error-free.
        </li>
        <li>
          {CAMPLAR_BRAND.name} does not warrant that the results obtained from use of the service
          will be accurate or reliable.
        </li>
        <li>
          Content may be transferred unencrypted and involve transmissions across networks and
          devices.
        </li>
        <li>
          We may remove content we determine to be unlawful, offensive, threatening, defamatory, or
          otherwise in violation of these Terms of Service.
        </li>
        <li>
          {CAMPLAR_BRAND.name} shall not be liable for any direct, indirect, incidental, special,
          or consequential damages.
        </li>
        <li>
          Technical support is only provided to paying account holders via{' '}
          <Link href={`mailto:${CAMPLAR_BRAND.email}`}>{CAMPLAR_BRAND.email}</Link> and agreed
          support numbers {CAMPLAR_BRAND.phonePrimary} / {CAMPLAR_BRAND.phoneSecondary}.
        </li>
        <li>
          You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the
          Service without permission.
        </li>
        <li>Verbal or written abuse of any kind may result in immediate account termination.</li>
        <li>We do not claim intellectual property rights over material uploaded to the Service.</li>
        <li>
          By uploading content, you agree to allow {CAMPLAR_BRAND.name} to store and review it in
          order to operate the service.
        </li>
        <li>The Terms of Service constitute the entire agreement between you and {CAMPLAR_BRAND.name}.</li>
        <li>
          Questions about the Terms of Service should be sent to{' '}
          <Link href={`mailto:${CAMPLAR_BRAND.email}`}>{CAMPLAR_BRAND.email}</Link>.
        </li>
      </ul>

      <Typography variant="h5" mt={3}>
        Payment of Fees
      </Typography>
      <ul>
        <li>
          Different payment term options may apply, including monthly, quarterly, half-yearly, or
          yearly terms, depending on your agreement with {CAMPLAR_BRAND.name}.
        </li>
        <li>
          Payment should be made within 7 days from the invoice date unless a separate written
          arrangement applies.
        </li>
        <li>All fees are exclusive of applicable taxes, duties, and statutory charges.</li>
        <li>{CAMPLAR_BRAND.name} does not provide refunds.</li>
      </ul>

      <Typography variant="h5" mt={3}>
        Cancellation and Termination
      </Typography>
      <ul>
        <li>
          Once your account is cancelled, your content may be deleted from the Service. Because
          deletion can be final, please ensure you truly want to cancel before proceeding.
        </li>
        <li>We reserve the right to modify or terminate the Service at any time without notice.</li>
        <li>Fraudulent activity may result in suspension or termination of your account.</li>
      </ul>

      <Typography variant="h5" mt={3}>
        Modifications to the Service and Prices
      </Typography>
      <ul>
        <li>Prices may change with 14 days notice via posting on the site or announcement.</li>
        <li>{CAMPLAR_BRAND.name} reserves the right to modify or discontinue the Service at any time.</li>
        <li>
          {CAMPLAR_BRAND.name} shall not be liable for any modification, price change, suspension,
          or discontinuance.
        </li>
      </ul>

      <Typography variant="h5" mt={3}>
        Banned Restricted Products and Services
      </Typography>
      <ul>
        <li>
          You shall not offer, attempt to offer, trade, or attempt to trade any prohibited or
          restricted items.
        </li>
        <li>
          {CAMPLAR_BRAND.name} does not permit hosting or shipping of securities, wildlife
          products, weapons, intoxicants, restricted medicines, prohibited religious artifacts,
          antiquities, art treasures, or used SIM cards.
        </li>
        <li>
          Merchants must display and adhere to a user agreement and privacy policy governing their
          store.
        </li>
      </ul>
    </Container>
  )
}

export default TermsOfService
