'use strict';

const { Contract } = require('fabric-contract-api');

class Transcrypt extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const patients = [
            {
                  aadharNumberP: '123456789',
                  patientName: 'Rashmi Maheshwari',
                  emailP: 'rashmi@gmail.com',
                  passwordp: 'rrrr',
            	  age: '26',
            	  contactNumber: '802206361',
            	  emergencyContact: '9406372036',
            
            },
            {     aadharNumberP: '234567890',
                  patientName: 'Arundhati Ajaria',
                  emailP : 'arundhati@gmail.com',
                  passwordd: 'aaaa',
            	  age: '29',
            	  contactNumber: '802206362',
            	  emergencyContact: '9978564858',
            
            },
            {
                  aadharNumberP:'345678901',
                  patientName: 'Jai Prakash',
                  emailP: 'jai@gmail.com',
                  passwordp: 'jjjj',
            	  age: '27',
            	  contactNumber: '8879652135',
            	  emergencyContact: '9406372011',
            
            },
            
        ];
        const doctors = [
            {   
                licenseId:'123456',
                doctorName: 'abc',
                emailD: 'abc@gmail.com',
                passwordd:'aabbcc',
                specialization: 'ENT',
                aadharNumberD: '1010101010',
                contactNumber: '8899665522',

            },
            {   
                licenseId: '234567',
                doctorName: 'xyz',
                emailD: 'xyz@gmail.com', 
                passwordd:'xxyyzz',
                specialization: 'Gyno',
                aadharNumberD: '1010256345',
                contactNumber: '9406356231',

            },
        ];

        for (let i = 0; i < patients.length; i++) {
            patients[i].docType = 'patient';
            await ctx.stub.putState(patients[i].aadharNumberP, Buffer.from(JSON.stringify(patients[i])));
            console.info('Added <--> ', patients[i]);
        }
         for (let j = 0; j < doctors.length; j++) {
            doctors[j].docType = 'doctor';
            await ctx.stub.putState(doctors[j].aadharNumberD, Buffer.from(JSON.stringify(doctors[j])));
            console.info('Added <--> ', doctors[j]);
        }

        console.info('============= END : Initialize Ledger ===========');
    }

}

module.exports = Transcrypt;
