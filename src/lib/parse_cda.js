const xml2js = require('fast-xml-parser');
const jp = require('jsonpath');
const moment = require('moment');
const _ = require('lodash');

export default (data) => {
  const result = xml2js.parse(data, {
    ignoreAttributes: false,
    textNodeName : "_text",
    attributeNamePrefix : "__",
  });

  const profile = getProfile(result)
  const timeline = getTimeline(result)

  return { profile, timeline }
}

function getProfile(result) {
  const patient = jp.query(result, '$.ClinicalDocument.recordTarget.patientRole..patient')[0]
  const name = jp.query(patient, 'name._text')[0]
  const firstName = name.split(' ')[0]
  const lastName = name.split(' ')[1] || ''
  const sex = jp.query(patient, 'administrativeGenderCode.__code')[0].toLowerCase()
  const birthTime = jp.query(patient, 'birthTime.__value')[0]
  const dob = moment(birthTime, 'YYYYMMDD').format()

  return { firstName, lastName, sex, dob }
}

function getTimeline(result) {
  const entries = jp.query(result, '$.ClinicalDocument.entry')[0]
  const vitalSigns = jp.query(entries, '$[?(@.organizer.code.__code=="46680005")]')
  const observations = jp.query(vitalSigns, '$..observation')
  const keys = {
    'Height': 'height',
    'Body weight Measured': 'weight',
    'Heart rate': 'heart_rate',
    'Body Temperature': 'temperature'
  }
  const obTimeline = observations.map((observation) => {
    const effectiveTime = jp.query(observation, '$.effectiveTime.low.__value')[0]
    const datetime = moment(effectiveTime, 'YYYYMMDDTHHmmss-Z').format()
    const name = jp.query(observation, '$.code.__displayName')[0]
    const value = jp.query(observation, '$.value.__value')[0]
    // ToDo: Convert value scale based on units
    // const unit = jp.query(observation, '$.value.__unit')[0]

    return { datetime, [keys[name]]: value}
  })
  const timeline = _.map(_.groupBy(obTimeline, 'datetime'), ob => _.reduce(ob, (acc, e) => _.assign(acc, e), {}))

  return timeline
}
