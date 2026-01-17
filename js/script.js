// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    black: '#0a0a0a',
                    dark: '#121212',
                    gray: '#2a2a2a',
                    violet: '#6d28d9', // Deep Violet accent
                    accent: '#8b5cf6'  // Lighter Violet
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
};

// Console Log for Debugging (SFC Spirit)
console.log("System Status: Online. Welcome, Mari.");