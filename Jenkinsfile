pipeline {
    agent any
    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }

        stage("test"){
            steps{
                sh 'sudo apt install -y npm'
                sh 'npm install mocha --save-dev'
                sh 'npm install supertest --save-dev'
                sh 'npm test'
            }
        }

        stage("build"){
            steps{
                sh 'npm run build'
            }
        }

        stage("build image"){
            steps{
                sh 'sudo docker build -t nodejs-app:latest .'
            }
        }
        stage('docker push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh 'sudo docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}'
                    sh 'sudo docker tag nodejs-app:latest rstrypa/nodejs-app:latest'
                    sh 'sudo docker push rstrypa/nodejs-app:latest'
                    sh 'sudo docker logout'
            }
        }
    }
}