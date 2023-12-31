import { toMiniGifView } from './gif-views.js';

/**
 * Generated HTML for Upload view box
 * @return {string} HTML
 */
const toUploadView = () => `
    <div id="upload-box">
      <h2>Add new GIFs to your nest:</h2>
      <label for="file" class="custom-file-upload">
        Choose file
      </label>
      <input id="file" type="file" name="file" required />
      <input type="submit" value="Upload" class="submit"/></br>
      <span id="file-name"></span>
      <div id="upload-result"></div>
    </div>
`;

/**
 * Generates HTML for My uploads box
 * @param {GIF[]} uploads array of uploaded GIFs
 * @return {string} HTML
 */
export const toMyUploadsView = (uploads) => `
        ${uploads.map(toMiniGifView).join('') || '<p>You haven\'t uploaded any GIFs yet.</p><p>Click above to upload your first!</p>'}
`;

/**
 * Generates HTML for Profile page
 * @param {GIF[]} uploads array of uploaded GIFs
 * @return {string} HTML
 */
export const toProfileView = (uploads) => `
  <div id="profile">
    <h1>Welcome to your GIFlamingo nest!</h1>
      ${toUploadView()}
      <div id="uploaded">
        <h2>Check out what's already in your nest:</h2>
        <div class="content">
        ${toMyUploadsView(uploads)}
        </div>
        <div><a href=# class="empty-nest">Empty my nest</a></div>
    </div>
  </div>
`;

/**
 * Generates HTML for Successful upload message
 * @return {string} HTML
 */
export const toUploadViewSuccess = () => {
  return `<p>GIF successfully uploaded!</p>`;
};

/**
 * Generates HTML for Unsuccessful upload message
 * @param {*} error error message
 * @return {string} HTML
 */
export const toUploadViewError = (error) => `<p>Uh-oh! That didn\'t work out...   ${error}</p>`;
