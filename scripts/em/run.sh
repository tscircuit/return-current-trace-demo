#!/usr/bin/env bash
set -euo pipefail
case_dir="$(realpath "${1:-data/em-ddr-d8-cpu}")"
image='benvial/palace@sha256:f0f3a3cbbdf1ee2d8f856ddbe1f5bf4628a92ee8ab87d1e27dc33402ad9c8dda'
env -u DOCKER_HOST -u DOCKER_CONTEXT -u DOCKER_TLS -u DOCKER_TLS_VERIFY -u DOCKER_CERT_PATH docker --host=unix:///var/run/docker.sock run --rm --network none --user "$(id -u):$(id -g)" --cap-drop ALL --security-opt no-new-privileges --mount "type=bind,src=$case_dir,dst=/case" --workdir /case "$image" palace -np 4 palace.json
