/**
 * Projects configuration
 * Import all project JSON files here
 */

import type { Project } from '../types';

import alumniConnect from './projects/alumni-connect.json';
import smartAttendanceManagementSystem from './projects/smart-attendance-management-system.json';
import collaborativeCodeEditor from './projects/collaborative-code-editor.json';
import workflowAutomationSystem from './projects/workflow-automation-system.json';

export const projects: readonly Project[] = [
  alumniConnect,
  smartAttendanceManagementSystem,
  collaborativeCodeEditor,
  workflowAutomationSystem,
] as Project[];
