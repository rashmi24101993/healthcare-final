/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const Transcrypt = require('./lib/transcrypt');
const Doctor = require('./lib/doctor')
const Patient = require('./lib/patient')


module.exports.Transcrypt = Transcrypt;
module.exports.Doctor = Doctor;
module.exports.Patient = Patient;
module.exports.contracts = [ Transcrypt, Doctor, Patient ];
