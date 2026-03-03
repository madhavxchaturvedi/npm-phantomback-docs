export const searchIndex = [
  // Getting Started
  { title: 'Installation', content: 'Install PhantomBack globally using npm install -g phantomback', section: 'Getting Started', path: '/docs/getting-started', heading: 'installation' },
  { title: 'Zero-Config Mode', content: 'Use --zero flag to instantly get a full API with 5 pre-configured resources', section: 'Getting Started', path: '/docs/getting-started', heading: 'zero-config' },
  { title: 'Custom Configuration', content: 'Create phantom.config.js with init command for full control', section: 'Getting Started', path: '/docs/getting-started', heading: 'custom-config' },
  { title: 'Your First Request', content: 'Make requests with curl fetch or any HTTP client', section: 'Getting Started', path: '/docs/getting-started', heading: 'your-first-request' },
  { title: 'Response Format', content: 'All responses wrapped in success true false with data and meta', section: 'Getting Started', path: '/docs/getting-started', heading: 'response-format' },

  // Configuration
  { title: 'Config File', content: 'phantom.config.js config file location and format', section: 'Configuration', path: '/docs/configuration', heading: 'config-file' },
  { title: 'Config Structure', content: 'Port prefix resources fields seed auth settings', section: 'Configuration', path: '/docs/configuration', heading: 'structure' },
  { title: 'Field Types', content: '40+ built-in field types Faker.js name email phone avatar sentence paragraph number price product', section: 'Configuration', path: '/docs/configuration', heading: 'field-types' },
  { title: 'Special Field Types', content: 'Enum relation object array nested fields foreign key', section: 'Configuration', path: '/docs/configuration', heading: 'special-types' },
  { title: 'Validation Rules', content: 'Required unique min max validation for POST PUT PATCH', section: 'Configuration', path: '/docs/configuration', heading: 'validation' },
  { title: 'Auth Configuration', content: 'JWT authentication auth true protected routes register login', section: 'Configuration', path: '/docs/configuration', heading: 'auth-config' },
  { title: 'Response Latency', content: 'Simulate network latency fixed random range', section: 'Configuration', path: '/docs/configuration', heading: 'latency' },

  // API Reference
  { title: 'Info Endpoint', content: 'GET /api server info available resources configuration', section: 'API Reference', path: '/docs/api-reference', heading: 'info' },
  { title: 'CRUD Endpoints', content: 'GET POST PUT PATCH DELETE REST API endpoints', section: 'API Reference', path: '/docs/api-reference', heading: 'crud' },
  { title: 'Pagination', content: 'Page limit offset query parameters pagination', section: 'API Reference', path: '/docs/api-reference', heading: 'pagination' },
  { title: 'Filtering', content: 'Filter records field value gte lte gt lt ne like operators', section: 'API Reference', path: '/docs/api-reference', heading: 'filtering' },
  { title: 'Sorting', content: 'Sort ascending descending multi-field sort query parameter', section: 'API Reference', path: '/docs/api-reference', heading: 'sorting' },
  { title: 'Full-Text Search', content: 'Search across all string fields q= _q= search= query parameter', section: 'API Reference', path: '/docs/api-reference', heading: 'search' },
  { title: 'Field Selection', content: 'Select specific fields fields= _fields= select= query parameter', section: 'API Reference', path: '/docs/api-reference', heading: 'field-selection' },
  { title: 'Nested Routes', content: 'Auto-generated nested routes parent child relation', section: 'API Reference', path: '/docs/api-reference', heading: 'nested-routes' },
  { title: 'Health Check', content: 'Server status uptime /api/_health endpoint', section: 'API Reference', path: '/docs/api-reference', heading: 'health-check' },
  { title: 'Response Format', content: 'Data meta total page totalPages success true false error response', section: 'API Reference', path: '/docs/api-reference', heading: 'response-format' },

  // Authentication
  { title: 'Authentication Overview', content: 'JWT authentication register login protected routes setup', section: 'Authentication', path: '/docs/authentication', heading: 'overview' },
  { title: 'Auth Setup', content: 'Enable auth true on resource JWT token secret expiry', section: 'Authentication', path: '/docs/authentication', heading: 'setup' },
  { title: 'Register Endpoint', content: 'POST /api/users/register create account email password', section: 'Authentication', path: '/docs/authentication', heading: 'register' },
  { title: 'Login Endpoint', content: 'POST /api/users/login email password JWT token', section: 'Authentication', path: '/docs/authentication', heading: 'login' },
  { title: 'Current User', content: 'GET /api/users/me authenticated user profile Bearer token', section: 'Authentication', path: '/docs/authentication', heading: 'me' },
  { title: 'Protected Routes', content: 'Authorization Bearer token required protected endpoints 401', section: 'Authentication', path: '/docs/authentication', heading: 'protected-routes' },

  // Reality Mode
  { title: 'Reality Mode', content: 'Chaos engineering simulation engine controlled instability latency failures drops', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'why' },
  { title: 'Chaos Quick Start', content: 'Enable chaos --chaos flag phantomback start zero chaos', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'quick-start' },
  { title: 'Chaos Header', content: 'X-PhantomBack-Chaos active response header detection', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'chaos-header' },
  { title: 'Chaos Scenarios', content: 'Drop timeout failure corruption latency chaos scenario priority', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'scenarios' },
  { title: 'Chaos Configuration', content: 'chaos enabled latency failureRate errorCodes connectionDropRate corruptionRate timeoutRate scenarios', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'configuration' },
  { title: 'Chaos CLI Flags', content: '--chaos --chaos-failure --chaos-latency command line flags', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'cli' },
  { title: 'Runtime Control API', content: '/api/_chaos status enable disable pause resume configure reset endpoints', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'runtime-control' },
  { title: 'Chaos Recipes', content: 'Test loading states error handling network outage gradually increase chaos', section: 'Reality Mode', path: '/docs/reality-mode', heading: 'recipes' },

  // Programmatic API
  { title: 'Programmatic API', content: 'Import createPhantom createPhantomZero library Node.js', section: 'Programmatic API', path: '/docs/programmatic-api', heading: 'overview' },
  { title: 'createPhantom', content: 'Full config createPhantom port prefix resources chaos auth', section: 'Programmatic API', path: '/docs/programmatic-api', heading: 'create-phantom' },
  { title: 'createPhantomZero', content: 'Zero config createPhantomZero instant 5 resources', section: 'Programmatic API', path: '/docs/programmatic-api', heading: 'create-phantom-zero' },
  { title: 'Server Object', content: 'server.app server.store server.stop server.reset server.getChaos', section: 'Programmatic API', path: '/docs/programmatic-api', heading: 'server-object' },
  { title: 'DataStore Methods', content: 'getAll getById create update delete query filter search', section: 'Programmatic API', path: '/docs/programmatic-api', heading: 'datastore' },
  { title: 'ChaosEngine Methods', content: 'enable disable pause resume configure getStatus resetStats', section: 'Programmatic API', path: '/docs/programmatic-api', heading: 'chaos-engine' },

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

  // Changelog
  { title: 'v2.0.0', content: 'Documentation redesign Authentication page Programmatic API page terminology fixes fields seed latency', section: 'Changelog', path: '/docs/changelog', heading: 'v2.0.0' },
  { title: 'v1.1.0', content: 'Reality Mode chaos engineering latency failures connection drops corruption timeouts runtime control API', section: 'Changelog', path: '/docs/changelog', heading: 'v1.1.0' },
  { title: 'v1.0.0', content: 'Initial release zero-config mode 40+ field types JWT auth search filtering sorting nested routes CLI', section: 'Changelog', path: '/docs/changelog', heading: 'v1.0.0' },

  // Playground
  { title: 'Interactive Playground', content: 'Try phantomback config live in browser edit preview', section: 'Playground', path: '/docs/playground' },
];
