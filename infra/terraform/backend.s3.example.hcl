# Copy to backend.s3.hcl and customize values.
# Do not reuse the API stack key. Use a dedicated key for this landing stack.

bucket       = "akep-tfstate-8620xxxx1422"
key          = "staging/landing-page/terraform.tfstate"
region       = "af-south-1"
encrypt      = true
use_lockfile = true
