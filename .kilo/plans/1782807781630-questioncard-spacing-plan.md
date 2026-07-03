# UI/UX Improvement Plan for QuestionCard/QuestionList Components

## Problem Analysis

### 1. Spacing Between Question Blocks
- **Current**: `margin-bottom: 0.875rem` on standalone cards; `margin-bottom: 0` inside `.ql-body` with shared borders creating a "flush stack"
- **Issue**: Cards inside QuestionList lack distinct visual separation; spacing feels too dense
- **Solution**: Add consistent vertical spacing with proper visual separation

### 2. Component Separation
- **Current**: Cards inside QuestionList share borders (`.ql-body :global(.qc)` has `border-radius: 0`, shared borders)
- **Issue**: Cards appear visually connected without clear individual boundaries
- **Solution**: Give each card distinct visual boundary with proper margin/gap between cards

### 3. Button Alignment
- **Current**: Buttons in `.qc-actions` use flex with `gap: 0.375rem` at 28px height
- **Issue**: Buttons may not be perfectly vertically centered or aligned with header text baseline
- **Solution**: Ensure proper alignment using flexbox `align-items: center` and consistent baseline alignment

### 4. Design System Consistency
- **Current**: Inconsistent padding values (1.25rem standalone vs 1.125rem in list), mixed spacing tokens
- **Solution**: Standardize spacing scale and create consistent visual rhythm

## Implementation Tasks

### Task 1: Improve Card Spacing & Separation
**File**: `src/components/mdx/QuestionList.astro`

Changes to `.ql-body`:
- Increase margin between cards from `0` to `0.75rem` for better visual breathing room
- Give each card a subtle shadow or increased border contrast for individual distinction
- Ensure first/last card maintains proper border-radius

```css
/* Update card spacing inside list */
.ql-body :global(.qc) {
  border-radius: 8px;
  margin-bottom: 0.75rem;
  border: 1.5px solid var(--sl-color-gray-5);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.ql-body :global(.qc:last-child) {
  margin-bottom: 0;
}
```

### Task 2: Adjust QuestionList Container Styling
**File**: `src/components/mdx/QuestionList.astro`

Changes to `.ql`:
- Increase `margin-bottom` for section separation (0.5rem → 2rem)
- Ensure stats bar and card container have clear visual distinction

```css
.ql {
  margin-bottom: 2rem;
}

.ql-stats {
  border-bottom: 1px solid var(--sl-color-gray-5);
  /* Keep existing styling */
}
```

### Task 3: Refine Button Alignment
**File**: `src/components/mdx/QuestionCard.astro`

Changes to `.qc-header` and `.qc-actions`:
- Ensure buttons align with text baseline using `align-items: center`
- Slightly increase button gap for better touch target spacing (0.375rem → 0.5rem)
- Add subtle hover elevation for affordance

```css
.qc-header {
  align-items: center;
  padding: 1rem 1.25rem 0.75rem;
}

.qc-actions {
  gap: 0.5rem;
}

.qc-btn:hover {
  transform: translateY(-1px);
}
```

### Task 4: Standardize Design Tokens
**File**: `src/components/mdx/QuestionCard.astro`

Create consistent spacing scale:
```css
.qc {
  --_pad-y: 1rem;
  --_pad-x: 1.25rem;
  --_gap: 0.5rem;
  --_radius: 8px;
}
```

### Task 5: Add Visual Divider Between Sections
**File**: `src/content/docs/level-1-foundations/python/theory.mdx`

Add consistent spacing after each `</QuestionList>`:
```mdx
</QuestionList>

<div class="section-divider"></div>
```

With corresponding CSS for `.section-divider` (margin: 2rem 0).

## Validation Steps

1. Verify cards have adequate vertical spacing (minimum 0.75rem between cards)
2. Confirm buttons align properly with question metadata text baseline
3. Test responsive behavior on mobile (buttons should stack or remain accessible)
4. Ensure dark mode styling remains consistent with new spacing
5. Check that adjacent QuestionLists have clear visual separation

## Risks & Considerations

- **Breaking change**: Existing users may have muscle memory for current layout
- **Responsive**: Button alignment changes must work on mobile (540px breakpoint)
- **Performance**: Adding box-shadows may trigger more paint operations (minimal impact)