const xml2js = require('fast-xml-parser');
const jp = require('jsonpath');

module.exports = (data) => {
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

  return exp;
}
