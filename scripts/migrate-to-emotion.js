#!/usr/bin/env node

/**
 * Migration Script: SCSS Modules to Emotion CSS-in-JS
 * 
 * This script helps migrate remaining components from SCSS modules to Emotion.
 * For each component, it creates a basic styled component template that can be customized.
 */

const fs = require('fs');
const path = require('path');

// Components to migrate with their paths
const componentsToMigrate = [
  // Quiz components
  { name: 'Answers', path: 'src/components/features/quiz/Answers' },
  { name: 'Question', path: 'src/components/features/quiz/Question' },
  { name: 'Summary', path: 'src/components/features/quiz/Summary' },
  { name: 'Timer', path: 'src/components/features/quiz/Timer' },
  
  // Tips components
  { name: 'TipCard', path: 'src/components/features/tips/TipCard' },
  
  // States component
  { name: 'States', path: 'src/components/features/states/States' },
  
  // Stocking components
  { name: 'Stock', path: 'src/components/features/stocking/Stock' },
  { name: 'StockAction', path: 'src/components/features/stocking/StockAction' },
  
  // UI components
  { name: 'ThemeSwitcher', path: 'src/components/ui/ThemeSwitcher/ThemeSwitcher' },
  { name: 'TitleLine', path: 'src/components/ui/TitleLine/TitleLine' },
  { name: 'ErrorState', path: 'src/components/ui/ErrorState' },
  { name: 'LoadingState', path: 'src/components/ui/LoadingState' },
  
  // Root component
  { name: 'CookieConsent', path: 'src/components/CookieConsent' },
];

// Template for styled component files
const createStyledTemplate = (componentName) => `import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

// TODO: Add any keyframe animations here if needed
// Example:
// const fadeIn = keyframes\`
//   from { opacity: 0; }
//   to { opacity: 1; }
// \`;

export const ${componentName}Container = styled.div\`
  // TODO: Add styles from the SCSS module file
  // Use theme values for colors, spacing, typography, etc.
  // Example:
  // color: \${props => props.theme.colors.text};
  // padding: \${props => props.theme.spacing.md};
  
  @media (min-width: \${props => props.theme.breakpoints.md}) {
    // Responsive styles
  }
\`;

// TODO: Add more styled components as needed
`;

// Template for updating component imports
const updateImportsTemplate = (componentName) => `
// Before:
// import styles from './${componentName.toLowerCase()}.module.scss';

// After:
import { ${componentName}Container } from './${componentName}.styled';

// Update className usage:
// Before: className={styles.container}
// After: Use styled component: <${componentName}Container>
`;

// Create migration files
function createMigrationFiles() {
  console.log('🚀 Starting Emotion migration script generation...\n');
  
  componentsToMigrate.forEach(({ name, path: componentPath }) => {
    const styledFilePath = path.join(componentPath + '.styled.tsx');
    const fullPath = path.join(process.cwd(), styledFilePath);
    
    // Check if styled file already exists
    if (fs.existsSync(fullPath)) {
      console.log(`⏭️  Skipping ${name} - styled file already exists`);
      return;
    }
    
    // Create styled component template
    try {
      fs.writeFileSync(fullPath, createStyledTemplate(name));
      console.log(`✅ Created styled template for ${name}`);
      console.log(`   Path: ${styledFilePath}`);
      console.log(`   Next steps:`);
      console.log(`   1. Copy styles from ${componentPath}.module.scss`);
      console.log(`   2. Update component imports as shown below:`);
      console.log(updateImportsTemplate(name));
      console.log('');
    } catch (error) {
      console.error(`❌ Error creating styled file for ${name}:`, error.message);
    }
  });
  
  console.log('\n📋 Migration Summary:');
  console.log('1. Review each generated .styled.tsx file');
  console.log('2. Copy and convert SCSS styles to Emotion syntax');
  console.log('3. Update component files to use styled components');
  console.log('4. Test each component for visual consistency');
  console.log('5. Remove .module.scss files when migration is complete');
  
  console.log('\n🎯 Key Conversion Rules:');
  console.log('- Replace CSS variables with theme values');
  console.log('- Use theme.colors for color values');
  console.log('- Use theme.spacing for padding/margin');
  console.log('- Use theme.typography for font properties');
  console.log('- Use theme.breakpoints for media queries');
  console.log('- Convert @keyframes to emotion keyframes');
}

// Run the migration script
if (require.main === module) {
  createMigrationFiles();
}

module.exports = { createMigrationFiles };