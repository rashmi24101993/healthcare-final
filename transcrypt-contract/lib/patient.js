'use strict';

const { Contract } = require('fabric-contract-api');

class Patient extends Contract {
    
    async queryDegreeRecord(ctx, aadharNumber) {
        // get the degree data from chaincode state
        const aadharAsBytes = await ctx.stub.getState(aadharNumber); 
        if (!aadharAsBytes || aadharAsBytes.length === 0) {
            throw new Error(`${aadharNumber} does not exist`);
        }
        console.log(aadharAsBytes.toString());
        return aadharAsBytes.toString();
    }

    async createPatientRecord(ctx, aadharNumber, patientName, age, contactNumber, emergencyContact) {
        console.info('============= START : Create Patient Record ===========');

        const patient = {
            docType: 'patient',
            patientName,
            age,
            contactNumber,
            emergencyContact,
            
        };

        await ctx.stub.putState(degreeId, Buffer.from(JSON.stringify(degree)));
        console.info('============= END : Create Patient Record ===========');
    }

    async queryAllPatients(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
                if (record.docType !== 'patient') {
                    continue;
                }
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

}

module.exports = Patient;
