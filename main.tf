provider "google" {
  project = "northstar-449004"
  region  = "us-central1"
}

resource "google_container_cluster" "gke_cluster" {
  name     = "gke-cluster"
  location = "us-central1"

  node_pool {
    name       = "default-pool"
    initial_node_count = 2

    node_config {
      machine_type = "e2-medium"
      disk_size_gb = 20
      oauth_scopes = [
        "https://www.googleapis.com/auth/cloud-platform"
      ]
    }
  }
}



