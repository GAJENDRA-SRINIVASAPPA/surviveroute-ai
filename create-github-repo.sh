#!/bin/bash

# SurviveRoute AI - GitHub Repository Creator
# This script will help you create the repository on GitHub

echo "🚀 SurviveRoute AI - GitHub Repository Setup"
echo "=============================================="
echo ""
echo "📋 Repository Details:"
echo "   Name: surviveroute-ai"
echo "   Owner: GAJENDRA-SRINIVASAPPA"
echo "   Description: Revolutionary navigation and survival intelligence platform"
echo ""
echo "🌐 Opening GitHub in your browser..."
echo ""

# Open GitHub new repository page
open "https://github.com/new"

echo "✅ Browser opened!"
echo ""
echo "📝 Please fill in the form:"
echo "   1. Repository name: surviveroute-ai"
echo "   2. Description: Revolutionary navigation and survival intelligence platform - Never get stranded, even without internet"
echo "   3. Choose: Public"
echo "   4. ❌ DO NOT check any boxes (no README, .gitignore, or license)"
echo "   5. Click 'Create repository'"
echo ""
echo "⏳ After creating the repository, press ENTER to continue..."
read -p ""

echo ""
echo "🔗 Setting up Git remote..."
cd /Users/gajendra/Documents/GitHub/Automation-of-All

# Remove existing remote if any
git remote remove origin 2>/dev/null

# Add new remote
git remote add origin https://github.com/GAJENDRA-SRINIVASAPPA/surviveroute-ai.git

echo "✅ Remote added!"
echo ""
echo "📤 Pushing code to GitHub..."

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your code is now on GitHub!"
    echo ""
    echo "🌐 View your repository:"
    echo "   https://github.com/GAJENDRA-SRINIVASAPPA/surviveroute-ai"
    echo ""
    echo "🚀 Opening your repository..."
    open "https://github.com/GAJENDRA-SRINIVASAPPA/surviveroute-ai"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   1. Did you create the repository on GitHub?"
    echo "   2. Is your GitHub authentication set up?"
    echo ""
    echo "💡 Try running these commands manually:"
    echo "   git remote add origin https://github.com/GAJENDRA-SRINIVASAPPA/surviveroute-ai.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi

# Made with Bob
