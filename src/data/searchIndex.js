export const searchIndex = [
  // Getting Started
  { title: 'Installation', content: 'Install PhantomBack globally using npm install -g phantomback', section: 'Getting Started', path: '/docs/getting-started', heading: 'installation' },
  { title: 'Zero-Config Mode', content: 'Use --zero flag to instantly get a full API with 5 pre-configured resources', section: 'Getting Started', path: '/docs/getting-started', heading: 'zero-config' },
  { title: 'Custom Configuration', content: 'Create phantom.config.js with init command for full control', section: 'Getting Started', path: '/docs/getting-started', heading: 'custom-config' },
  { title: 'Your First Request', content: 'Make requests with curl fetch or any HTTP client', section: 'Getting Started', path: '/docs/getting-started', heading: 'your-first-request' },
  { title: 'Programmatic Usage', content: 'Use PhantomBack as a library with createPhantom createPhantomZero', section: 'Getting Started', path: '/docs/getting-started', heading: 'programmatic' },

  // Configuration
  { title: 'Config File', content: 'phantom.config.js config file location and format', section: 'Configuration', path: '/docs/configuration', heading: 'config-file' },
  { title: 'Config Structure', content: 'Port prefix resources schema count auth settings', section: 'Configuration', path: '/docs/configuration', heading: 'structure' },
  { title: 'Field Types', content: '40+ built-in field types Faker.js fullName email phone avatar sentence paragraph number price', section: 'Configuration', path: '/docs/configuration', heading: 'field-types' },
  { title: 'Special Field Types', content: 'Enum relation object array nested fields foreign key', section: 'Configuration', path: '/docs/configuration', heading: 'special-types' },
  { title: 'Validation Rules', content: 'Required unique min max validation for POST PUT PATCH', section: 'Configuration', path: '/docs/configuration', heading: 'validation' },
  { title: 'Auth Configuration', content: 'JWT authentication auth true protected routes register login', section: 'Configuration', path: '/docs/configuration', heading: 'auth-config' },
  { title: 'Response Delay', content: 'Simulate network latency fixed random delay', section: 'Configuration', path: '/docs/configuration', heading: 'delay' },

  // API Reference
  { title: 'CRUD Endpoints', content: 'GET POST PUT PATCH DELETE REST API endpoints', section: 'API Reference', path: '/docs/api-reference', heading: 'crud' },
  { title: 'Pagination', content: 'Page limit offset query parameters pagination', section: 'API Reference', path: '/docs/api-reference', heading: 'pagination' },
  { title: 'Filtering', content: 'Filter records field value gte lte gt lt ne like operators', section: 'API Reference', path: '/docs/api-reference', heading: 'filtering' },
  { title: 'Sorting', content: 'Sort ascending descending multi-field sort query parameter', section: 'API Reference', path: '/docs/api-reference', heading: 'sorting' },
  { title: 'Full-Text Search', content: 'Search across all string fields q= query parameter', section: 'API Reference', path: '/docs/api-reference', heading: 'search' },
  { title: 'Authentication', content: 'Register login me JWT token auth endpoints', section: 'API Reference', path: '/docs/api-reference', heading: 'auth-endpoints' },
  { title: 'Nested Routes', content: 'Auto-generated nested routes parent child relation', section: 'API Reference', path: '/docs/api-reference', heading: 'nested-routes' },
  { title: 'Health Check', content: 'Server status uptime resource counts health endpoint', section: 'API Reference', path: '/docs/api-reference', heading: 'health-check' },
  { title: 'Response Format', content: 'Data meta total page totalPages list single error response', section: 'API Reference', path: '/docs/api-reference', heading: 'response-format' },

  // Examples
  { title: 'Blog Platform', content: 'Blog users posts comments categories example config', section: 'Examples', path: '/docs/examples', heading: 'blog' },
  { title: 'E-Commerce Store', content: 'Products categories orders reviews ecommerce example', section: 'Examples', path: '/docs/examples', heading: 'ecommerce' },
  { title: 'Hospital Management', content: 'Doctors patients appointments departments hospital example', section: 'Examples', path: '/docs/examples', heading: 'hospital' },
  { title: 'E-Learning Platform', content: 'Courses instructors students reviews elearning example', section: 'Examples', path: '/docs/examples', heading: 'elearning' },
  { title: 'Food Delivery App', content: 'Restaurants menu items orders food delivery example', section: 'Examples', path: '/docs/examples', heading: 'food-delivery' },
  { title: 'Social Media App', content: 'Users posts comments messages social media example', section: 'Examples', path: '/docs/examples', heading: 'social-media' },

  // CLI Reference
  { title: 'phantomback start', content: 'Start API server zero port config prefix chaos options', section: 'CLI Reference', path: '/docs/cli', heading: 'start' },
  { title: 'phantomback init', content: 'Generate starter phantom.config.js scaffold', section: 'CLI Reference', path: '/docs/cli', heading: 'init' },
  { title: 'Using with npx', content: 'Run without installing globally npx phantomback', section: 'CLI Reference', path: '/docs/cli', heading: 'npx' },
  { title: 'Programmatic API', content: 'Import createPhantom createPhantomZero server app store stop reset', section: 'CLI Reference', path: '/docs/cli', heading: 'programmatic' },

  // Reality Mode
  { title: 'Reality Mode', content: 'Chaos engineering simulation engine controlled instability latency failures drops', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'why' },
  { title: 'Chaos Quick Start', content: 'Enable chaos --chaos flag phantomback start zero chaos', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'quick-start' },
  { title: 'Chaos Scenarios', content: 'Latency spike failure drop corruption timeout chaos scenario', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'scenarios' },
  { title: 'Chaos Configuration', content: 'chaos enabled latency failureRate errorCodes connectionDropRate corruptionRate timeoutRate scenarios', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'configuration' },
  { title: 'Chaos CLI Flags', content: '--chaos --chaos-failure --chaos-latency command line flags', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'cli' },
  { title: 'Runtime Control API', content: '/_chaos/status enable disable pause resume configure reset endpoints', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'runtime-control' },
  { title: 'Chaos Recipes', content: 'Test loading states error handling network outage gradually increase chaos', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'recipes' },

  // Changelog
  { title: 'v1.1.0', content: 'Reality Mode chaos engineering latency failures connection drops corruption timeouts runtime control API', section: 'Changelog', path: '/docs/changelog', heading: 'v1.1.0' },
  { title: 'v1.0.0', content: 'Initial release zero-config mode 40+ field types JWT auth search filtering sorting nested routes CLI', section: 'Changelog', path: '/docs/changelog', heading: 'v1.0.0' },

  // Playground
  { title: 'Interactive Playground', content: 'Try phantomback config live in browser edit preview', section: 'Playground', path: '/docs/playground' },
];
