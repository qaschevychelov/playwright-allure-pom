node {
    stage('install playwright') {
        withNPM(npmrcConfig: 'MyNpmrcConfig') {
            sh 'npm i -D @playwright/test'
            sh 'npx playwright install'
        }
    }
    stage('help') {
        withNPM(npmrcConfig: 'MyNpmrcConfig') {
            sh 'npx playwright test --help'
        }
    }
    stage('test') {
        withNPM(npmrcConfig: 'MyNpmrcConfig') {
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