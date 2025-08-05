export const uxPatterns = [
  {
    id: 1,
    name: 'Navigation',
    category: 'Structure',
    patterns: [
      {
        name: 'Breadcrumbs',
        description: 'Hierarchical navigation path',
        states: ['default', 'hover', 'active'],
        code: `<nav className="breadcrumbs">
  <a href="/">Home</a>
  <span>/</span>
  <a href="/products">Products</a>
  <span>/</span>
  <span>Current</span>
</nav>`
      },
      {
        name: 'Tab Navigation',
        description: 'Content switching interface',
        states: ['default', 'hover', 'active', 'disabled'],
        code: `<div className="tabs">
  <button className="tab active">Overview</button>
  <button className="tab">Details</button>
  <button className="tab">Settings</button>
</div>`
      }
    ]
  },
  {
    id: 2,
    name: 'Forms',
    category: 'Input',
    patterns: [
      {
        name: 'Floating Labels',
        description: 'Animated input labels',
        states: ['empty', 'focused', 'filled', 'error'],
        code: `<div className="floating-label">
  <input type="text" id="email" />
  <label htmlFor="email">Email Address</label>
</div>`
      },
      {
        name: 'Toggle Switch',
        description: 'Binary state control',
        states: ['off', 'on', 'disabled'],
        code: `<label className="toggle">
  <input type="checkbox" />
  <span className="slider"></span>
</label>`
      }
    ]
  },
  {
    id: 3,
    name: 'Feedback',
    category: 'Communication',
    patterns: [
      {
        name: 'Toast Notifications',
        description: 'Temporary status messages',
        states: ['info', 'success', 'warning', 'error'],
        code: `<div className="toast success">
  <span>Successfully saved!</span>
  <button className="close">×</button>
</div>`
      },
      {
        name: 'Progress Indicators',
        description: 'Loading and completion states',
        states: ['loading', 'progress', 'complete', 'error'],
        code: `<div className="progress">
  <div className="progress-bar" style={{width: '75%'}}></div>
</div>`
      }
    ]
  },
  {
    id: 4,
    name: 'Data Display',
    category: 'Information',
    patterns: [
      {
        name: 'Data Tables',
        description: 'Structured information display',
        states: ['default', 'hover', 'selected', 'sorting'],
        code: `<table className="data-table">
  <thead>
    <tr><th>Name</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Item 1</td><td>Active</td></tr>
  </tbody>
</table>`
      },
      {
        name: 'Cards',
        description: 'Content containers',
        states: ['default', 'hover', 'selected', 'loading'],
        code: `<div className="card">
  <img src="image.jpg" alt="Card" />
  <div className="card-content">
    <h3>Card Title</h3>
    <p>Card description</p>
  </div>
</div>`
      }
    ]
  }
] 