'use strict';

const { Contract } = require('fabric-contract-api');

class Transcrypt extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const patients = [
            {
            	  patientName: 'Rashmi Maheshwari',
            	  age: '26',
            	  contactNumber: '802206361',
            	  emergencyContact: '9406372036',
            
            },
            {
            	  patientName: 'Arundhati Ajaria',
            	  age: '29',
            	  contactNumber: '802206362',
            	  emergencyContact: '9978564858',
            
            },
            {
            	  patientName: 'Jai Prakash',
            	  age: '27',
            	  contactNumber: '8879652135',
            	  emergencyContact: '9406372011',
            
            },
            
        ];
        const doctors = [
            {
                doctorName: 'abc',
                specialization: 'ENT',
                aadharNumber: '1010101010',
                contactNumber: '8899665522',

            },
            {
                doctorName: 'xyz',
                specialization: 'Gyno',
                aadharNumber: '1010256345',
                contactNumber: '9406356231',

            },
        ];

        for (let i = 0; i < patients.length; i++) {
            patients[i].docType = 'patient';
            await ctx.stub.putState('PATIENT' + i, Buffer.from(JSON.stringify(patients[i])));
            console.info('Added <--> ', patients[i]);
        }
         for (let j = 0; j < doctors.length; j++) {
            doctors[j].docType = 'doctor';
            await ctx.stub.putState('DOCTOR' + j, Buffer.from(JSON.stringify(doctors[j])));
            console.info('Added <--> ', doctors[j]);
        }

        console.info('============= END : Initialize Ledger ===========');
    }

}

module.exports = Transcrypt;
