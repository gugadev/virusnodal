const { createReadStream } = require('fs')
const got = require('got')
const FormData = require('form-data')

const URI = 'https://www.virustotal.com/vtapi/v2/file'
const KEY = 'd347c2a806b7a057d70ac4d97556b1e1804f35d0d765d0ff0ac258b1c97a76a8'

/**
 * Upload a file and analyze it.
 * @param {string} path file path
 * @param {function} onProgress callback to call on progress
 * @return {string} resource id of the scan
 */
exports.analyze = async (path, onProgress) => {
  const form = new FormData()
  form.append("file", createReadStream(path))
  form.append("apikey", KEY)

  const request =
    got
      .post(`${URI}/scan`, { body: form })
      .on('uploadProgress', ({ percent }) => {
        onProgress(Math.floor(percent * 100))
      })
  const response = await request
  return response.body.resource
}

/**
 * Get the an analysis' report
 * @param {string} resource the resource id of the scan
 * @return {object} containing scans, positives and total results.
 */
exports.getReport = async (resource) => {
  const response = await got(`${URI}/report?apikey=${KEY}&resource=${resource}`)
  const {
    positives,
    total,
    scans,
  } = JSON.parse(response.body)
  return { positives, total, scans }
}
