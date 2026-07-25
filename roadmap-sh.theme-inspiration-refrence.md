Perfect! I found the design system files for the developer-roadmap repository. Here's where the design system configuration is:

## Design System Files:

### 1. **`tailwind.config.cjs`** (Main Configuration)
The primary design system file is located at the root: **`tailwind.config.cjs`**

This file contains:
- **Theme customization** with `extend` settings
- **Custom typography** (quoteless style)
- **Custom animations** (fade-slide-up, fade-in, spotlight, wiggle)
- **Keyframe definitions** for all animations
- **Container configuration** (centered with max-width)
- **Tailwind CSS Typography plugin** integration

### 2. **`src/styles/global.css`** (Global Styles & Design Tokens)
This file contains:
- **Font definitions** (Balsamiq font imported from `/fonts/balsamiq.woff2`)
- **Custom CSS utilities** like `container`, `container-lg`, `badge`, `no-scrollbar`, and `collapse-if-empty`
- **Design tokens** defined in `@theme` block (e.g., `--font-balsamiq`)
- **Default styling** for borders, buttons, and typography
- **Custom CSS classes** for striped loaders and backgrounds
- **Code styling** for inline code blocks

### Key Design Elements:

| Element | Location |
|---------|----------|
| Colors & Theme | `tailwind.config.cjs` (extends Tailwind's default theme) |
| Fonts | `src/styles/global.css` (Balsamiq + system sans-serif) |
| Animations | `tailwind.config.cjs` (fade-slide-up, fade-in, spotlight, wiggle) |
| Typography | Both files (Tailwind typography plugin + custom styles) |
| Container sizes | `tailwind.config.cjs` (max-w: 830px, 968px) |
| Custom utilities | `src/styles/global.css` (badge, containers, loaders) |

The design system uses **Tailwind CSS v4** with custom extensions rather than hardcoding colors, making it highly maintainable and consistent across the project.

https://github.com/nilbuild/developer-roadmap/blob/master/tailwind.config.cjs

https://github.com/nilbuild/developer-roadmap/blob/master/src/styles/global.css

https://github.com/nilbuild/developer-roadmap/blob/master/src/styles/global.css