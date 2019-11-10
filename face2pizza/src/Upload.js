import React from 'react';


class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
      picture: null,
      res: null,
    }
    this.fileChanged = this.fileChanged.bind(this);
  }

  fileChanged = (event) => {
    const file = event.target.files[0];
    this.setState({
      picture: file,
    });
  }

  submitPicture = (event) => {
    const  fileType = this.state.picture['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (validImageTypes.includes(fileType)) {

        this.state.success = true;

  //'use strict';

  const request = require('request');

  // Replace <Subscription Key> with your valid subscription key.
  const subscriptionKey = 'f0fdfc418d304f1bbed171db474cf17f';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
  const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

  const imageUrl = 'https://cdn.newsapi.com.au/image/v1/d55a797470d890e2bdffc34d3885e6e8';
    // Request parameters.
  const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 
        'emotion'
  };

  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };

  request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    console.log('JSON Response\n');
    console.log(jsonResponse);
    this.setState.res = {
      happy: `${jsonResponse[0].faceAttributes.emotion.happiness}`,
    };
  });
}
}
render(){
  return (
    <React.Fragment>
          <div class="form-group">
            <label for="picture">Attach a picture of yourself</label>
              <input 
                  type="file" 
                  class="form-control-file" 
                  id="picture"            
                  onChange={this.fileChanged}
                  required
                />
            <button className="btn btn-primary" onClick={this.submitPicture}>Upload!</button>
    </div>
    </React.Fragment>
  );
}
}

export default Upload;