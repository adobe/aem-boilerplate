module.exports = {
  ci: {
    collect: {
        startServerCommand: 'npx hlx up',
        url: ['http://localhost:3000']
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
      }
    },
  },
};