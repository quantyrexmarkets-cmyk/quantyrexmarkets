#!/bin/bash

# The correct hexagon SVG
HEXAGON='<path d="M20 2L4 10V22L20 38L36 22V10L20 2Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.5"\/>\n                  <path d="M20 8L8 14V22L20 34L32 22V14L20 8Z" fill="#0d1117" stroke="#6366F1" strokeWidth="1.2"\/>\n                  <path d="M20 14L12 18V23L20 30L28 23V18L20 14Z" fill="#6366F1" stroke="#6366F1" strokeWidth="1"\/>'

# Find all JSX files and replace
for file in $(find src -name "*.jsx"); do
  # Remove Q logo patterns line by line
  sed -i '/Hexagon border/d' "$file"
  sed -i '/Q Circle/d' "$file"
  sed -i '/Q Tail/d' "$file"
  sed -i '/Accent dot/d' "$file"
  sed -i '/<polygon points="20,4/d' "$file"
  sed -i '/<circle cx="20" cy="18"/d' "$file"
  sed -i '/<line x1="25" y1="23"/d' "$file"
  sed -i '/<circle cx="32" cy="30"/d' "$file"
  
  echo "Processed: $file"
done

echo "✅ All Q patterns removed"
