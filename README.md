# Portfolio V2

A modern, responsive portfolio website built with vanilla JavaScript, GSAP animations, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: GSAP-powered scroll animations and interactions
- **Modern UI**: Clean, professional design with gradient accents
- **Performance Optimized**: Vanilla JavaScript for lightweight performance
- **Accessible**: Semantic HTML and proper navigation

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Tailwind CSS for styling
- **JavaScript**: Vanilla JS for interactions
- **GSAP**: Animation library with ScrollTrigger
- **Fonts**: Google Fonts (Inter)

## Getting Started

### Prerequisites

- Node.js (for development tools)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build Tailwind CSS:
   ```bash
   npm run build
   ```

4. Start development server:
   ```bash
   npm run serve
   ```

### Development

- **Watch mode**: `npm run dev` - Builds Tailwind CSS and watches for changes
- **Build**: `npm run build` - Builds production-ready CSS
- **Serve**: `npm run serve` - Starts local development server

## Project Structure

```
portfolio-v2/
├── index.html          # Main HTML file
├── src/
│   ├── input.css       # Tailwind CSS source
│   └── main.js         # JavaScript animations and interactions
├── dist/
│   └── output.css      # Generated Tailwind CSS
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
└── README.md          # This file
```

## Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  'primary': '#3B82F6',
  'secondary': '#1F2937',
  'accent': '#F59E0B',
}
```

### Animations
Add custom animations in `src/main.js` using GSAP:
```javascript
gsap.to('.element', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power2.out'
});
```

### Content
Update the content in `index.html`:
- Replace "Your Name" with your actual name
- Update email address and social links
- Add your projects and descriptions
- Customize sections as needed

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the following files to your web server:
   - `index.html`
   - `dist/output.css`
   - `src/main.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- **GSAP**: Animation library by GreenSock
- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Inter font family
