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
                sh 'sudo docker build -t nodejs-app:1.0 .'
            }
        }
        stage('docker push') {
            steps {
                script {
                 withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    sh 'sudo docker login -u rstrypa -p ${dockerhubpwd}'
                 }  
                    sh 'sudo docker push rstrypa/nodejs-app'
                }
            }
        }
    }
}