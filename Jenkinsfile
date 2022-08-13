node {
    stage('install playwright') {
      script {
        sh 'npm i -D @playwright/test'
        sh 'npx playwright install'
      }
    }
    stage('help') {
      script {
        sh 'npx playwright test --help'
      }
    }
    stage('test') {
      script {
        sh 'npm run test'
      }
    }
    stage('reports') {
        script {
            allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
			])
		}		
	}
  }