'use strict';

const { Contract } = require('fabric-contract-api');

class Patient extends Contract {
    
    async queryPatientRecord(ctx, aadharNumberP) {
        // get the degree data from chaincode state
        const aadharAsBytes = await ctx.stub.getState(aadharNumberP); 
        if (!aadharAsBytes || aadharAsBytes.length === 0) {
            throw new Error(`${aadharNumberP} does not exist`);
        }
        console.log(aadharAsBytes.toString());
        return aadharAsBytes.toString();
    }

    async createPatientRecord(ctx, aadharNumberP, patientName, emailP, passwordp, age, contactNumber, emergencyContact) {
        console.info('============= START : Create Patient Record ===========');

        const patient = {
            docType: 'patient',
            aadharNumberP,
            patientName,
            emailP,
            passwordp,
            age,
            contactNumber,
            emergencyContact,
            walletBalance: 100,
        };

        await ctx.stub.putState(aadharNumberP, Buffer.from(JSON.stringify(patient)));
        console.info('============= END : Create Patient Record ===========');
    }

    async addWalletBalancePatient(ctx, aadharNumberP, amount) {
        const patientAsBytes = await ctx.stub.getState(aadharNumberP);
        const patient = JSON.parse(patientAsBytes.toString());
        patient.walletBalance = patient.walletBalance + amount;
        await ctx.stub.putState(aadharNumberP, Buffer.from(JSON.stringify(patient)));
    }

    async payDoctor(ctx, aadharNumberP, aadharNumberD, amount) {
        const patientAsBytes = await ctx.stub.getState(aadharNumberP);
        const patient = JSON.parse(patientAsBytes.toString());
        patient.walletBalance = patient.walletBalance - amount;
        await ctx.stub.putState(aadharNumberP, Buffer.from(JSON.stringify(patient)));
        const doctorAsBytes = await ctx.stub.getState(aadharNumberD);
        const doctor = JSON.parse(doctorAsBytes.toString());
        doctor.walletBalance = doctor.walletBalance + amount;
        await ctx.stub.putState(aadharNumberD, Buffer.from(JSON.stringify(doctor)));
    }

    async bookAnAppointment(ctx, appointmentId, aadharNumberP) {
        const appointmentAsBytes = await ctx.stub.getState(appointmentId);
        const appointment = JSON.parse(appointmentAsBytes.toString());
        appointment.aadharNumberP = aadharNumberP;
        appointment.status = 'BOOKED';
        await ctx.stub.putState(appointmentId, Buffer.from(JSON.stringify(appointment)));
    }
  //  async getPrescription(ctx,appointmentId,aadharNumberP){

  //  }

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
