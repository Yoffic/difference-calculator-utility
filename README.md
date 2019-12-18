# Difference calculator
[![Maintainability](https://api.codeclimate.com/v1/badges/58160e9f536148295794/maintainability)](https://codeclimate.com/github/Yoffic/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/58160e9f536148295794/test_coverage)](https://codeclimate.com/github/Yoffic/frontend-project-lvl2/test_coverage)
[![Build Status](https://travis-ci.com/Yoffic/frontend-project-lvl2.svg?branch=master)](https://travis-ci.com/Yoffic/frontend-project-lvl2)

## This is a console utility to compare files.   
### To start using the utility first clone this package. Then run these commands:
```
make install
make publish
npm link
```   

For any help run:   

```
gendiff -h
```   

To compare two files run:   

```
gendiff FILENAME1 FILENAME2

```   

Where `FILENAME1` is the name of the first file to compare and `FILENAME2` is the name of the second file. Keep in mind that files must be the same type.

### The example of how the Difference Calculator works with simple files  
[![asciicast](https://asciinema.org/a/DfCTXz6feBOI9YAlSfMuquBTa.svg)](https://asciinema.org/a/DfCTXz6feBOI9YAlSfMuquBTa)   

[![asciicast](https://asciinema.org/a/iSjYcbCDl4pq7z4GKwwzlLVsZ.svg)](https://asciinema.org/a/iSjYcbCDl4pq7z4GKwwzlLVsZ)

[![asciicast](https://asciinema.org/a/KLCWAkQXBkAimcIdG8P49K6hJ.svg)](https://asciinema.org/a/KLCWAkQXBkAimcIdG8P49K6hJ)   

## Output format
You can specify output format of differences

To specify output format add `--format` flag and type of the output:   

```
gendiff --format [type] FILENAME1 FILENAME2

```   

Where `[type]` could be 'complex', 'plain' or 'json', `FILENAME1` is the name of the first file to compare and `FILENAME2` is the name of the second file. Keep in mind that files must be the same type.

### The example of complex output format type
[![asciicast](https://asciinema.org/a/mtYuH1DidHffvW1T7Hh78eXJV.svg)](https://asciinema.org/a/mtYuH1DidHffvW1T7Hh78eXJV)   

### The example of plain output format type
[![asciicast](https://asciinema.org/a/D7JdBnhrwLa55vDZZaHX3WiJD.svg)](https://asciinema.org/a/D7JdBnhrwLa55vDZZaHX3WiJD)   

### The example of JSON output format type   
[![asciicast](https://asciinema.org/a/DvnkfxqbqJqE9b0OgkP7rPzMu.svg)](https://asciinema.org/a/DvnkfxqbqJqE9b0OgkP7rPzMu)
