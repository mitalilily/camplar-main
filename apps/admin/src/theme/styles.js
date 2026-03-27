import { mode } from '@chakra-ui/theme-tools'
import colors from './foundations/colors'

export const globalStyles = {
  colors: {
    ...colors,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#F7F9FF', '#000B37')(props),
        color: mode('gray.900', 'whiteAlpha.900')(props),
        fontFamily: "'Inter', 'Karla', 'Segoe UI', sans-serif",
        backgroundImage: mode(
          'radial-gradient(circle at 8% 6%, rgba(0,29,103,0.12) 0%, transparent 26%), radial-gradient(circle at 92% 4%, rgba(255,94,20,0.12) 0%, transparent 24%), radial-gradient(circle at 76% 100%, rgba(149,165,178,0.16) 0%, transparent 28%), linear-gradient(180deg, #fbfcff 0%, #f7f9ff 46%, #eef5ff 100%)',
          'radial-gradient(circle at 8% 6%, rgba(183,196,255,0.12) 0%, transparent 26%), radial-gradient(circle at 92% 4%, rgba(255,94,20,0.12) 0%, transparent 24%), linear-gradient(180deg, #000b37 0%, #001551 100%)',
        ),
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      },
      html: {
        fontFamily: "'Inter', 'Karla', 'Segoe UI', sans-serif",
        bg: mode('#F7F9FF', '#000B37')(props),
      },
      '#root': {
        minHeight: '100vh',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::selection': {
        background: mode('brand.100', 'brand.600')(props),
      },
      '::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '::-webkit-scrollbar-track': {
        background: mode('rgba(23,19,16,0.06)', 'rgba(255,255,255,0.06)')(props),
      },
      '::-webkit-scrollbar-thumb': {
        background: mode('rgba(23,19,16,0.24)', 'rgba(255,255,255,0.22)')(props),
        borderRadius: '999px',
      },
    }),
  },
}
