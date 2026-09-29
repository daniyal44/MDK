# Contributing Guidelines

Thank you for your interest in contributing to **MDK Works / Scale verse Studio**! 

To maintain world-class engineering quality and a pristine, readable git commit history, all contributors must adhere to the following standards.

---

## 📜 Conventional Commits Standard

Every commit message must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short imperative subject>

[optional detailed body describing the exact change, motivation, and solution]

[optional footer referencing issues or breaking changes]
```

### Commit Types:
- `feat`: A new feature or major capability added to the codebase.
- `fix`: A bug fix or error resolution.
- `refactor`: Code restructuring without functional behavior modification.
- `docs`: Documentation updates (e.g., README, CHANGELOG, inline docs).
- `style`: Visual design, CSS formatting, or UI styling adjustments.
- `perf`: Performance enhancements (e.g., bundle size, rendering, caching).
- `test`: Adding or correcting tests.
- `chore`: Maintenance tasks, configuration changes, or build scripts.

### Examples of Good Commit Messages:
- `feat(portfolio): prune placeholder cards and showcase verified production apps`
- `fix(leaflet): resolve map container initialization race condition`
- `docs(readme): add international badges, architecture map, and tech stack guide`
- `chore(ci): introduce GitHub Actions automated production build pipeline`

---

## 🛠️ Development Workflow

1. **Branching**:
   - Create a descriptive feature branch from `main`:
     ```bash
     git checkout -b feat/your-feature-name
     ```

2. **Code Standards**:
   - Write clean, modular, and self-documenting code.
   - Keep React components focused on a single responsibility.
   - Test responsiveness across mobile and desktop viewport sizes.

3. **Verification Before Committing**:
   - Always run the production build locally:
     ```bash
     npm run build
     ```
   - Ensure `dist/` builds with 0 errors or warnings before committing.

4. **Pull Requests**:
   - Open a PR against `main` using the provided PR template.
   - Verify that all CI checks pass.
