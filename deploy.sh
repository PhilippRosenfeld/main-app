#!/bin/bash
RASPBERRY="mezzanine@raspberrypi"
DEPLOY_DIR="/home/mezzanine/apps"

echo "Building Angular..."
ng build --configuration production

echo "Copying to Raspberry..."
ssh $RASPBERRY "mkdir -p $DEPLOY_DIR/main-app"
scp -r dist/main-app/browser/* $RASPBERRY:$DEPLOY_DIR/main-app/

echo "Done!"