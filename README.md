**Overview**
It includes steps to deploy a Node.js(00.js) application in a Google Kubernetes Engine (GKE) cluster using Terraform. The setup includes:

Deploying the application as a Docker container. (gcr.io/northstar-449004/new-app)
Using an external load balancer to expose the app. (34.60.206.146)
Injecting the SECRET_WORD environment variable.
Enabling TLS with locally generated certificates.

Note: Modified the 000.js and created 00.js with TLS certificates and port 443.

**Prerequisites**

Terraform
Google Cloud SDK (gcloud)
kubectl (for Kubernetes management)
Docker (for building and pushing images)
OpenSSL (for generating TLS certificates)

**1. Set Up GCP and Terraform**
**1.1 Authenticate to GCP**

gcloud auth login
gcloud auth application-default login
gcloud config set project northstar-449004

**1.2 Enabled Required APIs**

gcloud services enable container.googleapis.com
gcloud services enable compute.googleapis.com

**2. Create GKE Cluster with Terraform**
**2.1 Define Terraform Configuration**

Created a main.tf file 

**2.2 Initialized and Deployed Terraform**

terraform init
terraform apply -auto-approve

**3. Build and Push Docker Image**
**3.1 Build Docker Image**

docker build -t gcr.io/northstar-449004/new-app:4.0 .

**3.2 Push Image to Google Artifacrory Registry**

docker push gcr.io/northstar-449004/new-app:4.0

**4. Deploy Application in GKE
4.1 Created Kubernetes Deployment**

 deployment.yaml

**4.2 Deploy to GKE**

kubectl apply -f deployment.yaml

**5. Expose the App with Load Balancer**
 
service is in the same file deployment.yaml

  ports:
    - protocol: TCP
      port: 443  # TLS port
      targetPort: 443
  type: LoadBalancer

kubectl get svc

**6. Generated TLS Certificates**

created a self-signed certificate:
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=quest-app"

Create a Kubernetes secret
kubectl create secret tls tls-secret --key tls.key --cert tls.crt

**8. Verify Deployment**

Public Cloud: http://<EXTERNAL_IP>/
Docker Check: http://<EXTERNAL_IP>/docker
Secret Word: http://<EXTERNAL_IP>/secret_word
Load Balancer: http://<EXTERNAL_IP>/loadbalanced
TLS Check: https://quest-app.example.com/tls


**9. Cleanup**

To delete everything:

terraform destroy -auto-approve

**Result:**

Successfully deployed the Node.js app on GKE with:
Docker container
Terraform-managed infrastructure
GCP Load Balancer
TLS encryption
Environment variable injection



**Note: The GKE Cluster and the webpage(https://34.60.206.146/) is available to access and check till Monday (10/3.2024) EOD**
