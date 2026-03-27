export const buttonStyles = {
  components: {
    Button: {
      variants: {
        'no-hover': {
          _hover: {
            boxShadow: 'none',
          },
        },
        'transparent-with-icon': {
          bg: 'transparent',
          fontWeight: '600',
          borderRadius: '999px',
          cursor: 'pointer',
          _active: {
            bg: 'transparent',
            transform: 'none',
            borderColor: 'transparent',
          },
          _focus: {
            boxShadow: 'none',
          },
          _hover: {
            bg: 'rgba(255, 94, 20, 0.08)',
          },
        },
        'camplar-solid': {
          bg: 'linear-gradient(135deg, #000B37 0%, #001D67 100%)',
          color: 'white',
          boxShadow: '0 12px 24px rgba(0, 11, 55, 0.22)',
          _hover: {
            bg: 'linear-gradient(135deg, #001D67 0%, #000B37 100%)',
            transform: 'translateY(-1px)',
            boxShadow: '0 16px 28px rgba(0, 11, 55, 0.28)',
          },
        },
        'camplar-outline': {
          bg: 'rgba(255,255,255,0.8)',
          color: 'gray.800',
          border: '1px solid rgba(12, 59, 128, 0.12)',
          _hover: {
            bg: 'rgba(255, 94, 20, 0.08)',
            borderColor: 'rgba(169, 56, 0, 0.18)',
          },
        },
      },
      baseStyle: {
        borderRadius: '999px',
        fontWeight: '700',
        transition: 'all 0.2s ease',
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
}
