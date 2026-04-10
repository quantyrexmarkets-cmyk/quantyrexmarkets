#!/bin/bash
echo "Checking Dashboard.jsx for unsafe .map()..."
grep -n "\.map(" src/pages/Dashboard.jsx | head -20
echo ""
echo "Checking common issues in components..."
grep -rn "\.map(" src/components/ | grep -v "Array.isArray" | grep -v "?\.map" | head -10
