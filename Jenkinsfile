pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
  
          stage('Docker Build') {
            steps {
                script {
                    docker.build("testAPP"${BUILD_NUMBER}")
                    // Construye la imagen de Docker con una etiqueta usando el número de compilación
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application on Docker'
                sh 'docker run -p 8083:80 -d todo-app'
            }
        }
    }
}
