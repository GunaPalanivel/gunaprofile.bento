# Guna Portfolio

A modern, hand-crafted portfolio website built with pure HTML and CSS. Features a playful bento grid layout inspired by contemporary design trends, showcasing work experience, projects, education, and contact information.

## 🎨 Design Philosophy

This portfolio demonstrates:

- **Semantic HTML5**: Proper document structure with ARIA labels
- **Pure CSS**: No frameworks, no JavaScript - just vanilla web technologies
- **Bento Grid Layout**: Modern CSS Grid-based responsive layout
- **Accessibility First**: Keyboard navigation, screen reader support, reduced motion preferences
- **Performance**: Minimal dependencies, optimized for fast load times

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern features including:
  - CSS Grid for layout
  - CSS Custom Properties (variables) for maintainability
  - CSS Animations for micro-interactions
  - Responsive design with mobile-first approach

## 📁 Project Structure

```
gunaprofile/
├── index.html              # Main HTML file with semantic structure
├── css/
│   ├── main.css           # Main stylesheet (imports all modules)
│   ├── reset.css          # Modern CSS reset for cross-browser consistency
│   ├── variables.css      # Design tokens (colors, spacing, timing)
│   ├── grid.css           # Bento grid layout system (9x9 on desktop)
│   ├── components.css     # Reusable component styles
│   ├── typography.css     # Font system and text styles
│   └── responsive.css     # Media queries for all breakpoints
├── fonts/                 # Custom fonts directory (future)
├── assets/                # Images and icons directory (future)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Git for version control

### Installation

1. Clone the repository:

```
git clone https://github.com/GunaPalanivel/gunaprofile.bento.git
cd gunaprofile.bento
```

2. Open in browser:

```
# Simply open index.html in your browser
# No build process required!
```

### Development

Open `index.html` directly in a browser. For live reloading during development, use:

- VS Code Live Server extension
- Python: `python -m http.server 8000`
- Node: `npx http-server`

## 🎯 Features

### Current (Branch 1: Foundation)

- ✅ 9x9 CSS Grid bento layout
- ✅ 8 section cards (Hero, Work, Projects, Education, Contact, Blog, Resume, Misc)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern CSS reset
- ✅ Design token system with CSS variables
- ✅ Accessibility features (ARIA labels, keyboard focus)

### Upcoming

- 🔄 Branch 2: Hero section with animated name/tagline
- 🔄 Branch 3: Work experience with decorative grid pattern
- 🔄 Branch 4: Projects showcase and education section
- 🔄 Branch 5: Contact form, blog link, resume download, misc details

## 🎨 Color Palette

- **Orange** (#F4A261): Work Experience, Miscellaneous
- **Teal** (#2A9D8F): Projects, Blog, Resume
- **Light Blue** (#9ad1ea): Education
- **Pale Blue** (#94d1ee): Contact
- **Yellow** (#e9c46a): Hero section
- **Navy** (#264653): Text badges and headers
- **Stone** (#d4c5b9): Background

## 📱 Responsive Breakpoints

- **Mobile**: 480px and below
- **Tablet**: 481px - 768px
- **Tablet Landscape**: 769px - 1024px
- **Desktop**: 1025px - 1439px
- **Large Desktop**: 1440px+

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!
