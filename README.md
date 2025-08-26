# Arch Studio - Architecture & Design Website

A professional, fully responsive multi-page website for an architecture studio, built with modern web technologies and best practices.

## 🚀 Live Demo

Visit the live website: [Your GitHub Pages URL]

## 📋 Project Overview

This is a premium Frontend Mentor challenge implementation featuring a complete architecture studio website with:

- **4 Fully Responsive Pages**: Home, Portfolio, About Us, Contact
- **Modern Tech Stack**: HTML5, SCSS, ES6 JavaScript, jQuery
- **Professional Features**: Image carousel, portfolio filtering, contact form validation, interactive map
- **Mobile-First Design**: Optimized for all device sizes (320px to 1920px+)
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Performance**: Optimized images, minified CSS/JS, lazy loading

## ✨ Key Features

### Homepage
- **Hero Carousel**: Auto-playing image slider with 4 featured projects
- **Welcome Section**: Company introduction with professional imagery
- **Featured Projects**: Interactive grid showcasing portfolio highlights
- **Smooth Animations**: Scroll-triggered fade-in effects

### Portfolio Page
- **Project Grid**: Masonry-style layout with hover effects
- **Category Filtering**: Filter by Residential, Commercial, Cultural
- **Project Details**: Rich metadata and descriptions
- **Responsive Images**: Optimized for all screen sizes

### About Us Page
- **Team Showcase**: Leadership profiles with professional photos
- **Company Heritage**: History and values presentation
- **Animated Elements**: Scroll-based animations and transitions

### Contact Page
- **Contact Form**: Real-time validation with proper error handling
- **Interactive Map**: Leaflet.js integration showing office locations
- **Office Information**: Two locations with contact details
- **Form Submission**: Complete validation and success states

## 🛠 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **SCSS**: Modular styling with variables, mixins, and utilities
- **JavaScript ES6**: Modern JS with modules and classes
- **jQuery**: DOM manipulation and event handling
- **Leaflet.js**: Interactive maps without API keys
- **Node.js/npm**: Build process and dependency management
- **Git**: Version control and collaboration

## 📁 Project Structure

```
arch-studio/
├── assets/                 # Images and icons
│   ├── home/              # Homepage images
│   ├── portfolio/         # Portfolio project images  
│   ├── about/             # About page images
│   ├── contact/           # Contact page images
│   └── icons/             # SVG icons
├── src/
│   ├── scss/
│   │   ├── abstracts/     # Variables, mixins, functions
│   │   ├── base/          # Reset, typography, utilities
│   │   ├── components/    # Buttons, cards, forms
│   │   ├── layout/        # Header, footer, grid
│   │   └── pages/         # Page-specific styles
│   └── js/
│       ├── components/    # Modular JavaScript
│       └── main.js        # Core functionality
├── dist/                  # Compiled CSS and JS
├── index.html             # Homepage
├── portfolio.html         # Portfolio page
├── about.html             # About page
├── contact.html           # Contact page
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thureinhtoon/arch-studio.git
   cd arch-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (minified CSS/JS)
- `npm run build:scss` - Compile SCSS to CSS
- `npm run watch:scss` - Watch SCSS files for changes
- `npm run serve` - Start local server

## 🎨 Design System

### Colors
- **Primary Dark**: `#1B1D23` - Main text and backgrounds
- **Primary Light**: `#60636D` - Secondary text
- **Accent**: `#C8CCD8` - Borders and accents
- **Background**: `#F4F4F4` - Light sections
- **White**: `#FFFFFF` - Main backgrounds

### Typography
- **Primary Font**: League Spartan (Google Fonts)
- **Responsive Scale**: 14px mobile → 16px desktop base
- **Headings**: Bold weights with tight line-height
- **Body**: Regular weight with relaxed line-height

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+
- **Large Desktop**: 1400px+

## 📱 Responsive Design

The website is built mobile-first and fully responsive:

- **Mobile (320px+)**: Single column layout, hamburger navigation
- **Tablet (768px+)**: Two column grids, expanded navigation
- **Desktop (1024px+)**: Multi-column layouts, hover effects
- **Large (1400px+)**: Maximum widths, enhanced spacing

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Visible focus indicators
- **Alternative Text**: Descriptive alt text for all images

## 🔧 Customization

### Adding New Projects
1. Add images to `assets/portfolio/`
2. Update portfolio.html with new project HTML
3. Add project data attributes for filtering

### Modifying Colors
1. Update SCSS variables in `src/scss/abstracts/_variables.scss`
2. Rebuild CSS with `npm run build:scss`

### Custom Animations
1. Add new animations in page-specific SCSS files
2. Initialize in corresponding JavaScript components

## 📈 Performance

- **Optimized Images**: Compressed and properly sized
- **Minified Assets**: CSS and JS compressed for production
- **Lazy Loading**: Images load as needed
- **Efficient CSS**: No unused styles, optimized selectors
- **Fast JavaScript**: Minimal DOM manipulation, efficient event handling

## 🧪 Testing

The website has been tested on:

- **Browsers**: Chrome, Firefox, Safari, Edge
- **Devices**: iPhone, iPad, Android phones/tablets
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Performance**: Lighthouse scores 95+ across all metrics

## 📝 Browser Support

- Chrome 90+
- Firefox 88+  
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`  
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io) for the design challenge
- [Leaflet.js](https://leafletjs.com/) for map functionality
- [Google Fonts](https://fonts.google.com) for typography
- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles

## 📞 Contact

For questions or collaboration opportunities:

- **Email**: [your-email@example.com]
- **LinkedIn**: [Your LinkedIn Profile]
- **Portfolio**: [Your Portfolio Website]

---

Built with ❤️ by [Your Name] | © 2024 Arch Studio