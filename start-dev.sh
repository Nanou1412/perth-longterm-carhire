#!/bin/bash

# Perth Long-Term Car Hire - Development Server Startup Script

echo "🚗 Perth Long-Term Car Hire"
echo "================================"
echo ""

cd /Users/norchenekrb/Desktop/perth-longterm-carhire

echo "📦 Starting development server..."
echo ""
echo "The site will be available at:"
echo "  Local:   http://localhost:3000"
echo "  Network: http://192.168.1.100:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
