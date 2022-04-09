/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START drive_upload_appdata]
const fs = require('fs');
const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');

const auth = new GoogleAuth({scopes: 'https://www.googleapis.com/auth/drive.appdata'});

/**
 * Insert a file in the application data folder and prints file Id.
 * @param {Googleauth} auth The Google default authenticated .
 * */
function upload_appdata(auth) {
    const service = google.drive({version: 'v2', auth});
    const fileMetadata = {
        'title': 'config.json',
        'parents': [{
            'id': 'appDataFolder',
        }],
    };
    const media = {
        mimeType: 'application/json',
        body: fs.createReadStream('config.json'),
    };
    service.files.insert({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    }, function(err, file) {
        if (err) {
            console.error('The API returned an error: ' + err);
        } else {
            console.log('Folder Id:', file.data.id);
        }
    });
}
// [END drive_upload_appdata]

upload_appdata(auth);

