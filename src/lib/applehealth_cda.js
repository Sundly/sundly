const fs = require('fs');

// const xml2js = require('xml2js');
// var parser = new xml2js.Parser();

// const xml2js = require('xml-js');

fs.readFile(__dirname + '/export_cda.xml', function(err, data) {
  // parser.parseString(data, function (err, result) {
  //   console.log(JSON.stringify(result['ClinicalDocument']['recordTarget'][0]['patientRole'], null, 2));
  // });

  // var result = xml2js.xml2js(data, {compact: true, spaces: 2});
  // console.log(result['ClinicalDocument']['recordTarget']['patientRole']['patient']);

});


const xml2js = require('fast-xml-parser');
var jp = require('jsonpath');

var data = fs.readFileSync(__dirname + '/export_cda.xml', 'utf8');

var result = xml2js.parse(data, {
  ignoreAttributes: false,
  textNodeName : "_text",
  attributeNamePrefix : "__",
});

const patient = jp.query(result, '$.ClinicalDocument.recordTarget.patientRole..patient')[0]

const name = jp.query(patient, 'name._text')[0]
const gender = jp.query(patient, 'administrativeGenderCode.__code')[0]
const dob = jp.query(patient, 'birthTime.__value')[0]

var exp = { name, gender, dob, observations: [] }

const entries = jp.query(result, '$.ClinicalDocument.entry')[0]
const vitalSigns = jp.query(entries, '$[?(@.organizer.code.__code=="46680005")]')
const observations = jp.query(vitalSigns, '$..observation')

observations.forEach((observation) => {
  exp.observations.push({
    effectiveTime: jp.query(observation, '$.effectiveTime.low.__value')[0],
    displayName: jp.query(observation, '$.code.__displayName')[0],
    value: jp.query(observation, '$.value.__value')[0],
    unit: jp.query(observation, '$.value.__unit')[0],
  })
});

console.log(exp)
