#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd -P)"
PROJECT_DIR="${SCRIPT_DIR}"
PID_FILE="${PROJECT_DIR}/.docusaurus-dev.pid"
LOG_FILE="${PROJECT_DIR}/.docusaurus-dev.log"
HOST="0.0.0.0"
PORT="3000"
ACTION="start"

usage() {
  cat <<'EOF'
Usage:
  ./npm.sh [start|stop|restart|status] [--host HOST] [--port PORT]

Examples:
  ./npm.sh
  ./npm.sh start --port 3000
  ./npm.sh status
  ./npm.sh stop
EOF
}

if [[ $# -gt 0 ]]; then
  case "${1}" in
    start|stop|restart|status)
      ACTION="${1}"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
  esac
fi

while [[ $# -gt 0 ]]; do
  case "${1}" in
    --host)
      HOST="${2:-}"
      shift 2
      ;;
    --port)
      PORT="${2:-}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: ${1}" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "${HOST}" || -z "${PORT}" ]]; then
  echo "Error: --host and --port cannot be empty." >&2
  exit 1
fi

if ! [[ "${PORT}" =~ ^[0-9]+$ ]]; then
  echo "Error: --port must be a number." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm not found in PATH." >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "Error: curl not found in PATH." >&2
  exit 1
fi

get_pid() {
  if [[ -f "${PID_FILE}" ]]; then
    cat "${PID_FILE}" 2>/dev/null || true
  fi
}

pid_running() {
  local pid="$1"
  [[ -n "${pid}" ]] && kill -0 "${pid}" 2>/dev/null
}

wait_until_up() {
  local attempts=90
  local url="http://127.0.0.1:${PORT}"
  for _ in $(seq 1 "${attempts}"); do
    if curl -fsS "${url}" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  return 1
}

port_in_use_by_other() {
  local pid="$1"
  if ! command -v lsof >/dev/null 2>&1; then
    return 1
  fi
  local listeners
  listeners="$(lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -z "${listeners}" ]]; then
    return 1
  fi
  if [[ -n "${pid}" ]] && echo "${listeners}" | awk 'NR>1 {print $2}' | grep -qx "${pid}"; then
    return 1
  fi
  echo "${listeners}"
  return 0
}

start_server() {
  local pid
  pid="$(get_pid)"

  if pid_running "${pid}"; then
    echo "Docusaurus is already running (PID ${pid})."
    echo "URL: http://127.0.0.1:${PORT}"
    echo "Log: ${LOG_FILE}"
    return 0
  fi

  rm -f "${PID_FILE}"

  local busy
  busy="$(port_in_use_by_other "${pid}" || true)"
  if [[ -n "${busy}" ]]; then
    echo "Error: port ${PORT} is already in use by another process:" >&2
    echo "${busy}" >&2
    exit 1
  fi

  (
    cd "${PROJECT_DIR}"
    nohup npm run start -- --host "${HOST}" --port "${PORT}" > "${LOG_FILE}" 2>&1 &
    echo $! > "${PID_FILE}"
  )

  pid="$(get_pid)"
  echo "Starting Docusaurus (PID ${pid}) ..."

  if wait_until_up; then
    echo "Ready: http://127.0.0.1:${PORT}"
    echo "Log: ${LOG_FILE}"
    return 0
  fi

  if pid_running "${pid}"; then
    echo "Started, but not ready yet. Check log: ${LOG_FILE}" >&2
    return 1
  fi

  echo "Failed to start. Last log lines:" >&2
  tail -n 80 "${LOG_FILE}" >&2 || true
  return 1
}

stop_server() {
  local pid
  pid="$(get_pid)"
  if ! pid_running "${pid}"; then
    rm -f "${PID_FILE}"
    echo "No running Docusaurus process found."
    return 0
  fi

  echo "Stopping Docusaurus (PID ${pid}) ..."
  kill "${pid}" || true
  for _ in $(seq 1 20); do
    if ! pid_running "${pid}"; then
      rm -f "${PID_FILE}"
      echo "Stopped."
      return 0
    fi
    sleep 0.5
  done

  echo "Force stopping PID ${pid} ..."
  kill -9 "${pid}" || true
  rm -f "${PID_FILE}"
  echo "Stopped."
}

status_server() {
  local pid
  pid="$(get_pid)"
  if pid_running "${pid}"; then
    echo "Running (PID ${pid})"
    echo "URL: http://127.0.0.1:${PORT}"
    echo "Log: ${LOG_FILE}"
    return 0
  fi

  rm -f "${PID_FILE}"
  echo "Not running."
  local busy
  busy="$(port_in_use_by_other "" || true)"
  if [[ -n "${busy}" ]]; then
    echo "Note: port ${PORT} is currently used by another process:"
    echo "${busy}"
  fi
}

case "${ACTION}" in
  start)
    start_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    stop_server
    start_server
    ;;
  status)
    status_server
    ;;
  *)
    echo "Unknown action: ${ACTION}" >&2
    usage
    exit 1
    ;;
esac
