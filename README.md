# save-resp

Simple CLI tool for making ajax request then save the response to a local file system. Can be configured to run on an interval over a given amount of time. Depending on the content-type header the response will be saved as `.json`, `.xml` or `.txt`.

## Usage
The follow will make a request to a given url every second a period of 10 seconds while saving each response to the `/Users/me` directory.

```js
  save-resp -u "<ENDPOINT_URL>" "data" -t 10000 -i 1000 -o "/Users/me/"
```

## Install
```js
  npm install --save save-resp
```

## Options

| option                | description                                                                                                                            |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| -h, --help            | Display this usage guide.                                                                                                              |
| -u, --url string      | URL to make request to.                                                                                                                |
| -o, --out string      | Path to where you want to store responses. Default is current dir.                                                                     |
| -i, --interval number | Interval at which URL will be called.                                                                                                  |
| -t, --timeout number  | Period of time you wish to make ajax calls. Interval is required.                                                                      |
| -p, --prefix string   | Prefix for filename. Ex: data_1528231421562.json                                                                                       |
| -s, --timestamp       | Use timestamp or date in filename, Ex: data_1528231421562.json vs,data_Tue_Jun_05_2018_21:57:20_GMT-0400_(EDT).json. Default is false. |