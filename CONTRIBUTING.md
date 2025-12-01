# Contributing Guidelines

## Getting Started

1. Make sure you have access to the repository
2. Clone the repo and set up your development environment
3. Read the README.md for project structure
4. Review docs/COMPONENTS.md for shared component usage
5. Check docs/API.md for available endpoints

## Development Process

### 1. Pick Up Your Assigned Work

Each developer has an assigned area:
- **Dev 1:** Home page and navigation (`/components/home/`)
- **Dev 2:** Product detail page (`/components/product/`)
- **Dev 3:** Comparison tool (`/components/comparison/`)

### 2. Create a Feature Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

Branch naming convention:
- `feature/home-page-grid` (Dev 1)
- `feature/product-detail-layout` (Dev 2)
- `feature/comparison-tool` (Dev 3)
- `fix/bug-description` (Bug fixes)

### 3. Make Your Changes

**Rules:**
- Only modify files in your assigned directory
- Use shared components from `/components/shared/`
- Do NOT modify shared components without discussing in Teams chat first
- Follow the UI Kit colors and typography
- Write mobile-first responsive CSS

**Using Shared Components:**

```javascript
// Good - Using shared ProductCard
import ProductCard from '../shared/ProductCard';

function HomePage() {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

```javascript
// Bad - Creating your own product card
function HomePage() {
  return (
    <div>
      {products.map(product => (
        <div className="my-custom-card">
          {/* Don't duplicate shared components */}
        </div>
      ))}
    </div>
  );
}
```

### 4. Test Your Changes

**Frontend:**
```bash
cd auction-frontend
npm run dev
```
Test in browser at http://localhost:5173

**Backend:**
```bash
cd auction-backend
npm test
```

### 5. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "Add product grid layout to home page"
```

Good commit messages:
- "Add search filter panel to home page"
- "Implement product image gallery"
- "Fix comparison tool sorting bug"

Bad commit messages:
- "Update"
- "Fixed stuff"
- "WIP"

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub:
1. Go to the repository
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch
4. Write a clear description of changes
5. Request review from team members

## Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Changes Made
- Added X component
- Updated Y functionality
- Fixed Z bug

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Safari/Firefox
- [ ] Mobile responsive
- [ ] No console errors

## Screenshots
(If UI changes, add before/after screenshots)

## Related Issue
Closes #issue-number (if applicable)
```

## Code Review Process

1. Team members review each other's PRs
2. At least one approval required before merge
3. Requested changes must be addressed
4. Approved PRs are merged to `develop` branch
5. After testing, `develop` is merged to `main`

## Things NOT to Do

❌ **Do NOT modify shared components** without team discussion
❌ **Do NOT change backend API** without discussing in Teams chat first
❌ **Do NOT commit node_modules** or build files
❌ **Do NOT work directly on main branch**
❌ **Do NOT merge your own PRs**
❌ **Do NOT include personal notes** or credentials in commits
❌ **Do NOT change other developers' code** without discussion

## File Ownership

### Shared (discuss changes in Teams):
- `/components/shared/` - All shared components
- `/services/` - API client and utilities
- `/styles/theme.js` - UI Kit theme
- `/auction-backend/` - Backend API
- Documentation files

### Individual Developer Areas:
- Dev 1: `/components/home/` and `/pages/HomePage.jsx`
- Dev 2: `/components/product/` and `/pages/ProductDetailPage.jsx`
- Dev 3: `/components/comparison/` and `/pages/ComparisonPage.jsx`

## Conflict Resolution

If you encounter merge conflicts:
1. Pull latest changes: `git pull origin main`
2. Resolve conflicts in your local files
3. Test that everything still works
4. Commit the resolution
5. Push and update your PR

If unsure, ask for help in the Teams chat.

## Getting Help

- Check documentation in `/docs/` first
- Search existing GitHub issues
- Ask in **Teams chat: "Group 2.0 Mission 5"**
- Tag team members in PR comments
- Schedule team review sessions

## Code Style

**JavaScript:**
- Use ES6+ features
- Use functional components with hooks
- Destructure props
- Use meaningful variable names

```javascript
// Good
function ProductCard({ product }) {
  const { title, price, location } = product;
  return <div>{title}</div>;
}

// Bad
function ProductCard(props) {
  return <div>{props.product.title}</div>;
}
```

**CSS:**
- Use UI Kit colors (no random hex codes)
- Mobile-first approach
- Use semantic class names
- Avoid inline styles

```css
/* Good */
.product-card {
  background: #F5F5F5;
  color: #44413d;
}

/* Bad */
.card {
  background: #abc123; /* Random color not in UI Kit */
}
```

## Questions?

Post in **Teams chat: "Group 2.0 Mission 5"** or create a GitHub issue tagged with `question`.

Happy coding!
