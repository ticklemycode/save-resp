const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.' },
  { name: 'url', alias: 'u', type: String, description: 'URL to make request to.' },
  { name: 'out', alias: 'o', type: String, description: 'Path to where you want to store responses. Default is current dir.' },
  { name: 'interval', alias: 'i', type: Number, description: 'Interval at which URL will be called.' },
  { name: 'timeout', alias: 't', type: Number, description: 'Period of time you wish to make ajax calls. Interval is required.' },
  { name: 'prefix', alias: 'p', type: String, description: 'Prefix for filename. Ex: data_1528231421562.json' },
  { name: 'timestamp', alias: 's', type: Boolean, defaultValue: false, description: 'Use timestamp or date in filename, Ex: data_1528231421562.json vs data_Tue_Jun_05_2018_21:57:20_GMT-0400_(EDT).json. Default is false.' }
];

const sections = [
  {
    header: 'Save Response',
    content: [
      'Make an ajax request and save the JSON, XML or TXT response to the local file system.'
    ]
  },
  {
    header: 'Synopsis',
    content: [
      '$ save-resp {bold --url} <URL> {bold --out} <path>',
      '$ save-resp {bold --url} <URL> {bold --out} <path> [{bold --interval} {underline ms}] [{bold --timeout} {underline ms}]',
      '$ save-resp {bold --help}'
    ]
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
];

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(sections);

if(options.help){
  console.log(usage);
}

module.exports = options;