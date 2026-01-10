/**
 * Brand configuration utility
 *
 * IMPORTANT: This file contains placeholders {{BRAND_NAME}} and {{projectName}}
 * that will be automatically replaced during project creation by Rapid Builder.
 *
 * For development/preview, we provide default values.
 * When Rapid Builder creates a project, it will replace these placeholders
 * with actual brand and project names.
 */

// Template placeholders - Rapid Builder will replace these during project creation
// For development, we check if placeholder is still present and use defaults
const BRAND_NAME_RAW = "{{BRAND_NAME}}";
const PROJECT_NAME_RAW = "{{projectName}}";

// Default values for development/preview
const DEFAULT_BRAND_NAME = "Your Brand";
const DEFAULT_PROJECT_NAME = "landing-waitlist-template";

/**
 * Get brand name
 * Returns default "Your Brand" if placeholder {{BRAND_NAME}} is still present (development)
 * Returns actual brand name after Rapid Builder replaces the placeholder
 */
export function getBrandName(): string {
  // Check if placeholder is still present (not yet replaced by Rapid Builder)
  const isPlaceholder =
    BRAND_NAME_RAW.startsWith("{{") && BRAND_NAME_RAW.endsWith("}}");
  return isPlaceholder ? DEFAULT_BRAND_NAME : BRAND_NAME_RAW;
}

/**
 * Get project name
 * Returns default "landing-waitlist-template" if placeholder {{projectName}} is still present (development)
 * Returns actual project name after Rapid Builder replaces the placeholder
 */
export function getProjectName(): string {
  // Check if placeholder is still present (not yet replaced by Rapid Builder)
  const isPlaceholder =
    PROJECT_NAME_RAW.startsWith("{{") && PROJECT_NAME_RAW.endsWith("}}");
  return isPlaceholder ? DEFAULT_PROJECT_NAME : PROJECT_NAME_RAW;
}
