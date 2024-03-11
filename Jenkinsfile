pipeline {
    agent {
        docker { image 'node' }
    }
    tools {nodejs "node"}
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'npm install' // Instala las dependencias de Node.js
            }
        }
    
        stage('Docker Build') {
            steps {
                script {
                    docker.build('vuejs_app:latest') // Construye la imagen Docker
                }
            }
        }
    }
}
