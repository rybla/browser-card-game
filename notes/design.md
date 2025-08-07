# Design Document: Digital Neo-Brutalism

## Introduction

This document outlines the official design system for this project: **Digital Neo-Brutalism**. The aesthetic is defined by glassy materials, smooth transitions, and passive animations. All state changes in UI components should be reflected with smooth and thematic CSS animations to create a dynamic and responsive user experience.
The primary goal is to create a unique and aesthetic user interface that is bold, functional, and memorable.

## The Digital Neo-Brutalism Design System\*\*

### Core Principles

Digital Neo-Brutalism is inspired by the architectural movement of the mid-20th century. It rejects decorative, non-functional design in favor of raw, exposed materials and structures. This system prioritizes honesty, clarity, and a strong, unapologetic presence.

- **Honesty of Material**: The underlying structure of the digital interface is exposed. Containers, grids, and boundaries are not hidden but are made a central part of the aesthetic. The design reveals how it was built.
- **Strong Hierarchy**: Information is organized in a clear, logical, and visually dominant hierarchy. Scale, weight, and placement are used to guide the user's eye without ambiguity.
- **Unapologetic Presence**: The design does not shy away from taking up space. It uses hard shadows, high contrast, and stark typography to create a memorable and solid three-dimensional feel.
- **Function Over Form**: Every design element must serve a purpose. Decoration for its own sake is eliminated. The aesthetic arises directly from the function of the components.

### Design Specifications

#### Shadows and Dimensions

Shadows are a defining feature of this system. They are hard, deliberate, and used to create a tangible, three-dimensional feel.

- **Hard Block Shadows**: Standard elements must have a solid, black shadow with no blur.
  - box-shadow: 4px 4px 0px \#000000;
- **Diagonal Offsets**: Shadows and other elements should be offset on a 45-degree angle to create a consistent sense of depth and direction.
- **"Long Shadow" Effect**: Reserved for primary buttons or featured cards to create emphasis. This is a solid shadow that extends for a significant distance at a 45-degree angle.
  - Example: box-shadow: 4px 4px \#888, 8px 8px \#000;

#### Color Palette

The color palette is defined by high contrast and intentional limitation. It avoids gradients and soft tones in favor of solid, bold blocks of color that carry functional meaning.

- Primary Palette (Neutrals):
  - \#000000 (Black): Primary text, backgrounds, shadows.
  - \#FFFFFF (White): Primary backgrounds, contrasting text.
  - \#CCCCCC (Light Gray): Secondary backgrounds, disabled states.
  - \#888888 (Mid Gray): Secondary text, borders.
- Accent Palette (Functional):
  - \#007AFF (Action Blue): Primary calls to action, active links, focus indicators.
  - \#FF3B30 (Destructive Red): Critical errors, destructive actions (e.g., "Delete").
  - \#34C759 (Success Green): Successful actions, valid states.
  - \#FF9500 (Warning Orange): Non-critical warnings, potentially risky actions.
  - \#AF52DE (Highlight Purple): Secondary features, promotions, unique UI states.
  - \#FFCC00 (Attention Yellow): Informational alerts, notifications.

**Usage Guidelines**: A strict separation between neutral structural colors and functional accent colors must be maintained. Each accent color has a specific purpose and must not be used decoratively.

#### Structure and Spacing

The structure is rigid, geometric, and exposed.

- **Corners**: All elements must have sharp, 0px radius corners.
  - border-radius: 0;
- **Borders**: Use solid, 1px or 2px black or gray borders to define containers and interactive elements.
- **Layout**: A strict, visible grid system (e.g., 8pt grid) must be used. Spacing must be consistent and deliberate.

## Component Library

#### Buttons

- **Appearance**: Solid background color from the accent palette, sharp corners, and a thick, solid border.
- **Typography**: Uppercase, bold text.
- **Interaction**:
  - **Default**: Has a standard 4px 4px hard block shadow.
  - **Hover**: The shadow disappears, and the button may shift slightly.
  - **Active**: The button appears pressed down, achieved by removing the shadow and translating the button 4px down and to the right.

#### Cards & Containers

- **Appearance**: A solid background (white or light gray) with a prominent solid border (1px or 2px black).
- **Shadows**: Must feature the standard 4px 4px hard block shadow.
- **Layout**: Content within cards must adhere to the strict grid and spacing rules.

#### Form Inputs

- **Appearance**: Simple, rectangular fields with a solid border. The background should be white or a light neutral.
- **Labels**: Placed directly above the input field, using uppercase, bold text.
- **Focus State**: The border must change color to a vibrant accent (e.g., Action Blue) to provide clear, functional feedback.

#### Icons

- **Style**: Simple, geometric, and solid-filled. Line-art icons should be thick and uniform.
- **Usage**: Icons must be used purposefully to aid navigation and comprehension, not as decoration. They should be a single, solid color.

## Implementation Notes

- **CSS File Structure**: The main stylesheet should begin with a multi-line comment that serves as a blueprint, outlining the file's organization.
- **CSS Variables**: Immediately following the blueprint comment, a :root block must define a comprehensive set of CSS variables for colors, spacing, fonts, and other key properties to ensure consistency and ease of maintenance.
- **CSS Modules**: The project uses CSS Modules. Styles will be scoped to their respective components. Class names defined in the CSS file (e.g., .page) will be imported and used in .tsx files via the styles object (e.g., className={styles.page}).
