import { Skill } from '../types/portfolio';

/**
 * Skill/Technique Graph Metadata — Complete
 * All 9 verified techniques mapped to projects
 */

export const skills: Skill[] = [
  {
    id: 'form-validation',
    name: 'Form Validation',
    category: 'User Input',
    icon: '/assets/icons/form-validation.svg',
    projects: ['project-04', 'project-07'],
    description: 'Client-side validation of form inputs before submission.'
  },

  {
    id: 'localstorage',
    name: 'localStorage Persistence',
    category: 'Storage',
    icon: '/assets/icons/localstorage.svg',
    projects: ['project-07', 'project-06'],
    description: 'Saving and retrieving user data in the browser.'
  },

  {
    id: 'custom-parser',
    name: 'Custom Expression Parser',
    category: 'Algorithm',
    icon: '/assets/icons/custom-parser.svg',
    projects: ['project-03'],
    description: 'Parsing and evaluating string expressions with operator precedence.'
  },

  {
    id: 'fetch-api',
    name: 'API / Fetch',
    category: 'Networking',
    icon: '/assets/icons/fetch-api.svg',
    projects: ['project-08'],
    description: 'Making HTTP requests and handling responses asynchronously.'
  },

  {
    id: 'modal-dialogs',
    name: 'Modal Dialogs',
    category: 'UI Components',
    icon: '/assets/icons/modal-dialogs.svg',
    projects: ['project-03', 'project-04', 'project-07'],
    description: 'Native and custom modal/dialog components for focused interactions.'
  },

  {
    id: 'array-methods',
    name: 'Array Methods (map/filter)',
    category: 'JavaScript',
    icon: '/assets/icons/array-methods.svg',
    projects: ['project-04'],
    description: 'Functional array operations for transforming collections.'
  },

  {
    id: 'dom-manipulation',
    name: 'DOM Manipulation',
    category: 'JavaScript',
    icon: '/assets/icons/dom-manipulation.svg',
    projects: ['project-03', 'project-04', 'project-06', 'project-07'],
    description: 'Selecting, creating, and modifying HTML elements dynamically.'
  },

  {
    id: 'async-await',
    name: 'Async/Await',
    category: 'JavaScript',
    icon: '/assets/icons/async-await.svg',
    projects: ['project-08'],
    description: 'Writing asynchronous code that reads like synchronous logic.'
  },

  {
    id: 'event-delegation',
    name: 'Event Delegation',
    category: 'Events',
    icon: '/assets/icons/event-delegation.svg',
    projects: ['project-04', 'project-06'],
    description: 'Efficient event handling via bubbling and delegation to parent elements.'
  }
];