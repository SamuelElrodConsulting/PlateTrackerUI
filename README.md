# PlateTrackerUI

Plate Tracker for Metal Plating tracking and analysis

## Development server

Run `ng serve --proxy-config proxy.json` 

## proxy.json

The above command utilized a proxy.json file for development on localhost to easily communicate with the backend APi

### proxy.json example

Note that target will be localhost and the port the .net core server is running on

{
    "/api": {
        "target": "http://localhost:50371/",      
        "secure": false,
      "pathRewrite": {
        "^/api": ""
      },
      "changeOrigin": true,
      "logLevel": "debug"
    }
  }
