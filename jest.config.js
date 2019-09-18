module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  testMatch: ['<rootDir>/app/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^.+\\.(css|scss|less)$': 'identity-obj-proxy'
  }
}
