import type { AdditionalKYCForm } from '../components/user/profile/Kyc/AdditionalInfoStep'
import type { BusinessStructure, CompanyType } from '../types/generic.types'
import { CAMPLAR_BRAND } from './brand'

export const TERMS_AND_CONDITIONS = `
Account Terms
- You must be 18 years or older to use this service.
- You must provide your full legal name, current address, a valid email address, and any other information needed to complete the signup process.
- You are responsible for keeping your password secure. ${CAMPLAR_BRAND.name} cannot and will not be liable for any loss or damage caused by your failure to maintain the security of your account and password.
- You may not use the ${CAMPLAR_BRAND.name} service for any illegal or unauthorized purpose, and you may not violate the laws of your jurisdiction, including the laws of India.
- You are responsible for all activity and content that is uploaded under your ${CAMPLAR_BRAND.name} account.
- You must not transmit any worms, viruses, or destructive code.
- A breach or violation of these account terms may result in immediate termination of your services.

General Conditions
- You must read, agree with, and accept all terms in this User Agreement and the Privacy Policy before becoming a member of ${CAMPLAR_BRAND.name}.
- We reserve the right to modify or terminate the service for any reason, without notice, at any time.
- We reserve the right to refuse service to anyone for any reason at any time.
- Your use of the service is at your sole risk. The service is provided on an "as is" and "as available" basis without any warranty or condition.
- ${CAMPLAR_BRAND.name} does not warrant that the service will be uninterrupted, timely, secure, or error-free.
- ${CAMPLAR_BRAND.name} does not warrant that the results obtained from using the service will be accurate or reliable.
- Your content, excluding credit card information, may be transferred unencrypted across networks and devices to support the service.
- We may remove content that we determine is unlawful, offensive, threatening, defamatory, obscene, or otherwise objectionable.
- ${CAMPLAR_BRAND.name} shall not be liable for direct, indirect, incidental, special, consequential, or exemplary damages arising from the use of or inability to use the service.
- Technical support is provided through ${CAMPLAR_BRAND.email} and, where agreed, via phone at ${CAMPLAR_BRAND.phonePrimary} or ${CAMPLAR_BRAND.phoneSecondary}.
- You agree not to reproduce, duplicate, copy, sell, resell, or exploit any part of the service without express written permission from ${CAMPLAR_BRAND.name}.
- Verbal or written abuse of any kind toward ${CAMPLAR_BRAND.name} customers, team members, or partners may result in immediate account termination.
- We do not claim intellectual property rights over the material you provide to the service.
- By uploading images or order content to ${CAMPLAR_BRAND.name}, you allow us to display, store, and review that content to operate the service.
- Failure by ${CAMPLAR_BRAND.name} to exercise or enforce any right or provision of the Terms of Service does not constitute a waiver of that right or provision.
- Questions about the Terms of Service should be sent to: ${CAMPLAR_BRAND.email}

Payment of Fees
- Different payment terms may be available, including monthly, quarterly, half-yearly, or yearly schedules, depending on your agreement with ${CAMPLAR_BRAND.name}.
- Merchants are expected to pay within 7 days from the invoice date unless a separate written arrangement applies.
- All fees are exclusive of applicable taxes, duties, and statutory charges.
- ${CAMPLAR_BRAND.name} does not provide refunds.

Cancellation and Termination
- Once your account is cancelled, your content may be deleted from the service. Because deletion can be final, please ensure you truly want to cancel before proceeding.
- We reserve the right to modify or terminate the ${CAMPLAR_BRAND.name} service for any reason, without notice, at any time.
- Without limiting any other remedies, ${CAMPLAR_BRAND.name} may suspend or terminate your account if fraudulent activity is suspected in connection with the platform.

Modifications to the Service and Prices
- Prices for using ${CAMPLAR_BRAND.name} may change with 14 days notice posted on the platform or shared through an official announcement.
- ${CAMPLAR_BRAND.name} reserves the right to modify or discontinue the service, in whole or in part, with or without notice.
- ${CAMPLAR_BRAND.name} shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the service.

Banned Restricted Products and Services
- You shall not directly or indirectly offer, trade, or attempt to trade any item prohibited or restricted by applicable laws, rules, or guidelines.
- ${CAMPLAR_BRAND.name} does not permit hosting or shipping of securities, wildlife products, weapons, intoxicants, restricted medicines, prohibited religious artifacts, antiquities, art treasures, or used SIM cards.
- You agree to maintain terms of use and privacy disclosures that govern how you operate your business and interact with your own customers.

Company Details
${CAMPLAR_BRAND.name}
Email: ${CAMPLAR_BRAND.email}
Contact: ${CAMPLAR_BRAND.phonePrimary} / ${CAMPLAR_BRAND.phoneSecondary}
Address: ${CAMPLAR_BRAND.address}

Refund & Cancellation Policy
- You may cancel your account at any time by emailing ${CAMPLAR_BRAND.email}.
- Once your account is cancelled, your data and content may be permanently deleted from the service.
- If you cancel the service in the middle of a billing cycle, you may still receive a final invoice for outstanding charges.
- ${CAMPLAR_BRAND.name} reserves the right to modify, suspend, or terminate the service for any reason, without prior notice, at any time.
- No refunds are provided, even if a subscription or plan is cancelled mid-cycle.
`
// components/layout/constants.ts
export const DRAWER_WIDTH = 280
export const NAVBAR_HEIGHT = 80
export const RADIUS = 8 // master corner radius
export const ACTIVE_BG = 'rgba(10, 78, 163, 0.08)' // background behind selected item
export const ACTIVE_BAR = '#F57C00' // primary brand color bar at far left
export const ACCENT = '#0A4EA3' // primary brand color accent

export const requiredKycDetails: Record<
  BusinessStructure,
  (keyof AdditionalKYCForm)[] | Record<CompanyType, (keyof AdditionalKYCForm)[]>
> = {
  individual: ['panCardUrl', 'aadhaarUrl', 'cancelledChequeUrl'],
  sole_proprietor: ['panCardUrl', 'aadhaarUrl', 'cancelledChequeUrl', 'gstin', 'gstCertificateUrl'],
  partnership_firm: [
    'partnershipDeedUrl',
    'panCardUrl',
    'aadhaarUrl',
    'cancelledChequeUrl',
    'gstin',
    'gstCertificateUrl',
  ],
  company: {
    private_limited: [
      'cin',
      'gstin',
      'gstCertificateUrl',
      'boardResolutionUrl',
      'businessPanUrl',
      'aadhaarUrl',
      'gstCertificateUrl',
    ],
    llp: [
      'businessPanUrl',
      'aadhaarUrl',
      'companyAddressProofUrl',
      'cancelledChequeUrl',
      'llpAgreementUrl',
      'gstin',
      'gstCertificateUrl',
    ],
    one_person_company: [
      'businessPanUrl',
      'aadhaarUrl',
      'cin',
      'companyAddressProofUrl',
      'cancelledChequeUrl',
    ],
    section_8_company: [
      'businessPanUrl',
      'aadhaarUrl',
      'companyAddressProofUrl',
      'boardResolutionUrl',
      'cancelledChequeUrl',
    ],
    public_limited: ['businessPanUrl', 'aadhaarUrl', 'gstin', 'gstCertificateUrl'],
  },
}

export const requiredKycFieldMap: Record<
  BusinessStructure,
  Record<string, boolean> | Record<CompanyType, Record<string, boolean>>
> = {
  individual: {
    panCardUrl: true,
    aadhaarUrl: true,
    cancelledChequeUrl: true,
  },
  sole_proprietor: {
    panCardUrl: true,
    aadhaarUrl: true,
    cancelledChequeUrl: true,
    gstin: false,
  },
  partnership_firm: {
    partnershipDeedUrl: true,
    panCardUrl: true,
    aadhaarUrl: true,
    cancelledChequeUrl: true,
    gstin: false,
    gstCertificateUrl: false,
  },
  company: {
    private_limited: {
      cin: true,
      gstin: false,
      gstCertificateUrl: true,
      boardResolutionUrl: true,
      businessPanUrl: true,
      aadhaarUrl: true,
    },
    llp: {
      businessPanUrl: true,
      aadhaarUrl: true,
      companyAddressProofUrl: true,
      cancelledChequeUrl: true,
      llpAgreementUrl: true,
      gstin: false,
      gstCertificateUrl: false,
    },
    one_person_company: {
      businessPanUrl: true,
      aadhaarUrl: true,
      cin: true,
      companyAddressProofUrl: true,
      cancelledChequeUrl: true,
    },
    section_8_company: {
      businessPanUrl: true,
      aadhaarUrl: true,
      companyAddressProofUrl: true,
      boardResolutionUrl: true,
      cancelledChequeUrl: true,
    },
    public_limited: {
      businessPanUrl: true,
      aadhaarUrl: true,
      gstin: false,
      gstCertificateUrl: true,
    },
  },
}

export const courierLogos: Record<string, string> = {
  Delhivery: '/logo/integrations/delhivery.png',
  Bluedart: '/logo/integrations/bluedart.png',
  Shadowfax: '/logo/integrations/shadowfax.png',
  DTDC: '/logo/integrations/dtdc.png',
  Gati: 'https://cdn.example.com/logos/gati.png',
  EcomExpress: '/logo/integrations/ecomexpress.webp',
  Amazon: '/logo/integrations/amazon.png',
  Ekart: '/logo/integrations/ekart.png',
  Xpressbees: '/logo/integrations/xpressbees.png',
}
export const defaultLogo = '/logo/integrations/default-courier.png'

