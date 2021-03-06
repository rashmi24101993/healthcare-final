'use strict';

const { Contract } = require('fabric-contract-api');

class Doctor extends Contract {
    
    async queryDegreeRecord(ctx, licenseId) {
        // get the doctors data from chaincode state
        const licenseAsBytes = await ctx.stub.getState(licenseId); 
        if (!liceneAsBytes || licenseAsBytes.length === 0) {
            throw new Error(`${licenseId} does not exist`);
        }
        console.log(licenseAsBytes.toString());
        return licenseAsBytes.toString();
    }

    async createDoctorRecord(ctx, licenseId, doctorName, specialization, aadharNumber,contactNumber) {
        console.info('============= START : Create Doctors Record ===========');

        const doctor = {
            docType: 'doctor',
            doctorName,
            specialization,
            aadharNumber,
            contactNumber,
        };

        await ctx.stub.putState(licenseId, Buffer.from(JSON.stringify(doctor)));
        console.info('============= END : Create Doctor Record ===========');
    }

    async addAvailableAppointments(ctx, doctorId, appointmentDate) {
        const appointment = {
            docType: 'appointment',
            doctorId,
            patientID: '',
            appointmentDate,
            startTime: '',
            endTime: '',
            status: 'FREE'
        };
        let startTs = [ '0900', '1100', '1300', '1500'];
        let endTs = ['1100', '1300', '1500', '1700'];

        for (let a = 0; a < 4; a++) {
            appointment.startTime = startTs[a];
            appointment.endTime = endTs[a];
            await ctx.stub.putState(appointment.doctorId + appointment.appointmentDate + appointment.startTime, Buffer.from(JSON.stringify(appointment)));
        }
    }

    async queryAllDoctors(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
                if (record.docType !== 'doctor') {
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

module.exports = Doctor;
