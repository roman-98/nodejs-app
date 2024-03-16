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
                sh 'echo "password" | sudo -S apt install -y npm'
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
                sh 'docker build -t nodejs-app:1.0 .'
            }
        }
        stage("docker push") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                    sh 'docker tag nodejs-app:1.0 romanstripa/nodejs-app'
                    sh 'docker push romanstripa/nodejs-app:1.0'
                    sh 'docker logout'
                }
            }
        }
    }
}