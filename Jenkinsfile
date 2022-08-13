node {
    stage('install playwright') {
        agent {
            docker {
                image 'mcr.microsoft.com/playwright:v1.24.2-focal'
            }
        }
        withNPM(npmrcConfig: '3be74b16-6550-4549-ac97-029b86afe630') {
            sh 'npm i -D @playwright/test'
            sh 'npx playwright install'
        }
    }
    stage('help') {
        withNPM(npmrcConfig: '3be74b16-6550-4549-ac97-029b86afe630') {
            sh 'npx playwright test --help'
        }
    }
    stage('test') {
        withNPM(npmrcConfig: '3be74b16-6550-4549-ac97-029b86afe630') {
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