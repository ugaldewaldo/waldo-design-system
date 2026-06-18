#!/usr/bin/env bash
# In-session DS alert — for use as a Claude Code PostToolUse hook.
# Reads the hook JSON on stdin; when the edited file is a DS .tsx or index.html,
# runs the relevant validator and, on a finding, emits {"systemMessage": …} so
# the user is alerted DURING the session (not only at commit). Non-blocking.
#
# Wire it (settings.local.json, machine-specific path):
#   "PostToolUse": [{ "matcher": "Edit|Write|MultiEdit",
#     "hooks": [{ "type": "command",
#       "command": "bash /ABS/PATH/waldo-design-system/tools/ds-edit-alert.sh" }] }]

DS="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
f="$(jq -r '.tool_input.file_path // empty' 2>/dev/null)"
[ -z "$f" ] && exit 0
case "$f" in *waldo-design-system*) : ;; *) exit 0 ;; esac

emit() { printf '%s\n' "$(jq -nc --arg m "$1" '{systemMessage:$m}')"; }

case "$f" in
  */index.html)
    if ! out="$(node "$DS/tools/lint-index.js" 2>&1)"; then
      emit "⚠ DS · index.html edit — lint-index found an issue (a demo with no backing .tsx):
$(printf '%s' "$out" | grep '✗' | head -5)"
    fi
    ;;
  *.tsx)
    if ! out="$(node "$DS/tools/detect.js" "$f" 2>&1)"; then
      emit "⚠ DS · $(basename "$f") — detect.js found violations:
$(printf '%s' "$out" | grep '✗' | head -6)"
    fi
    ;;
esac
exit 0
