def gitBranch = env.BRANCH_NAME
def gitURL = "git@github.com:Memphisdev/memphis-cli.git"
def repoUrlPrefix = "memphisos"

node ("small-ec2-fleet") {
  git credentialsId: 'main-github', url: gitURL, branch: gitBranch
  
  try{
    stage('NPM Install') {
      sh 'npm install pkg -g'
      sh 'pkg package.json'
    }

    stage('Create tar') {
      sh 'mv release/memphis-dev-cli-macos release/mem'
      sh 'tar -czf mem.tar.gz release/mem'
      sh "sha256sum mem.tar.gz | awk '{print $1}' > sha256"
    }

    stage('Create new release') {
      sh(script:"""jq -r '"v" + .version' package.json > version.conf""", returnStdout: true)
      sh(script:"""gh release create \$(cat version.conf) ./mem.tar.gz --generate-notes -d""", returnStdout: true)
    }
    stage('Push to NPM') {

    }

    stage('Push to BREW') {

    }
    notifySuccessful()

  } catch (e) {
      currentBuild.result = "FAILED"
      cleanWs()
      notifyFailed()
      throw e
  }
}

def notifySuccessful() {
  emailext (
      subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}

def notifyFailed() {
  emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
